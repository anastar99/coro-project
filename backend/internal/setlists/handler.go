package setlists

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) GetAllSetlists(
	w http.ResponseWriter,
	r *http.Request,
) {
	setlists, err := h.service.GetAllSetlists(r.Context())
	if err != nil {
		http.Error(w, "failed to get setlists", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(setlists)
}

func (h *Handler) GetSetlist(
	w http.ResponseWriter,
	r *http.Request,
) {
	setlistID, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		http.Error(w, "invalid setlist id", http.StatusBadRequest)
		return
	}

	setlist, err := h.service.GetSetlist(r.Context(), setlistID)
	if err != nil {
		http.Error(w, "failed to get setlist", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(setlist)
}

func (h *Handler) DeleteSetlist(
	w http.ResponseWriter,
	r *http.Request,
) {
	setlistID, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		http.Error(w, "invalid setlist id", http.StatusBadRequest)
		return
	}

	err = h.service.DeleteSetlist(r.Context(), setlistID)
	if err != nil {
		http.Error(w, "did not successfully delete setlist", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}