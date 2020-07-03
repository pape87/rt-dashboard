# Pull base image
FROM golang:alpine

RUN apk update && apk add --no-cache git

WORKDIR /opt/go-backend

COPY . .

RUN go mod download

RUN go get -u github.com/cosmtrek/air

ENTRYPOINT air