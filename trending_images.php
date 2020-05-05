<!doctype HTML>
<html>

  <head>
    <?php include 'imports.php' ?>
    <title>PicHub - Imágenes trending</title>
    <script type="text/javascript" src="js/trending_images.js"></script>
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

    <!-- Contenido -->
    <div class="container">

      <!-- Título -->
      <div class="row">
	<div class="col-md text-center">
	  </br></br>
          <h3>Imágenes trending - TOP 10</h3>
	</div>
      </div>

      <hr>

      <!-- Filas de imágenes -->
      <div class="row w-99"></div>
	
    </div>

    <?php include 'footer.php' ?>
  </body>

</html>
