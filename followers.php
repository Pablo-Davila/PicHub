<!doctype HTML>
<html>

  <head>
    <?php include 'imports.php' ?>
    <title>PicHub - Seguidores</title>
    <script type="text/javascript" src="js/followers.js"></script>
  </head>

  <body>
    <?php include 'header.php' ?>

    <div class="container txt-light">
      <div class="row">

	<!-- LADO IZQUIERDO -->
	<div class="col-md">

	  <!-- Título -->
	  <div class="row">
	    <div class="col-md">
              </br></br>
	      <h3 id="followers-title" class="ml-4 text-center">
		Seguidores de <span name="auth-"></span>
	      </h3>
	    </div>
	  </div>

	  <hr>

	  <!-- Lista de seguidores -->
	  <ul id="followers-list" class="list-group w-75 m-auto">
	  </ul>

	</div>

	<!-- LADO DERECHO -->
	<div class="col-md">

	  <!-- Título -->
	  <div class="row">
	    <div class="col-md">
              </br></br>
	      <h3 id="followed-title" class="ml-4 text-center">
		Seguidos por <span name="auth-"></span>
	      </h3>
	    </div>
	  </div>

	  <hr>

	  <!-- Lista de seguidos -->
	  <ul id="followed-list" class="list-group w-75 m-auto">
	  </ul>

	</div>
	
      </div>
    </div>
    
    <!-- Errores -->
    <div class="row w-60 mx-auto">
      <div class="col-md" id="errors-container"></div>
    </div>

    <?php include 'footer.php' ?>
  </body>

</html>
