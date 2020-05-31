"use strict";

$(main);

function main() {
    $.ajax({
	method: "GET",
	url: `http://localhost:3000/votes?userId=${getUserId()}`,
	success: function(votes) {
	    votes = votes.map(v => v.imageId);
	    /**/console.log(votes);
	    loadAllImages(votes);
	},
	error: function (error) {
	    console.log("Error al cargar los votos del usuario.", error);
	    $("#errors-container").append(getError("No se pudo cargar los votos del usuario."));
	}
    });
}

function loadAllImages(exceptions) {
    $.ajax({
	method: "GET",
	url: "http://localhost:3000/images?private=false&_sort=date",
	success: function(images) {
	    let c = 0;
	    for(let img of images) {
		if(!exceptions.includes(img.id)) {
		    let card_str = `
                  <li id="${img.id}" class="pane${c+1} bg-dark">
                    <div id="img-${img.id}" class="img"></div>
                    <div>${img.title}</div>
                    <div class="like"></div>
                    <div class="dislike"></div>
                  </li>`;
		    $("#img-list").append($.parseHTML(card_str));
		    $(`#img-${img.id}`).css({
			"background": `url("${img.url}") no-repeat scroll center center`,
			"background-size": "cover"
		    });
		    c++;
		}
	    }
	    $("ul > li").last().css("box-shadow", "0 0 20px rgba(0, 0, 0, .2)");
    
	    // Enable slide
	    enableSlide();
	},
	error: function(error) {
	    console.log("Error al cargar las imágenes", error);
	    $("#errors-container").append(getError("No se pudo cargar las imágenes"));
	}
    });
}

function enableSlide() {
    $("#tinderslide").jTinder({
	
	// Like/dislike callbacks
	onLike: function (item) {
	    let itemId = parseInt(item.attr("id"));
	    newVote(true, itemId);
	    console.log("Like al " + itemId);
	    item.remove();
	    $("ul > li").last().css("box-shadow", "0 0 20px rgba(0, 0, 0, .2)");
	},
	onDislike: function (item) {
	    let itemId = parseInt(item.attr("id"));
	    newVote(false, itemId);
	    console.log("Dislike al " + itemId);
	    item.remove();
	    $("ul > li").last().css("box-shadow", "0 0 20px rgba(0, 0, 0, .2)");
	},
	
	// Other configuration
	animationRevertSpeed: 100,
	animationSpeed: 200,
	threshold: 1,
	likeSelector: '.like',
	dislikeSelector: '.dislike'
    });
}


