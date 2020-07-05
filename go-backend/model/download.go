package model

type Download struct {
	AppId        string  `json:"app_id"`
	Latitude     float64 `json:"latitude"`
	Longitude    float64 `json:"longitude"`
	DownloadedAt string  `json:"downloaded_at"`
	Country      string  `json:"country"`
}
