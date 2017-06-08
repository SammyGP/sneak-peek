
var vidSource = "http://player.twitch.tv/?channel=";
var channel = "";
var playBack = vidSource;
var streamersList = [];
var streamersArray = [];
var streamers = {
	name:"name",
	image:"image",
	game:"game",
	title:"title",
	link: vidSource + name
};

$(document).ready(function(){

$.ajax({ // loads and array of the featured streams channel names on page load
	dataType: "JSON",
	url: "https://wind-bow.gomix.me/twitch-api/streams/featured",
	method: "GET",
	success: function(data){
		console.log(data)
		var streamLink = data.featured[0].stream.channel.name;
		var stream = data.featured
		// pushes the links of the featured streams to a array
		for (i=0; i < data.featured.length; i++){
			streamersList.push(stream[i].stream.channel.name)
		}
		// creates an object of all the relevant data for each streamer
		for (i=0; i < data.featured.length; i++){
			streamersArray[i] = new Object();
			streamersArray[i].name = stream[i].stream.channel.name;
			streamersArray[i].image = stream[i].image; 
			streamersArray[i].game = stream[i].stream.game;
			streamersArray[i].title = stream[i].title;
			streamersArray[i].viewers = stream[i].stream.viewers
			streamersArray[i].link = vidSource + streamersArray[i].name
		}
	},
	error: function(error){
		console.log(error)
	}
}); // end of first ajax
// when ajax is done appends the 
$(document).ajaxComplete(function(){
	//document.getElementById("main").setAttribute("height", "300px")
	//document.getElementById("main").setAttribute("width","400px")
	channel = streamersList[0]
	console.log(channel)
	playBack += channel
	console.log(playBack)
	console.log(streamersList)
	//document.getElementById("main").setAttribute("src", playBack)
	console.log("DONE")
	console.log(streamersArray)
	var carouselImages = document.getElementById("carousel").childNodes
	// sets the images of the smaller items
	carouselImages[1].childNodes[0].setAttribute("src", streamersArray[0].image)
	carouselImages[1].childNodes[0].setAttribute("name", streamersArray[0].name)

	carouselImages[3].childNodes[0].setAttribute("src", streamersArray[1].image)
	carouselImages[3].childNodes[0].setAttribute("name", streamersArray[1].name)

	carouselImages[5].childNodes[0].setAttribute("src", streamersArray[2].image)
	carouselImages[5].childNodes[0].setAttribute("name", streamersArray[2].name)

	carouselImages[7].childNodes[0].setAttribute("src", streamersArray[3].image)
	carouselImages[7].childNodes[0].setAttribute("name", streamersArray[3].name)

	carouselImages[9].childNodes[0].setAttribute("src", streamersArray[4].image)
	carouselImages[9].childNodes[0].setAttribute("name", streamersArray[4].name)

	carouselImages[11].childNodes[0].setAttribute("src", streamersArray[5].image)
	carouselImages[11].childNodes[0].setAttribute("name", streamersArray[5].name)

	carouselImages[13].childNodes[0].setAttribute("src", streamersArray[6].image)
	carouselImages[13].childNodes[0].setAttribute("name", streamersArray[6].name)
})
// listens for a click event
window.addEventListener('click',function(e){
	// gets the iframe player
	var mainPlayer = document.getElementById("main-player");
	// checks to see if the click event has a name attribute
	if (e.target["name"]){
		channel = e.target["name"]
		// if it does sets the name as part of the streamer name and plays it
		mainPlayer.setAttribute("src", vidSource + channel)
	} else {// if not exits
		return
	}
})

}) // end of docready