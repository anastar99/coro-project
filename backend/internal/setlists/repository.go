package setlists

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/anastar99/coro-project/backend/internal/songs"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) GetAllSetlists(ctx context.Context) ([]SetList, error) {
	query := `SELECT setlist_id, setlist_name FROM setlists`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		fmt.Println("failed to get setlists:", err)
		return nil, err
	}
	defer rows.Close()

	var setlists []SetList

	for rows.Next() {
		var setlist SetList

		err := rows.Scan(
			&setlist.SetListID,
			&setlist.SetListName,
		)
		if err != nil {
			return nil, err
		}

		setlists = append(setlists, setlist)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return setlists, nil
}

func (r *Repository) DeleteSetlist(ctx context.Context, setlistID int) error {
	deleteSetlistSongsQuery := `
		DELETE FROM setlist_songs
		WHERE setlist_id = $1
	`

	deleteSetlistQuery := `
		DELETE FROM setlists
		WHERE setlist_id = $1
	`

	_, err := r.db.ExecContext(ctx, deleteSetlistSongsQuery, setlistID)
	if err != nil {
		fmt.Println("failed to delete songs from setlist:", err)
		return err
	}

	result, err := r.db.ExecContext(ctx, deleteSetlistQuery, setlistID)
	if err != nil {
		fmt.Println("failed to delete setlist:", err)
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return sql.ErrNoRows
	}

	return nil
}

func (r *Repository) GetSetlist(ctx context.Context, setlistID int) (SetList, error) {
	query := `
		SELECT 
			sl.setlist_id,
			sl.setlist_name,
			s.song_id,
			s.song_name,
			s.page_number,
			s.song_url
		FROM setlists sl
		JOIN setlist_songs ss ON sl.setlist_id = ss.setlist_id
		JOIN songs s ON ss.song_id = s.song_id
		WHERE sl.setlist_id = $1
		ORDER BY ss.song_order
	`

	rows, err := r.db.QueryContext(ctx, query, setlistID)
	if err != nil {
		fmt.Println("failed to get setlist:", err)
		return SetList{}, err
	}
	defer rows.Close()

	var setlist SetList

	for rows.Next() {
		var song songs.Song

		err := rows.Scan(
			&setlist.SetListID,
			&setlist.SetListName,
			&song.SongID,
			&song.SongName,
			&song.PageNumber,
			&song.SongURL,
		)
		if err != nil {
			return SetList{}, err
		}

		setlist.SetListSongs = append(setlist.SetListSongs, song)
	}

	if err := rows.Err(); err != nil {
		return SetList{}, err
	}

	return setlist, nil
}