package songs

// Business logic layer
import "context"

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) GetSongs(ctx context.Context, last_id *int, search_query string) ([]Song, error) {
	// business logic could go here later

	return s.repo.GetSongs(ctx, last_id, search_query)
}

func (s *Service) SearchSongs(ctx context.Context, search string) ([]Song, error) {
	return s.repo.SearchSongs(ctx, search)
}

func (s *Service) CreateSong(ctx context.Context, req CreateSongRequest) (Song, error) {
	return s.repo.CreateSong(ctx, req)
}

func (s *Service) GetSong(ctx context.Context, song_id int) (Song, error) {
	return s.repo.GetSong(ctx, song_id)
}

func (s *Service) DeleteSong(ctx context.Context, song_id int) (Song, error) {
	return s.repo.DeleteSong(ctx, song_id)
}

func (s *Service) UpdateSong(ctx context.Context, song_id int, req_data UpdateSongRequest) (Song, error) {
	return s.repo.UpdateSong(ctx, song_id, req_data)
}
