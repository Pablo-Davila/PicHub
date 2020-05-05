<!doctype HTML>
<html>

  <head>
    <?php include 'imports.php' ?>
    <title>PicHub - Reciente</title>
    <script type="text/javascript" src="js/new.js"></script>
  </head>

  <body>
    <?php include 'header.php' ?>

    <!-- Flechas -->
    <div id="flechas">
      <a href="trending_images.php" class="position-fixed top-40 right-0">
	<img src="img/flecha.png"
	     class="invert-x">
      </a>
    </div>
    
    <div class="container">
      <!-- Título -->
      <div class="row">
	<div class="col-md text-center">
	  </br></br>
          <h3>Imágenes más recientes</h3>
	</div>
      </div>

      <hr>

      <!-- Filas de fotos -->
      <div class="row w-99"></div>
    </div>

    <?php include 'footer.php' ?>
  </body>

</html>
