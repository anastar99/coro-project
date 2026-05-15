package setlists

import "context"

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) GetAllSetlists(ctx context.Context) ([]SetList, error) {
	return s.repo.GetAllSetlists(ctx)
}
