"use strict";

const TOP_SIZE = 10;

$(main);

function main() {

    // Expulsar usuarios no autenticados
    kickNonAuthenticated();

    // Cargar imágenes
    $.ajax({
	method: "GET",
	url: `http://localhost:3000/users`,
	success: loadTrendingUsers,
	error: function(error) {
	    console.log("Error al acceder a los usuarios del sistema.");
	    $("#errors-container").append(getError("No se ha podido acceder a los usuarios del sistema."));
	}
    });
}

function loadTrendingUsers(data) {
    let row = $("div.container > div.row").last();

    // Acumular promesas de cálculo de puntuaciones de imágenes
    let promises = [];
    for(let u of data) {
	promises.push(
	    new Promise( (resolve,reject) => {
		$.ajax({
		    method: "GET",
		    url: `http://localhost:3000/follows?targetId=${u.id}`,
		    success: function(follows) {
			resolve(new Array(u.id, follows.length));
		    },
		    error: reject
		});
	    })
	);
    }

    // Una vez estén todas las puntuaciones de imágenes calculadas
    Promise.all(promises).then( function(scores) {
	let map = new Map(scores);
	data.sort( (a,b) => map.get(b.id) - map.get(a.id) );
	data = data.slice(0,TOP_SIZE);

	let c = 1;
	for(let u of data){
	    let elem_str = `
	  <li class="list-group-item bg-dark rounded flex-space mb-3">
	    <a href="profile.php?id=${u.id}" class="w-25 text-left">#${c} ${u.user}</a>
	    <span><span name="followersN-${u.id}">${map.get(u.id)}</span> seguidores</span>
            <div id="f-btn-${u.id}" class="w-25"></div>
	  </li>`;
	    $("#top-users").append($.parseHTML(elem_str));
	    if(u.id != getUserId()) {
		let btn_str = `
	            <div name="fol-${u.id}" class="btn btn-info text-white d-inline-block lh-1 h-min my-auto">
	              Seguir
	            </div>`;
		$("#f-btn-" + u.id).append($.parseHTML(btn_str));
		updateFollowData(u.id);
	    }
	    c++;
	}
    }).catch( function(error) {
	console.log("Error al acceder a los usuarios del sistema.", error);
	$("#errors-container").append(getError("No se ha podido acceder a los usuarios del sistema."));
    });
}


