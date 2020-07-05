package model

import "time"

type Download struct {
	AppId        string    `json:"app_id" bson:"app_id"`
	Latitude     float64   `json:"latitude" bson:"latitude"`
	Longitude    float64   `json:"longitude" bson:"longitude"`
	DownloadedAt time.Time `json:"downloaded_at" bson:"downloaded_at"`
	Country      string    `json:"country" bson:"country"`
}
