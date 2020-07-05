package repositories

import (
	"context"
	"rt-dashboard/go-backend/model"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type DownloadRepo interface {
	AddDownload(download *model.Download) (*model.Download, error)
	GetDonwloads(from time.Time, to time.Time) ([]model.Download, error)
}

type downloadRepo struct {
	db *mongo.Client
}

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

func (repo *downloadRepo) GetDonwloads(from time.Time, to time.Time) ([]model.Download, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	filter := bson.M{}
	if !from.IsZero() && !to.IsZero() {
		filter = bson.M{
			"downloaded_at": bson.M{
				"$gt": from,
				"$lt": to,
			},
		}
	}
	defer cancel()
	var results []model.Download
	collection := repo.db.Database("dashboard-db").Collection("downloads")
	cursor, err := collection.Find(ctx, filter)
	cursor.All(context.TODO(), &results)

	if err != nil {
		panic(err)
	}

	return results, nil
}
