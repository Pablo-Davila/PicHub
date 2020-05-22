<!doctype HTML>
<html>

  <head>
    <?php include 'imports.php' ?>
    <title>PicHub - Etiquetas</title>
    <script type="text/javascript" src="js/tags.js"></script>
  </head>

  <body>
    <?php include 'header.php' ?>

    <!-- Flechas -->
    <div id="flechas">
      <a href="following.php" class="position-fixed top-40 left-0">
	<img src="img/flecha.png">
      </a>
    </div>

    <!-- Cuerpo -->
    <div class="container">
      
      <!-- Título -->
      <div class="row">
	<div class="col-md text-center">
	</br></br>
        <h3>Etiquetas</h3>
	</div>
      </div>
      <hr>
      
      <!-- Errores -->
      <div class="row w-60 mx-auto mt-3">
	<div class="col-md" id="errors-container"></div>
      </div>

      <!-- Elegir etiqueta -->
      <div id="newTag-section" class="row">
	<div class="col-ms text-center mx-auto">
	  <label for="newTag" class="h5 d-block">Nueva etiqueta</label>
	  <input type="text" id="newTag"
		 class="form-inline form-control bg-sdark focus-dark"
		 placeholder="Añade una etiqueta">
	  <div id="tags-add-btn" class="btn btn-info form-inline">
	    Add
	  </div>
	</div>
      </div>
      <!--<select id="tagSelect"
	      class="form-control bg-sdark input-focus txt-light">
	<option>Paisajes</option>
	<option>Naturaleza</option>
	<option>Comida</option>
	<option>Gastronomía</option>
	<option>Animales</option>
      </select>-->
      
      </br>

      <!-- Lista de etiquetas -->
      <div class="row mb-4">
	<div class="col-ms text-center mx-auto max-w-50">
	  <label for="lista" class="h5">Etiquetas existentes</label>
	  <div id="lista" class="col-md text-center lh-2-3"></div>
	</div>
      </div>

      <!-- Mensaje -->
      <div id="msg" class="row w-99 mb-4">
	<div class="col-md text-center">
	  </br>
	  Seleccione una etiqueta
	</div>
      </div>

      <div id="images">
	<!-- FILA 1 -->
	<div class="row w-99"></div>
      </div>
      
    </div>

    <?php include 'footer.php' ?>
  </body>

</html>
