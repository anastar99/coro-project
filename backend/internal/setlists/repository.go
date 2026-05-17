package setlists

import (
	"fmt"
	"context"
	"database/sql"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) GetAllSetlists(ctx context.Context) ([]SetList, error) {
	var setList []SetList

	query := `SELECT setlist_id, setlist_name FROM setlists`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		fmt.Println("failed to get setlists:", err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var setlist SetList

		err := rows.Scan(
			&setlist.SetListID,
			&setlist.SetListName,
		)
		if err != nil {
			return nil, err
		}

		setList = append(setList, setlist)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return setList, nil
}


	// TODO: need to return an array of objects something like
	// [
	// 	{
	// 		id: 1,
	// 		setlist_name: "Christmas",
	// 		songs: [
	// 			{song_name: "Padre Nuestro",
	// 				...
	//			}
	//		]
	//	},
	// 	...
	//
	// ]
