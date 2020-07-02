import * as express from "express";
import * as socketIo from "socket.io";
import { createServer, Server } from "http";
import * as cors from "cors";
import { Download } from "./model/download";
import { WebsocketMessages } from "./websocket";
import bodyParser = require("body-parser");
import { inject, injectable } from "inversify";
import { DownloadService } from "./services/download";

@injectable()
export class DashboardServer {
  public static readonly PORT: number = 3080;
  private _app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor(
    @inject(DownloadService) private downloadService: DownloadService
  ) {
    this._app = express();
    this.port = DashboardServer.PORT;
    this._app.use(cors());
    this._app.options("*", cors());
    this._app.use(bodyParser.json());

    this.server = createServer(this._app);
    this.initSocket();
    this.listen();
  }

  private initSocket(): void {
    this.io = socketIo(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      // tslint:disable-next-line:no-console
      console.log("Running server on port %s", this.port);
    });

    this.io.on(WebsocketMessages.CONNECT, (socket: any) => {
      // tslint:disable-next-line:no-console
      console.log("Connected client on port %s.", this.port);

      socket.on(WebsocketMessages.NEW_DOWNLOAD, (d: Download) => {
        // tslint:disable-next-line:no-console
        console.log("[server](message): %s", JSON.stringify(d));
        this.io.emit(WebsocketMessages.NEW_DOWNLOAD, d);
      });

      socket.on(WebsocketMessages.DISCONNECT, () => {
        // tslint:disable-next-line:no-console
        console.log("Client disconnected");
      });
    });
  }

  get app(): express.Application {
    this._app.post("/download", async (req, res) => {
      if (req.body && req.body.latitude && req.body.longitude) {
        const country = await this.downloadService.getCountry(req.body.latitude, req.body.longitude);
        const download: Download = req.body;
        this.downloadService.addDownload(download, country);
        this.io.emit(WebsocketMessages.NEW_DOWNLOAD, download);
        res.send("Download added");
      }
    });

    this._app.get("/downloads", (req, res) => {
      const range = req.query.from && req.query.to ? { from: req.query.from as string, to: req.query.to as string } : undefined;
      res.send(this.downloadService.getDownloads(range));
    });
    return this._app;
  }
}