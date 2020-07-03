# Real Time Download Dashboard
Simple prototype of a dashboard to display on a real time map the positions of an app downloads.


## Prerequisites
- Node 10.x


## App
React application using topojson and d3-geo to display the map

![](https://i.ibb.co/xMVzb1z/dashboard.png)


### How to run

`npm install`

`npm run`


## Backend
Simple backend express application to test the Dashboard, using socket.io to display data realtime.

### How to run

`npm install`

`npm run`

### Test

`npm run test`

`npm run tdd` - execution with --watchmode

### API
**Add download**

* **URL**

  /download

* **METHOD**

  `POST`

* **Data Params**

  **Required:**
  
  `app_id=[string]`

  `latitude=[number]`

  `longitude=[number]`

  `downloaded_at=[ISO8601 Date format] (eg. "2020-07-03T13:08:35Z")`


**Get downloads**

* **URL**

  /downloads

* **METHOD**

  `GET`

* **URL Params**

  **Optional:**
  
  `from=[ISO8601 Date format]`

  `to=[ISO8601 Date format]`



## Go-Backend (Still a work in progress/do not consider)
Just another api backend written in Go


### How to run

`go build`



## docker-compose
Is possible to run the application using the docker-compose file `docker-compose up` and access the application at `localhost:3000`