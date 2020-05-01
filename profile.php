<!doctype HTML>
<html>

  <head>
    <?php include 'imports.php' ?>
    <title>PicHub - Perfil de usuario</title>
  </head>

  <body>
    <?php include 'header.php' ?>
    
    <div class="container txt-light">
      <div class="row">

	<!-- LADO IZQUIERDO -->
	<div class="col-md-5">
	  
	  <div class="row">
	    <div class="col-md">
	      </br></br>
              <h3 class="ml-4 d-inline">Perfil de UserName1</h3>
	      <a href="#followed"
		 class="btn btn-info text-white ml-3 mb-2 d-inline-block">
		Seguir
	      </a>
	    </div>
	  </div>

	  <hr>

	  <!-- Datos -->
	  <div class="pl-3">
	    <div class="row p">
	      <div class="col-md">
		<h5>Nombre</h5>
		<p>UserName1</p>
	      </div>
	    </div>
	    <div class="row">
	      <div class="col-md">
		<h5>Apellidos</h5>
		<p>UserSurname1</p>
	      </div>
	    </div>
	    <div class="row">
	      <div class="col-md">
		<h5>Email</h5>
		<p>Email1</p>
	      </div>
	    </div>

	    </br></br>
	    
	    <div class="row">
	      <div class="col-md">
		<a href="followers.php"
		   class="btn btn-info form-inline text-white a-center">
		  Siguiendo - 314
		</a>
	      </div>
	    </div>

	    </br>
	    
	    <div class="row">
	      <div class="col-md">
		<a href="followers.php"
		   class="btn btn-info form-inline text-white a-center">
		  Seguidores - 159
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
              <h3 class="ml-4">Imágenes de UserName1</h3>
	    </div>
	  </div>

	  <hr>

	  <!-- Tarjetas sin autor, título mb-1 y línea mt-0, tarjeta mb-4 -->
	  <!-- Fila 1 -->
	  <div class="row">
	    <div class="col-md text-center">
              <div class="card border-dark mb-4">
		<a href="image_detail.php">
		  <img src="http://via.placeholder.com/300.png" class="card-img-top">
		</a>

		<div class="card-body bg-dark txt-light">
		  <h5 class="mb-1">Título de la imagen 1</h5>
		  <hr class="mt-0">
		  <p class="card-text">
		    Etiquetas:
		    <span class="badge badge-primary">Paisaje</span>
		    <span class="badge badge-primary">Naturaleza</span>
		  </p>
		</div>
              </div>
	    </div>

	    <div class="col-md text-center">
              <div class="card border-dark mb-4">
		<a href="image_detail.php">
		  <img src="http://via.placeholder.com/300.png" class="card-img-top">
		</a>

		<div class="card-body bg-dark txt-light">
		  <h5 class="mb-1">Título de la imagen 2</h5>
		  <hr class="mt-0">
		  <p class="card-text">
		    Etiquetas:
		    <span class="badge badge-primary">Animales</span>
		  </p>
		</div>
              </div>
	    </div>
	  </div>

	  <!-- Fila 2 -->
	  <div class="row">
	    <div class="col-md text-center">
              <div class="card border-dark mb-4">
		<a href="image_detail.php">
		  <img src="http://via.placeholder.com/300.png" class="card-img-top">
		</a>

		<div class="card-body bg-dark txt-light">
		  <h5 class="mb-1">Título de la imagen 3</h5>
		  <hr class="mt-0">
		  <p class="card-text">
		    Etiquetas:
		    <span class="badge badge-primary">Paisaje</span>
		    <span class="badge badge-primary">Naturaleza</span>
		  </p>
		</div>
              </div>
	    </div>

	    <div class="col-md text-center">
              <div class="card border-dark mb-4">
		<a href="image_detail.php">
		  <img src="http://via.placeholder.com/300.png" class="card-img-top">
		</a>

		<div class="card-body bg-dark txt-light">
		  <h5 class="mb-1">Título de la imagen 4</h5>
		  <hr class="mt-0">
		  <p class="card-text">
		    Etiquetas:
		    <span class="badge badge-primary">Animales</span>
		  </p>
		</div>
              </div>
	    </div>
	  </div>
	  
	</div>
      </div>
    </div>
      
    <?php include 'footer.php' ?>      
  </body>
</html>
