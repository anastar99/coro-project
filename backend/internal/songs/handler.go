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
	last_id := r.URL.Query().Get("last_id")

	var lastID *int

	if last_id != "" {
		id, err := strconv.Atoi(last_id)
		if err != nil {
			http.Error(w, "invalid last_id", http.StatusBadRequest)
			return
		}
		lastID = &id
	}

	// TODO: we should probably clean the search query? remove extra spaces
	// though i guess spaces are still part of the search query.
	// Leaving comment here to ponder

	songs, err := h.service.GetSongs(r.Context(), lastID, search)

	if err != nil {
		http.Error(w, "failed to get songs", http.StatusInternalServerError)
		return
	}

	var nextLastID *int

	if len(songs) > 0 {
		id := songs[len(songs)-1].SongID
		nextLastID = &id
	}

	resp := struct {
		Songs      []Song `json:"songs"`
		NextLastID *int   `jsong:"next_last_id"`
	}{
		Songs:      songs,
		NextLastID: nextLastID,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)

	log.Println("last id", lastID)
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
