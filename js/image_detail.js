"use strict";

// Información a partir de la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

$(main);

function main() {

    // Habilitar botones
    $("#edit").attr("href", `image_edit.php?id=${id}`);
    $("#back").attr("href", `image_detail.php?id=${id}`);
    $("#delete").click(deleteImage);

    // Cargar imagen
    loadSinglePhoto(id, false);
    
    // Cargar comentarios
    //loadComments(id); // TO-DO
}


