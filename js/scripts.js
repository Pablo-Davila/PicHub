"use strict";

$(main);

// Errores
function getError(message) {
    return `<div onclick='removeError(this);' class='alert alert-danger' role='alert'>
             <strong class="text-danger"><i class='fa fa-times text-danger' aria-hidden= 'true'>
               </i > Error!
             </strong>${message}
           </div>`;
}

function removeError(error) {
    $(error).fadeOut();
}

function removeTag(tag) {
    $(tag).parent().fadeOut();
}

// Otras utilidades
function formatDate(date) {
    let year = date.substr(0,4);
    let month = date.substr(5,2);
    let day = date.substr(8,2);
    return `${day}/${month}/${year}`;
}

function score(photo) {
    return photo.upvotes - photo.downvotes;
}

// Cargar imágenes
function loadPhotos() {
    console.log("Cargando imágenes...");

    $.ajax({
        url: "http://localhost:3000/images?_sort=id&_order=desc",
        success: displayPhotos,
        error: function (error) {
            console.log("Error al acceder a las imágenes: " + error.toString());
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("Error al cargar las imágenes."));
        }
    });
}

function loadSinglePhoto(id, edit) {
    console.log("Cargando imagen...");

    // Mostrar imagen
    $.ajax({
	method: "GET",
	url: `http://localhost:3000/images/${id}`,
	success: function(image) {
	    let data = image;
	    $("#imagen").attr("src", data.url);
	    $("#description").text(data.description);
	    if(edit) {
		$("#title").val(data.title);
		$("#url").val(data.url);
		$("#private").prop("checked", data.private);
	    }
	    else {
		$("#title").text(data.title + " - Detalles");
		if(data.private) {
		    $("#private").text("Imagen privada");
		}
		else {
		    $("#private").text("Imagen pública");
		}
	    }
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

	    // Añadir botones editar y eliminar
	    if(!edit && image.userId==getUserId()) {
		let actions_html = `
	    <h4>Acciones</h4>
	    <div>
	      <div id="delete" class="btn btn-danger">
		Borrar foto
	      </div>
	      <a id="edit" href="image_edit.php?id=${id}" class="btn btn-info">Editar foto</a>
	    </div>`;

		$("#actions").append($.parseHTML(actions_html));
		$("#delete").click(deleteImage);
	    }
	},
	error: function(error) {
	    console.log(`Error al cargar la imagen con id ${id}.`);
	    $("#errors-container").empty();
	    $("#errors-container").append(getError(`Error al cargar la imagen con id ${id}).`));
	}
    });
}

function deleteImage() {
    console.log("Borrando imagen...");
    $.ajax({
	type: "DELETE",
	url: `http://localhost:3000/images/${id}`,
	headers: {
	    "Authorization": "Bearer " + getToken()
	},
	success: function() {
	    window.location.href = "index.php";
	},
	error: function() {
	    console.log("Error al eliminar la imagen.");
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("Error al eliminar la imagen."));
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
	    console.log(`Error al acceder al autor (${authorId}): ${error}`);
	    let errores = $("#errors-container");
	    if(errores != undefined) {
		errores.empty();
		errores.append(getError(`Error al acceder al autor (${authorId}).`));
	    }
	    $(`[name="auth-${authorId}"]`).each(function(i, elemento) {
		$(elemento).text("Desconocido");
	    });
	}
    });
}

// Main
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


