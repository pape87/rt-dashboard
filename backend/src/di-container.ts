import { Container } from "inversify";
import { DownloadService } from "./services/download";
import { NedbService } from "./services/nedb";
import { DBStorage } from "./interfaces/storage";
import { Download } from "./model/download";

const DIContainer = new Container();
DIContainer.bind<DownloadService>(DownloadService).toSelf();
DIContainer.bind<DBStorage<Download>>(NedbService).toSelf();

export default DIContainer;