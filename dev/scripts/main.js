3//Variables for weather API - Latest weather
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
	// $("#datePicker").on("change", function() {
	// 	var date = $(this).val();
		
		marsWeather.getInfo();
	};

 // Variables for photo API
var roverPhotos = {};
roverPhotos.apiKey = "iLepeSSLC96N6NQp6f9aRSWN3vGAZrtjnZBS5eQS";
roverPhotos.apiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?";

// Gets the information from 
roverPhotos.getPhoto = function(whichCamera) {
	$.ajax({
		url: roverPhotos.apiUrl,
		method: "GET",
		dataType: "json",
		data: {
			api_key: roverPhotos.apiKey,
			earth_date: '2016-04-01',
			camera: whichCamera
		}
		// Success Function, call displayPhotos
	}).then(function(res) {
		roverPhotos.photos = res;
		roverPhotos.displayPhoto(roverPhotos.photos);
		console.log(res);
		// Error function, no results
	}, function(error) {
		error = "it didn't work!";
		console.log(error);
		roverPhotos.errorMessage();
	});
};

roverPhotos.errorMessage = function() {
	$("p.error").text("There are no photos from this camera on this date");
}


// Display the photo from the array using the random number
roverPhotos.displayPhoto = function(roverPics) {
	// Creates a random whole number between 0 and the length of the photos array for the specified date
	var randomNumber = function() {
		return Math.floor(Math.random() * roverPics.photos.length);
	};
	console.log(randomNumber());
	// Grabs the photo that is at the position of the random number
	var currentPhoto = roverPics.photos[randomNumber()].img_src;
	// $("img").attr("src", currentPhoto);
	$( "label" ).children().css( "background-image", "url(" + currentPhoto + ")" );
	
}

roverPhotos.cameras = function(roverPics) {

}

roverPhotos.addListeners = function() {
	// Hides "see more photos" button
	$("button").hide();
	// Shows "see more photos" button when you pick a date
	$("#datePicker").on("change", function() {
		$("button").show();
	})
	$("button").on("click", function() {
		roverPhotos.displayPhoto(roverPhotos.photos);
	});
}


// Photo init

roverPhotos.init = function() {
	// Changes the value of the date for the API call based on the date selected in the date picker.
	$("#datePicker").on("change", function() {
		var date = $(this).val();
		console.log(date);
		roverPhotos.getPhoto(date);
	});
	$(".cameraChoice").on("click", function() {
		var whichCamera = $(this).val();
		console.log(whichCamera);
		roverPhotos.getPhoto(whichCamera);
	})
	roverPhotos.addListeners();
}




// var time = moment().format("YYYY-MM-DD");


$(function() {
    marsWeather.init();
    roverPhotos.init();

    // Date Picker
     $("#dtBox").DateTimePicker({
     	isPopup: false,
     	dateFormat: "yyyy-MM-dd"
     })

}); 