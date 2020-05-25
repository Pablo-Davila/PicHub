<!doctype HTML>

<html>

  <head>
    <?php include 'imports.php' ?>
    <title>PicHub - Siguiendo</title>
    <script type="text/javascript" src="js/following.js"></script>
  </head>

  <body>
    <?php include 'header.php' ?>

    <!-- Flechas -->
    <div id="flechas">
      <a href="trending_images.php" class="position-fixed top-40 left-0">
	<img src="img/flecha.png">
      </a>
      <a href="tags.php" class="position-fixed top-40 right-0">
	<img src="img/flecha.png"
	     class="invert-x">
      </a>
    </div>

    <div class="container">
      <div class="row">
	<div class="col-md text-center">
	</br></br>
        <h3>Imágenes de usuarios a los que sigues</h3>
	</div>
      </div>

      <hr>
      
      <!-- Errores -->
      <div class="row w-60 mx-auto mt-3">
	<div class="col-md" id="errors-container"></div>
      </div>

      <!-- FILA 1 -->
      <div class="row w-99"></div>
	
    </div>

    <?php include 'footer.php' ?>
  </body>

</html>
