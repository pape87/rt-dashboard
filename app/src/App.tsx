import React, { useEffect, useRef, useState } from 'react';
import DownloadMap from './components/DownloadMap/DownloadMap';
import { Download } from './store/download';
import { useSocket } from './services/socket-service';
import CountryStats from './components/CountryStats/CountryStats';
import TimeStats from './components/TimeStats/TimeStats';
import DateTimeRangeSelector, { DateTimeRange } from './components/DateTimeRangeSelector/DateTimeRangeSelector';

function App() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [dateFilter, setDateFilter] = useState<DateTimeRange>({} as DateTimeRange);
  const socket = useSocket();

  async function getAllDownloads() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await fetch('http://localhost:8080/downloads', {
      headers,
      method: "GET",
      mode: 'cors',
      cache: 'default'
    });
    response.json().then((value) => setDownloads(value));
  }

  useEffect(() => {
    socket.init();
    const onMessage = socket.onMessage();
    onMessage.subscribe((download: Download) => {
      if (!download) {
        return;
      }
      setDownloads((state) => [...state, download]);
    });
    getAllDownloads();
  }, []);


  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  async function addDownload() {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    // const response = await fetch('http://localhost:8080/download', {
    //   headers,
    //   method: "POST",
    //   mode: 'cors',
    //   cache: 'default',
    //   body: JSON.stringify({
    //     app_id: "foo",
    //     downloaded_at: new Date().toString(),
    //     latitude: (-100.1 + Math.random() * 9000.0) / 100,
    //     longitude: (100.1 + Math.random() * 9000.0) / 100
    //   })
    // });
    // console.log("Post", response);

    console.log("range", dateFilter);
  }

  return (
    <div className="App">
      <DownloadMap downloads={downloads || []}></DownloadMap>
      <CountryStats downloads={downloads || []}></CountryStats>
      <TimeStats downloads={downloads || []}></TimeStats>
      <DateTimeRangeSelector range={setDateFilter}></DateTimeRangeSelector>
      <button onClick={addDownload}>add</button>
    </div>
  );
}

export default App;
