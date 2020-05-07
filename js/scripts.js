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
    console.log("Cargando fotos...");

    $.ajax({
        url: "http://localhost:3000/images?_sort=imageId&_order=desc",
        success: displayPhotos,
        error: function (error) {
            console.log("Error al acceder a las fotos: " + error.toString());
        }
    });
}

function loadSinglePhoto(id, edit) {

    // Mostrar imagen
    $.ajax({
	url: `http://localhost:3000/images?imageId=${id}`,
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
	    for(let tag of data.tags) {
		let tag_str;
		if(edit) tag_str = `
                    <span class="badge badge-primary">
 		      ${tag}<span onclick="removeTag(this);" class="txt-sdark"> x</span>
	            </span>`;
		else tag_str = `<span class="badge badge-primary">${tag}</span> `;
		let tag_html = $.parseHTML(tag_str);
		$("#tags").append(tag_html);
	    }
	    $("#back").attr("href", `image_detail.php?imageId=${id}`);
	},
	error: function(error) {
	    alert(`Error: La imagen de id ${id} no existe: ${error}`);
	}
    });

    // En image_detail.php
    if(!edit) {
	// Actualizar link de edición
	$("#edit").attr("href", `image_edit.php?imageId=${id}`);
    }
    
}

function updateAuthorName(authorId) {
    $.ajax({
	url: `http://localhost:3000/users?userId=${authorId}`,
	success: function(authors) {
	    //console.log($('[name="auth-1"]'));
	    //console.log("----");
	    $(`[name="auth-${authorId}"]`).each(function(i, elemento) {
		//console.log("meh");
		$(elemento).text(authors[0].user);
		$(elemento).attr("href",`profile.php?userId=${authorId}`);
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


