<!doctype HTML>
<html>

  <head>
    <?php include 'imports.php' ?>
    <title>PicHub - Error de acceso</title>
  </head>

  <body>
    <?php include 'header.php' ?>
    
    <div class="container">
      
      <!-- Título -->
      <div class="row">
	<div class="col-md text-center">
	  </br></br>
          <h3>Error de acceso</h3>
	</div>
      </div>

      <hr>

      <!-- Imagen -->
      <div class="row w-99 mb-2">
	<div class="col-md text-center">
	  <img src="img/forbidden.png" class="w-30">
	</div>
      </div>

      <!-- Texto -->
      <div class="row w-99 mb-4">
	<div class="col-md text-center">
	  Lo sentimos, no cuenta con los permisos necesarios para
	  acceder a esa página.
	</div>
      </div>

      <!-- Registro/Login -->
      <div class="row w-99 mb-3">
	<div class="col-md text-center">
          <a href="register.php" class="btn btn-info mr-2">Regístrate</a>
          <a href="login.php" class="btn btn-info ml-2">Inicia sesión</a>
	</div>
      </div>
      
      <!-- Salir -->
      <div class="row w-99 text-center">
	<div class="col-md text-center">
          <a href="index.php" class="btn btn-info">Salir de aquí</a>
	</div>
      </div>
      
    </div>

    <?php include 'footer.php' ?>
  </body>

</html>
