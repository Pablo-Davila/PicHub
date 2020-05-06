"use strict";

// Información a partir de la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

$(main);

function main() {

    // Habilitar elección de imagen
    $("#imagen").click(function(){
	let url = prompt("Inserte la URL de la imagen");
    });
    
    loadSinglePhoto(id, true);
}

function validateForm() {
    let errores = false;
    
    // TO-DO

    return !errores;
}


