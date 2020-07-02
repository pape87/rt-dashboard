import "reflect-metadata";

import { Download } from "../../model/download";
import { NedbService } from "../../services/nedb";

describe("The nedb service", () => {
  function arrangeMocks() {
    const storage = new NedbService();
    (storage as any).db = {
      loadDatabase: jest.fn(),
      getAllData: jest.fn(),
      insert: jest.fn()
    };
    return { storage };
  }
  describe("add function", () => {
    it("should insert data into the db", () => {
      const { storage } = arrangeMocks();
      const download = {
        app_id: "foo",
        downloaded_at: "bar",
        latitude: "1",
        longitude: "2"
      } as Download;
      storage.add(download);

      expect((storage as any).db.insert).toHaveBeenCalledWith(download);
    })
  });

  describe("getAll function", () => {
    it("get data from the db", () => {
      const { storage } = arrangeMocks();
      storage.getAll();

      expect((storage as any).db.getAllData).toHaveBeenCalled();
    })
  });
});