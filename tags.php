<!doctype HTML>
<html>

  <head>
    <?php include 'imports.php' ?>
    <title>PicHub - Búsqueda por etiqueta</title>
  </head>

  <body>
    <?php include 'header.php' ?>

    <!-- Flechas -->
    <div id="flechas">
      <a href="following.php" class="position-fixed top-40 left-0">
	<img src="img/flecha.png">
      </a>
    </div>

    <!-- Cuerpo -->
    <div class="container">
      <!-- Título -->
      <div class="row">
	<div class="col-md text-center">
	</br></br>
        <h3>Búsqueda de imágenes por etiqueta</h3>
	</div>
      </div>
      <hr>

      <!-- Elegir etiqueta -->
      <select id="tagSelect"
	      class="form-control bg-sdark input-focus txt-light">
	<option>Paisajes</option>
	<option>Naturaleza</option>
	<option>Comida</option>
	<option>Gastronomía</option>
	<option>Animales</option>
      </select>
      </br>

      <!-- FILA 1 -->
      <div class="row w-99">

	<div class="col-md text-center">
          <div class="card border-dark mb-4">
            <a href="image_detail.php">
	      <div class="embed-responsive embed-responsive-4by3">
		<img class="card-img-top embed-responsive-item"
		     src="https://images.unsplash.com/photo-1502827186494-9f7976a04548">
	      </div>
            </a>

            <div class="card-body bg-dark">
              <h5 class="card-title">Título de la imagen 1</h5>
              <a href="profile.php" class="card-text">Autor de la imagen 1</a>
              <hr>
              <p class="card-text">
		Etiquetas:
		<span class="badge badge-primary">Paisaje</span>
		<span class="badge badge-primary">Naturaleza</span>
              </p>
            </div>
          </div>
	</div>

	<div class="col-md text-center">
          <div class="card border-dark mb-4">
            <a href="image_detail.php">
	      <div class="embed-responsive embed-responsive-4by3">
		<img src="https://images.unsplash.com/photo-1444464666168-49d633b86797"
		     class="card-img-top embed-responsive-item">
	      </div>
            </a>

            <div class="card-body bg-dark">
              <h5 class="card-title">Título de la imagen 2</h5>
              <a href="profile.php" class="card-text">Autor de la imagen 2</a>
              <hr>
              <p class="card-text">
		Etiquetas:
		<span class="badge badge-primary">Animales</span>
              </p>
            </div>
          </div>
	</div>

	<div class="col-md text-center">
          <div class="card border-dark mb-4">
            <a href="image_detail.php">
	      <div class="embed-responsive embed-responsive-4by3">
		<img src="https://images.unsplash.com/photo-1548092352-4944c775dd75"
		     class="card-img-top embed-responsive-item">
	      </div>
            </a>

            <div class="card-body bg-dark">
              <h5 class="card-title">Título de la imagen 3</h5>
              <a href="profile.php" class="card-text">Autor de la imagen 3</a>
              <hr>
              <p class="card-text">
		Etiquetas:
		<span class="badge badge-primary">Comida</span>
		<span class="badge badge-primary">Gastronomía</span>
              </p>
            </div>
          </div>
	</div>

      </div>
      
      <!-- FILA 2 -->
      <div class="row w-99">
	<div class="col-md text-center">
          <div class="card border-dark mb-4">
            <a href="image_detail.php">
	      <div class="embed-responsive embed-responsive-4by3">
		<img src="https://images.unsplash.com/photo-1547592166-23ac45744acd"
		     class="card-img-top embed-responsive-item">
	      </div>
            </a>
            <div class="card-body bg-dark">
              <h5 class="card-title">Título de la imagen 4</h5>
              <a href="profile.php" class="card-text">Autor de la imagen 4</a>
              <hr>
              <p class="card-text">
		Etiquetas:
		<span class="badge badge-primary">Paisaje</span>
		<span class="badge badge-primary">Naturaleza</span>
              </p>
            </div>
          </div>
	</div>

	<div class="col-md text-center">
          <div class="card border-dark mb-4">
            <a href="image_detail.php">
	      <div class="embed-responsive embed-responsive-4by3">
		<img src="https://images.unsplash.com/photo-1515164664657-6ba669e028f3"
		     class="card-img-top embed-responsive-item">
	      </div>
            </a>
            <div class="card-body bg-dark">
              <h5 class="card-title">Título de la imagen 5</h5>
              <a href="profile.php" class="card-text">Autor de la imagen 5</a>
              <hr>
              <p class="card-text">
		Etiquetas:
		<span class="badge badge-primary">Animales</span>
              </p>
            </div>
          </div>
	</div>

	<div class="col-md text-center">
          <div class="card border-dark mb-4">
            <a href="image_detail.php">
	      <div class="embed-responsive embed-responsive-4by3">
		<img src="https://images.unsplash.com/photo-1506438714564-f9bb34d1f290"
		     class="card-img-top embed-responsive-item">
	      </div>
            </a>
            <div class="card-body bg-dark">
              <h5 class="card-title">Título de la imagen 6</h5>
              <a href="profile.php" class="card-text">Autor de la imagen 6</a>
              <hr>
              <p class="card-text">
		Etiquetas:
		<span class="badge badge-primary">Comida</span>
		<span class="badge badge-primary">Gastronomía</span>
              </p>
            </div>
          </div>
	</div>
	
      </div>
      
      <!-- FILA 3 -->
      <div class="row w-99">
	<div class="col-md text-center">
          <div class="card border-dark mb-4">
            <a href="image_detail.php">
	      <div class="embed-responsive embed-responsive-4by3">
		<img src="https://images.unsplash.com/photo-1567758611957-73e666678347"
		     class="card-img-top embed-responsive-item">
	      </div>
            </a>
            <div class="card-body bg-dark">
              <h5 class="card-title">Título de la imagen 7</h5>
              <a href="profile.php" class="card-text">Autor de la imagen 7</a>
              <hr>
              <p class="card-text">
		Etiquetas:
		<span class="badge badge-primary">Paisaje</span>
		<span class="badge badge-primary">Naturaleza</span>
              </p>
            </div>
          </div>
	</div>

	<div class="col-md text-center">
          <div class="card border-dark mb-4">
            <a href="image_detail.php">
	      <div class="embed-responsive embed-responsive-4by3">
		<img src="https://images.unsplash.com/photo-1509018877337-3af7dd307ea9"
		     class="card-img-top embed-responsive-item">
	      </div>
            </a>
            <div class="card-body bg-dark">
              <h5 class="card-title">Título de la imagen 8</h5>
              <a href="profile.php" class="card-text">Autor de la imagen 8</a>
              <hr>
              <p class="card-text">
		Etiquetas:
		<span class="badge badge-primary">Animales</span>
              </p>
            </div>
          </div>
	</div>

	<div class="col-md text-center">
          <div class="card border-dark mb-4">
            <a href="image_detail.php">
	      <div class="embed-responsive embed-responsive-4by3">
		<img src="https://images.unsplash.com/photo-1512513810084-580214ebe390"
		     class="card-img-top embed-responsive-item">
	      </div>
            </a>
            <div class="card-body bg-dark">
              <h5 class="card-title">Título de la imagen 9</h5>
              <a href="profile.php" class="card-text">Autor de la imagen 9</a>
              <hr>
              <p class="card-text">
		Etiquetas:
		<span class="badge badge-primary">Comida</span>
		<span class="badge badge-primary">Gastronomía</span>
              </p>
            </div>
          </div>
	</div>
	
      </div>
      
    </div>

    <?php include 'footer.php' ?>
  </body>

</html>
