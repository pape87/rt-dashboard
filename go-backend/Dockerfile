# Pull base image
FROM golang

WORKDIR /go/src/rt-dashboard/go-backend

COPY . .

RUN go get -u github.com/cosmtrek/air

ENTRYPOINT air