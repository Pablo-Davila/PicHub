"use strict";

// Información a partir de la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

$(main);

function main() {

    // Cargar imagen
    loadSinglePhoto(id, false);
    
    // Cargar comentarios
    //loadComments(id); // TO-DO
}


