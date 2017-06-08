window.onload = () => {
	// populate dropdown menu with the colors from backgroundColor array
	populateDropdown();
	// Initiate the Canvas background by settin it to the first list item
	initiateCanvasBackground();
	// draw mountains
	drawMountains();
	// draw Sine shaped hills in the background
	drawSinhills(sinhillsInfo);
	// draw a bike on canvas
	drawBike();
	// draw rainbow on canvas
	drawRainbow();
	// draw sheep image
	drawSheep();
	// draw flowers: looping through x-Axis and placing random colored flowers at random positions with in a certain range
	drawFlowers();
	// draw grass bottom
	drawGrass();
	// handle the dropdown menu change event
	let dropdown = document.querySelector("select");
	dropdown.addEventListener("change", updateCanvasBackground);
	// Handle the drawText Button click event
	let drawTextButton = document.querySelector("#drawText");
	drawTextButton.addEventListener("click", drawText);
	// Handle the clearCanvas Button click event
	let clearCanvasButton = document.querySelector("#clearCanvas");
	clearCanvasButton.addEventListener("click", clearCanvas);
	// Handle the startRain Button click event
	let startRainButton = document.querySelector("#startRain");
	startRainButton.addEventListener("click", animateRain);
	// Handle the stopRain Button click event
	let stopRainButton = document.querySelector("#stopRain");
	stopRainButton.addEventListener("click", stopRain);
}

