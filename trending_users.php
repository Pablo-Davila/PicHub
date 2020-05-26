<!doctype HTML>
<html>

  <head>
    <?php include 'imports.php' ?>
    <title>PicHub - Usuarios trending</title>
    <script type="text/javascript" src="js/trending_users.js"></script>
  </head>

  <body class="bg_sdark">
    <?php include 'header.php' ?>

    <!-- Flechas -->
    <div id="flechas">
      <a href="index.php" class="position-fixed top-40 left-0">
	<img src="img/flecha.png">
      </a>
      <a href="following.php" class="position-fixed top-40 right-0">
	<img src="img/flecha.png"
	     class="invert-x">
      </a>
    </div>

    <div class="container">

      <!-- Título -->
      <div class="row">
	<div class="col-md text-center">
          </br></br>
	  <h3>Usuarios trending - TOP 10</h3>
	</div>
      </div>

      <hr>
      
      <!-- Errores -->
      <div class="row w-60 mx-auto mt-3">
	<div class="col-md" id="errors-container"></div>
      </div>

      <!-- Lista -->
      <ul id="top-users"
	  class="list-group w-75 m-auto lh-1-8 text-center
		 min-w-23m">
      </ul>
      
    </div>
</div>

<?php include 'footer.php' ?>
</body>

</html>
