/**
 * @author Johnny Tsheke --UQAM
 */
/*
 * duration: durée de l'animation
 * complete: fonction a appeler après l'animation
 */
function descendre()
{ //descendre le carre
	    $("#carreRPlein").stop();//arret de l'animation eventuelle en cours
	    $("#carreRPlein").click(function(){ 	
		$(this).animate({left:"880px",
			             top:"600px"
			             },{duration:5000,complete:remonter()});		
	});
}

function remonter()
{ //remonter le carre
	 $("#carreRPlein").stop();//on arrette l'animation en cours'
	 $("#carreRPlein").click(function(){
	 $(this).animate({left:"40px",
			             top:"70px"
			             },{duration:5000,complete:descendre()});
	 });
}

$(document).ready(function(){ 
	descendre();
});
