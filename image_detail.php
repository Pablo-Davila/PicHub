<!doctype HTML>
<html>

  <head>
    <?php include 'imports.php' ?>
    <title>PicHub - Detalles de imagen</title>
    <script type="text/javascript" src="js/image_detail.js"></script>
  </head>

  <body>
    <?php include 'header.php' ?>

    <div class="container">

      <!-- Título -->
      <div class="row">
	<div class="col-md text-center">
	</br></br>
        <h3 id="title">Detalles de imagen</h3>
	</div>
      </div>

      <hr>

      <div class="row w-99">

	<!-- Imagen -->
	<div class="col-md text-center mb-2">
          <img id="imagen"
	       class="img-fluid rounded max-h-500px">
	  <p class="mb-1 mt-1">
	    <a id="author" name="auth-" href=""></a>
	    <span id="date"></span>
	  </p>
	  <p id="private" class="fs-16px"></p>
	</div>

	<!-- Detalles -->
	<div id="details" class="col-md text-center">
	  </br>

	  <!-- Descripción -->
	  <div>
	    <h4>Descripción</h4>
	    <p id="description" class="text-left">
	    </p>
	  </div>

	  </br>

	  <!-- Puntuación -->
	  <div id="score-section" class="h1">
	    <h4>Puntuación: <span id="score"></span>
	    </h4>
	  </div>

	  </br>

	  <!-- Etiquetas -->
	  <div>
	    <h4>Etiquetas</h4>
	    <div id="tags-selected"></div>
	  </div>

	  </br>

	  <!-- Acciones -->
	  <div id="actions">
	  </div>
	</div>

      </div>

      <hr>
      
      <!-- Errores -->
      <div class="row w-60 mx-auto mt-3">
	<div class="col-md" id="errors-container"></div>
      </div>

      <!-- Comentarios -->
      <div id="comments-section" class="w-75 m-auto">

	<!-- Nuevo comentario -->
	<div id="form" class="ml-4 mb-4">
	  <label for="newComment">Nuevo comentario</label>
	  <textarea id="newComment" disabled
		    class="form-control bg-sdark focus-dark mb-2"
		    placeholder="Debes iniciar sesión para poder comentar y ver otros comentarios."></textarea>
	  <!-- Aquí estará el botón de enviar -->
	</div>

	<!-- Comentarios existentes -->
	<div id="old-comments"></div>
      </div>
      
    </div>

    <?php include 'footer.php' ?>
  </body>

</html>
