package setlists

import "github.com/anastar99/coro-project/backend/internal/songs"

type SetList struct {
	SetListID    int          `json:"setlist_id"`
	SetListName  string       `json:"setlist_name"`
	SetListSongs []songs.Song `json:"songs"`
}

type CreateSetList struct {
	SetListName  string       `json:"setlist_name"`
}