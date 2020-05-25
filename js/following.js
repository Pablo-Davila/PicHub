"use strict";

$(main);

function main() {
    
    // Expulsar usuarios no autenticados
    kickNonAuthenticated();

    // Cargar imágenes
    console.log("Cargando imágenes...");

    $.ajax({
	method: "GET",
        url: "http://localhost:3000/images?private=false&_sort=date&_order=desc",
        success: function(data) {
	    displayFiltered(data);
	},
        error: function (error) {
            console.log("Error al acceder a las imágenes: " + error.toString());
	    $("#errors-container").append(getError("No se pudo cargar las imágenes."));
        }
    });
}

function displayFiltered(data) {
    new Promise((resolve,reject) => {
	$.ajax({
	    method: "GET",
	    url: `http://localhost:3000/follows?followerId=${getUserId()}`,
	    success: resolve,
	    error: reject
	});
    }).then( function(followed) {
	let fUsers = followed.map(f => f.targetId);
	let filtered = data.filter(i => fUsers.includes(i.userId));
	displayPhotos(filtered);
    }).catch( function (error) {
            console.log("Error al acceder a los usuarios seguidos.");
	    $("#errors-container").append(getError("No se pudo acceder a los usuarios seguidos."));
    });
}

function displayPhotos(data) {
    let row = $("div.container > div.row").last();
    let autores = new Set();
    let etiquetas = new Set();
    let count = 0;
    for (let photo of data) {
	count++;
	
	// HTML de la tarjeta
	let card_str = `
    	<div class="col-md text-center max-w-33">
          <div class="card border-dark mb-4">
            <a href="image_detail.php?id=${photo.id}">
	      <div class="embed-responsive embed-responsive-4by3">
		<img class="card-img-top embed-responsive-item"
		     src=${photo.url}>
	      </div>
            </a>

            <div class="card-body bg-dark">
              <h5 class="card-title">${photo.title}</h5>
              <a name="auth-${photo.userId}" href="" class="card-text">x</a>
              <hr>
              <p class="card-text">
		Etiquetas:
              </p>
            </div>
          </div>
	</div>`;

	let card_html = $.parseHTML(card_str);
	row.append(card_html);
	autores.add(photo.userId);
	
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

	// Cambio de fila
	if(count%3 == 0) {
	    let new_row = $("<div></div>", {"class": "row w-99"});
	    $("div.container").append(new_row);
	    row = new_row;
	}
    }

    // Actualizar nombres de autores y etiquetas
    for(let a of autores) updateAuthorName(a);
    for(let t of etiquetas) updateTagName(t);
}

