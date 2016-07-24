var lista_jugadores = [];
var alineacion = 'img/alineacion.jpg';
$(function() {

	
	function jugadores(nombre, apellido, fechaNacimiento, dorsal, posicion)
	{
		this.nombre = nombre,
		this.apellido = apellido,
		this.fechaNacimiento = fechaNacimiento,
		this.dorsal = dorsal,
		this.posicion = posicion
	}
	var url_controllers = 
	{
		controller_portal : "server/controller/controller1.php"
	};

	$.ajax({
	 async: false,
	  type: "POST",
	  url: url_controllers.controller_portal ,
	  data: {
	  	'players' : '1'
	  },
	  success: function(msg)
	  {
		
	  	for(var i = 0 ; i < msg.length ; i++)
	  	{
			
	  		lista_jugadores.push(new jugadores(msg[i].nombre, msg[i].apellido, msg[i].fechaNacimiento, msg[i].dorsal, msg[i].posicion));
	  		
	  	}
		
	  	
	  },
	  
	  dataType: 'json'
	});
	
	$.each(lista_jugadores, function(i, item){
		//console.log(i + " - " + item.dorsal + " -> " + item.nombre);
		if(i<8)
		{
       		$('#jugadores-lista').append('<div class="img-circle-my">'+item.dorsal+'</div><p class="players-numbers">  '+item.nombre+' '+ item.apellido +'</p>');			
		}else
		{
			if($('#jugadores-lista2').length>0)
			{
				$('#jugadores-lista2').append('<div class="img-circle-my">'+item.dorsal+'</div><p class="players-numbers">  '+item.nombre+' '+ item.apellido +'</p>');		
			}else
			{
				$('#jugadores-lista').parent().append('<div class="col-xs-6" id="jugadores-lista2" style="margin-top: 2%;margin-bottom: 3.4%;">');
				$('#jugadores-lista2').append('<div class="img-circle-my">'+item.dorsal+'</div><p class="players-numbers">  '+item.nombre+' '+ item.apellido +'</p>');	
			}

			
		}

    });
	
	/*var canvas = document.getElementById("campo"),
	    ctx = canvas.getContext("2d");
	var image   = 'img/alineacion.jpg'
	canvas.style.backgroundImage = 'url('+image+')';
	canvas.width = 389;
	canvas.height = 243;
	

	ctx.lineWidth="3";
	
	ctx.moveTo(0,0);
	ctx.rect(70,40,30,30);
	ctx.stroke();

	ctx.moveTo(0,0);
	ctx.rect(70,105,30,30);
	ctx.stroke();

	ctx.moveTo(0,0);
	ctx.rect(70,175,30,30);
	ctx.stroke();		

	ctx.moveTo(0,0);
	ctx.rect(170,105,30,30);
	ctx.stroke();	

	ctx.moveTo(0,0);
	ctx.rect(260,60,30,30);
	ctx.stroke();

	ctx.moveTo(0,0);
	ctx.rect(260,155,30,30);
	ctx.stroke();	

	ctx.fillStyle = "white";
	ctx.font = "15pt Arial";
	ctx.fillText("4", 80, 62);
		
	ctx.fillStyle = "white";
	ctx.font = "15pt Arial";
	ctx.fillText("5", 80, 127);      

	ctx.fillStyle = "white";
	ctx.font = "15pt Arial";
	ctx.fillText("3", 80, 196);  	

	ctx.fillStyle = "white";
	ctx.font = "15pt Arial";
	ctx.fillText("2", 180, 127);  	        

	ctx.fillStyle = "white";
	ctx.font = "15pt Arial";
	ctx.fillText("8", 269, 82);  	    

	ctx.fillStyle = "white";
	ctx.font = "15pt Arial";
	ctx.fillText("7", 269, 177);  	    

	*/

window.addEventListener("load", windowLoadHandler, false);
var Debugger = function() { };
Debugger.log = function(message) {
	try {
		console.log(message);
	}
	catch (exception) {
		return;
	}
}

function windowLoadHandler() {
	canvasApp();
}

function canvasSupport() {
	return Modernizr.canvas;
}

function canvasApp() {
	if (!canvasSupport()) {
		return;
	}
	
	var theCanvas = document.getElementById("campo");

	var context = theCanvas.getContext("2d");
	theCanvas.style.backgroundImage="url(img/alineacion.jpg)"
	init();


	var numShapes;
	var shapes;
	var dragIndex;
	var dragging;
	var mouseX;
	var mouseY;
	var dragHoldX;
	var dragHoldY;
	
	function init() {
		numShapes = lista_jugadores.length;
		shapes = [];
		
		makeShapes();
		
		drawScreen();
		
		theCanvas.addEventListener("mousedown", mouseDownListener, false);
	}
	
	function makeShapes() {

		var i;
		var tempX;
		var tempY;
		var tempW;
		var tempH;

		for (i=0; i < numShapes; i++) {
			
			tempX = 70;
			tempY = 40;
			tempW = 30;
			tempH = 30;

			tempShape = {x:tempX, y:tempY, w:tempW, h:tempH};
			shapes.push(tempShape);
		}
	}
	
	function mouseDownListener(evt) {
		var i;
		//We are going to pay attention to the layering order of the objects so that if a mouse down occurs over more than object,
		//only the topmost one will be dragged.
		var highestIndex = -1;
		
		//getting mouse position correctly, being mindful of resizing that may have occured in the browser:
		var bRect = theCanvas.getBoundingClientRect();
		mouseX = (evt.clientX - bRect.left)*(theCanvas.width/bRect.width);
		mouseY = (evt.clientY - bRect.top)*(theCanvas.height/bRect.height);
				
		//find which shape was clicked
		for (i=0; i < numShapes; i++) {
			if	(hitTest(shapes[i], mouseX, mouseY)) {
				dragging = true;
				if (i > highestIndex) {
					//We will pay attention to the point on the object where the mouse is "holding" the object:
					dragHoldX = mouseX - shapes[i].x;
					dragHoldY = mouseY - shapes[i].y;
					highestIndex = i;
					dragIndex = i;
				}
			}
		}
		
		if (dragging) {
			window.addEventListener("mousemove", mouseMoveListener, false);
		}
		theCanvas.removeEventListener("mousedown", mouseDownListener, false);
		window.addEventListener("mouseup", mouseUpListener, false);
		
		//code below prevents the mouse down from having an effect on the main browser window:
		if (evt.preventDefault) {
			evt.preventDefault();
		} //standard
		else if (evt.returnValue) {
			evt.returnValue = false;
		} //older IE
		return false;
	}
	
	function mouseUpListener(evt) {
		theCanvas.addEventListener("mousedown", mouseDownListener, false);
		window.removeEventListener("mouseup", mouseUpListener, false);
		if (dragging) {
			dragging = false;
			window.removeEventListener("mousemove", mouseMoveListener, false);
		}
	}

	function mouseMoveListener(evt) {

		var posX;
		var posY;
		var shapeWidth = shapes[dragIndex].w;
		var minX = shapeWidth;
		var maxX = theCanvas.width - shapeWidth;
		var minY = shapeWidth;
		var maxY = theCanvas.height - shapeWidth;
		//getting mouse position correctly 
		var bRect = theCanvas.getBoundingClientRect();
		mouseX = (evt.clientX - bRect.left)*(theCanvas.width/bRect.width);
		mouseY = (evt.clientY - bRect.top)*(theCanvas.height/bRect.height);
		
		//clamp x and y positions to prevent object from dragging outside of canvas
		posX = mouseX - dragHoldX;
		posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
		posY = mouseY - dragHoldY;
		posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);
		
		shapes[dragIndex].x = posX;
		shapes[dragIndex].y = posY;
		
		drawScreen();
	}
	
	function hitTest(shape,mx,my) {
		
		var dx;
		var dy;
		dx = mx - shape.x;
		dy = my - shape.y;
		
		//a "hit" will be registered if the distance away from the center is less than the radius of the circular object		
		return (dx*dx + dy*dy < shape.w*shape.h);
	}
	
	function drawShapes() {
		var i;
		for (i=0; i < numShapes; i++) {
			
			context.fillStyle = "#000";
			context.beginPath();
			context.rect(shapes[i].x, shapes[i].y, shapes[i].w,shapes[i].h);

			context.closePath();
			context.fill();
			
		}
	}
	
	function drawScreen() {
		//bg
		var image = new Image();
		image.src = alineacion;
		image.onload = drawPattern(image);

		drawShapes();		
	}

	function drawPattern(image) {

		context.fillStyle = context.createPattern(image, "no-repeat");
		context.clearRect(0, 0, theCanvas.width, theCanvas.height);

	}	
}



});