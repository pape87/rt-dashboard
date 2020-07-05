package controllers

import (
	"net/http"
	"rt-dashboard/go-backend/model"
	"rt-dashboard/go-backend/services"

	"github.com/gin-gonic/gin"
)

type DownloadOutput struct {
	AppId        string  `json:"app_id"`
	Latitude     float64 `json:"latitude"`
	Longitude    float64 `json:"longitude"`
	DownloadedAt string  `json:"downloaded_at"`
	Country      string  `json:"country"`
}

type AddDownloadInput struct {
	AppId        string  `json:"app_id" binding:"required"`
	Latitude     float64 `json:"latitude" binding:"required"`
	Longitude    float64 `json:"longitude" binding:"required"`
	DownloadedAt string  `json:"downloaded_at" binding:"required"`
}

// BookController interface
type DownloadController interface {
	AddDownload(*gin.Context)
}

type downloadController struct {
	downloadService services.DownloadService
}

// NewBookController instantiates Book Controller
func NewDownloadController(d services.DownloadService) DownloadController {
	return &downloadController{downloadService: d}
}

func (ctl *downloadController) AddDownload(c *gin.Context) {
	var input AddDownloadInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	download := model.Download{AppId: input.AppId, Latitude: input.Latitude, Longitude: input.Longitude, DownloadedAt: input.DownloadedAt}
	if _, err := ctl.downloadService.AddDownload(&download); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": download})
}
