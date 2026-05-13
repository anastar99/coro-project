package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/anastar99/coro-project/backend/internal/songs"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func initDB() *sql.DB {

	connStr := os.Getenv("DB_URL")
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}

	// Verify the connection is alive
	err = db.Ping()
	if err != nil {
		panic(err)
	}

	return db
}

func main() {

	err := godotenv.Load("../.env")

	if err != nil {
		log.Fatal(err)
	}

	db := initDB()

	defer db.Close()

	songRepo := songs.NewRepository(db)
	songService := songs.NewService(songRepo)
	songsHandler := songs.NewHandler(songService)

	http.HandleFunc("/songs", songsHandler.GetSongs)

	fmt.Println("printing from main.go")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
