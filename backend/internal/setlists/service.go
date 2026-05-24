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

func (s *Service) GetSetlist(ctx context.Context, setlistID int) (SetList, error) {
	return s.repo.GetSetlist(ctx, setlistID)
}


