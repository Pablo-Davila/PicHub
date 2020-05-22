"use strict";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

$(main);

function main() {

    // Expulsar usuarios no autenticados
    kickNonAuthenticated();

    // Mostrar botón de seguir
    if(id != getUserId()) {
	let btn_html = `
	      <div id="follow"
		 class="btn btn-info text-white ml-3 mb-2 d-inline-block">
		Seguir
	      </div>`;
	$("#data-title-div").append($.parseHTML(btn_html));
	$("#follow").click(toggleFollow);
    }

    // Actualizar seguir/dejar de seguir
    updateFollow();

    // Rellenar datos de usuario
    console.log("Cargando datos de usuario...");
    $.ajax({
	method: "GET",
	url: `http://localhost:3000/users/${id}`,
	success: function(data) {
	    $("#data-title").text("Perfil de " + data.user);
	    $("#img-title").text("Imágenes de " + data.user);
	    $("#name").text(data.name);
	    $("#surnames").text(data.surname);
	    $("#email").text(data.email);
	    console.log("Datos de usuario cargados con éxito");
	},
	error: function(error) {
            console.log("Error al acceder a los datos del usuario.");
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("Error al acceder a los datos del usuario."));
	}
    });

    // Cargar imágenes
    console.log(`Cargando imágenes del usuario ${id}...`);
    $.ajax({
	method: "GET", url:
	`http://localhost:3000/images?userId=${id}`,
	success: displayPhotos,
	error: function(error) {
            console.log("Error al acceder a las imágenes del usuario.");
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("Error al acceder a las imágenes del usuario."));
	}
    });

    // Actualizar links de seguidores y seguidos
    $("#followers").attr("href", `followers.php?id=${id}`);
    $("#followed").attr("href", `followers.php?id=${id}`);

    // Actualizar número de seguidores y seguidos
    //TO-DO
    $.ajax({
	method: "GET",
	url: "http://localhost:3000/follows",
	success: function(data) {
	    let followed = 0;
	    let followers = 0;
	    for(let f of data){
		if(f.followerId == id) followed++;
		else if(f.targetId == id) followers++;
	    }
	    $("#followers").text(`Seguido por ${followers} usuarios`);
	    $("#followed").text(`Siguiendo a ${followed} usuarios`);
	},
	error: function(error) {
            console.log("Error al acceder al número de seguidores-seguidos.");
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("No se pudo acceder al número de seguidores-seguidos."));
	}
    });
}

function updateFollow() {
    $.ajax({
	method: "GET",
	url: `http://localhost:3000/follows?followerId=${getUserId()}`,
	success: function(data) {
	    let followed = false;
	    let f_id;
	    for(let f of data) {
		if(f.targetId == id) {
		    followed = true;
		    f_id = f.id;
		}
	    }
	    if(followed) $("#follow").text("Dejar de seguir");
	    else $("#follow").text("Seguir");
	},
	error: function(error) {
            console.log("Error al comprobar si se sigue al usuario.");
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("Error al comprobar si se sigue al usuario."));
	}
    });
}

function postFollow() {
    let data = {
	"followerId": getUserId(),
	"targetId": id
    };
    
    $.ajax({
	method: "POST",
	url: "http://localhost:3000/follows",
	data: JSON.stringify(data),
	dataType: "json",
	contentType: "application/json; charset=UTF-8",
	processData: false,
	success: function() {
	    $("#follow").text("Dejar de seguir");
	    console.log(`Se ha empezado a seguir al usuario con id ${id}.`);
	},
	error: function(error) {
            console.log(`Error al seguir al usuario con id ${id}.`);
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("Error al seguir al usuario."));
	}
    });
}

function deleteFollow(f_id) {
    $.ajax({
	type: "DELETE",
	url: `http://localhost:3000/follows/${f_id}`,
	headers: {
	    "Authorization": "Bearer " + getToken()
	},
	success: function() {
	    $("#follow").text("Seguir");
	    console.log(`Se ha dejado de seguir al usuario ${id}.`);
	},
	error: function(error) {
            console.log(`Error al dejar de seguir al usuario ${id}.`);
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("Error al dejar de seguir al usuario."));
	}
    });
}

function toggleFollow() {
    if(id == getUserId()) return;
    $.ajax({
	method: "GET",
	url: `http://localhost:3000/follows?followerId=${getUserId()}`,
	success: function(data) {
	    let followed = false;
	    let f_id;
	    for(let f of data) {
		if(f.targetId == id) {
		    followed = true;
		    f_id = f.id;
		}
	    }
	    if(followed) deleteFollow(f_id);
	    else postFollow();
	},
	error: function(error) {
            console.log("Error al comprobar si se sigue al usuario.");
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("Error al comprobar si se sigue al usuario."));
	}
    });
}

function displayPhotos(data) {
    let row = $("div.container > div.row").last();
    
    let count = 0;
    for (let photo of data) {
	if(photo.private && id!=getUserId()) continue;
	count++;

	// HTML de la tarjeta
	let card_str = `
    	<div class="col-md text-center max-w-50">
          <div class="card border-dark mb-4">
            <a href="image_detail.php?id=${photo.id}">
	      <div class="embed-responsive embed-responsive-4by3">
		<img class="card-img-top embed-responsive-item"
		     src=${photo.url}>
	      </div>
            </a>

            <div class="card-body bg-dark">
              <h5 class="card-title mb-1">${photo.title}</h5>
              <hr class="mt-0">
              <p class="card-text">
		Etiquetas:
              </p>
            </div>
          </div>
	</div>`;

	let card_html = $.parseHTML(card_str);
	row.append(card_html);
	updateAuthorName(photo.userId);
	    
	// Etiquetas
	let tagList = $("p.card-text").last();
	if(photo.tags != undefined) {
	    for(let tag of photo.tags) {
		let tag_html = $(
		    "<span></span>",
		    {
			"class": "badge badge-primary",
			text: tag,
		    });
		tagList.append(tag_html);
	    }
	    $("span.badge").after(" "); // Separar etiquetas
	}
	else tagList.text("Sin etiquetas");

	if(count%2 == 0) {
	    let new_row = $("<div></div>", {"class": "row w-99"});
	    $("div.container").append(new_row);
	    row = new_row;
	}
    }
    console.log(`Mostradas ${count} imágenes`);
}


