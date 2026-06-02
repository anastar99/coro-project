package songs

// HTTP Stuff Only
import (
	"encoding/json"
	"log"
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

func (h *Handler) GetSongs(
	w http.ResponseWriter,
	r *http.Request,
) {
	// Request type log
	log.Println("GET /songs")

	search := r.URL.Query().Get("search")

	if search != "" {
		// search using query
		songs, err := h.service.SearchSongs(r.Context(), search)

		if err != nil {
			http.Error(w, "failed to get songs via search", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")

		json.NewEncoder(w).Encode(songs)
	} else {
		// get all songs
		songs, err := h.service.GetSongs(r.Context())

		// songs, err := h.service.GetSongs(r.Context())
		if err != nil {
			http.Error(w, "failed to get songs", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")

		json.NewEncoder(w).Encode(songs)
	}
}

func (h *Handler) CreateSong(
	w http.ResponseWriter,
	r *http.Request,
) {

	var req CreateSongRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	song, err := h.service.CreateSong(r.Context(), req)

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(song)
}

func (h *Handler) GetSong(
	w http.ResponseWriter,
	r *http.Request,
) {
	song_id, err := strconv.Atoi(chi.URLParam(r, "id"))

	if err != nil {
		http.Error(w, "invalid song id", http.StatusBadRequest)
		return
	}

	song, err := h.service.GetSong(r.Context(), song_id)

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(song)
}

func (h *Handler) DeleteSong(
	w http.ResponseWriter,
	r *http.Request,
) {
	song_id, err := strconv.Atoi(chi.URLParam(r, "id"))

	if err != nil {
		http.Error(w, "invalid song id", http.StatusBadRequest)
		return
	}

	song, err := h.service.DeleteSong(r.Context(), song_id)

	if err != nil {
		http.Error(w, "did not successfully delete song", http.StatusNotFound)
		return
	}

	w.Header().Set("Contect-Type", "application/json")
	json.NewEncoder(w).Encode(song)
}

func (h *Handler) UpdateSong(
	w http.ResponseWriter,
	r *http.Request,
) {
	songID, err := strconv.Atoi(chi.URLParam(r, "id"))

	if err != nil {
		http.Error(w, "invalid song id", http.StatusBadRequest)
		return
	}

	var reqData UpdateSongRequest

	err = json.NewDecoder(r.Body).Decode(&reqData)

	if err != nil {
		http.Error(w, "invalid song data", http.StatusBadRequest)
	}

	song, err := h.service.UpdateSong(r.Context(), songID, reqData)

	w.Header().Set("Contect-Type", "application/json")

	json.NewEncoder(w).Encode(song)
}
