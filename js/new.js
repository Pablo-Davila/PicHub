"use strict";

$(main);

function displayPhotos(data) {
    let row = $("div.container > div.row").last();

    let count = 0;
    for (let photo of data) {
	count++;

	// HTML de la tarjeta
	let card_str = /*PROBLEMA*/`
    	<div class="col-md text-center max-w-33">
          <div class="card border-dark mb-4">
            <a href="image_detail.php?id=${photo.id}.php">
	      <div class="embed-responsive embed-responsive-4by3">
		<img class="card-img-top embed-responsive-item"
		     src=${photo.url}>
	      </div>
            </a>

            <div class="card-body bg-dark">
              <h5 class="card-title">${photo.title}</h5>
              <a href="profile.php?id=${photo.userId}.php" class="card-text">#${photo.userId}#</a>
              <hr>
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

	if(count%3 == 0) {
	    let new_row = $("<div></div>", {"class": "row w-99"});
	    $("div.container").append(new_row);
	    row = new_row;
	}
    }
}

function main() {
    
    console.log("Cargando las fotos de \"Nuevo\"...");

    $.ajax({
        url: "http://localhost:3000/photos?_sort=id&_order=desc",
        success: displayPhotos,
        error: function (error) {
            console.log("Error al acceder a las fotos: " + error.toString());
        }
    });
    
}


