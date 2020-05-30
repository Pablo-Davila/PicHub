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
	$("#flechas").remove();
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
        <li class="nav-item">
          <b><a id="my-profile" name="auth-${getUserId()}"
                class="nav-link border border-light rounded-pill px-2 w-min"
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
             <strong class="text-danger">
               <i class='fa fa-times text-danger' aria-hidden= 'true'></i> Error!
             </strong>${message}
           </div>`;
}

function removeError(error) {
    $(error).fadeOut();
}

// Otras utilidades
function formatDate(date) {
    let year = date.substr(0,4);
    let month = date.substr(5,2);
    let day = date.substr(8,2);
    return `${day}/${month}/${year}`;
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
	    $("#author").attr("name", `auth-${data.userId}`);
	    updateAuthorName(data.userId);
	    $("#date").text(`- ${formatDate(data.date.substr(0,10))}`);
	    if(edit) {
		$("#title").val(data.title);
		$("#url").val(data.url);
		$("#private").prop("checked", data.private);
		if(data.tags != undefined) tags = data.tags;
		updateTagOptions();
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

	    // Etiquetas
	    if(data.tags != undefined){	
		for(let tag of data.tags) {
		    let tag_str;
		    if(edit) tag_str = `
                      <span class="badge badge-primary">
                        <span name="tag-${tag}"></span>
                        <span name="${tag}" onclick="removeTag(this);" class="txt-sdark"> x</span>
	              </span>`;
		    else tag_str = `<span name="tag-${tag}" class="badge badge-primary"></span> `;
		    $("#tags-selected").append($.parseHTML(tag_str));
		    updateTagName(tag);
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
	    error: function(error) {
		console.log("Error al eliminar la imagen.");
		$("#errors-container").empty();
		$("#errors-container").append(getError("No se pudo eliminar la imagen.", error));
	    }
	});
    }).catch(function(error) {
	console.log("Error al eliminar la imagen.");
	$("#errors-container").empty();
	$("#errors-container").append(getError("No se pudo eliminar la imagen.", error));
    });
}

// Seguimiento entre usuarios
function postFollow(userId) {
    let data = {
	"followerId": getUserId(),
	"targetId": userId
    };
    
    $.ajax({
	method: "POST",
	url: "http://localhost:3000/follows",
	data: JSON.stringify(data),
	dataType: "json",
	contentType: "application/json; charset=UTF-8",
	processData: false,
	success: function() {
	    console.log(`Se ha empezado a seguir al usuario con id ${userId}.`);
	    let page = window.location.pathname;
	    if(page == "/PicHub/trending_users.php") {
		$.ajax({
		    method: "GET",
		    url: `http://localhost:3000/users`,
		    success: loadTrendingUsers,
		    error: function(error) {
			console.log("Error al acceder a los usuarios del sistema.");
			$("#errors-container").append(
			    getError("No se ha podido acceder a los usuarios del sistema.")
			);
		    }
		});
	    }
	    else {
		updateFollowData(userId);
	    }
	},
	error: function(error) {
            console.log(`Error al seguir al usuario con id ${userId}.`);
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("Error al seguir al usuario.", error));
	}
    });
}

function deleteFollow(userId, f_id) {
    $.ajax({
	type: "DELETE",
	url: `http://localhost:3000/follows/${f_id}`,
	headers: {
	    "Authorization": "Bearer " + getToken()
	},
	success: function() {
	    console.log(`Se ha dejado de seguir al usuario ${userId}.`);
	    let page = window.location.pathname;
	    if(page == "/PicHub/trending_users.php") {
		$.ajax({
		    method: "GET",
		    url: `http://localhost:3000/users`,
		    success: loadTrendingUsers,
		    error: function(error) {
			console.log("Error al acceder a los usuarios del sistema.");
			$("#errors-container").append(
			    getError("No se ha podido acceder a los usuarios del sistema.")
			);
		    }
		});
	    }
	    else {
		updateFollowData(userId);
	    }
	},
	error: function(error) {
            console.log(`Error al dejar de seguir al usuario.`, error);
	    $("#errors-container").empty();
	    $("#errors-container").append(getError(`Error al dejar de seguir al usuario ${userId}.`));
	}
    });
}

