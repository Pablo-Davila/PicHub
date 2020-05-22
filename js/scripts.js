"use strict";

$(main);

// Main
function main() {

    // Fill navbar
    if(getToken() == null) {
	let right_str = `
        <li class="nav-item">
          <a id="a-login" class="nav-link" href="login.php">Login</a>
        </li>
        <li class="nav-item">
          <a id="a-register" class="nav-link" href="register.php">Registro</a>
        </li>`;
	$("#nav-der").append(right_str);
    }
    else {
	let left_str = `
        <li class="nav-item dropdown">
          <a id="a-trending" class="nav-link dropdown-toggle" href="#"
	     id="navbarDesplegableId" data-toggle="dropdown"
	     aria-haspopup="true" aria-expanded="false">
	    Trending
          </a>
          <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
	    <a class="dropdown-item" href="trending_users.php">Usuarios trending</a>
	    <a class="dropdown-item" href="trending_images.php">Imágenes trending</a>
          </div>
        </li>
        <li class="nav-item">
	<li class="nav-item">
          <a id="a-siguiendo" class="nav-link" href="following.php">Siguiendo</a>
        </li>
        <li class="nav-item">
	<li class="nav-item">
          <a id="a-etiquetas" class="nav-link" href="tags.php">Etiquetas</a>
        </li>`;
	$("#nav-izq").append(left_str);
	
	let right_str = `
        <li class="nav-item mr-2">
          <a id="logout" class="nav-link" href="index.php">Cerrar sesión</a>
        </li>
        <li class="nav-item border border-light rounded-pill px-1">
          <b><a id="my-profile" name="auth-${getUserId()}" class="nav-link"
             href="profile.php=${getUserId()}">Mi perfil</a></b>
        </li>`;
	$("#nav-der").append(right_str);

	updateAuthorName(getUserId());
    }
    
    // Update profile link
    $("#my-profile").attr("href",`profile.php?id=${getUserId()}`);

    // Enable logout
    $("#logout").click(logOut);

    // Mark current page as active
    glowActivePage();
    
    // Store date
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

function kickNonAuthenticated() {
    if(getToken() == null) {
	window.location.href = "error.php";
    }
}

function glowActivePage() {
    let page = window.location.pathname;
    if(page == "/PicHub/index.php") $("#a-nuevo").css("color", "var(--laqua)");
    else if(page == "/PicHub/trending_images.php") $("#a-trending").css("color", "var(--laqua)");
    else if(page == "/PicHub/trending_users.php") $("#a-trending").css("color", "var(--laqua)");
    else if(page == "/PicHub/following.php") $("#a-siguiendo").css("color", "var(--laqua)");
    else if(page == "/PicHub/tags.php") $("#a-etiquetas").css("color", "var(--laqua)");
    else if(page == "/PicHub/login.php") $("#a-login").css("color", "var(--laqua)");
    else if(page == "/PicHub/register.php") $("#a-register").css("color", "var(--laqua)");
    else if(page == "/PicHub/profile.php") $("#my-profile").css("color", "var(--laqua)");
}

// Cargar imágenes
function loadPhotos() {
    console.log("Cargando imágenes...");

    $.ajax({
        url: "http://localhost:3000/images?private=false&_sort=date&_order=desc",
        success: displayPhotos,
        error: function (error) {
            console.log("Error al acceder a las imágenes: " + error.toString());
	    $("#errors-container").append(getError("No se pudo cargar las imágenes."));
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
	    
	    // Expulsar usuario no autorizado
	    if(image.userId!=getUserId() && (edit || image.private)) {
		window.location.href = "error.php";
	    }

	    console.log("Imagen cargada");
	},
	error: function(error) {
	    console.log(`Error al cargar la imagen con id ${id}.`);
	    $("#errors-container").append(getError(`No se pudo cargar la imagen con id ${id}.`));
	}
    });
}

function deleteImage() {
    console.log("Eliminando imagen...");

    new Promise((resolve, reject) => {
	$.ajax({
	    method: "GET",
	    url: `http://localhost:3000/comments?imageId=${id}`,
	    success: function(data) {
		if(data.length == 0) resolve();
		else {
		    console.log("Error: No se puede eliminar una imagen con comentarios.");
		    $("#errors-container").empty();
		    $("#errors-container").append(
			getError("No se puede eliminar una imagen con comentarios.")
		    );
		}
	    },
	    error: reject
	});
    }).then( function() {
	$.ajax({
	    type: "DELETE",
	    url: `http://localhost:3000/images/${id}`,
	    headers: {
		"Authorization": "Bearer " + getToken()
	    },
	    success: function() {
		console.log("Imagen eliminada");
		window.location.href = "index.php";
	    },
	    error: function() {
		console.log("Error al eliminar la imagen.");
		$("#errors-container").empty();
		$("#errors-container").append(getError("No se pudo eliminar la imagen."));
	    }	
	});
    }).catch(function() {
	console.log("Error al eliminar la imagen.");
	$("#errors-container").empty();
	$("#errors-container").append(getError("No se pudo eliminar la imagen."));
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
		errores.append(getError(`No se pudo acceder al autor (${authorId}).`));
	    }
	    $(`[name="auth-${authorId}"]`).each(function(i, elemento) {
		$(elemento).text("Desconocido");
	    });
	}
    });
}

function updateTagName(tagId) {
    $.ajax({
	url: `http://localhost:3000/tags/${tagId}`,
	success: function(tag) {
	    $(`[name="tag-${tagId}"]`).each(function(i, elemento) {
		$(elemento).text(tag.name);
		//TO-DO$(elemento).attr("href",`profile.php?id=${authorId}`);
	    });
	},
	error: function(error) {
	    console.log(`Error al acceder a la etiqueta (${tagId})`);
	    let errores = $("#errors-container");
	    if(errores != undefined) {
		errores.empty();
		errores.append(getError(`No se pudo acceder a la etiqueta (${tagId}).`));
	    }
	    $(`[name="tag-${tagId}"]`).each(function(i, elemento) {
		$(elemento).text("???");
	    });
	}
    });
}


