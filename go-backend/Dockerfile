# Pull base image
FROM golang

WORKDIR /go/src/rt-dashboard/go-backend

COPY . .

RUN go get -d -v ./...

RUN go install -v ./...

RUN go get -u github.com/cosmtrek/air

# CMD ["go-backend"]

# RUN go get github.com/githubnemo/CompileDaemon

# ENTRYPOINT CompileDaemon --build="go build main.go" --command="go run main.go" --graceful-kill=true
ENTRYPOINT air