// global Array with color names for Canvas background
const backgroundColors = ["Salmon", "Lavender", "DarkSlateBlue", "DarkRed", "CornflowerBlue", "Coral", "Cornsilk", "DeepSkyBlue", "MidnightBlue", "SteelBlue", "SpringGreen"];
// global Array with color names for Flowers
const flowerColors = ["Tomato", "Yellow", "Purple", "PapayaWhip", "Orchid"]
// function to populate the backgroundColor dropdownmenu with the backgroundColors array elements
populateDropdown = () => {
	// reference to select element
	let Dropdown = document.querySelector("#backgroundColors");
	// loop through backgroundColors array and append a new option tag for each color
	for (var i=0; i<backgroundColors.length; ++i) {
		// create new option tag and give it a text and value
		let newOption = document.createElement("option");
		newOption.text = backgroundColors[i];
		newOption.value = i;
		// append new option tag to dropdown menu
		Dropdown.appendChild(newOption);
	}
}
// change background color of canvas when the dropdown menu changes
updateCanvasBackground = event => {
	// Get the value of the current Selection in the dropdown
	let currentSelection = parseInt(event.target.value);
	// Pull corresponding color from array
	let selectedColor = backgroundColors[currentSelection];
	// Get reference to canvas
	let canvas = document.querySelector("canvas");
	// Set Canvas background color
	canvas.style.backgroundColor = selectedColor;
	
	// redraw all canvas objects
	// draw Mountains
	drawMountains();
	// draw Sine shaped hills in the background
	drawSinhills(sinhillsInfo);
	// draw a bike on canvas
	drawBike();
	// draw rainbow on canvas
	drawRainbow();
	// draw sheep image
	drawSheep();
	// draw flowers: looping through x-Axis and placing random colored flowers at random positions with in a certain range
	drawFlowers();
	// draw grass bottom
	drawGrass();
}
// initiate canvas backgroundColor to first selection
initiateCanvasBackground = () => {
	// Get the value of the current Selection in the dropdown
	let currentSelection = document.querySelector("select").value;
	// Pull corresponding color from array
	let selectedColor = backgroundColors[currentSelection];
	// Get reference to canvas
	let canvas = document.querySelector("canvas");
	// Set Canvas background color
	canvas.style.backgroundColor = selectedColor;
}
// draw text on canvas
drawText = () => {
	// Get reference to canvas and set up context
	let canvas = document.querySelector("canvas");
	let context = canvas.getContext("2d");
	// text style settings
	context.font = "40px Helvetica";
	context.textAlign = "end";
	context.fillStyle = "white";
	// get the user input
	let text = document.querySelector("#textInput").value;
	// delete previous text
	context.clearRect(250,0,550,45);
	// write new text
	context.fillText(text, 798, 35);
}
// clear Canvas completely to backgroundColor
clearCanvas = () => {
	// reference to html canvas and set up context
	let canvas = document.querySelector("canvas");
	let context = canvas.getContext("2d");
	// call the stopRain function so there is no rain on the cleared canvas
	stopRain();
	// clear the complete canvas
	context.clearRect(0,0,800,600);
}
// draw bike on canvas
drawBike = () => {
	// reference to html canvas and set up context
	let canvas = document.querySelector("canvas");
	let context = canvas.getContext("2d");
	// set starting coordinatest of left bottom of bike
	let x = 150;
	let y = 600-1;
	// draw the wheels
	context.beginPath();
	context.arc(x+50, y-50, 50, 0, 2 * Math.PI)
	context.closePath();
	context.strokeStyle = "white";
	context.lineWidth = 3;
	context.stroke();

	context.beginPath();
	context.arc(x+250, y-50, 50, 0, 2 * Math.PI)
	context.closePath();
	context.stroke();
	// draw the main body
	context.beginPath();
	context.moveTo(x+50, y-50);
	context.lineTo(x+100, y-130);
	context.lineTo(x+120, y-50);
	context.lineTo(x+230, y-130);
	context.lineTo(x+250, y-50);
	context.lineTo(x+224, y-154); //handle
	context.lineTo(x+214, y-139);
	context.lineTo(x+234, y-169);
	context.lineTo(x+224, y-154);
	context.lineTo(x+230, y-130);
	context.lineTo(x+100, y-130);
	context.lineTo(x+95, y-150); //seat
	context.lineTo(x+115, y-150);
	context.lineTo(x+85, y-155);
	context.lineTo(x+80, y-150);
	context.lineTo(x+95, y-150);
	context.lineTo(x+120, y-50); //pedals
	context.lineTo(x+130, y-70);
	context.lineTo(x+135, y-70);
	context.lineTo(x+125, y-70);
	context.lineTo(x+130, y-70);
	context.lineTo(x+110, y-30);
	context.lineTo(x+115, y-30);
	context.lineTo(x+105, y-30);
	context.lineTo(x+110, y-30);
	context.lineTo(x+120, y-50);
	context.closePath();
	context.stroke();
	// gearwheel
	context.beginPath();
	context.arc(x+120, y-50, 15, 0, 2 * Math.PI)
	context.closePath();
	context.stroke();

	context.beginPath();
	context.arc(x+50, y-50, 8, 0, 2 * Math.PI)
	context.closePath();
	context.stroke();
	// bicycle chain
	context.beginPath();
	context.moveTo(x+50, y-58);
	context.lineTo(x+120, y-65);
	context.closePath();
	context.stroke();

	context.beginPath();
	context.moveTo(x+50, y-42);
	context.lineTo(x+120, y-35);
	context.closePath();
	context.stroke();
}
// draw Rainbow on canvas
drawRainbow = () => {
	// reference to html canvas and set up context
	let canvas = document.querySelector("canvas");
	let context = canvas.getContext("2d");
	// draw all the rainbow color circles
	context.beginPath();
	context.arc(800, 1000, 1200, 0, 2 * Math.PI);
	context.closePath();
	context.strokeStyle = "red";
	context.lineWidth = 10;
	context.stroke();

	context.beginPath();
	context.arc(800, 1000, 1190, 0, 2 * Math.PI);
	context.closePath();
	context.strokeStyle = "DarkOrange";
	context.stroke();

	context.beginPath();
	context.arc(800, 1000, 1180, 0, 2 * Math.PI);
	context.closePath();
	context.strokeStyle = "yellow";
	context.stroke();

	context.beginPath();
	context.arc(800, 1000, 1170, 0, 2 * Math.PI);
	context.closePath();
	context.strokeStyle = "LawnGreen";
	context.stroke();

	context.beginPath();
	context.arc(800, 1000, 1160, 0, 2 * Math.PI);
	context.closePath();
	context.strokeStyle = "DeepSkyBlue";
	context.stroke();

	context.beginPath();
	context.arc(800, 1000, 1150, 0, 2 * Math.PI);
	context.closePath();
	context.strokeStyle = "DarkOrchid";
	context.stroke();
}
// define the class Flower that takes a color for the blossom 
class Flower {
	constructor(color) {
		// color for blossom
		this.color = color;
		// reference to html canvas and set up context
		this.canvas = document.querySelector("canvas");
		this.context = this.canvas.getContext("2d");
	}
	// draw flower at position x, y on canvas
	drawFlower(x, y) {
		let context = this.context;
		// stem
		context.beginPath();
		context.moveTo(x, y);
		context.lineTo(x, y-30);
		context.lineTo(x-4, y-30);
		context.lineTo(x-4, y);
		context.closePath();
		context.fillStyle = "ForestGreen";
		context.fill();
		// leaves
		context.beginPath();
		context.moveTo(x, y);
		context.quadraticCurveTo(x+3, y-18, x+10, y-25);
		context.quadraticCurveTo(x+7, y-7, x, y);
		context.closePath();
		context.fill();

		context.beginPath();
		context.moveTo(x-4, y);
		context.quadraticCurveTo(x-7 ,y-18 , x-14, y-25);
		context.quadraticCurveTo(x-11, y-7, x-4, y);
		context.closePath();
		context.fill();
		// blossom
		context.beginPath();
		context.arc(x-2, y-36, 6, 0, Math.PI);
		context.closePath();
		context.fillStyle = this.color;
		context.fill();

		context.beginPath();
		context.moveTo(x-8, y-36);
		context.lineTo(x-7, y-45);
		context.lineTo(x, y-36);
		context.closePath();
		context.fill();

		context.beginPath();
		context.moveTo(x+4, y-36);
		context.lineTo(x+3, y-45);
		context.lineTo(x-4, y-36);
		context.closePath();
		context.fill();
	}
}
// function to get a random integer between min and max value
getRandomInteger = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
// draw flowers along the x-Axis
drawFlowers = () => {
	// loop through x-Axis
	for (let x=0; x<800; x += getRandomInteger(20,40)) {
		// random color from flowerColors array for the blossom
		let randomColor = flowerColors[getRandomInteger(0, flowerColors.length - 1)];
		// place at random height in certain range
		let randomYValue = getRandomInteger(593, 600);
		// create new instance of Flower
		let newFlower = new Flower(randomColor);
		// draw Flower on Canvas
		newFlower.drawFlower(x, randomYValue);
	}
}
// draw an element of grass
drawGrassElement = (x, y, width, height) => {
	// reference to html canvas and set up context
	let canvas = document.querySelector("canvas");
	let context = canvas.getContext("2d");
	// draw grass element
	context.beginPath();
	context.moveTo(x, y-height);
	context.quadraticCurveTo(x + width/2, y, x+width, y-height);
	context.lineTo(x+width, y);
	context.lineTo(x, y);
	context.closePath();
	context.fillStyle = "LawnGreen";
	context.fill();
}
// fill the complete bottom with grass
drawGrass = () => {
	let x = 0;
	// loop through x-Axis
	while(x<800) {
		// random values for grasselement input
		let randomWidth = getRandomInteger(10, 20);
		let randomHeight = getRandomInteger(20, 30);
		// draw this grass element
		drawGrassElement(x, 600, randomWidth, randomHeight);
		// move forward along the x-axis
		x += randomWidth - 1; 
	}
}
// information for drawing the sheep picture
let sheepInfo = {
    canvas: null,
    context: null,
    image: null,
    imageX: 0,
    imageY: 0,
}
// draw a picture of a sheep on canvas
drawSheep = () => {
	// reference to html canvas and set up context
	sheepInfo.canvas = document.querySelector("canvas");
	sheepInfo.context = sheepInfo.canvas.getContext("2d");
	// create instance of Image object and get the image source
	sheepInfo.image = new Image();
	sheepInfo.image.src = "sheep.png";
	// wait for image to load
	sheepInfo.image.onload = () => {
		// make sure image has right height/width ratio
		let aspectRatio = sheepInfo.image.width / sheepInfo.image.height;
		let invAspectRatio = 1.0 / aspectRatio;
		// set properties for image 
		let width = 150;
		sheepInfo.imageX = 600;
        sheepInfo.imageY = 450;
        sheepInfo.image.width  = width;
        sheepInfo.image.height = invAspectRatio*width;
        // draw image
	    sheepInfo.context.beginPath();
	    sheepInfo.context.drawImage(sheepInfo.image, sheepInfo.imageX, sheepInfo.imageY, sheepInfo.image.width, sheepInfo.image.height);
	    sheepInfo.context.closePath();
	}
}
// information for drawing the sine hills
let sinhillsInfo = {
	canvas: null,
	context: null,
	// all parameters in pixels
	startX: 0,
	startY: 550,
	rangeX: 800,
	amplitude: 15,
	period: 200,
	color: "LimeGreen"
}
// draw hills in the background in the shape of a sine
drawSinhills = (info) => {
	// reference to html canvas and set up context
	info.canvas = document.querySelector("canvas");
	info.context = info.canvas.getContext("2d");
	// draw path
	info.context.beginPath();
	info.context.moveTo(info.startX, 600)
	info.context.lineTo(info.startX, info.startY)
	// walk along the x-axis and calculate the corresponding y value with the Math.sin function
	for (let x = 0; x<=info.rangeX; x+=0.5) {
		let y = info.startY - info.amplitude * Math.sin(2*Math.PI*(1/info.period) * x);
		info.context.lineTo(info.startX + x, y)
	}
	info.context.lineTo(info.startX + info.rangeX, 600)
	info.context.closePath();
	info.context.fillStyle = info.color;
	info.context.fill();
}
// draw grey mountains in background on canvas
drawMountains = () => {
	// reference to html canvas and set up context
	canvas = document.querySelector("canvas");
	context = canvas.getContext("2d");
	// draw path
	context.beginPath();
	context.moveTo(0, 600);
	context.lineTo(0, 540);
	context.lineTo(100, 400);
	context.lineTo(200, 530);
	context.lineTo(240, 510);
	context.lineTo(250, 520);
	context.lineTo(300, 450);
	context.lineTo(420, 520);
	context.lineTo(500, 420);
	context.lineTo(530, 440);
	context.lineTo(555, 380);
	context.lineTo(600, 480);
	context.lineTo(680, 420);
	context.lineTo(740, 470);
	context.lineTo(800, 450);
	context.lineTo(800, 600);
	context.closePath();
	context.fillStyle = "DimGray"
	context.fill();
}
// information for the raindrop information
let raindropInfo = {
    canvas: null,
    context: null,
    image: null,
    imageY: -20,
    imageDY: 4,
    timestep: 0, //Milliseconds
    width: 8
}
// define Raindrop class
class Raindrop {
	// take the info object, an x-position and animation timestep (for falling speed)
	constructor(info, imageX, timestep) {
		this.context = info.context;
		this.image = null;
		this.imageX = imageX;
		this.imageY = info.imageY;
		this.imageDY = info.imageDY;
		this.timestep = timestep;
		this.width = info.width;
	}
	// animate the falling of the raindrop
	animateRaindrop() {
		// create new instance of Image object and get source reference
		this.image = new Image();
		this.image.src = "raindrop2.png";
		// wait until image loaded
		this.image.onload = () => {
			// make sure image has the right width/height ratio
			let aspectRatio = this.image.width / this.image.height;
			let invAspectRatio = 1.0/aspectRatio;
	        this.image.width = this.width;
	        this.image.height = invAspectRatio * this.width;
			// animation
			let redrawRaindrop = () => {
				// clear previous image
				this.context.clearRect(this.imageX, this.imageY, this.image.width, this.image.height);
			    // Shift image location
			    this.imageY += this.imageDY;
			    // draw image
			    this.context.beginPath();
			    this.context.drawImage(this.image, this.imageX, this.imageY, this.image.width, this.image.height);
			    this.context.closePath();
			    // when the image moves out of the canvas stop animation
				if (this.imageY > 600) {
					clearInterval(raindropAnimation);
					this.context.clearRect(this.imageX, this.imageY, this.image.width, this.image.height);
				}
			}
			// redraw raindrop every timestep
			let raindropAnimation = setInterval(redrawRaindrop, this.timestep);
		}
	}
}
// this variable will hold the Interval function for creating new raindrops
// need this global variable to be able to stop the interval function
let raindrops;
// this counter changes when the Let It Rain button gets clicked
// need this variable to make sure the rain button can only get clicked once
let raincounter=0;
// create all the raindrops
animateRain = () => {
	// only start the rain animation when it's not already raining
	if (raincounter == 0) {
		// increase rain animation counter
		++raincounter
		// reference to html canvas and set up context
		raindropInfo.canvas = document.querySelector("canvas");
		raindropInfo.context = raindropInfo.canvas.getContext("2d");
		// create raindrops repeatedly
		raindrops = setInterval(
			() => {
				// random x position
				let imageX = getRandomInteger(0, 800);
				// random velocity for falling
				let timestep = getRandomInteger(10, 30);
				// create new instance of Raindrop
				let myRaindrop = new Raindrop(raindropInfo, imageX, timestep)
				// animate raindrop
				myRaindrop.animateRaindrop()
			}, 50
		)
	}
}
// stop the rain animation
stopRain = () => {
	// reset rain counter to enable new rain animation
	raincounter = 0;
	// stop rain animation
	clearInterval(raindrops);
}