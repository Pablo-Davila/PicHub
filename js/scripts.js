"use strict";

$(main);

function score(photo) {
    return photo.upvotes - photo.downvotes;
}

function loadPhotos() {
    console.log("Cargando fotos...");

    $.ajax({
        url: "http://localhost:3000/photos?_sort=id&_order=desc",
        success: displayPhotos,
        error: function (error) {
            console.log("Error al acceder a las fotos: " + error.toString());
        }
    });
}

function updateAuthorName(authorId) {
    $.ajax({
	url: `http://localhost:3000/users?id=${authorId}`,
	success: function(authors) {
	    //console.log($('[name="auth-1"]'));
	    //console.log("----");
	    $(`[name="auth-${authorId}"]`).each(function(i, elemento) {
		//console.log("meh");
		$(elemento).text(authors[0].user);
	    });
	},
	error: function(error) {
	    console.log(`Error al acceder al autor de una imagen: ${error}`);
	}
    });
}

function main() {

    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;  // Months are 0-based for some reason...
    let year = date.getFullYear();

    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Add a leading 0 if they're only one digit
    hour = hour.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    // Print the current date and a message to report that we're finished

    console.log("Loading finished.");
    console.log(`The current time is: ${day}/${month}/${year} ${hour}:${minutes}:${seconds}`);
}

