import { createContext, useContext } from 'react';
import { fromEvent, Observable } from 'rxjs';
import io from 'socket.io-client';

import { Download } from "../store/download";

export enum WebsocketMessages {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  NEW_DOWNLOAD = "new_download"
}

export class SocketService {
  private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

  public init(): SocketService {
    console.log('initiating socket service');
    this.socket = io(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`);
    return this;
  }

  public send(download: Download): void {
    console.log('emitting message: ' + download);
    this.socket.emit(WebsocketMessages.NEW_DOWNLOAD, download);
  }

  public onMessage(): Observable<Download> {
    return fromEvent(this.socket, WebsocketMessages.NEW_DOWNLOAD);
  }

  // disconnect - used when unmounting
  public disconnect(): void {
    this.socket.disconnect();
  }
}

export const SocketContext: React.Context<SocketService> = createContext(new SocketService());

// functional component context hook
export const useSocket = () => useContext(SocketContext);
