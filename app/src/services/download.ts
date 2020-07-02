export async function addRandomDownload() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/download`, {
    headers,
    method: "POST",
    mode: "cors",
    cache: "default",
    body: JSON.stringify({
      app_id: Math.random() > 0.5 ? "IOS" : "Android",
      downloaded_at: new Date().toUTCString(),
      latitude: (-100.1 + Math.random() * 9000.0) / 100,
      longitude: (100.1 + Math.random() * 9000.0) / 100
    })
  });

  return response;
}

export async function getAllDownloads(filter?: { from: Date, to: Date }) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const queryString = filter ? `?from=${filter.from.toUTCString()}&to=${filter.to.toUTCString()}` : "";
  const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/downloads${queryString}`, {
    headers,
    method: "GET",
    mode: "cors",
    cache: "default"
  });
  return response;
}