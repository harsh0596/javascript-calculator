$(document).ready(function() {
    function randomgrad() {
        var rand1 = "#" + Math.random().toString(16).slice(2, 8);
        var rand2 = "#" + Math.random().toString(16).slice(2, 8);
		var grad = $(this);

		function convertHex(hex,opacity){
		    hex = hex.replace('#','');
		    r = parseInt(hex.substring(0,2), 16);
		    g = parseInt(hex.substring(2,4), 16);
		    b = parseInt(hex.substring(4,6), 16);

		    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
		    return result;
		}
		
		grad.css('background-color', convertHex(rand1,40));
		grad.css("background-image", "linear-gradient(to left, "+ convertHex(rand1,40) +", "+ convertHex(rand2,40) +")");  
	}
	
	$('body').each(randomgrad);
    $('.display').each(randomgrad);
});