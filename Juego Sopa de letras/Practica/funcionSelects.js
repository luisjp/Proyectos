
$(function(){

	$("body").append("<div class='msgComplete' style='display:none;'></div>");

	var contador = document.getElementById('cont');
 	var n = 50;
 	$('#comenzar').bind("click", function() {
		contador.innerHTML=50;	
	 	var c = setInterval(contar, 1000);
	});

	function contar(){

		if(parseInt(document.getElementById("cont").innerHTML) == 0){

		  	$("<p>Sopa de Lletra, <br>Inacabada</p>").appendTo(".msgComplete");
		  				
		  	$(".msgComplete").fadeIn('slow',function(){

	  			$(this).fadeOut('slow');


	  		}).delay(300);
			
			$('table').delay(3000).fadeOut("slow");

			document.getElementById("cont").innerHTML="";
			finish=true;
			clearInterval(c);
		}
		if(!finish){
	 		if(n==0){
	 			$("[m]").each(function(){

	 				$(this).css("color","red");
	 			});
	 			

	 		}
	 		contador.innerHTML= n--;
	 	}else{
	 		
	 	}
	}

  

 });