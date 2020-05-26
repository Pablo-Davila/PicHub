<!doctype HTML>
<html>

  <head>
    <?php include 'imports.php' ?>
    <title>PicHub - Perfil de usuario</title>
    <script type="text/javascript" src="js/profile.js"></script>
  </head>

  <body>
    <?php include 'header.php' ?>

    <!-- Errores -->
    <div class="row w-60 mx-auto">
      <div class="col-md" id="errors-container"></div>
    </div>
    
    <div class="container txt-light">
      <div class="row">

	<!-- LADO IZQUIERDO -->
	<div class="col-md-5">
	  
	  <div class="row">
	    <div id="data-title-div" class="col-md">
	      </br></br>
              <h3 id="data-title" class="ml-4 d-inline">Perfil de</h3>
	    </div>
	  </div>

	  <hr>

	  <!-- Datos -->
	  <div class="pl-3">
	    <div class="row p">
	      <div class="col-md">
		<h5>Nombre</h5>
		<p id="name"></p>
	      </div>
	    </div>
	    <div class="row">
	      <div class="col-md">
		<h5>Apellidos</h5>
		<p id="surnames"></p>
	      </div>
	    </div>
	    <div class="row">
	      <div class="col-md">
		<h5>Email</h5>
		<p id="email"></p>
	      </div>
	    </div>

	    </br></br>
	    
	    <div class="row">
	      <div class="col-md">
		<a id="link-ff1"
		   class="btn btn-info form-inline text-white a-center
			  btn-s-s">
		  Siguiendo a
		  <span id="followed" class="text-light mx-1">314</span>
		  usuarios
		</a>
	      </div>
	    </div>

	    </br>
	    
	    <div class="row">
	      <div class="col-md">
		<a id="link-ff2"
		   class="btn btn-info form-inline text-white a-center
			  btn-s-s">
		  Seguido por
		  <span id="followers" class="text-light mx-1">159</span>
		  usuarios
		</a>
	      </div>
	    </div>
	    
	  </div>
	  
	</div>

	<!-- LADO DERECHO -->
	<div class="col-md-7">
	  <div class="row">
	    <div class="col-md">
              </br></br>
              <h3 id="img-title" class="ml-4 d-inline">Imágenes de</h3>
	    </div>
	  </div>

	  <hr>

	  <!-- Filas de imágenes -->
	  <div class="container">
	    <div class="row w-99"></div>
	  </div>
	  
	</div>
      </div>
    </div>
      
    <?php include 'footer.php' ?>      
  </body>
</html>
