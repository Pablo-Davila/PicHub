"use strict";

$(loadPhotos);

function displayPhotos(data) {
    let row = $("div.container > div.row").last();

    // console.log(data);
    data.sort(function(a, b){
	return score(b) - score(a);
    });
    
    let count = 0;
    for (let photo of data) {
	if(photo.private) continue;
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
              <h5 class="card-title">${photo.title}</h5>
              <a name="auth-${photo.userId}" href="profile.php?id=${photo.userId}" class="card-text"></a>
              <hr>
	      <p class="card-text">Puntuación: ${score(photo)}</p>
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


