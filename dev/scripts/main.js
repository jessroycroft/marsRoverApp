///////////////////////////
//                       //
// WEATHER API FUNCTIONS //
//                      //
//////////////////////////


//Variables for weather API - Latest weather
var marsWeather = {};

marsWeather.apiKey = "iLepeSSLC96N6NQp6f9aRSWN3vGAZrtjnZBS5eQS";
marsWeather.apiUrl = "http://marsweather.ingenology.com/v1/latest/";

// Get weather information
marsWeather.getInfo = function() {
	$.ajax({
		// Proxy to access API
		url: 'http://proxy.hackeryou.com',
		method: "GET",
		dataType: "json",
		data: {
			reqUrl: marsWeather.apiUrl
			// terrestrial_date_start: date,
			// terrestrial_date_end: date
		}
	}).then(function(dataReturn) {
		console.log(dataReturn);
		marsWeather.displayInfo(dataReturn);
		
	});
};

// Display weather information
marsWeather.displayInfo = function(marsWeatherData) {
	var allWeather = marsWeatherData.report;

	var earthDate = allWeather.terrestrial_date;
	$("p.earthDate span").text(earthDate);

	var maxTemp = allWeather.max_temp;
	$("p.tempHigh span").text(maxTemp);

	var minTemp = allWeather.min_temp;
	$("p.tempLow span").text(minTemp);

	var skies = allWeather.atmo_opacity;
	$("p.skies span").text(skies);

	var sunrise = allWeather.sunrise;
	$("p.sunrise span").text(sunrise);

	var sunset = allWeather.sunset;
	$("p.sunset span").text(sunset);
}


marsWeather.init = function() {
		marsWeather.getInfo();
	};

//////////////////////////
//                      //
// PHOTO API FUNCTIONS  //
//                      //
//////////////////////////

 // Variables for photo API
var roverPhotos = {};
roverPhotos.apiKey = "iLepeSSLC96N6NQp6f9aRSWN3vGAZrtjnZBS5eQS";
roverPhotos.apiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?";

roverPhotos.todayDate = moment();
// Makes an Ajax call with today's date, from moment.js
roverPhotos.getDate = function(todayDate) {
	console.log(roverPhotos.todayDate);
	$.ajax({
		url: roverPhotos.apiUrl,
		method: "GET",
		dataType: "json",
		data: {
			api_key: roverPhotos.apiKey,
			// Turns today's date into proper format
			earth_date: todayDate.format("YYYY-MM-DD")
		}
		// Success Function, save the successful date into a new variable
	}).then(function() {
		roverPhotos.useThisDate = todayDate.format("YYYY-MM-DD");
		// Error function, no results. Subtract one day from today's date and make Ajax call again with new date.
	}, function(error) {
		error = "no pictures for this date!";
		console.log(error);
		// var earthDate = moment().subtract(1, "day");
		roverPhotos.getDate( todayDate.subtract(1, "day") );
	});
};

// Make an Ajax call with the latest viable date and the camera the user selects.
roverPhotos.getPhoto = function(camera) {
	// var earthDate = moment().format("YYYY-MM-DD");
	$.ajax({
		url: roverPhotos.apiUrl,
		method: "GET",
		dataType: "json",
		data: {
			api_key: roverPhotos.apiKey,
			earth_date: roverPhotos.useThisDate,
			camera: roverPhotos.whichCamera
		}
		// Success Function, call displayPhotos
	}).then(function(res) {
		roverPhotos.photos = res;
		console.log(res);
		roverPhotos.displayPhoto(roverPhotos.photos);
		$("button").show();
		$("p.buttonLabel").show();
		// Error function, no results
	}, function(error) {
		error = "it didn't work!";
		// $("button").hide();
		console.log(error);
		roverPhotos.errorMessage();
	});
};

// Displays error message when there are no photos to display
roverPhotos.errorMessage = function() {
	// Hide 'show more images' button if there are no images to show.
	$("button").hide();
	$("p.buttonLabel").hide();
	// Show "static" image and error message
	$("img").attr("src", "https://media.giphy.com/media/xaMg6NGwH2fFS/giphy.gif");
	$("p.error").css("background", "rgba(0,0,0,0.8)").text("Error: There are no current photos from this camera");
}

// Display the photo from the array using the random number
roverPhotos.displayPhoto = function(roverPics) {
	// Creates a random whole number between 0 and the length of the photos array for the specified date
	var randomNumber = function() {
		return Math.floor(Math.random() * roverPics.photos.length);
	};
	var savedNumber = randomNumber();
	console.log(savedNumber);
	// Grabs the photo that is at the position of the random number
	var currentPhoto = roverPics.photos[savedNumber].img_src;
	var cameraName = roverPics.photos[savedNumber].camera.name;
	console.log(cameraName);
	$("img").attr("src", currentPhoto);
}

roverPhotos.addListeners = function() {
	// Hides "see more photos" button
	$("button").hide();
	$("p.buttonLabel").hide();
	// Shows "see more photos" button when you pick a date
	// $(".cameraChoice").on("click", function() {
	// 	$("button").show();
	// })
	$("button").on("click", function() {
		roverPhotos.displayPhoto(roverPhotos.photos);
	});
}

// Photo init

roverPhotos.init = function() {
	$(".cameraChoice").on("click", function() {
		// Empties images and error message
		$("img").empty();
		$("p.error").empty().css("background", "none");
		// Gets value of button to choose camera
		roverPhotos.whichCamera = $(this).val();
		console.log(roverPhotos.whichCamera);
		// Makes ajax call with that camera value
		roverPhotos.getPhoto(roverPhotos.whichCamera);
		$("p.camDisplay").css("background", "rgba(0,0,0,0.8)").text(roverPhotos.whichCamera);
		$("p.dateDisplay").css("background", "rgba(0,0,0,0.8)").text(roverPhotos.useThisDate);
	})
	roverPhotos.addListeners();
}


//////////////////////////
//                      //
//    DOCUMENT READY    //
//                      //
//////////////////////////


$(function() {
    roverPhotos.getDate( moment() );
    marsWeather.init();
    roverPhotos.init();
}); 