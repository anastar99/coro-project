package songs

// Business logic layer
import "context"

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) GetSongs(ctx context.Context) ([]Song, error) {
	// business logic could go here later

	return s.repo.GetAllSongs(ctx)
}
