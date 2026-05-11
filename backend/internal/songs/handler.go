package songs

// HTTP Stuff Only
import (
	"encoding/json"
	"net/http"
)

type Handler struct {
	service *Service
}

func newHandler(service *Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) GetSongs(
	w http.ResponseWriter,
	r *http.Request,
) {
	songs, err := h.service.GetSongs(r.Context())
	if err != nil {
		http.Error(w, "failed to get songs", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(songs)
}
