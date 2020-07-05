package services

import (
	"rt-dashboard/go-backend/model"
	"rt-dashboard/go-backend/repositories"
)

type DownloadService interface {
	AddDownload(download *model.Download) (*model.Download, error)
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
