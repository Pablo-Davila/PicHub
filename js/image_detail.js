"use strict";

$(main);

function main() {
    
    // Información a partir de la URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    
    loadSinglePhoto(id, false);
    //loadComments(id); // TO-DO
}


