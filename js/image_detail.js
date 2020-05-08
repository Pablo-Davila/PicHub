"use strict";

// Información a partir de la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

$(main);

function main() {    

    // Cargar imagen
    loadSinglePhoto(id, false);
    
    // Actualizar link de edición
    $("#edit").attr("href", `image_edit.php?id=${id}`);

    // Habilitar botón de volver atrás
    $("#back").attr("href", `image_detail.php?id=${id}`);
    
    // Cargar comentarios
    //loadComments(id); // TO-DO
}


