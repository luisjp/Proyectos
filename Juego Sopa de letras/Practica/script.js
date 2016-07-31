// IE Evitar seleccion de texto

// End -->

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

// Usage:

preload([
    'img/fondo.jpg'

]);

// Agregacion de Palabras por el Usuario

var paraules = 0;
var correcto = false;
var finish =  false;
var entradas =0;
$(function(){

	$("#comenzar").click(startYa);
});

function startYa(){

	///////////////////////////////////////////////////////
			document.onselectstart=function(){
			if (event.srcElement.type != "textarea" && event.srcElement.type != "password")
			return false
			else return true;
			};
			// FIREFOX Evitar seleccion de texto
			if (window.sidebar){
			document.onmousedown=function(e){
			var obj=e.target;
			if (obj.tagName.toUpperCase() == "table" || obj.tagName.toUpperCase() == "TEXTAREA" || obj.tagName.toUpperCase() == "PASSWORD")
			return true;
			/*else if (obj.tagName=="BUTTON"){
			return true;
			}*/
			else
			return false;
			}
			}
	///////////////////////////////////////////////////////
	$('#entrada').fadeOut();
	if(entradas==0){
		entradas++;	
	var p = document.getElementById("entrada").value;

	p = p.toUpperCase();

	var paraules  = p.split(",");
	if(typeof(Storage)!=="undefined"){
		if(localStorage.words){
			$("body .entrada").append("Bienvenido de nuevo ");
			
			localStorage.words = paraules;
		}else{
			localStorage.words = paraules;
			$("body .entrada").append("Bienvenido a la Sopa de Letras");
			
		}
	}
	
	
	$(function(){

		var buscar = {	
			palabras :[]
		};

		
		var x = 0;
		var xp =0;
		while( x < paraules.length){

			buscar.palabras[x] = paraules[x];
			x++;
		}


		var acabado = buscar.palabras.length;
		var persona = {
			jugador : "",
			puntuacio : 0,
			errors: 0
		};
		
		var row = new Array();
		var cell = new Array();
		
		var contTabla = document.getElementById("tabla");
		var tabla =  document.createElement("table");

		contTabla.appendChild(tabla);
		tabla.setAttribute('border','1');

		//Creació de Taula

		var dim = 0;
		var z=0;
		for(var rell = 0 ; rell < buscar.palabras.length ; rell++){

			dim += buscar.palabras[rell].length;

			if(buscar.palabras[rell].length > z){
			
				z=buscar.palabras[rell].length;
				
			}

		}
		var message2="";
		var message1="";


		var lPalabras = document.getElementById("lista-palabras");
		var bp = 0;
		lPalabras.innerHTML+="<ul>";
		
		while(bp<buscar.palabras.length){
			lPalabras.innerHTML+="<li>" + buscar.palabras[bp]+"</li>";
			bp++;
		}
		
		lPalabras.innerHTML+="</ul>";

		//Palabra al reves
		var rand =Math.floor((Math.random()*buscar.palabras.length)+0);

		for (count=buscar.palabras[rand].length; count >= 0; count--){
				
				message2+=buscar.palabras[rand].substring(count,count-1);
				
		}

		buscar.palabras[rand] = message2;
		
	  				
		$("#puntuacion").html("<p>" + persona.puntuacio + "</p>");		

		if(typeof buscar.palabras[1] === 'undefined'){
			dim = (dim/2) + buscar.palabras[0].length;

			
		}else{
			
			if (dim<z) {

				dim=z;

			}

			dim =dim/2;

		}
		
		for (var t =0; t < dim; t++) {

			row[t] = tabla.insertRow(0);
			for (var r = 0; r < dim; r++) {
				cell[r] = row[t].insertCell(0);
				cell[r].innerHTML = valorAl();
			}

		}
		

		for (var w = 0; w < buscar.palabras.length; w++) {
			var score = Math.round((Math.random()*2)+0);
			
			if(score == 1){
				AsignaVert(w);
			}
			if(score == 0){

				AsignaHorz(w);
			}
			if(score == 2){

				diagonal(w);
			}			

		}

		function diagonal(PalabraAleatoria){

			$miTabla = $('table')[0];
			var dc=0;
			var bc=0;
			var EntradaD=true;
			var numAl=Math.floor((Math.random()*dim)+0);
			var numTd=Math.floor((Math.random()*dim)+0);
			var t=0;
			
			for(t = 0; t < buscar.palabras[PalabraAleatoria].length; t++){
				
				if(typeof $('table')[0].getElementsByTagName("tr")[numAl+t] === 'undefined'){
					
					EntradaD = false;
					
					break;
				}

				var revisar="";
				revisar = $('table')[0].getElementsByTagName("tr")[numAl+t].getElementsByTagName("td")[numTd+t];
							
				if(esValida(revisar,$('table')[0].getElementsByTagName("tr")[numAl+t])){

					EntradaD=false;

				}	
				

			}

			var escogeD ="";
			
			if(EntradaD==true){
				for(bc = 0; bc < buscar.palabras[PalabraAleatoria].length; bc++){
					escogeD = $miTabla.getElementsByTagName("tr")[numAl+bc].getElementsByTagName("td")[numTd+bc];
					escogeD.innerHTML=buscar.palabras[PalabraAleatoria].charAt(bc);
					$(escogeD).addClass("added").attr("m","m");
					
				}
			}else{
				diagonal(PalabraAleatoria);
			}

		}


		

		//Asigna Palabras Verticalmente
		
		function AsignaVert(PalabraAleatoria){
			
			$miTabla = $('table')[0];	// document.getElementsByTagName("table")[0]
			var c = 0;var t=0;var b =0;
			var Entrada = true;

			var numAl=Math.floor((Math.random()*dim)+0);
			var numTd=Math.floor((Math.random()*dim)+0);


			// Comprobacion de Choque o undefined
			var revisar="";		

			for(t = 0; t < buscar.palabras[PalabraAleatoria].length; t++){

				if( typeof $('table')[0].getElementsByTagName("tr")[numAl+t] ==="undefined"){
					Entrada = false;
					break;
				}	
				revisar = $('table')[0].getElementsByTagName("tr")[numAl+t].getElementsByTagName("td")[numTd];
								
				if(esValida(revisar,$('table')[0].getElementsByTagName("tr")[numAl+t])){

					Entrada=false;

				}

			}


				
			var escoge="";
			
			if(Entrada==true){

				for(b = 0; b < buscar.palabras[PalabraAleatoria].length; b++){
						
					escoge=$miTabla.getElementsByTagName("tr")[numAl+b].getElementsByTagName("td")[numTd];
					escoge.innerHTML=buscar.palabras[PalabraAleatoria].charAt(b);
					
					$(escoge).addClass("added").attr("m","m");
					//$(escoge).css("background-color","green");
				}
			}else{
				AsignaVert(PalabraAleatoria);
			}

		}
		

		//Asigna Palabras Horizontalmente
		
		function AsignaHorz(PalabraAleatoria){
			$miTabla = $('table')[0];	/* document.getElementsByTagName("table")[0] */
			var t=0; var b=0; var c = 0;
			var Entrada = true;
			

				var numAl=Math.floor((Math.random()*dim)+0);
				
				var miFila = $miTabla.getElementsByTagName("tr")[Math.floor((Math.random()*dim)+0)];
				var miCelda = miFila.getElementsByTagName("td")[numAl];

				var revisar=0;

			// Comprobacion de Choque o undefined
				
				for(t = 0; t < buscar.palabras[PalabraAleatoria].length; t++){
					revisar = miFila.getElementsByTagName("td")[numAl+t];
					if(esValida(revisar)){
						Entrada = false;
					}

				}


				var escoge=0;

				if(Entrada==true){

					for(b = 0; b < buscar.palabras[PalabraAleatoria].length; b++){

						escoge=miFila.getElementsByTagName("td")[numAl+b];
						escoge.innerHTML=buscar.palabras[PalabraAleatoria].charAt(b);
						$(escoge).addClass("added");
						$(escoge).attr("m","m");
						
					}
				}else{
					AsignaHorz(PalabraAleatoria);
				}


				//var miDato = miCelda.firstChild.nodeValue; 

		}
		
		//Funcion Valida Palabras
		function esValida(revisar,revisar2){
				return (typeof revisar === 'undefined' ||typeof revisar2 === 'undefined' || $(revisar).hasClass("added"));
		}

		function esValida(revisar){
				return (typeof revisar === 'undefined' || $(revisar).hasClass("added"));
		}




		function valorAl(){
			var letras = new Array();
			letras[0] = "A";
	        letras[1] = "B";
	        letras[2] = "C";
	        letras[3] = "D";
	        letras[4] = "E";
	        letras[5] = "F";
	        letras[6] = "G";
	        letras[7] = "H";
	        letras[8] = "I";
	        letras[9] = "J";
	        letras[10] = "K";
	        letras[11] = "L";
	        letras[12] = "M";
	        letras[13] = "N";
	        letras[14] = "Ñ";
	        letras[15] = "O";
	        letras[16] = "P";
	        letras[17] = "Q";
	        letras[18] = "R";
	        letras[19] = "S";
	        letras[20] = "T";
	        letras[21] = "U";
	        letras[22] = "V";
	        letras[23] = "W";
	        letras[24] = "X";
	        letras[25] = "Y";
	        letras[26] = "Z";


	        return letras[Math.floor((Math.random()*26)+0)];
		}


	/**************************************************************************************************************/
	/**************************************************************************************************************/
	/**************************************************************************************************************/
		$("body").append("<div class='msg' style='display:none;'></div>");

		var pals = new Array();
		
		while(xp < paraules.length){
		
			pals[xp] = buscar.palabras[xp];
			xp++;
		}

		var isDown = false; 
		var des = 0;

		$("td").removeClass("added");
		var ultimo="";
		
		// Evento al hacer Click a la celda
		$("td").mousedown(function() {

			
			isDown = true;
			 
			$(this).addClass("select");
			$(this).attr("use","si");
			

	  	}).mouseover(function(){


		    if(isDown) {

		    	if($(this).hasClass("select")){

		    		$(this).removeClass("select");
		    		ultimo.removeClass("select");

		    	}else{
	    		

				    $(this).attr("use","si");
		
				    $(this).addClass("select");

				    ultimo=$(this).addClass("select");
		    	}
		    	       
		    }
		    
	  	})
	  	
	  	.mouseup(function() {

	  		var tdValue = [];
	  		var escogida="";
	    	isDown = false;
	    	var tv = [];
	    	var i=0;

	    	$("[use]").each(function(){

	    		tv[i] = $(this);
	    		tdValue[i] = $(this).text();

	    		i++;
	    		
	    		
	    		$(this).removeAttr('use');
	    		$(this).addClass('fontletra');
	    	});

	    	escogida=tdValue.join("");
	    	
	    	if(!comparar(escogida,tv)){

	    		$(tv).each(function(){

	    			$(this).removeClass("select");
	    		});
	    	}

	  	});

	  	function comparar(valor,tv){

	  		var liValue = [];
	  		var t = 0;
	  		var bien = false;
 		
	  		while(t<pals.length){

	  			if(pals[t]==valor){

	  				pals[t] ="";
	  				acabado--;
	  				
	  				$('.fontletra').each(function(){
	  					$(this).css("color","blue");
	  				});
		  			$(tv).each(function(){

		    			$(this).removeAttr("m");
		    		});	
	  				
	  				$('.msg').text("");

	  				$("<p>Correcto</p>").appendTo(".msg");
	  				

	  				$(".msg").fadeIn('slow',function(){

  						$(this).fadeOut('slow');
  					}).delay(100);
	  				
	  				
	  				
	  				if(acabado==0){
	  					
	  					finish = true;

		  				$("body").append("<div class='msgComplete' style='display:none;'></div>");

		  				$("<p><center>Felicidades,<br> Sopa Completa</center></p>").appendTo(".msgComplete");

		  				$(".msgComplete").fadeIn('slow',function(){

	  						$(this).fadeOut('slow');

	  					}).delay(600);
	  					
	  					var res=puntFinal(); 
	  					$('table').delay(1000).fadeOut("slow");
	  					var sum = 0;
	  					var ds = setInterval(function(){

	  						if (sum==res) {

	  							$("#puntuacion").html("<p>" + sum + "</p>");
	  							$("#puntuacion p").animate({fontSize:50},"slow");
	  							clearInterval(ds);

							}else{

								$("#puntuacion").html("<p>" + sum + "</p>");
								sum++;								
							}

	  					}, 1);
	  					

	  				}

	  				persona.puntuacio++;
	  				
	  				bien = true;
	  				return true;
	  			}

	  			t++;
	  		}

	  		if(!bien){

	  			$('.msg').text("");
				$(".fontletra").removeClass("fontletra");

	  			$("<p>Incorrecto</p>").appendTo(".msg");
	  				
	  			$(".msg").fadeIn('slow',function(){

  					$(this).fadeOut('slow');
  			
  				}).delay(100);
	  		
	  			return false;
	  		
	  			persona.errors+=50;
	  			
	  		}

	  	}
		

	  	function puntFinal(){

	  		var tiempo = $("#cont").html();
	  		var result = 0;
	  		persona.puntuacio=1000;
	  		tiempo = parseInt(tiempo);
	  		

	  		if(tiempo>=10){

	  			persona.puntuacio=1000-persona.errors;
	  			result = persona.puntuacio;
	  			return result;

	  		}else if(tiempo<20){

	  			persona.puntuacio-=10;
	  			persona.puntuacio-=persona.errors;
	  			result =  persona.puntuacio;
	  			return result;
	  		}
	  	}

	});

	}else{
		location.reload();
	}
}

