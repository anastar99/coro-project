package setlists

import (
	"encoding/json"
	"net/http"
)

// IMPORTS

type Handler struct {
	service *Service
}

func NewHanlder(service *Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) GetAllSetlists(
	w http.ResponseWriter,
	r *http.Request,
) {

	setlists, err := h.service.GetAllSetlists(r.Context())
	if err != nil {
		http.Error(w, "failed to get setlist", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(setlists)
}
