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

### docker-compose
Is possible to run the app and the Node backend using the docker-compose file `docker-compose up` and access the application at `localhost:3000`.


## Backend
Simple backend Node application to test the Dashboard, using express for the api and socket.io to display data realtime.

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



## Go-Backend (still missing socket comunication for the real time map update)
Just another api backend written in Go using MongoDB as storage.


### Development
To setup the dev environment is possible to use the docker-compose file present in the folder.

