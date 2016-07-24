<html>
	<head>
		<meta charset="UTF-8">
		<title>Citizens 2015 - 2016</title>
		<link rel="stylesheet" href="css/bootstrap.css"  type="text/css"/>
		<link rel="stylesheet" href="css/styles.css" type="text/css" /> 
    <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/modernizr/modernizr-2.0.6-development-only.js"></script>        
		<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
	<!--	<script src="js/angular.js"></script> -->
		<script src="js/bootstrap.js"></script>
		<script src="js/scripts.js"></script>
	</head>
	<body>
		<div class="container">
	        <div class="row bannerStyle">
    	        <div class="col-xs-5 col-md-3 vcenter back-title-style">
        	        <center>
                    	<h1><a href="#">Citizens</a></h1> 
                    </center>
                </div>
                <div class="col-xs-5 col-md-1 vcenter">
                	<div class="img-logo">
                    	<img class="img-responsive img-circle" src="img/naranja-logo.png" width="100" height="100">
                    </div>
                </div>
                <div class="col-xs-5 col-md-7 vcenter" style="text-align:right;">
                	<img width=300 height=200 src="">
                </div>
            </div>
			
			<div class="navbar navbar-default">
				<div class="container-fluid nav-header">
		            <div>
		              <ul class="nav navbar-nav">
		                <li class="active"><a href="#">Home</a></li>
		                <li><a href="#">Jugadores</a></li>
		                <li><a href="#">Partidos</a></li>
		                <li><a href="#">Ranking goles</a></li>
		                <li><a href="#">Clasificación</a></li>
		                <li><a href="#">Calendario</a></li>
		              </ul>
		            </div>
		        </div>
		  	</div>
            <div class="container">
                <div class="row info-game-now">
                  <div class="col-md-4" style="    background-color: hsl(0, 0%, 90%);    height: 100%;">
                        <p class="text-center title-info-game-now">Próximo Partido</p>
                        <div class="row">
                            <div class="col-md-7 col-md-offset-3">
                                <div class="col-md-6 marcador">Citizens</div>
                                <div class="col-md-6 marcador text-center" style="background-color: #D6D6D6;">3</div>
                                <div class="col-md-6 marcador">Inter de mitentes</div>
                                <div class="col-md-6 marcador text-center" style="background-color: #D6D6D6;">4</div>
                            </div>
                        </div>
                  
                  </div>
                  <div class="col-md-4" style="    background-color: #D3D3D3;     height: 100%;">
                        <p class="text-center title-info-game-now">Alineación</p>
                         <div class="row" style="    margin-left: 0px;">
                            <div class="col-xs-6 col-sm-4" style="width:100%;margin-top: 2%;margin-bottom: 3.4%;">
                               
                                <canvas id="campo" width="390" height="243" class="img-responsive"  style="max-width: 100%;max-height: 100%;"></canvas>
                            
                            </div>
                        </div>
                  </div>
                  <div class="col-md-4" style="    background-color:  hsl(0, 0%, 90%);    height: 100%;">
                       <p class="text-center title-info-game-now">Convocatoria</p>
                       <div class="col-xs-6"  id="jugadores-lista" style="margin-top: 2%;margin-bottom: 3.4%;">
                           
                       </div>
                  </div>
                </div>
			</div>
	     	<div class="row">
		        <div class="col-md-3" >
			    	<ul class="nav nav-pills nav-stacked">
					    <li class="nav-header"></li>
					    <li class="active"><a href="#">Inicio</a></li>

				</ul>   
		   	</div>
		     	<div id="body-content" class="col-md-9" ng-app="validationApp" ng-controller="mainController" >

					<h3>Últimas noticias</h3>
			
						 
			
			</div>
            <footer>
                <div class="navbar navbar-default">
                    <div class="col-md-12" >
                        <p class="text-center">2015-2016</p>
                    </div>
                </div>
            </footer>
		</div>    
		   
	</body>
</html>