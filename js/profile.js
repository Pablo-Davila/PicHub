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
	    $("#errors-container").append(getError("Error al acceder a los datos del usuario."));
	}
    });

    // Cargar imágenes
    console.log(`Cargando imágenes del usuario ${id}...`);
    let priv = (id!=getUserId())? "&private=false" : "";
    $.ajax({
	method: "GET", url:
	`http://localhost:3000/images?userId=${id}&_sort=date&_order=desc` + priv,
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
	//if(photo.private && id!=getUserId()) continue;
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
    
    // Gauge chart
    google.charts.load('current', {'packages':["gauge", "corechart"]});
    google.charts.setOnLoadCallback(
	function() {
	    drawGaugeChart(data.length);
	    drawDonutChart(data);
	}
    );
    
    console.log(`Mostradas ${count} imágenes`);
}

function drawGaugeChart(value) {

    var data = google.visualization.arrayToDataTable([
	['Label', 'Value'],
	['Images', value]
    ]);

    var options = {
	width: 600, height: 180,
	greenFrom: 0, greenTo: 4,
	yellowFrom: 37.5, yellowTo: 45,
	redFrom: 45, redTo: 50,
	majorTicks: ['0','10','20','30','40','50'],
	minorTicks: 5,
	max: 50
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

    chart.draw(data, options);
}

function drawDonutChart(images) {
    let last7 = 0;
    let last30 = 0;
    let last365 = 0;
    let other = 0;
    let ago7 = new Date();
    ago7.setDate(ago7.getDate() - 7);
    let ago30 = new Date();
    ago30.setDate(ago30.getDate() - 30);
    let ago365 = new Date();
    ago365.setDate(ago30.getDate() - 365);

    // Count
    for(let img of images) {
	let iDate = new Date(img.date);
	if(iDate > ago7) last7++;
	else if(iDate > ago30) last30++;
	else if(iDate > ago365) last365++;
	else other++;
    }
    
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Últimos 7 días', last7],
	['Últimos 30 días', last30],
	['Últimos 365 días', last365],
	['Anterior', other]
    ]);

    var options = {
        //title: 'My Daily Activities',
        pieHole: 0.4,
	backgroundColor: "transparent",
	chartArea:{width:'163',height:'163'},
	legend: {position: "none"},
	/*is3D: true,*/
	width: 180, height: 270,
	slices: {1: {color: 'green'}}
	//slices: {0: {color: 'aae0ef'}, 1: {color: '84bdca'}, 2: {color: '4b9aab'}, 3: {color: '#138496'}}
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}


