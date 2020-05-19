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
	      <h3 class="ml-4 text-center">Seguidores de UserName1</h3>
	    </div>
	  </div>

	  <hr>

	  <!-- Lista -->
	  <ul id="followers-list" class="list-group w-75 m-auto">
	    <li class="list-group-item bg-dark rounded flex-space mb-3">
	      <a href="profile.php" class="lh-1-8">UserName2</a>
	      <a href="#followed"
		 class="btn btn-info text-white d-inline-block lh-1">
		Seguir
	      </a>
	    </li>
	    <li class="list-group-item bg-dark rounded flex-space mb-3">
	      <a href="profile.php" class="lh-1-8">UserName3</a>
	      <a href="#followed"
		 class="btn btn-info text-white d-inline-block lh-1">
		Seguir
	      </a>
	    </li>
	    <li class="list-group-item bg-dark rounded flex-space mb-3">
	      <a href="profile.php" class="lh-1-8">UserName4</a>
	      <a href="#followed"
		 class="btn btn-info text-white d-inline-block lh-1">
		Seguir
	      </a>
	    </li>
	  </ul>

	</div>

	<!-- LADO DERECHO -->
	<div class="col-md">

	  <!-- Título -->
	  <div class="row">
	    <div class="col-md">
              </br></br>
	      <h3 class="ml-4 text-center">Seguidos por UserName1</h3>
	    </div>
	  </div>

	  <hr>

	  <!-- Lista -->
	  <ul id="followed-list" class="list-group w-75 m-auto">
	    <li class="list-group-item bg-dark rounded flex-space mb-3">
	      <a href="profile.php" class="lh-1-8">UserName2</a>
	      <a href="#followed"
		 class="btn btn-info text-white d-inline-block lh-1">
		Seguir
	      </a>
	    </li>
	    <li class="list-group-item bg-dark rounded flex-space mb-3">
	      <a href="profile.php" class="lh-1-8">UserName3</a>
	      <a href="#followed"
		 class="btn btn-info text-white d-inline-block lh-1">
		Seguir
	      </a>
	    </li>
	    <li class="list-group-item bg-dark rounded flex-space mb-3">
	      <a href="profile.php" class="lh-1-8">UserName4</a>
	      <a href="#followed"
		 class="btn btn-info text-white d-inline-block lh-1">
		Seguir
	      </a>
	    </li>
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
