import React, { useEffect } from 'react';
import DownloadMap from './components/DownloadMap/DownloadMap';
import { useSocket } from './services/socket-service';

function App() {

  const socket = useSocket();

  useEffect(() => {


  });


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
        app_id: "foo",
        downloaded_at: "bar",
        latitude: 1234,
        longitude: 456
      })
    });
    console.log("Post", response);
  }

  return (
    <div className="App">
      <DownloadMap></DownloadMap>
      <button onClick={addDownload}>add</button>
    </div>
  );
}

export default App;
