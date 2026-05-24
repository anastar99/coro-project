package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/anastar99/coro-project/backend/internal/setlists"
	"github.com/anastar99/coro-project/backend/internal/songs"
	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func initDB() *sql.DB {

	connStr := os.Getenv("DATABASE_URL")
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}

	// Verify the connection is alive
	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Successfully connected to database!")

	return db
}

func main() {

	err := godotenv.Load("../.env")
	port := ":" + os.Getenv("PORT")

	if err != nil {
		log.Fatal(err)
	}

	// Conenect to database
	db := initDB()

	defer db.Close()

	// Chi Router
	r := chi.NewRouter()

	songRepo := songs.NewRepository(db)
	songService := songs.NewService(songRepo)
	songsHandler := songs.NewHandler(songService)

	setlistRepo := setlists.NewRepository(db)
	setlistService := setlists.NewService(setlistRepo)
	setlistHandler := setlists.NewHanlder(setlistService)

	// Songs endpoints
	r.Get("/songs", songsHandler.GetSongs)

	r.Post("/songs", songsHandler.CreateSong)

	r.Get("/songs/{id}", songsHandler.GetSong)
	r.Delete("/songs/{id}", songsHandler.DeleteSong)
	r.Patch("/songs/{id}", songsHandler.UpdateSong)

	// Setlists endpoints
	r.Get("/setlists", setlistHandler.GetAllSetlists)
	r.Get("/setlists/{id}", setlistHandler.GetSetlist)


	// Listener
	log.Printf("Server listening on http://localhost%s\n", port)
	log.Fatal(http.ListenAndServe(port, r))
}
