package main

import (
	"flag"
	"log"
	"net/http"
)

var addr = flag.String("addr", ":9000", "http server")

func main() {
	http.Handle("/", http.FileServer(http.Dir("www")))
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Println(err.Error())
	}
}
