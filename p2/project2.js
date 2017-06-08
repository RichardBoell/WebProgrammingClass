// Perform Actions after the DOM has loaded
window.onload = () => {
	// Populate the Dropdown menu from the locations array
	populateDropDown();
	// Adapt the height of the map to the browser height and position all control elements at the right position
	positionAllElements();
	// Initialize the Map view by displaying the currently selected location from the dropdown
	findCurrentLocation();
	// Find and map the current location when button is clicked
	let buttonCurrentLocation = document.querySelector("#findCurrentLocation");
	buttonCurrentLocation.addEventListener("click", findCurrentLocation);
	// handle the locations dropdown menu
	let selectOptions = document.querySelector("#locationsDropdown");
	selectOptions.addEventListener("change", displaySelectedLocation);
	// handle the center map button
	let buttonCenter = document.querySelector("#center");
	buttonCenter.addEventListener("click", centerMap);
};

// Class of locations to enter the locations array
class dropdownLocation {
	constructor (description, latitude, longitude) {
		this.description = description;
		this.latitude = latitude;
		this.longitude = longitude;
	}
};
// Global locations array with the locations for the dropdown menu
const locations = [];
locations.push(new dropdownLocation("Empire State Building", 40.748684, -73.985697));
locations.push(new dropdownLocation("Heidelberg University", 49.422133, 8.670930));
locations.push(new dropdownLocation("Burj Khalifa", 25.197319, 55.274381));
// Global map object that contains the Google Maps object for our current location
// Will get a longLat, map and marker property
let map = {};
// Global String that will contain Information about the current Position
let locationInfo;

// Populate the Dropdown menu from the locations array
populateDropDown = () => {
	// Get reference to the dropdown menu
	let dropDownMenu = document.querySelector("#locationsDropdown");
	// Loop through locations array and create new options with the location description
	for (var i=0; i<locations.length; ++i) {
		let newOption = document.createElement("option");
		newOption.text = locations[i].description;
		newOption.value = i;
		dropDownMenu.appendChild(newOption);
	}
};
// Function to position all html elements at the right place and adjust them to the users browser
positionAllElements = () => {
	let browserHeight = window.innerHeight;
	let browserWidth = window.innerWidth;
	let navBar = document.querySelector("#navBar");
	let mainWindowHeight = browserHeight - navBar.offsetHeight;
	// Adapt the size of the mainwindow div to the browser size, so the webpage fills exactly the browser size
	let mainWindow = document.querySelector("#mainWindow");
	mainWindow.style.height = `${mainWindowHeight}px`
	// Position upper bar at the top of the map
	let upperBar = document.querySelector("#upperBar");
	let upperBarTop = 5;
	let upperBarLeft = (browserWidth * 0.5) - (upperBar.offsetWidth * 0.5);
	upperBar.style.top = `${upperBarTop}px`;
	upperBar.style.left = `${upperBarLeft}px`;
	// Position lower bar at the bottom of the map
	let lowerBar = document.querySelector("#lowerBar");
	let lowerBarTop =  mainWindowHeight - lowerBar.offsetHeight - 5;
	let lowerBarLeft = (browserWidth * 0.5) - (lowerBar.offsetWidth * 0.5);
	lowerBar.style.top = `${lowerBarTop}px`;
	lowerBar.style.left = `${lowerBarLeft}px`;
}
// Find and map the current location
findCurrentLocation = () => {
	// Check if geolocation is supported
	if (navigator.geolocation) {
		// Get current position and pass it off to displayCurrentLocation() function
		navigator.geolocation.getCurrentPosition(displayCurrentLocation);
		// Set value of Dropdwon menu to blank
		document.querySelector("#locationsDropdown").value = "";
	}
	else {
		alert("No geolocation support");
	}
};
// Intermediate step to pass the coordinates of the current location off to the showMap() function
displayCurrentLocation = position => {
	// Update (or define) the markerInfo property of the map object as "My Location"
	map.markerInfo = `My Location`
	// Pass the geolocation coords to the showMap() function
	showMap(position.coords);
	// Show Information about the current location in the LocationInfo Span
	locationInfo = `My Position ${map.latLong.lat()}, ${map.latLong.lng()}`;
	showInfoSpan(locationInfo);
}
// Show the current selection from the dropdown in the map
displaySelectedLocation = event => {
	// Get the value of the current Selection in the dropdown
	let currentSelection = parseInt(event.target.value);
	// Update (or define) the markerInfo property of the map object as the selected locations description
	map.markerInfo = `${locations[currentSelection].description}`
	// Pass the selcted location to showMap()
	showMap(locations[currentSelection]);
	// Show Information about the current location in the LocationInfo Span
	locationInfo = `${locations[currentSelection].description} ${map.latLong.lat()}, ${map.latLong.lng()}`;
	showInfoSpan(locationInfo);
}
// Use Google Maps API to show the current location on a map
showMap = coords => {
	// Create new instance of Google Maps longitude / latitude object
	map.latLong = new google.maps.LatLng(coords.latitude, coords.longitude);
	// Google Maps options for map display
	let mapOptions = {
		zoom: 15,
		center: map.latLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	// Get reference to the div that will contain the map
	let mapDiv = document.querySelector("#map");
	// Create new instance of Google Maps map object and pass it to our global map object
	map.map = new google.maps.Map(mapDiv, mapOptions);
	// Add a Marker at the desired location
	addMarker(map.latLong);
};
// display a marker at a position
addMarker = latLong => {
	// Google Maps options for the marker
	let markerOptions = {
		position: latLong,
		map: map.map
	};
	// Create new instance of a Google Maps marker and pass it to our global map object
	map.marker = new google.maps.Marker(markerOptions);
	// call outerShowInfoWindow to set showInfoWindow equal the showInfoWindow
	let showInfoWindow = outerShowInfoWindow();
	// Add Event Listener for the click event on the marker
	google.maps.event.addListener(map.marker, "click", showInfoWindow);
};
// Show the passed text in the infoSpan
showInfoSpan = text => {
	let infoSpan = document.querySelector("#locationInfoSpan");
	infoSpan.innerHTML = text;
}
// Comment: I got the information about Javascript Closures from Mozilla Developer Network
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
outerShowInfoWindow = () => {
	// Enclosed marker info
	let infoWindowOptions = {
		content: map.markerInfo
	}
	// enclosed callback function for marker click event. Displays a Google Maps InfoWindow
	showInfoWindow = () => {
		map.infoWindow = new google.maps.InfoWindow(infoWindowOptions);
		map.infoWindow.open(map.map, map.marker);
	}
	// return the showInfoWindow function definition, when outerShowInfoWindow gets called
	return showInfoWindow;
}
// Recenter the map
centerMap = () => {
	map.map.setCenter(map.latLong);
};

// Reposition Elements and Center the map when the user resizes the browser window
window.onresize = () => {
	positionAllElements();
	centerMap();
}