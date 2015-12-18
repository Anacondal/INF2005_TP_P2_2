/**
 * @author Johnny Tsheke
 */

$(document).ready(function(){
	$("table").eq(0).dataTable();
	$("table td").click(function(){
		var text=$(this).text();
		alert("la valeur de cette cellule est: "+text);
		});
});