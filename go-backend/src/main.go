package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

var Downloads []Download

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the Dashboard Go api")
}

func inRange(date string, from string, to string) bool {
	d1, _ := time.Parse(time.RFC1123, date)
	d2, _ := time.Parse(time.RFC1123, from)
	d3, _ := time.Parse(time.RFC1123, to)

	return d1.After(d2) && d1.Before(d3)
}

func returnAllDownloads(w http.ResponseWriter, r *http.Request) {
	from := r.URL.Query()["from"]
	to := r.URL.Query()["to"]

	if len(from) < 1 || len(to) < 1 {
		json.NewEncoder(w).Encode(Downloads)
		return
	}

	filteredDownloads := filterByDate(Downloads, from[0], to[0], inRange)
	json.NewEncoder(w).Encode(filteredDownloads)
	return
}

func createNewDownload(w http.ResponseWriter, r *http.Request) {
	var download Download
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &download)
	Downloads = append(Downloads, download)
	json.NewEncoder(w).Encode(download)
}

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/", homePage).Methods("GET")
	myRouter.HandleFunc("/downloads", returnAllDownloads).Methods("GET")
	myRouter.HandleFunc("/downloads/new", createNewDownload).Methods("POST")
	log.Fatal(http.ListenAndServe(":8080", myRouter))
}

func main() {
	fmt.Println("Rest API v2.0")
	Downloads = []Download{
		{AppId: "IOS", DownloadedAt: "Mon, 29 Jun 2020 13:32:01 GMT", Latitude: 51.68767959192662, Longitude: 22.4137962311218, Country: "Polska"},
		{AppId: "Android", DownloadedAt: "Mon, 29 Jun 2020 13:31:52 GMT", Latitude: 54.751899313239626, Longitude: 75.77368225425313, Country: "Россия"},
		{AppId: "IOS", DownloadedAt: "Mon, 29 Jun 2020 13:32:07 GMT", Latitude: 23.952659021084887, Longitude: 20.956791836169227, Country: "Libya / ليبيا"},
		{AppId: "IOS", DownloadedAt: "Mon, 29 Jun 2020 13:31:58 GMT", Latitude: 40.71079736128028, Longitude: 56.68783292361462, Country: "Türkmenistan"},
	}
	handleRequests()
}
