/**
 * @author Johnny Tsheke
 * Lformat du json traiter dans ce fichier est le suivant
 * bdjson{
 * 	 "descriptions": [{"nom":"nom delement 1","description":"description element 1","image":"nomFichier"},{"nom":"nom delement 2","description":"description element 2","image":"nomFichier"}],
 *   "user":{"login1":"password1","login2":"pass2"}
 *   
 * }
 * 
 * info sur json
 * http://www.w3schools.com/json/default.asp
 */

var bd=null;//simulation base de donnees avec localStorage et json
function ajoutInfo()
{   
	var nom=$('input[name="nom"]:first').val();
	var desc=$('textarea[name="description"]:first').val();
	var fimage=$('option[value]:selected').val();
	if((nom=="undefined")||(nom==null)||(fimage=="undefined")||(fimage==null)){
		alert("spécifier le nom et l'image svp");
		retourn(false); //on ne change rien si
	}
	lireBdJson();
	var descJsonObjects=bd.descriptions;
	var jsonObject={ //creation de json
		"nom":nom,
		 "description":desc,
	};
	descJsonObjects.push(jsonObject);//ajout dans le tableau des description
	bd.descriptions=descJsonObjects;
	localStorage.setItem('bdjson', JSON.stringify(bd));	
	return(true);
	}

function initialiserBdJson()
{
	var bdjson={
		"descriptions":[],
		"users":{"admin":"pass"}
	   };	
	$("#fajout").eq(0).hide();
	localStorage.setItem('bdjson', JSON.stringify(bdjson));	
	bd=bdjson;
}

function lireBdJson()
{
	bd=localStorage.getItem('bdjson');
	if((bd=="undefined")||(bd==null))
	{//ici on doit initialiser la bd
	initialiserBdJson();
	
	}
	else{
		bd=JSON.parse(bd);//parsing de objet json
	}
	connecte=sessionStorage.getItem("connecte");
	if((connecte=="undefined")||(connecte==null)){
		$("#fajout").eq(0).css({"display":"none"});
		$("#fconnexion").eq(0).css({"display":"block"});
		
	}
	else{
		$("#fajout").css({"display":"block"});
		$("#fconnexion").css({"display":"none"});
	}
	var descJsonObjects=bd.descriptions;
	var hr="<hr>";
	 $("#contenu:first").append(hr);
	
	for(var i=0;i<descJsonObjects.length;i++)
	{
		var jsonObject=null;
		jsonObject=descJsonObjects[i];
		var div='<div class="ajoutjson">';
		    div=div+'<h3 class="nom">'+jsonObject.nom+'</h3>';
		    div=div+'<img src='+jsonObject.image+'>';
		    div=div+'<div class="description">'+jsonObject.description+'</div>';
		  div=div+'</div>'; 
		  $("#contenu:first").append(div);//on ajoute à la fin de l'élément
	}
	$("#contenu:first").append(hr);//on ajoute une ligne hrizontale
	
}

function mettreAJourBdJson()
{
	initialiserBdJson();
	var descJsonObjects=bd.descriptions;
	$('div[class="ajoutjson"]').each(function(){
		var nom=$(this).find('h3[class="nom"]:first').html();
		var desc=$(this).find('div[class="description"]:first').html();
		var fimage=$(this).find('img:first').attr('src');
		var jsonObject={ //creation de json
		"nom":nom,
		 "description":desc,
		 "image":fimage,
	      };
	     descJsonObjects.push(jsonObject);
	});
	bd.descriptions=descJsonObjects;
	localStorage.setItem('bdjson', JSON.stringify(bd));
	//Si on a fait la mise a jour, c'est qu'on est connecté	
	$("#fajout").css({"display":"block"});
	$("#fconnexion").css({"display":"none"});
}

function connexion()
{   
	//récupération des info du formulaire
	login=$("#login").val();
	pwd=$('input[name="passwd"]:first').val();
	//vérification dans la BD
	bd=localStorage.getItem('bdjson');
	if((bd=="undefined")||(bd==null))
	{//ici on doit initialiser la bd
	initialiserBdJson();
	
	}
	else{
		bd=JSON.parse(bd);//parsing de objet json
	}
	users=bd.users;
	
	if(pwd==users[login]){
		//si le mot de passe est bon
		sessionStorage.setItem("connecte","connecte");
	}else{//mot de passe erroné
		//supprimer la variable enregistré dans sessionStorage
		sessionStorage.removeItem('connecte');
	}
	
}

function seDeconnecter(){
	sessionStorage.removeItem('connecte');
	$("#fajout").css({"display":"none"});
	$("#fconnexion").css({"display":"block"});
	
}

function supprimerInfo(){
	localStorage.removeItem('bdjson'); //supression de la bd localStorage
	
}



$(document).ready(function(){
	//localStorage.removeItem('bdjson'); //supression de la bd localStorage
	lireBdJson();
	$("#submit").click( function(){
		return ajoutInfo();
	});
	$("#supprimer").click( function(){
		supprimerInfo();
	});
	$("#deconnexion").click( function(){
		seDeconnecter();
	});
	$("#fconnexion").submit( function(event){
		return connexion();
	});
			
	$('h3[class="nom"]').dblclick(function(){
		$(this).parent().remove();
		mettreAJourBdJson();
	});
});