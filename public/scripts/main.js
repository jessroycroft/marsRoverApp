"use strict";

3; //Variables for weather API - Latest weather
var marsWeather = {};

marsWeather.apiKey = "iLepeSSLC96N6NQp6f9aRSWN3vGAZrtjnZBS5eQS";
marsWeather.apiUrl = "http://marsweather.ingenology.com/v1/archive/";

// Get weather information
marsWeather.getInfo = function () {
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
	}).then(function (dataReturn) {
		console.log(dataReturn);
		marsWeather.displayInfo(dataReturn);
	});
};

// Display weather information
marsWeather.displayInfo = function (marsWeatherData) {
	var allWeather = marsWeatherData.results;

	var maxTemp = allWeather.max_temp;
	$("<p>").text(maxTemp);

	var minTemp = allWeather.min_temp;
	$("p.tempLow span").text(minTemp);

	var skies = allWeather.atmo_opacity;
	$("p.skies span").text(skies);

	var sunrise = allWeather.sunrise;
	console.log(sunrise);

	var sunset = allWeather.sunset;
	console.log(sunset);
};

marsWeather.init = function () {
	// $("#datePicker").on("change", function() {
	// 	var date = $(this).val();

	marsWeather.getInfo("2016-02-09");
};

// Weather API - Archived Weather

// Weather API - Sunrise/Sunset Times

// marsWeather.sunsetSunrise = function(marsWeatherData) {
// 	var allWeather = marsWeatherData.report;
// 	var sunrise = allWeather.sunrise;
// 	console.log(sunrise);
// 	var sunset = allWeather.sunset;
// 	console.log(sunset);
// }

// Variables for photo API
var roverPhotos = {};
roverPhotos.apiKey = "iLepeSSLC96N6NQp6f9aRSWN3vGAZrtjnZBS5eQS";
roverPhotos.apiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?";

// Gets the information from
roverPhotos.getPhoto = function (date) {
	$.ajax({
		url: roverPhotos.apiUrl,
		method: "GET",
		dataType: "json",
		data: {
			api_key: roverPhotos.apiKey,
			earth_date: date
		}
	}).then(function (res) {
		roverPhotos.photos = res;
		roverPhotos.displayPhoto(roverPhotos.photos);
		console.log(res);
	});
};

// Display the photo from the array using the random number
roverPhotos.displayPhoto = function (roverPics) {
	// Creates a random whole number between 0 and the length of the photos array for the specified date
	var randomNumber = function randomNumber() {
		return Math.floor(Math.random() * roverPics.photos.length);
	};
	console.log(randomNumber());
	// Grabs the photo that is at the position of the random number
	var currentPhoto = roverPics.photos[randomNumber()].img_src;
	$("img").attr("src", currentPhoto);
};

roverPhotos.addListeners = function () {
	// Hides "see more photos" button
	$("button").hide();
	// Shows "see more photos" button when you pick a date
	$("#datePicker").on("change", function () {
		$("button").show();
	});
	$("button").on("click", function () {
		roverPhotos.displayPhoto(roverPhotos.photos);
	});
};

// Photo init

roverPhotos.init = function () {
	// Changes the value of the date for the API call based on the date selected in the date picker.
	$("#datePicker").on("change", function () {
		var date = $(this).val();
		console.log(date);
		roverPhotos.getPhoto(date);
		// marsWeather.getInfo(date);
		// console.log(displayPhoto);
	});
	roverPhotos.addListeners();
};

// var time = moment().format("YYYY-MM-DD");

$(function () {
	marsWeather.init();
	roverPhotos.init();

	// Date Picker
	$("#dtBox").DateTimePicker({
		isPopup: false,
		dateFormat: "yyyy-MM-dd"
	});
});