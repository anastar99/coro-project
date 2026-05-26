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

func (r *Repository) SearchSongs(ctx context.Context, search string) ([]Song, error) {

	query := `
		SELECT song_id, song_name, page_number, song_url
		FROM songs
		WHERE song_name ILIKE $1
	`

	rows, err := r.db.QueryContext(ctx, query, "%"+search+"%")

	if err != nil {
		fmt.Println("failed to get songs", err)
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
			fmt.Println("failed to create/store song", err)
			return nil, err
		}

		songs = append(songs, song)
	}

	return songs, nil
}

func (r *Repository) CreateSong(ctx context.Context, req CreateSongRequest) (Song, error) {

	query := `INSERT into 
		songs (song_name, page_number, song_url) 
		VALUES ($1, $2, $3)
		RETURNING song_id, song_name, page_number, song_url`

	var song Song
	err := r.db.QueryRowContext(
		ctx,
		query,
		req.SongName,
		req.PageNumber,
		req.SongURL,
	).Scan(
		&song.SongID,
		&req.SongName,
		&song.PageNumber,
		&song.SongURL,
	)

	if err != nil {
		fmt.Println("failed to create/store song", err)
		return song, nil
	}

	return song, nil
}

func (r *Repository) GetSong(ctx context.Context, song_id int) (Song, error) {

	query := `
		SELECT song_id, song_name, page_number, song_url
		FROM songs
		WHERE song_id = $1
	`

	var song Song

	err := r.db.QueryRowContext(
		ctx,
		query,
		song_id,
	).Scan(
		&song.SongID,
		&song.SongName,
		&song.PageNumber,
		&song.SongURL,
	)

	if err != nil {
		fmt.Println("failed to get song", err)
	}

	return song, nil
}

func (r *Repository) DeleteSong(ctx context.Context, song_id int) (Song, error) {

	query := `
		DELETE FROM songs
		WHERE song_id = $1
		RETURNING song_id, song_name, page_number, song_url
	`

	var song Song
	err := r.db.QueryRowContext(
		ctx,
		query,
		song_id,
	).Scan(
		&song.SongID,
		&song.SongName,
		&song.PageNumber,
		&song.SongURL,
	)

	if err != nil {
		fmt.Println("failed to delete song", err)
	}

	return song, err
}

func (r *Repository) UpdateSong(ctx context.Context, song_id int) (Song, error) {

	query := `Update`

	var song Song
	err := r.db.QueryRowContext(
		ctx,
		query,
		song_id,
	).Scan(
		&song.SongID,
		&song.SongName,
		&song.PageNumber,
		&song.SongURL,
	)

	if err != nil {
		fmt.Println("failed to update song", err)
	}

	return song, err
}
