<!doctype HTML>
<html>

  <head>
    <?php include 'imports.php' ?>
    <script type="text/javascript" src="js/photo_edit.js"></script>
    <title>PicHub - Editar imagen</title>
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
          <img src="http://via.placeholder.com/500.png"
	       id="imagen" class="img-fluid rounded">
	</div>

	<!-- Formulario-Datos -->
	<div class="col-md text-center">
	  <form id="edit-image-form">
	    <label for="title">Título</label>
	    <input id="title" type="text"
		   class="form-control bg-sdark focus-dark"
		   placeholder="Añade un título a tu imagen">

	    </br>
	    
	    <label for="description">Descripción</label>
	    <!--<input id="description" type="textarea" class="form-control"
		       placeholder="Añade una descripción a tu imagen">-->
	    <textarea id="description" rows="1"
		      class="form-control bg-sdark focus-dark"
		      placeholder="Añade una descripción a tu imagen"></textarea>

            </br>

	    <label for="tags">Etiquetas</label>
	    <div id="tags">
	      <input type="text"
		     class="form-inline form-control bg-sdark focus-dark"
		     placeholder="Añade una etiqueta">
	      <a href="#tag-added"
		 class="btn btn-info form-inline">
		Add
	      </a>
	    </div>
	    <div class="mt-3">
              <span class="badge badge-primary">
		Paisaje<span class="txt-sdark"> x</span>
	      </span>
              <span class="badge badge-primary">
		Naturaleza<span class="txt-sdark"> x</span>
	      </span>
	    </div>

            </br>

            <label for="actions">Acciones</label>
	    <div id="actions">
	      <a href="index.php"
		 class="btn btn-danger">Borrar foto</a>
	      <a href="image_detail.php"
		 class="btn btn-success">Guardar</a>
	    </div>
	  </form>
	</div>

      </div>

      <hr>

      <div class="row">
	<div class="col-md text-center">
          <a href="image_detail.php" class="btn btn-info">Volver</a>
	</div>
      </div>

    </div>

    <?php include 'footer.php' ?>
  </body>

</html>
