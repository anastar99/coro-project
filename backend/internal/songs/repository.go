package songs

import (
	"context"
	"database/sql"
	"fmt"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) GetAllSongs(ctx context.Context) ([]Song, error) {
	query := `
		SELECT song_id, song_name, page_number, song_url
		FROM songs
	`
	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		fmt.Println("failed to get songs:", err)
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
			&song.SongURL,
		)

		if err != nil {
			return nil, err
		}

		songs = append(songs, song)
	}

	return songs, nil
}

func (r *Repository) CreateSong(ctx context.Context, req CreateSongRequest) (Song, error) {

	newSong := Song{
		SongID:     2222,
		SongName:   req.SongName,
		PageNumber: req.PageNumber,
		SongURL:    req.SongURL,
	}

	return newSong, nil
}
