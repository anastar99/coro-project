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

	fmt.Println("In get all songs")

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

		fmt.Println("hereh", song)

		if err != nil {
			return nil, err
		}

		songs = append(songs, song)
	}

	fmt.Println("here", songs)

	return songs, nil
}
