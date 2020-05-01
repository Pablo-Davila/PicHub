<!doctype HTML>
<html>

  <head>
    <?php include 'imports.php' ?>
    <title>PicHub - Usuarios trending</title>
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

      <!-- Lista -->
      <ul id="top-users"
	  class="list-group w-75 m-auto lh-1-8 text-center min-w-23m">
	<li id="top-1" class="list-group-item bg-dark rounded flex-space mb-3">
	  <a href="profile.php">#1 UserName1</a>
	  <span>999 seguidores</span>
	  <a href="#followed"
	     class="btn btn-info text-white d-inline-block lh-1 h-min my-auto">
	    Seguir
	  </a>
	</li>
	<li id="top-2" class="list-group-item bg-dark rounded flex-space mb-3">
	  <a href="profile.php">#2 UserName2</a>
	  <span>888 seguidores</span>
	  <a href="#followed"
	     class="btn btn-info text-white d-inline-block lh-1 h-min my-auto">
	    Seguir
	  </a>
	</li>
	<li id="top-3" class="list-group-item bg-dark rounded flex-space mb-3">
	  <a href="profile.php">#3 UserName3</a>
	  <span>777 seguidores</span>
	  <a href="#followed"
	     class="btn btn-info text-white d-inline-block lh-1 h-min my-auto">
	    Seguir
	  </a>
	</li>
	<li id="top-4" class="list-group-item bg-dark rounded flex-space mb-3">
	  <a href="profile.php">#4 UserName4</a>
	  <span>666 seguidores</span>
	  <a href="#followed"
	     class="btn btn-info text-white d-inline-block lh-1 h-min my-auto">
	    Seguir
	  </a>
	</li>
	<li id="top-5" class="list-group-item bg-dark rounded flex-space mb-3">
	  <a href="profile.php">#5 UserName5</a>
	  <span>555 seguidores</span>
	  <a href="#followed"
	     class="btn btn-info text-white d-inline-block lh-1 h-min my-auto">
	    Seguir
	  </a>
	</li>
	<li id="top-6" class="list-group-item bg-dark rounded flex-space mb-3">
	  <a href="profile.php">#6 UserName6</a>
	  <span>444 seguidores</span>
	  <a href="#followed"
	     class="btn btn-info text-white d-inline-block lh-1 h-min my-auto">
	    Seguir
	  </a>
	</li>
	<li id="top-7" class="list-group-item bg-dark rounded flex-space mb-3">
	  <a href="profile.php">#7 UserName7</a>
	  <span>333 seguidores</span>
	  <a href="#followed"
	     class="btn btn-info text-white d-inline-block lh-1 h-min my-auto">
	    Seguir
	  </a>
	</li>
	<li id="top-8" class="list-group-item bg-dark rounded flex-space mb-3">
	  <a href="profile.php">#8 UserName8</a>
	  <span>222 seguidores</span>
	  <a href="#followed"
	     class="btn btn-info text-white d-inline-block lh-1 h-min my-auto">
	    Seguir
	  </a>
	</li>
	<li id="top-9" class="list-group-item bg-dark rounded flex-space mb-3">
	  <a href="profile.php">#8 UserName9</a>
	  <span>111 seguidores</span>
	  <a href="#followed"
	     class="btn btn-info text-white d-inline-block lh-1 h-min my-auto">
	    Seguir
	  </a>
	</li>
	<li id="top-10" class="list-group-item bg-dark rounded flex-space mb-3">
	  <a href="profile.php">#10 UserName10</a>
	  <span>0 seguidores</span>
	  <a href="#followed"
	     class="btn btn-info text-white d-inline-block lh-1 h-min my-auto">
	    Seguir
	  </a>
	</li>
      </ul>
      
    </div>
</div>

<?php include 'footer.php' ?>
</body>

</html>
