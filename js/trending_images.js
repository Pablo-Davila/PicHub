"use strict";

$(main);

function main() {

    // Expulsar usuarios no autenticados
    kickNonAuthenticated();

    // Cargar imágenes
    loadPhotos();
}

function displayPhotos(data) {
    let row = $("div.container > div.row").last();

    // Obtener promesas de cálculo de puntuaciones
    let promises = getImagesScoresPromises(data);
    
    // Una vez estén todas actualizadas
    Promise.all(promises).then( function(scores) {
	let map = new Map(scores);
	data.sort( (a,b) => map.get(b.id) - map.get(a.id));

	let autores = new Set();
	let etiquetas = new Set();
	let count = 0;
	for(let photo of data) {
	    if(count == 10) break;
	    count++;

	    // HTML de la tarjeta
	    let card_str = `
    	<div name="tarjeta-2" class="col-md text-center">
          <div class="card border-dark mb-4">
            <a href="image_detail.php?id=${photo.id}">
	      <div class="embed-responsive embed-responsive-4by3">
		<img class="card-img-top embed-responsive-item"
		     src=${photo.url}>
	      </div>
            </a>

            <div class="card-body bg-dark">
              <h5 class="card-title">${photo.title}</h5>
              <a name="auth-${photo.userId}" href="profile.php?id=${photo.userId}" class="card-text"></a>
              <hr>
	      <p class="card-text">Puntuación: ${map.get(photo.id)}</p>
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
	    
	    // Actualizar nombres de autores y etiquetas
	    for(let a of autores) updateAuthorName(a);
	    for(let t of etiquetas) updateTagName(t);
	}
	
	console.log(`Mostradas ${count} imágenes`);
    }).catch( function(error) {
	console.log(`Error al acceder a los votos del sistema`, error);
	let errores = $("#errors-container");
	errores.empty();
	errores.append(getError(`No se pudo acceder a los votos del sistema.`));
    });
}


