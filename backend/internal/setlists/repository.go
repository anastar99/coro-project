package setlists

import (
	"context"
	"database/sql"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) GetAllSetlists(context.Context) ([]SetList, error) {
	var setList []SetList

	return setList, nil

}
