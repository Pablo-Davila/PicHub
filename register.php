<!doctype HTML>

<html>

  <head>
    <?php include 'imports.php' ?>
    <title>PicHub - Registro</title>
    <script src="js/register.js" type="text/javascript"></script>
  </head>

  <body>
    <?php include 'header.php' ?>

    <div class="container">

      <!-- Título -->
      <div class="row">
	<div class="col-md text-center">
	</br></br>
        <h3 class="txt-light">Registro de usuario</h3>
	</div>
      </div>

      <hr>

      <!-- Formulario -->
      <form id="reg-form" class="form-basic rounded w-75 py-3 mx-auto"
	    onsubmit="return validateForm();">
	<div id="form-data" class="row justify-content-center">

	  <!-- Lado izquierdo -->	    
	  <div id="reg-datos" class="col-md">
	    <div class="row">
	      <div class="col-md min-w-16m mb-4">
		<label for="nombre">Nombre</label>
		<input id="nombre" type="text" required
		       class="form-control bg-sdark focus-light"
		       name="nombre" placeholder="Nombre">
	      </div>
	      <div class="col-md min-w-16m mb-4">
		<label for="apellidos">Apellidos</label>
		<input type="text" id="apellidos" required
		       class="form-control bg-sdark focus-light"
		       name="apellidos" placeholder="Apellidos"> 
	      </div>
	    </div>

	    <div class="row">
	      <div class="col-md min-w-16m mb-4">
		<label for="usuario">Nombre de usuario</label>
		<input id="usuario" type="text" required
		       class="form-control bg-sdark focus-light"
		       name="usuario" placeholder="Usuario">
	      </div>
	      <div class="col-md min-w-16m mb-4">
		<label for="telefono">Teléfono</label>
		<input id="telefono" type="telephone" required
		       class="form-control bg-sdark focus-light"
		       name="telefono" placeholder="999-999-999">
	      </div>
	    </div>
	    
	    <div class="row mb-4">
	      <div class="col-md">
		<label for="email">Email</label>
		<div class="input-group mb-2">
		  <div class="input-group-prepend">
		    <div class="input-group-text bg-sdark txt-light">@</div>
		  </div>
		  <input type="email" id="email" name="email" required
			 class="form-control bg-sdark focus-light"
			 placeholder="Email">
		</div>
	      </div>
	    </div>
	  </div>

	  <!-- Lado derecho -->
	  <div id="new-pass" class="col-md col-md-4 min-w-16m my-auto">
	    <label for="password">Contraseña</label>
	    <input id="password" type="password" required
		   class="form-control bg-sdark focus-light mb-4"
		   placeholder="Contraseña">
	    <label for="repassword">Repita su contraseña</label>
	    <input id="repassword" type="password" required
		   class="form-control bg-sdark focus-light mb-4"
		   placeholder="Repita su contraseña">
          </div>
	</div>
	
	<div id="submitdiv" class="row">
	  <button id="submitbtn" type="submit"
		  class="btn btn-info d-block mx-auto w-auto">
	    Registrarse
	  </button>
	</div>
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
