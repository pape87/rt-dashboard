import React, { useEffect, useRef, useState } from "react";
import DownloadMap from "./components/DownloadMap/DownloadMap";
import { Download } from "./store/download";
import { useSocket } from "./services/socket-service";
import CountryStats from "./components/CountryStats/CountryStats";
import TimeStats from "./components/TimeStats/TimeStats";
import DateTimeRangeSelector, { DateTimeRange } from "./components/DateTimeRangeSelector/DateTimeRangeSelector";
import { Styled } from "./styles/styled";
import { Container } from "./styles/container";
import { addRandomDownload, getAllDownloads } from "./services/download";

function App() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [dateFilter, setDateFilter] = useState<DateTimeRange>({} as DateTimeRange);
  const socket = useSocket();

  async function getDownloads(filter = false) {
    const range = filter ? { from: dateFilter.from, to: dateFilter.to }: undefined;
    const response = await getAllDownloads(range);
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
    getDownloads();
  }, []);


  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  async function addDownload() {
    await addRandomDownload();
  }

  async function searchDownloads() {
    getDownloads(true);
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