function toggleFollow(userId) {
    if(userId == getUserId()) return;
    $.ajax({
	method: "GET",
	url: `http://localhost:3000/follows?followerId=${getUserId()}&targetId=${userId}`,
	success: function(data) {
	    if(data.length == 0) postFollow(userId);
	    else deleteFollow(userId, data[0].id);
	},
	error: function(error) {
            console.log("Error al comprobar si se sigue al usuario.", error);
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("Error al comprobar si se sigue al usuario."));
	}
    });
}

// Actualización de datos
function updateAuthorName(authorId) {
    $.ajax({
	method: "GET",
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
	method: "GET",
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

function updateScore(imageId) {
    $.ajax({
	method: "GET",
	url: `http://localhost:3000/votes?imageId=${imageId}`,
	success: function(data) {
	    let numerador = 0;
	    let denominador = 0;
	    for(let v of data) {
		denominador++;
		if(v.like) numerador++;
		else numerador--;
	    }
	    $(`[name="score-${imageId}"]`).each(function(i, elemento) {
		let puntuacion = (denominador==0)? 0 : (numerador/denominador).toFixed(2);
	    	$(elemento).text(puntuacion);
	    });
	},
	error: function(error) {
	    console.log(`Error al acceder a los votos del sistema`);
	    let errores = $("#errors-container");
	    if(errores != undefined) {
		errores.empty();
		errores.append(getError(`No se pudo acceder a los votos del sistema.`));
	    }
	    $(`[name="score-${imageId}"]`).each(function(i, elemento) {
		$(elemento).text("???");
	    });
	}
    });
}

function updateFollowData(userId) {
    $.ajax({
	method: "GET",
	url: `http://localhost:3000/follows?followerId=${getUserId()}&targetId=${userId}`,
	success: function(data) {
	    let fNumber = $(`[name="folN-${userId})"`);
	    if(data.length == 0) {
		$(`[name="fol-${userId}"]`).each(function(i, elemento) {
	    	    $(elemento).text("Seguir");
		});
	    }
	    else {
		$(`[name="fol-${userId}"]`).each(function(i, elemento) {
	    	    $(elemento).text("Dejar de seguir");
		});
	    }
	    $(`[name="fol-${userId}"]`).one("click", function() { toggleFollow(userId); });
	},
	error: function(error) {
	    console.log(`Error al acceder a los votos del sistema`, error);
	    let errores = $("#errors-container");
	    if(errores != undefined) {
		errores.empty();
		errores.append(getError(`No se pudo acceder a los votos del sistema.`));
	    }
	    $(`[name="score-${imageId}"]`).each(function(i, elemento) {
		$(elemento).text("???");
	    });
	}
    });
    updateFollowNumber(userId);
}

function updateFollowNumber(userId) {
    $.ajax({
	method: "GET",
	url: `http://localhost:3000/follows`,
	success: function(data) {
	    let followers = 0;
	    let followed = 0;
	    for(let f of data) {
		if(f.targetId == userId) followers++;
		else if(f.followerId == userId) followed++;
	    }
	    $(`[name="followersN-${userId}"]`).each(function(i, elemento) {
	    	$(elemento).text(followers);
	    });
	    $(`[name="followedN-${userId}"]`).each(function(i, elemento) {
	    	$(elemento).text(followed);
	    });
	},
	error: function(error) {
	    console.log(`Error al calcular el número de seguidores del usuario ${userId}`, error);
	    let errores = $("#errors-container");
	    if(errores != undefined) {
		errores.empty();
		errores.append(getError(`No se pudo calcular el número de seguidores del usuario ${userId}.`));
	    }
	    $(`[name="score-${imageId}"]`).each(function(i, elemento) {
		$(elemento).text("???");
	    });
	}
    });    
}


