/**
 * @author Johnny Tsheke
 * Le format du json traiter dans ce fichier est le suivant
 * bdjson{
 * 	 "descriptions": [{"nom":"nom delement 1","description":"description element 1"},{"nom":"nom delement 2","description":"description element 2"}]
 * }
 * 
 * on pourrait imaginer ajouter les utilisateurs dans le meme json de la maniere suivante
 * bdjson{
 * 	 "descriptions": [{"nom":"nom delement 1","description":"description element 1"},{"nom":"nom delement 2","description":"description element 2"}],
 *   "utilisateurs":[{"login":"login1","pass":"motdepass1"},{"login":"login2","pass":"motdepass2"},{"login":"login3","pass":"motdepass3"}]
 *   
 * }
 * 
 * info sur json
 * http://www.w3schools.com/json/default.asp
 * http://theshravan.net/storing-json-objects-in-html5-local-storage/
 */

var bd=null;//simulation base de donnees avec localStorage et json
function ajoutInfo()
{   
	var nom=$('input[name="nom"]:first').val();
	var prenom=$('input[name="prenom"]:first').val();
	
	lireBdJson();
	var descJsonObjects=bd.descriptions;
	var jsonObject={ //creation de json
		"nom":nom,
		 "prenom":prenom
	};
	descJsonObjects.push(jsonObject);//ajout dans le tableau des description
	bd.descriptions=descJsonObjects;
	localStorage.setItem('bdjson', JSON.stringify(bd));	
	return(true);
	}

function initialiserBdJson()
{
	var bdjson={
		"descriptions":[]
	   };	
	
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
	
	var descJsonObjects=bd.descriptions;
	var hr="<hr>";
	 $("#contenu:first").append(hr);
	
	for(var i=0;i<descJsonObjects.length;i++)
	{
		var jsonObject=null;
		jsonObject=descJsonObjects[i];
		var div='<div class="ajoutjson">';
		    div=div+'<h3 class="nom">'+jsonObject.nom+'</h3>';
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
		var jsonObject={ //creation de json
		"nom":nom,
		 "description":desc
	      };
	     descJsonObjects.push(jsonObject);
	});
	bd.descriptions=descJsonObjects;
	localStorage.setItem('bdjson', JSON.stringify(bd));	
}

$(document).ready(function(){
	//localStorage.removeItem('bdjson'); //supression de la bd localStorage
	lireBdJson();
	$("#ajout").submit( function(event){
		return ajoutInfo();
	}
			
			);
	$('h3[class="nom"]').dblclick(function(){
		$(this).parent().remove();
		mettreAJourBdJson();
	});
});