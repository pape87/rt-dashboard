package main

type Download struct {
	AppId        string  `json:"app_id"`
	Latitude     float64 `json:"latitude"`
	Longitude    float64 `json:"longitude"`
	DownloadedAt string  `json:"downloaded_at"`
	Country      string  `json:"country"`
}

func filterByDate(ss []Download, from string, to string, test func(string, string, string) bool) (ret []Download) {
	for _, s := range ss {
		if test(s.DownloadedAt, from, to) {
			ret = append(ret, s)
		}
	}
	return
}
