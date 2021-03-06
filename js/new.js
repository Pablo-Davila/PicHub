"use strict";

$(main);

function main() {

    // Mostrar warning a usuarios no autenticados
    if(getToken() == null) {
	let warning_str =
	    `<div onclick='removeError(this);' class='alert alert-warning mx-auto' role='alert'>
             <strong class="text-warning">
               <i class='fa fa-warning text-warning' aria-hidden='true'></i >
               Warning
             </strong>Regístrese o inicie sesión para acceder a la funcionalidad completa de la página
           </div>`;
	$("#warning").append($.parseHTML(warning_str));
    }

    // Cargar imágenes
    loadPhotos();
}

function displayPhotos(data) {
    let row = $("div.container > div.row").last();

    // Filtrar los resultados de la última semana
    let aWeekAgo = new Date();
    aWeekAgo.setDate(aWeekAgo.getDate() - 7);
    let filteredData = [];
    for(let image of data){
	let idate = new Date(image.date);
	if(idate > aWeekAgo) {
	    filteredData.push(image);
	}
    }

    let autores = new Set();
    let etiquetas = new Set();
    let count = 0;
    for(let photo of filteredData) {
	count++;
	
	// HTML de la tarjeta
	let card_str = `
    	<div name="tarjeta-3" class="col-md text-center">
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

    console.log(`Mostradas ${count} imágenes`);
}


