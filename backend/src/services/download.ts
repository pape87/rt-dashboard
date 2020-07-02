import { Download } from "../model/download";
import { injectable, inject } from "inversify";
import { NedbService } from "./nedb";
import { DBStorage } from "../interfaces/storage"

@injectable()
export class DownloadService {

  constructor(@inject(NedbService) private storageService: DBStorage<Download>) {
  }

  /**
   * Gets a list of downloads from storage. Can be filtered by date range using the range parameter
   *
   * @param range: range of dates used to filter the downloads. Dates (from, to) have to be in the UTC format
   */
  public getDownloads(range?: { from: string, to: string }): Download[] {
    if (range) {
      const dFrom = Date.parse(range.from as string);
      const dTo = Date.parse(range.to as string);
      return this.storageService.getAll().filter((x: Download) => {
        const dAt = Date.parse(x.downloaded_at);
        if (dAt > dFrom
          && dAt < dTo) {
          return true;
        }
        return false;
      })
    }
    return this.storageService.getAll();
  }

  /**
   * Add a download to storage
   *
   * @param download: the download to add
   * @param country: the country where the download was located. Default: "Unknown"
   */
  public addDownload(download: Download, country = "Unknown") {
    download.country = country;
    this.storageService.add(download);
  }
}