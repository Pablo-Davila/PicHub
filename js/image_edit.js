"use strict";

// Información a partir de la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

$(main);

function main() {
        
    loadSinglePhoto(id, true);
}

function validateForm() {
    let errores = false;
    
    // TO-DO

    return !errores;
}


