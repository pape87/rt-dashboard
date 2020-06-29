import React, { useEffect, useRef, useState } from 'react';
import DownloadMap from './components/DownloadMap/DownloadMap';
import { Download } from './store/download';
import { useSocket } from './services/socket-service';
import CountryStats from './components/CountryStats/CountryStats';
import TimeStats from './components/TimeStats/TimeStats';
import DateTimeRangeSelector, { DateTimeRange } from './components/DateTimeRangeSelector/DateTimeRangeSelector';
import { Styled } from './styles/styled';
import { Container } from './styles/container';

function App() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [dateFilter, setDateFilter] = useState<DateTimeRange>({} as DateTimeRange);
  const socket = useSocket();

  async function getAllDownloads(filter = false) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const queryString = filter ? `?from=${dateFilter.from.toUTCString()}&to=${dateFilter.to.toUTCString()}` : "";
    const response = await fetch(`http://localhost:8080/downloads${queryString}`, {
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
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const response = await fetch('http://localhost:8080/download', {
      headers,
      method: "POST",
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify({
        app_id: Math.random() > 0.5 ? "IOS" : "Android",
        downloaded_at: new Date().toUTCString(),
        latitude: (-100.1 + Math.random() * 9000.0) / 100,
        longitude: (100.1 + Math.random() * 9000.0) / 100
      })
    });
    console.log("Post", response);
  }

  async function searchDownloads() {
    getAllDownloads(true);
  }

  return (
    <div>
      <DateTimeRangeSelector range={setDateFilter}></DateTimeRangeSelector>
      <Container>
        <Styled.HoverButton color="#fe921f" onClick={searchDownloads}>Filter Downloads</Styled.HoverButton>
      </Container>
      <DownloadMap downloads={downloads || []}></DownloadMap>
      <Container>
        <CountryStats downloads={downloads || []}></CountryStats>
        <TimeStats downloads={downloads || []}></TimeStats>
      </Container>
      <Container>
        <Styled.HoverButton color="#e91e62" onClick={addDownload}>Add random download</Styled.HoverButton>
      </Container>
    </div>
  );
}

export default App;
