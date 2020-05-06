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

      <div class="row">

	<!-- Imagen -->
	<div class="col-md text-center mb-2">
          <img  src="http://via.placeholder.com/500.png"
	       id="imagen" class="img-fluid rounded">
	</div>

	<!-- Formulario-Datos -->
	<div class="col-md text-center">
	  <form id="edit-image-form" onsubmit="return validateForm();">
	    <label for="title">Título</label>
	    <input id="title" type="text" required
		   class="form-control bg-sdark focus-dark"
		   placeholder="Añade un título a tu imagen">

	    </br>
	    
	    <label for="description">Descripción</label>
	    <textarea id="description" rows="1" required
		      class="form-control bg-sdark focus-dark"
		      placeholder="Añade una descripción a tu imagen">
	    </textarea>

            </br>

	    <label for="add-tags">Etiquetas</label>
	    <div id="add-tags">
	      <input type="text"
		     class="form-inline form-control bg-sdark focus-dark"
		     placeholder="Añade una etiqueta">
	      <a href="#tag-added"
		 class="btn btn-info form-inline">
		Add
	      </a>
	    </div>
	    <div id="tags" class="mt-3"></div>

            </br>

            <label for="actions">Acciones</label>
	    <div id="actions">
	      <a href="index.php" class="btn btn-danger">Borrar foto</a>
	      <button type="submit" class="btn btn-success">Guardar</button>
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

    </div>

    <?php include 'footer.php' ?>
  </body>

</html>
