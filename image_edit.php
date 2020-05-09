<!doctype HTML>
<html>

  <head>
    <?php include 'imports.php' ?>
    <title>PicHub - Editar imagen</title>
    <script type="text/javascript" src="js/image_edit.js"></script>
  </head>

  <body>
    <?php include 'header.php' ?>

    <div class="container">

      <!-- Título -->
      <div class="row">
	<div class="col-md text-center">
  	  </br></br>
          <h3>Editar imagen</h3>
	</div>
      </div>

      <hr>

      <div class="row w-99">

	<!-- Formulario-Datos -->
	<div class="col-md text-center">
	  <form id="edit-image-form">
	    <div class="row">

	      <!-- Imagen -->
	      <div class="col-md text-center mb-2">
		<img id="imagen"
		     src="http://via.placeholder.com/500.png"
		     class="img-fluid rounded max-h-500px">

		<!-- Visibilidad -->
		<div class="custom-control custom-checkbox mt-4">
		  <input id="private" type="checkbox"
			 class="custom-control-input"
			 checked>
		  <label for="private" class="custom-control-label fs-16px">
		    Imagen privada
		  </label>
		</div>
	      </div>

	      <div class="col-md">
		<!-- Título -->
		<label for="title">Título</label>
		<input id="title" type="text" required
		       class="form-control bg-sdark focus-dark"
		       placeholder="Añade un título a tu imagen">

	        </br>

		<!-- Descripción -->
		<label for="description">Descripción</label>
		<textarea id="description" rows="1" required
			  class="form-control bg-sdark focus-dark"
			  placeholder="Añade una descripción a tu imagen"></textarea>

   	        </br>
		
		<!-- URL -->
		<label for="url">URL</label>
		<input id="url" type="text" required
		       class="form-control bg-sdark focus-dark"
		       placeholder="URL de tu imagen">

                </br>

		<!-- Etiquetas -->
		<label for="tags-input">Etiquetas</label>
		<div id="tags-input">
		  <input type="text" id="tags-add-list"
			 class="form-inline form-control bg-sdark focus-dark"
			 placeholder="Añade una etiqueta">
		  <div id="tags-add-btn" class="btn btn-info form-inline">
		    Add
		  </div>
		</div>
		<div id="tags-selected" class="mt-3"></div>
		
                </br>

		<!-- Acciones (botones) -->
		<label for="save">Acciones</label>
		<div id="actions">
		  <div id="delete" class="btn btn-danger">
		    Borrar foto
		  </div>
		  <button id="save" type="submit" class="btn btn-success">
		    Guardar
		  </button>
		</div>
	      </div>
	      
	    </div>

	  </form>
	</div>

      </div>

      <hr>

      <!-- Volver -->
      <div class="row">
	<div class="col-md text-center">
          <a id="back" href="" class="btn btn-info">Volver</a>
	</div>
      </div>
      
      <!-- Errores -->
      <div class="row w-60 mx-auto mt-3">
	<div class="col-md" id="errors-container"></div>
      </div>

    </div>

    <?php include 'footer.php' ?>
  </body>

</html>
