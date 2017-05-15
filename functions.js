var API_SECRET;
var API_CLIENT;
$.getScript("constants.js", function(){// this function gets the values from the constants.js file
	API_SECRET = API_SECRET;
	API_CLIENT = API_CLIENT;
})

$(document).ready(function(){
var data;
$.ajax({
	url:"https://api.twitch.tv/kraken/games/top",
	/*data: {
		period:"month"
	},*/
	headers:{"Client-ID":API_CLIENT},
	success: function(data) {
		console.log(data);
	},
	error: function(error){
		console.log(error)
	}

	}); //end of ajax








}) // end of docready