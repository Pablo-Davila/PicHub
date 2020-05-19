<!doctype HTML>
<html>

  <head>
    <?php include 'imports.php' ?>
    <title>PicHub - Login</title>
    <script src="js/login.js" type="text/javascript"></script>
  </head>

  <body>
    <?php include 'header.php' ?>

    <div class="container">

      <!-- Título -->
      <div class="row">
	<div class="col-md text-center">
	</br></br>
        <h3 class="txt-light">Log in</h3>
	</div>
      </div>

      <hr>

      <!-- Formulario -->
      <form id="login-form"
	    class="form-basic rounded w-25 min-w-16m mx-auto py-3">
	<!-- Email -->
	<label for="email">Email</label>
 	<input type="email" id="email" name="email" required
	       class="form-control bg-sdark mb-4 focus-light"
	       placeholder="Email">

	<!-- Username
	<label for="username">Nombre de usuario</label>
	<input id="username" type="text"
	       class="form-control bg-sdark mb-4 focus-light"
	       placeholder="Usuario"> -->

	<!-- Password -->
	<label for="password">Contraseña</label>
	<input id="password" type="password"
	       class="form-control bg-sdark mb-4 focus-light"
	       placeholder="Contraseña">

	<!-- Submit -->
	<button id="submitbtn" type="submit"
		class="btn btn-info d-block mx-auto w-auto">
	  Log in
	</button>
      </form>
      </br>
      
      <!-- Errores -->
      <div class="row w-60 mx-auto">
	<div class="col-md" id="errors-container"></div>
      </div>
      
    </div>
    
    <?php include 'footer.php' ?>
  </body>

</html>
