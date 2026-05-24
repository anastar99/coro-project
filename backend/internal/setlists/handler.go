package setlists

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
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

func (h *Handler) GetSetlist(
	w http.ResponseWriter,
	r *http.Request,
) {
	setlist_id, err := strconv.Atoi(chi.URLParam(r, "id"))

	if err != nil {
		http.Error(w, "invalid setlist id", http.StatusBadRequest)
		return
	}

	setlist, err :=h.service.GetSetlist(r.Context(), setlist_id)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(setlist)
}