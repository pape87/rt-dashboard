import * as express from "express";
import * as socketIo from "socket.io";
import { createServer, Server } from "http";
import * as cors from "cors";
import { Download } from "./model/download";
import { WebsocketMessages } from "./websocket";
import bodyParser = require("body-parser");
import * as Datastore from "nedb";
import fetch from "node-fetch";

export class DashboardServer {
  public static readonly PORT: number = 8080;
  private _app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;
  private db: Datastore<Download>;

  constructor() {
    this._app = express();
    this.port = process.env.PORT || DashboardServer.PORT;
    this._app.use(cors());
    this._app.options("*", cors());
    this._app.use(bodyParser.json());

    this.server = createServer(this._app);
    this.initSocket();
    this.listen();
    this.db = new Datastore<Download>({ filename: "./db/download.db" });
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
    this._app.post("/download", (req, res) => {
      if (req.body && req.body.latitude) {
        const download: Download = req.body;
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${req.body.latitude}&lon=${req.body.longitude}&format=json`)
          .then((response) => response.json())
          .then((data) => {
            if (data?.address?.country) {
              download.country = data.address.country;
            }
            this.db.loadDatabase();
            this.db.insert(download);
            this.io.emit(WebsocketMessages.NEW_DOWNLOAD, download);
            res.send("Download added");
          });
      }
    });

    this._app.get("/downloads", (req, res) => {
      this.db.loadDatabase();
      res.send(this.db.getAllData());
    });
    return this._app;
  }
}