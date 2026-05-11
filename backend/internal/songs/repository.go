package songs

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

func (r *Repository) GetAllSongs(ctx context.Context) ([]Song, error) {
	query := `some query goes here`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var songs []Song

	for rows.Next() {
		var song Song

		err := rows.Scan(
			&song.SongID,
			&song.SongName,
			&song.PageNumber,
		)

		if err != nil {
			return nil, err
		}

		songs = append(songs, song)
	}

	return songs, nil
}
