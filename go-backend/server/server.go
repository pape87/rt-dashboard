package server

import (
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"rt-dashboard/go-backend/controllers"
	"rt-dashboard/go-backend/repositories"
	"rt-dashboard/go-backend/services"
)

func Run() {
	fmt.Println("fooooooooooooooooo")
	r := gin.Default()

	clientOptions := options.Client().ApplyURI("mongodb://mongo:27017")
	mongoDB, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		panic(err)
	}

	downloadRepo := repositories.NewDownloadRepo(mongoDB)
	downloadService := services.NewDownloadService(downloadRepo)
	downloadController := controllers.NewDownloadController(downloadService)

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Welcome to GOLANG hell",
		})
	})
	r.POST("/download", downloadController.AddDownload)
	r.GET("/downloads", downloadController.GetDownloads)
	r.Run()
}
