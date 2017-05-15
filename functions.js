import private from config.js
$(document).ready(function(){

var data;
$.ajax({
	url:"https://wind-bow.gomix.me/twitch-api/channels/freecodecamp",
	data: {
		origin:"*"
	},
	headers:{"Api-user-agent": "Sam"},
	success: function(data) {
		console.log(data);
	}

	}); //end of ajax








}) // end of docready