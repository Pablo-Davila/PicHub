"use strict";

$(loadPhotos);

function displayPhotos(data) {
    let row = $("div.container > div.row").last();

    // Filtrar los resultados de la última semana
    let aWeekAgo = new Date();
    aWeekAgo.setDate(aWeekAgo.getDate() - 7);
    let filteredData = [];
    for(let image of data){
	let idate = new Date(image.date);
	if(idate>aWeekAgo && !image.private) {
	    filteredData.push(image);
	}
    }

    let autores = new Set();
    let count = 0;
    for (let photo of filteredData) {
//	if(photo.private) continue;
	
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

	if(count%3 == 0) {
	    let new_row = $("<div></div>", {"class": "row w-99"});
	    $("div.container").append(new_row);
	    row = new_row;
	}
    }

    // Actualizar nombres de autores
    for(let id of autores) {
	updateAuthorName(id);
    }
}


