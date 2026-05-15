package songs

type Song struct {
	SongID     int    `json:"song_id"`
	SongName   string `json:"song_name"`
	PageNumber int    `json:"page_number"`
	SongURL    string `json:"song_url"`
}

type CreateSongRequest struct {
	SongName   string `json:"song_name"`
	PageNumber int    `json:"page_number"`
	SongURL    string `json:"song_url"`
}
