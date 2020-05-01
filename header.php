
<div id="theHeader"><!-- class="title-block"> -->
  <!-- <h1 id="title">Galería fotográfica <i class="fa
					     fa-file-image-o"
					     aria-hidden="true"></i></h1>
  <h3 id="subtitle">Creada por Pablo Dávila Herrero</h3> --> 

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <a href="index.php">
      <img id="logo" src="img/logo.png">
    </a>
    <!--<a class="navbar-brand" href="#">Índice de navegación</a>-->
    <button class="navbar-toggler" type="button"
	    data-toggle="collapse" data-target="#navbarNav"
	    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon bg-sdark txt-light rounded"></span>
    </button>
    
    <div class="collapse navbar-collapse txt_light" id="navbarNav">
      <!--Lado izquierdo-->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="index.php">Nuevo</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#"
	     id="navbarDesplegableId" data-toggle="dropdown"
	     aria-haspopup="true" aria-expanded="false">
	    Trending
          </a>
          <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
	    <a class="dropdown-item" href="trending_users.php">Usuarios trending</a>
	    <a class="dropdown-item" href="trending_images.php">Imágenes trending</a>
          </div>
        </li>
        <li class="nav-item">
	<li class="nav-item">
          <a class="nav-link" href="following.php">Siguiendo</a>
        </li>
        <li class="nav-item">
	<li class="nav-item">
          <a class="nav-link" href="tags.php">Etiquetas</a>
        </li>
      </ul>

      <!-- Centro -->
      <ul class="navbar-nav mx-auto">
        <li class="nav-item">
          <a class="nav-link" href="login.php">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="register.php">Registro</a>
        </li>
      </ul>

      <!-- Lado derecho -->
      <ul class="navbar-nav ml-auto">
	<li class="nav-item pt-1 mr-3">
	  <a href="image_edit.php">
	    <img id="plus" src="img/plus.svg" href="edit.php">
	  </a>
	</li>
        <li class="nav-item">
          <a class="nav-link" href="profile.php?myUserName">Mi perfil</a>
        </li>
      </ul>
      
    </div>
  </nav>
</div>

<hr>
