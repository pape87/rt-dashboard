package repositories

import (
	"context"
	"rt-dashboard/go-backend/model"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
)

// Repo Interface
type DownloadRepo interface {
	AddDownload(download *model.Download) (*model.Download, error)
}

type downloadRepo struct {
	db *mongo.Client
}

// NewBookRepo will instantiate Book Repository
func NewDownloadRepo(db *mongo.Client) DownloadRepo {
	return &downloadRepo{
		db: db,
	}
}

func (repo *downloadRepo) AddDownload(download *model.Download) (*model.Download, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	collection := repo.db.Database("dashboard-db").Collection("downloads")
	_, err := collection.InsertOne(ctx, *download)

	if err != nil {
		panic(err)
	}
	return download, nil
}
