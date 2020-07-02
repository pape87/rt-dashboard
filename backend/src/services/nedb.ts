import "reflect-metadata"

import { injectable } from "inversify";
import * as Datastore from "nedb";
import { Download } from "../model/download";
import { DBStorage } from "../interfaces/storage"

@injectable()
export class NedbService implements DBStorage<Download> {
  private db: Datastore<Download>;

  constructor() {
    this.db = new Datastore<Download>({ filename: "./db/download.db" });
  }

  public getAll(): Download[] {
    this.db.loadDatabase();
    return this.db.getAllData();
  }

  public add(value: Download): void {
    this.db.loadDatabase();
    this.db.insert(value);
  }
}