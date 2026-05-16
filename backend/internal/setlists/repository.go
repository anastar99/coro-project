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

	return setList, nil

}
