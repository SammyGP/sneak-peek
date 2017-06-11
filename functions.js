
var vidSource// = "http://player.twitch.tv/?channel=";
var channel = "";
var playBack = vidSource;
// streamersArray for the featured streamers
var streamersArray = [];
var myStreamers = [];
var clicks = 0;
// object constructor/factory for the streamers
function Streamer(name, image, game, title, viewers, url){
	this.name = name,
	this.image = image,
	this.game = game,
	this.title = title,
	this.viewers = viewers,
	this.link = vidSource + name,
	this.home = url
};
// adds the streamer to the my streamers list
function AddStreamer(streamer){
		var list = document.getElementById("my-streamers-list");
		var li = document.createElement("li");
		li.innerHTML = streamer.name
		list.appendChild(li)
}
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

			// creates an object of all the relevant data for each streamer
			for (i=0; i < data.featured.length; i++){
				streamersArray[i] = new Streamer(stream[i].stream.channel.name, stream[i].image, stream[i].stream.game, stream[i].title, stream[i].stream.viewers, stream[i].stream.channel.url);
			}
			console.log(streamersArray)
		},
		error: function(error){
			console.log(error)
		}
	}); // end of first ajax
	// when ajax is done appends the 
	$(document).ajaxComplete(function(){
		var carouselImages = document.getElementById("carousel").childNodes
		// sets the images of the smaller items
		// also sets the names for the onclick function
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
		//mainPlayer.classList.add("click")
		// checks to see if the click event has a name attribute
		//console.log(e)
		if (e.path[2].id == "carousel"){// makes sure the click is within the carousel
			channel = e.target["name"]//saves the sceens name as channel
			// if it does sets the name as part of the streamer name and plays it
			mainPlayer.setAttribute("src", vidSource + channel)
			// TODO fix add class so it removes the class when you select a new portrait

			var target = e.target
			$(e.path[1]).addClass("active").removeClass("inactive").siblings().removeClass("active").addClass("inactive");

			//e.target.classList.add("active")
		} else {// if not exits
			return
		}
	})
	var mainPlayer = document.getElementById("main-player");
	mainPlayer.addEventListener("load",function(e){
		console.log("Loaded")
		//animates the iframe increasing width by
		$(mainPlayer).animate({
			marginLeft:'-=100px',
			width:"+=200px"
		});
		// makes sure the event can only trigger once preventing the window from continiously growing
		e.target.removeEventListener(e.type,arguments.callee);	
	})
	var searchButton = document.getElementById("search-button");
	var inputBar = document.getElementById("search-query")
	// clears the searchbarch each time its clicked
	inputBar.onclick = function(){
		inputBar.value = ""
	}
	searchButton.onclick = function(){
		// TODO only push the value if the streamer is found

		$.ajax({
			url: "https://wind-bow.gomix.me/twitch-api/channels/" + inputBar.value,
			method: "GET",
			//data: {user:inputBar},
			success: function(data){

				//logs if user is not found
				// TODO make sure duplicates are not allowed
				if (data.error){
					console.log("user not found");
					alert("User not found");
				} else {
					myStreamers.push(new Streamer(data.name, data.logo, data.game, data.status, data.views, data.url))
					AddStreamer(data)

				}
				console.log(data);
			},
			error: function(error){
				console.log(error);
			}
		})
		console.log("done")
	};
	//listens for a input field change (NOTE even if its not submited)
	// TODO create a new list with my favorite streamers (myStreamers) that updates itself with the streamers added
	window.addEventListener("change", function(e){
		console.log("load something");
	});
	//function do display the myStreamers list
	document.getElementById("my-streamers-button").onclick = function(){
		clicks++;
		if ((clicks % 2) === 0) {
			document.getElementById("my-streamers-list").style.display = "none";
		} else {
			document.getElementById("my-streamers-list").style.display = "block";
		};
	}
}) // end of docready
