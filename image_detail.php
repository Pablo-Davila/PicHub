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
        <h3 id="title">Detalles</h3>
	</div>
      </div>

      <hr>

      <div class="row">

	<!-- Imagen -->
	<div class="col-md text-center mb-2">
          <img id="imagen"
	       src="http://via.placeholder.com/500.png"
	       class="img-fluid rounded max-h-500px">
	  <p class="mb-1 mt-1">
	    <a id="author" name="auth-" href=""></a>
	    <span id="date"></span>
	  </p>
	</div>

	<!-- Detalles -->
	<div class="col-md text-center">
	  </br>
	  <div>
	    <h4>Descripción</h4>
	    <p id="description" class="text-left">
	    </p>
	  </div>

	  </br>
	  
	  <div>
	    <h4 id="score">Puntuación: </h4>
	    <button type="button" class="btn btn-success">Me gusta</button>
	    <button type="button" class="btn btn-danger">No me gusta</button>
	  </div>

	  </br>

	  <div>
	    <h4>Etiquetas</h4>
	    <div id="tags"></div>
	  </div>

	  </br>
	  
	  <div>
	    <h4>Acciones</h4>
	    <a id="edit" href="" class="btn btn-info">Editar foto</a> 
	    <a id="delete" href="index.php" class="btn btn-danger">Borrar foto</a>
	  </div>
	</div>

      </div>

      <hr>

      <!-- COMENTARIOS -->
      <div class="w-75 m-auto">
	<div id="comments">
	  
	  <div class="col-row mb-2">
	    <div class="bg-dark rounded p-3">
	      <h5><a href="profile.php?UserName1">
		UserName1
	      </a></h5>
	      <p class="mb-0">This is UserName1's comment ^-^</p>
	    </div>
	  </div>
	  
	  <div class="col-row mb-2">
	    <div class="bg-dark rounded p-3">
	      <h5><a href="profile.php?UserName2">
		UserName2
	      </a></h5>
	      <p class="mb-0">This is UserName2's comment ^-^</p>
	    </div>
	  </div>
	  
	</div>
	
        </br>

	<!-- Nuevo comentario -->
	<form class="ml-4">
	  <label for="newComment">Nuevo comentario</label>
	  <textarea id="newComment"
		    class="form-control bg-sdark focus-dark mb-2"
		    placeholder="Escribe un nuevo comentario"></textarea>
	  
	  <button id="submitbtn" type="submit"
		  class="btn btn-info d-block ml-auto mr-0 w-auto">
	    Enviar
	  </button>
	</form>
      </div>
      
    </div>

    <?php include 'footer.php' ?>
  </body>

</html>
