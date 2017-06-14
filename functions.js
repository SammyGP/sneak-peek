
var vidSource //= "http://player.twitch.tv/?channel=";
var channel = "";
var playBack = vidSource;
// streamersArray for the featured streamers
var streamersArray = [];
var myStreamers = [];
var clicks = 0;
/*
// streaming state
function state(arg){
		if (arg.stream === null) {
			arg.state = "state.offline;"
		} else if (arg.stream === undefined) {
			arg.state = "state.closed"
		} else {
			arg.state = "state.online"
		}
	}
*/
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

// play streamer function
function PlayStreamer(arg){
	if (arg.state !== "Online") {

	} else {
		var mainPlayer = document.getElementById("main-player");
		channel = arg.name;
		mainPlayer.setAttribute("src", vidSource + channel)
	}
};

// adds the streamer to the my streamers <li>
function AddStreamer(arg){
		// appends the streamer names to the list
		var list = document.getElementById("my-streamers-list");
		var li = document.createElement("li");
		var span = document.createElement("span");
		span.innerHTML = " ";
		li.innerHTML = arg.name;
	/*	li.appendChild(span);
		list.appendChild(li);*/
	//  checks if streams is offline
	// and sets the circle span class acordingly
	$.get("https://wind-bow.gomix.me/twitch-api/streams/" + arg.name, function(data){

		if (data.stream === null) {
			myStreamers.filter(function(x){
				if(x.name === arg.name) {
					x["state"] = "Offline";
					li.innerHTML = arg.name;
					li.appendChild(span);
					list.appendChild(li);
				};
			});
		} else if (data.stream === undefined) {
			myStreamers.filter(function(x){
				if(x.name === arg.name) {
					x["state"] = "Closed";
					li.innerHTML = arg.name;
					li.appendChild(span);
					span.className = "closed";
		list.appendChild(li);
				};
			});
		} else {
			myStreamers.filter(function(x){
				if(x.name === arg.name) {
					x["state"] = "Online";
					li.innerHTML = arg.name;
					li.appendChild(span);
					list.appendChild(li);
					span.className = "online";
				};
			});
		};
	});

};

// filter/search function
function FindStreamer(arr, name) {
	arr.find(function(streamer){

		//makes sure to only return the object that matches the name
		if(streamer.name === name) {
			PlayStreamer(streamer);
		};
	});
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

		// checks to see if the click event has a name attribute
		if (e.path[2].id == "carousel"){// makes sure the click is within the carousel

			channel = e.target["name"]//saves the sceens name as channel

			FindStreamer(streamersArray, channel)


			// set the active/inactive effect for the clicked image/object and removes it from the siblings
			$(e.path[1]).addClass("active").removeClass("inactive").siblings().removeClass("active").addClass("inactive");

		} else if (e.path[2].id == "my-streamers") {
			var target = e.target.innerText;
			FindStreamer(myStreamers, target)

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
		e.target.removeEventListener(e.type, arguments.callee);	
	})


	var searchButton = document.getElementById("search-button");
	var inputBar = document.getElementById("search-query")

	// clears the searchbarch each time its clicked
	inputBar.onclick = function() {
		inputBar.value = ""
	}
	searchButton.onclick = function() {
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
					var streamerData = new Streamer(data.name, data.logo, data.game, data.state, data.views, data.url)
					myStreamers.push(streamerData);
					AddStreamer(streamerData);
					PlayStreamer(streamerData);

				};
				//console.log(myStreamers);
			},
			error: function(error){
				console.log(error);
			}
		})
	};
	//listens for a input field change (NOTE even if its not submited)
	// TODO create a new list with my favorite streamers (myStreamers) that updates itself with the streamers added
	window.addEventListener("change", function(e){
		console.log("load something");
	});

	//function do display/hide the myStreamers list
	document.getElementById("my-streamers-button").onclick = function(){
		clicks++;
		if ((clicks % 2) !== 0) {
			document.getElementById("my-streamers-list").style.display = "none";
		} else {
			document.getElementById("my-streamers-list").style.display = "block";
		};
	}

// TODO add the ability to see if a streamer is online (think a green circle vs a red circle?)


}) // end of docready
