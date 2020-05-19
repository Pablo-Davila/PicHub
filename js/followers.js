"use strict";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

$(main);

function main() {

    // Cargar listas
    console.log("Cargando listas de usuarios seguidores y seguidos...");
    $.ajax({
	method: "GET",
	url: "http://localhost:3000/follows",
	success: function(data) {
	    let authors = [];
	    for(let f of data) {
		if(f.followerId == id) {
		    $("#followers-list").append(getListElement(f.targetId));
		    authors.push(f.targetId);
		}
		else if(f.targetId == id) {
		    $("#followed-list").append(getListElement(f.followerId));
		    authors.push(f.followerId);
		}
	    }
	    for(let userId of authors){
		updateAuthorName(userId);
	    }
	    console.log("Usuarios seguidores y seguidos cargados con éxito");
	},
	error: function() {
	    console.log("Error al cargar los seguidores e usuarios seguidos.");
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("Error al cargar los seguidores e usuarios seguidos."));
	}
    });
}

function getListElement(userId) {
    let elem_html = `
	    <li class="list-group-item bg-dark rounded flex-space mb-3">
	      <a name=auth-${userId} href="profile.php?id=${userId}" class="lh-1-8"></a>
	      <div class="btn btn-info text-white d-inline-block lh-1">
		Seguir
	      </div>
	    </li>`;
    let elem = $.parseHTML(elem_html);
    //elem.click(function() { alert("meh"); });
    return elem;
}


