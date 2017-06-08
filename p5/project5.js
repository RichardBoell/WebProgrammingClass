// wait for DOM to load
window.onload = () => {
	// set canvas and context in global object
	info.canvas = document.querySelector("#canvas");
	info.context = info.canvas.getContext("2d");
	// populate the color dropdown list 
	populateColorDropdown()
	// if locally saved shapes exist, parse them and pass them into the global savedShapes array
	if (localStorage["savedShapes"]) {
		savedShapes = JSON.parse(localStorage["savedShapes"]);
		redrawCanvas();
	};
	// handle mouse events
	info.canvas.addEventListener("mousedown", handleMouseDown);
	info.canvas.addEventListener("mousemove", handleMouseMove);
	info.canvas.addEventListener("mouseup", handleMouseUp);
	// handle shapeDropdown changes
	let shapeDropdown = document.querySelector("#shapes");
	shapeDropdown.addEventListener("change", handleShapeDropdownChange);
	// handle colorDropdown changes
	let colorDropdown = document.querySelector("#colors");
	colorDropdown.addEventListener("change", handleColorDropdownChange)
	// handle clearCanvas button click event
	let clearCanvasButton = document.querySelector("#clearCanvas");
	clearCanvasButton.addEventListener("click", clearCanvas);
}
// global object, that contains globally needed variables
let info = {
	canvas: null,
	context: null,
	selectedShape: 0,
	selectedColor: 0,
	grabbedType: 0,
	grabbedColor: 0,
	grabbedIndex: 0,
	mousedown: false,
}
// global Array with color names for Canvas background
const colors = ["Salmon", "Lavender", "DarkSlateBlue", "DarkRed", "CornflowerBlue", "Coral", "Cornsilk", "DeepSkyBlue", "MidnightBlue", "SteelBlue", "SpringGreen"];
// global Array containing the saved shapes
let savedShapes = [];
// parent shape class containing color and position properties
class Shape {
	constructor(x, y, color) {
		this.position = {
			x,
			y
		};
		this.color = color;
	}
}
// derived square class containing the draw methods
class Square extends Shape {
	// get properties from parent class and add the type property
	constructor(x, y, color) {
		super(x, y, color);
		this.type = "square";
	}
	// function to draw filled shape an canvas
	draw() {
		let width = 30;

		info.context.beginPath();
		info.context.rect(this.position.x - width/2, this.position.y - width/2, width, width);
		info.context.fillStyle = this.color;
		info.context.fill();
	}
	// function to draw shape outline on canvas
	drawOutline() {
		let width = 30;

		info.context.beginPath();
		info.context.rect(this.position.x - width/2, this.position.y - width/2, width, width);
		info.context.strokeStyle = "black";
		info.context.stroke();
	}
}
// derived circle class containing the draw methods
class Circle extends Shape {
	// get properties from parent class and add the type property
	constructor(x, y, color) {
		super(x, y, color);
		this.type = "circle";
	}
	// function to draw filled shape an canvas
	draw() {
		info.context.beginPath();
		info.context.arc(this.position.x, this.position.y, 30, 0, 2 * Math.PI);
		info.context.fillStyle = this.color;
		info.context.fill();
	}
	// function to draw shape outline on canvas
	drawOutline() {
		info.context.beginPath();
		info.context.arc(this.position.x, this.position.y, 30, 0, 2 * Math.PI);
		info.context.strokeStyle = "black";
		info.context.stroke();
	}
}
// derived triangle class containing the draw methods
class Triangle extends Shape {
	// get properties from parent class and add the type property
	constructor(x, y, color) {
		super(x, y, color);
		this.type = "triangle";
	}
	// function to draw filled shape an canvas
	draw() {
		let width = 30;

		info.context.beginPath();
		info.context.moveTo(this.position.x - width/2, this.position.y + width/2);
		info.context.lineTo(this.position.x + width/2, this.position.y + width/2);
		info.context.lineTo(this.position.x, this.position.y - width/2);
		info.context.closePath();
		info.context.fillStyle = this.color;
		info.context.fill();
	}
	// function to draw shape outline on canvas
	drawOutline() {
		let width = 30;

		info.context.beginPath();
		info.context.moveTo(this.position.x - width/2, this.position.y + width/2);
		info.context.lineTo(this.position.x + width/2, this.position.y + width/2);
		info.context.lineTo(this.position.x, this.position.y - width/2);
		info.context.closePath();
		info.context.strokeStyle = "black";
		info.context.stroke();
	}
}
// handle the mousedown event
handleMouseDown = (event) => {
	// get value from checkbox
	let MoveShapesChecked = document.querySelector("#moveShapes").checked
	// if the checkbox is checked, procede with moving shapes around
	if (MoveShapesChecked) {
		moveShapes(event);
	// else draw new shapes on canvas when clicked
	} else {
		drawShapes(event);
	}
}
// handle the mousemove event
handleMouseMove = (event) => {
	// check if mouse is down at the moment
	if (info.mousedown) {
		let x = event.pageX - info.context.canvas.offsetLeft;
		let y = event.pageY - info.context.canvas.offsetTop;
		// pass information about clicked upon shape into object
		let shapeInfo = {type: info.grabbedType, position: {x: x, y: y}};
		// clear canvas
		info.context.clearRect(0, 0, info.canvas.width, info.canvas.height);
		// redraw previous shapes
		redrawCanvas();
		// draw outline around clicked shape
		drawStoredOutline(savedShapes[info.grabbedIndex]);
		// draw the shape outline while moving
		drawStoredOutline(shapeInfo);
	};
}
// handle the mouseup event
handleMouseUp = (event) => {
	// check info.mousedown flag
	if (info.mousedown) {
		// if flag was true set it to false to end shapemove actions
		info.mousedown = false;
		// get mouse coordinates
		let x = event.pageX - info.context.canvas.offsetLeft;
		let y = event.pageY - info.context.canvas.offsetTop;
		// pass information about previously grabbed shape into object, but set its coordinates to current mouse coordinates
		let shapeInfo = {type: info.grabbedType, position: {x: x, y: y}, color: info.grabbedColor};
		// save these information in global saved shapes array
		savedShapes.push(shapeInfo)
		// delete the previous location of the shape in the global saved shapes array
		savedShapes.splice(info.grabbedIndex, 1);
		// update local storage
		localStorage.setItem("savedShapes", JSON.stringify(savedShapes));
		// clear canvas
		info.context.clearRect(0, 0, info.canvas.width, info.canvas.height);
		// redraw saved shapes
		redrawCanvas();
	};
}
// move already drawn shapes
moveShapes = (event) => {
	// loop through saved shapes array
	// start with last shape to always select the shape on top if they overlap
	for (let i=(savedShapes.length-1); i>=0; --i) {
		// check if mouse is clicked on a shape or just empty canvas
		if (isOnShape(savedShapes[i], event)) {
			// draw shape outline around the shape that was clicked
			drawStoredOutline(savedShapes[i]);
			// set global mousedown flag to true, so that the shape outline gets drawn when the mouse moves
			info.mousedown = true;
			// store shape type
			info.grabbedType = savedShapes[i].type;
			// store shape color
			info.grabbedColor = savedShapes[i].color;
			// store shape index in the array
			info.grabbedIndex = i;
			// break out of loop so only one shape can get selected at a time
			break;
		}
	}
}
// draw new shapes
drawShapes = (event) => {
	// can selected color from dropdown
	let selectedColor = colors[info.selectedColor];
	// mouse position, account for canvas offset
	let x = event.pageX - info.context.canvas.offsetLeft
	let y = event.pageY - info.context.canvas.offsetTop
	// check which shape is selected from the dropdown
	if (info.selectedShape == 0) {
		// new instance of Square object
		let mySquare = new Square(x, y, selectedColor);
		// add this new square to the saved shapes array
		savedShapes.push(mySquare);
		// update local storage
		localStorage.setItem("savedShapes", JSON.stringify(savedShapes));
		// draw all the shapes (including the new one) on canvas
		mySquare.draw();
	} else if (info.selectedShape == 1) {
		let myCircle = new Circle(x, y, selectedColor);
		savedShapes.push(myCircle);
		localStorage.setItem("savedShapes", JSON.stringify(savedShapes));
		myCircle.draw();
	} else if (info.selectedShape == 2) {
		let myTriangle = new Triangle(x, y, selectedColor);
		savedShapes.push(myTriangle);
		localStorage.setItem("savedShapes", JSON.stringify(savedShapes));
		myTriangle.draw();
	}
}
// populate the color dropdown with the colors array elements
populateColorDropdown = () => {
	// reference to select element
	let colorDropdown = document.querySelector("#colors");
	// loop through colors array and append a new option tag for each color
	for (var i=0; i<colors.length; ++i) {
		// create new option tag and give it a text and value
		let newOption = document.createElement("option");
		newOption.text = colors[i];
		newOption.value = i;
		// append new option tag to dropdown menu
		colorDropdown.appendChild(newOption);
	}
}
// handle changes in the shape dropdown menu
handleShapeDropdownChange = event => info.selectedShape = event.target.value;
// handle changes in the color dropdown menu
handleColorDropdownChange = event => info.selectedColor = event.target.value;
// redraw canvas with shapes saved in the array
redrawCanvas = () => {
	// loop over saved shapes array
	for (let i=0; i<savedShapes.length; ++i) {
		// draw shape on canvas
		drawStoredShape(savedShapes[i]);
	}
};
// clear canvas and delete saved shapes
clearCanvas = () => {
	// clear canvas
	info.context.clearRect(0, 0, info.canvas.width, info.canvas.height);
	// delete shapes saved on local storage
	localStorage.removeItem("savedShapes");
	// delete shapes saved in global array
	savedShapes = [];
}
// draw shapes that are stored on local storage or in the global array
// these shapes don't have the draw() method, only the properties
// pass as parameter an object with the shape properties
drawStoredShape = (shapeInfo) => {
	// square
	if (shapeInfo.type == "square") {
		// new instance of Square Object
		let mySquare = new Square(shapeInfo.position.x, shapeInfo.position.y, shapeInfo.color);
		// draw that new shape on canvas
		mySquare.draw();
	}
	// circle
	if (shapeInfo.type == "circle") {
		let myCircle = new Circle(shapeInfo.position.x, shapeInfo.position.y, shapeInfo.color);
		myCircle.draw();
	}
	// triangle
	if (shapeInfo.type == "triangle") {
		let myTriangle = new Triangle(shapeInfo.position.x, shapeInfo.position.y, shapeInfo.color);
		myTriangle.draw();
	}
}
// draw the outline of a shape that is stored on local storage or in the global array
// see drawStoredShape()
drawStoredOutline = (shapeInfo) => {
	if (shapeInfo.type == "square") {
		let mySquare = new Square(shapeInfo.position.x, shapeInfo.position.y, shapeInfo.color);
		mySquare.drawOutline();
	}
	if (shapeInfo.type == "circle") {
		let myCircle = new Circle(shapeInfo.position.x, shapeInfo.position.y, shapeInfo.color);
		myCircle.drawOutline();
	}
	if (shapeInfo.type == "triangle") {
		let myTriangle = new Triangle(shapeInfo.position.x, shapeInfo.position.y, shapeInfo.color);
		myTriangle.drawOutline();
	}
}
// function to check if the mouse position is in the range of a drawn shape
isOnShape = (shape, event) => {
	// mouse position, account for canvas offset
	let mouseX = event.pageX - info.context.canvas.offsetLeft;
	let mouseY = event.pageY - info.context.canvas.offsetTop;
	// shape position
	let shapeX = shape.position.x;
	let shapeY = shape.position.y;
	// shape is of type square
	if (shape.type == "square") {
		// check rectangular boundaries
		if ( (mouseX  >= (shapeX - 15)) && (mouseX  <= (shapeX + 15)) && (mouseY  >= (shapeY - 15)) && (mouseY  <= (shapeY + 15)) ) {
			return true;
		} else {
			return false;
		}
	// shape is of type circle
	} else if (shape.type == "circle") {
		// helpful variables
		let yDiff = shapeY - mouseY;
		let xDiff = mouseX - shapeX;
		let xRightBorder = shapeX + Math.sqrt(900 - yDiff * yDiff);
		let xLeftBorder = shapeX - Math.sqrt(900 - yDiff * yDiff);
		let yLowerBorder = shapeY + Math.sqrt(900 - xDiff * xDiff);
		let yUpperBorder = shapeY - Math.sqrt(900 - xDiff * xDiff);
		// check circle boundaries
		if ( (mouseX >= xLeftBorder) && (mouseX <= xRightBorder) && (mouseY >= yUpperBorder) && (mouseY <= yLowerBorder)) {
			return true;
		} else {
			return false;
		}
	// shape is of type triangle
	} else if (shape.type == "triangle") {
		// helpful variables
		let alpha = Math.acos(15/30);
		let yDiff = Math.abs(15 - (shapeY - mouseY));
		let xDiff = Math.abs(shapeX - mouseX);
		let xRightBorder = shapeX + Math.tan(alpha) * yDiff;
		let xLeftBorder = shapeX - Math.tan(alpha) * yDiff;
		let yUpperBorder = shapeY - 15 + xDiff/(Math.tan(alpha));
		let yLowerBorder = shapeY + 15;
		// check triangle boundaries
		if ( (mouseX >= xLeftBorder) && (mouseX <= xRightBorder) && (mouseY >= yUpperBorder) && (mouseY <= yLowerBorder)) {
			return true;
		} else {
			return false;
		}
	}
}




