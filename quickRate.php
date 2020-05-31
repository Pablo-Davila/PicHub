<!DOCTYPE html>

<html>

  <head>
    <!--<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">-->
    <!--<meta name="viewport" content="width=device-width, initial-scale=1.0">-->
    <?php include 'imports.php' ?>
    <title>PicHub - Quick rate</title>
    
    <link rel="stylesheet" type="text/css" href="css/jTinder.css">
    <!-- jQuery lib -->
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <!-- transform2d lib -->
    <script type="text/javascript" src="js/jquery.transform2d.js"></script>
    <!-- jTinder lib -->
    <script type="text/javascript" src="js/jquery.jTinder.js"></script>
    <!-- jTinder initialization script -->
    <script type="text/javascript" src="js/jTinderMain.js"></script>
  </head>

  <body>
    <?php include 'header.php' ?>

    <div class="container">
      
      <!-- Título -->
      <div class="row">
	<div class="col-md text-center">
	  </br></br>
          <h3>Quick rate</h3>
	</div>
      </div>
      <hr>
      
      <div class="wrap w-75 mx-auto">
	
	<div id="tinderslide" class="bg-sdark">
          <ul id="img-list"></ul>
	</div>
	
      </div>

      <!-- jTinder trigger buttons  -->
      <!--<div class="actions">
	  <a href="#" class="dislike"><i></i></a>
	  <a href="#" class="like"><i></i></a>
      </div>-->
      
      <!-- Errores -->
      <div class="row w-60 mx-auto mt-3">
	<div class="col-md" id="errors-container"></div>
      </div>
      
    </div>
    
    <?php include 'footer.php' ?>
  </body>
  
</html>
