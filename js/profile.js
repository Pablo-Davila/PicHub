"use strict";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));

$(main);

function main() {

    // Expulsar usuarios no autenticados
    kickNonAuthenticated();

    // Mostrar botón de seguir
    if(id != getUserId()) {
	let btn_html = `
	      <div id="follow" name="fol-${id}"
		 class="btn btn-info text-white ml-3 d-inline">
		Seguir
	      </div>`;
	$("#data-title-div").append($.parseHTML(btn_html));
    }

    // Actualizar seguir/dejar de seguir
    $("#followers").attr("name", `followersN-${id}`);
    $("#followed").attr("name", `followedN-${id}`);
    updateFollowData(id);

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
	`http://localhost:3000/images?userId=${id}&_sort=date&_order=desc`,
	success: displayPersonalPhotos,
	error: function(error) {
            console.log("Error al acceder a las imágenes del usuario.");
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("Error al acceder a las imágenes del usuario."));
	}
    });

    // Actualizar links de seguidores y seguidos
    $("#link-ff1").attr("href", `followers.php?id=${id}`);
    $("#link-ff2").attr("href", `followers.php?id=${id}`);
}

function displayPersonalPhotos(data) {
    let row = $("div.container > div.row").last();
    
    let etiquetas = new Set();
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
	    
	// Etiquetas
	let tagList = $("p.card-text").last();
	if(photo.tags != undefined) {
	    for(let tag of photo.tags) {
		let tag_src = `<span name="tag-${tag}" class="badge badge-primary"></span>`;
		tagList.append($.parseHTML(tag_src));
		etiquetas.add(tag);
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
    
    // Actualizar nombres de autores y etiquetas
    for(let t of etiquetas) updateTagName(t);
    
    console.log(`Mostradas ${count} imágenes`);
}


