"use strict";

$(main);

function removeTag(tag) {
    $(tag).parent().fadeOut();
}

function formatDate(date) {
    let year = date.substr(0,4);
    let month = date.substr(5,2);
    let day = date.substr(8,2);
    return `${day}/${month}/${year}`;
}

function score(photo) {
    return photo.upvotes - photo.downvotes;
}

function loadPhotos() {
    console.log("Cargando imágenes...");

    $.ajax({
        url: "http://localhost:3000/images?_sort=id&_order=desc",
        success: displayPhotos,
        error: function (error) {
            console.log("Error al acceder a las fotos: " + error.toString());
        }
    });
}

function loadSinglePhoto(id, edit) {
    console.log("Cargando imagen...");

    // Mostrar imagen
    $.ajax({
	url: `http://localhost:3000/images?id=${id}`,
	success: function(images) {
	    let data = images[0];
	    $("#imagen").attr("src", data.url);
	    $("#description").text(data.description);
	    if(edit) $("#title").val(data.title);
	    else $("#title").text(data.title + " - Detalles");
	    $("#score").text("Puntuación: " + score(data));
	    $("#author").attr("name", `auth-${data.userId}`);
	    updateAuthorName(data.userId);
	    $("#date").text(`- ${formatDate(data.date.substr(0,10))}`);
	    if(data.tags != undefined){	
		for(let tag of data.tags) {
		    let tag_str;
		    if(edit) tag_str = `
                    <span class="badge badge-primary">
 		      ${tag}<span onclick="removeTag(this);" class="txt-sdark"> x</span>
	            </span>`;
		    else tag_str = `<span class="badge badge-primary">${tag}</span> `;
		    let tag_html = $.parseHTML(tag_str);
		    $("#tags-selected").append(tag_html);
		}
	    }
	},
	error: function(error) {
	    alert(`Error: La imagen de id ${id} no existe: ${error}`);
	}
    });
}

function updateAuthorName(authorId) {
    $.ajax({
	url: `http://localhost:3000/users/${authorId}`,
	success: function(author) {
	    $(`[name="auth-${authorId}"]`).each(function(i, elemento) {
		$(elemento).text(author.user);
		$(elemento).attr("href",`profile.php?id=${authorId}`);
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


