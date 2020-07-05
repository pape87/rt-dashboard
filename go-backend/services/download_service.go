package services

import (
	"rt-dashboard/go-backend/model"
	"rt-dashboard/go-backend/repositories"
	"time"
)

type DownloadService interface {
	AddDownload(download *model.Download) (*model.Download, error)
	GetDonwloads(from time.Time, to time.Time) ([]model.Download, error)
}

type downloadService struct {
	Repo repositories.DownloadRepo
}

func NewDownloadService(
	repo repositories.DownloadRepo,
) DownloadService {

	return &downloadService{
		Repo: repo,
	}
}

func (d *downloadService) AddDownload(download *model.Download) (*model.Download, error) {
	return d.Repo.AddDownload(download)
}

func (d *downloadService) GetDonwloads(from time.Time, to time.Time) ([]model.Download, error) {
	return d.Repo.GetDonwloads(from, to)
}
