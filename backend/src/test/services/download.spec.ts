import "reflect-metadata";

import { DBStorage } from "../../interfaces/storage";
import { DownloadService } from "../../services/download";
import { Download } from "../../model/download";

describe("The download service", () => {
  function arrangeMocks() {
    const downloads = [
      { "app_id": "Android", "downloaded_at": "Thu, 02 Jul 2020 07:36:38 GMT", "latitude": 5.610476134785583, "longitude": 67.82581164605298, "country": "Unknown" },
      { "app_id": "Android", "downloaded_at": "Thu, 02 Jul 2020 08:36:31 GMT", "latitude": 38.22825654161302, "longitude": 33.68900889202206, "country": "Türkiye" },
      { "app_id": "IOS", "downloaded_at": "Thu, 02 Jul 2020 09:36:21 GMT", "latitude": 20.158055874850515, "longitude": 8.261007110850928, "country": "Niger" },
      { "app_id": "Android", "downloaded_at": "Thu, 02 Jul 2020 08:28:23 GMT", "latitude": 23.237351970660075, "longitude": 57.9449037342474, "country": "سلطنة عُمان Oman" }
    ];
    const storage = {
      getAll: jest.fn().mockReturnValue(downloads),
      add: jest.fn()
    } as DBStorage<Download>;
    const downloadService = new DownloadService(storage);
    const addSpy = jest.spyOn(storage, "add");
    return { storage, downloadService, downloads, addSpy };
  }
  describe("getDownloads function", () => {
    it("should return all values when called without params", () => {
      const { downloadService, downloads } = arrangeMocks();
      const result = downloadService.getDownloads();

      expect(result).toEqual(downloads);
    })

    it("should filter the values by date", () => {
      const { downloadService, downloads } = arrangeMocks();
      const result = downloadService.getDownloads({ from: "Thu, 02 Jul 2020 07:40:38 GMT", to: "Thu, 02 Jul 2020 08:50:38 GMT" });
      const expectedResult = [
        { "app_id": "Android", "downloaded_at": "Thu, 02 Jul 2020 08:36:31 GMT", "latitude": 38.22825654161302, "longitude": 33.68900889202206, "country": "Türkiye" },
        { "app_id": "Android", "downloaded_at": "Thu, 02 Jul 2020 08:28:23 GMT", "latitude": 23.237351970660075, "longitude": 57.9449037342474, "country": "سلطنة عُمان Oman" }
      ];
      expect(result).toEqual(expectedResult);
    })
  });

  describe("addDownload function", () => {
    it("should call add from the storage with right parameter when called without country param", () => {
      const { downloadService, addSpy } = arrangeMocks();
      const download = {
        app_id: "foo",
        downloaded_at: "bar",
        latitude: "1",
        longitude: "2"
      } as Download;
      downloadService.addDownload(download);
      expect(addSpy).toHaveBeenCalledWith({...download, country: "Unknown"})
    })

    it("should call add from the storage with right parameter when called with country param", () => {
      const { downloadService, addSpy } = arrangeMocks();
      const download = {
        app_id: "foo",
        downloaded_at: "bar",
        latitude: "1",
        longitude: "2"
      } as Download;
      const country = "foobar";
      downloadService.addDownload(download, country);
      expect(addSpy).toHaveBeenCalledWith({...download, country})
    })
  });
});