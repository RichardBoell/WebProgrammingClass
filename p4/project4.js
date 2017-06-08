// wait for DOM to load
window.onload = () => {
	// initialize canvas and context
	info.canvas = document.querySelector("#canvas");
	info.context = info.canvas.getContext("2d");
	// load the sprite for goat animation
	goatInfo.img = new Image();
	goatInfo.img.src = "goatcombined.png";
	// draw Canvas Background
	drawBackground();
	// wait for sprite to load
	goatInfo.img.onload = () => {
		// initialize by loading goat one time
		handleKeyup();
		// handle the keyboard events
		window.addEventListener("keydown", handleKeydown)
		window.addEventListener("keyup", handleKeyup)
	}
}
// global object that holds canvas and context info
let info = {
	canvas: null,
	context: null,
}
// global object that holds information about goat movement and the videos
let goatInfo = {
	img: null,
	sourceXMin: 144,
	sourceX: 0,
	sourceY: 0,
	width: 48,
	height: 48,
	canvasX: 200,
	canvasY: 60,
	leftVideo: null,
	rightVideo: null,
	inLeftZone: false,
	inRightZone: false,
	timeout: null,
}
// handle the keydown event
handleKeydown = (event) => {
	// check which key was pressed
	switch (event.keyCode) {
		case 37:
			//left
			moveLeft();
			break;
		case 38:
			//up
			moveUp();
			break;
		case 39:
			//right
			moveRight();
			break;
		case 40:
			//down
			moveDown();
			break;
	}
}
// handle the keyup event
handleKeyup = () => {
	// set position on the sprite
	goatInfo.sourceY = 0;
	goatInfo.sourceX = goatInfo.sourceXMin + 48;
	// clear canvas and draw background
	info.context.clearRect(0, 0, 800, 600);
	drawBackground()
	// draw the still standing goat
	info.context.drawImage(goatInfo.img, goatInfo.sourceX, goatInfo.sourceY, goatInfo.width, goatInfo.height, goatInfo.canvasX, goatInfo.canvasY, goatInfo.width, goatInfo.height);
}
// animate left movement
moveLeft = () => {
	// set position on the sprite
	goatInfo.sourceY = 48;
	// set flag that checks if goat is in the movie theatre zone to false
	// this is part of the mechanism to stop the video when goat moves out of movie theatre zone
	goatInfo.inLeftZone = false;
	goatInfo.inRightZone = false;
	// clear canvas and redraw background
	info.context.clearRect(0, 0, 800, 600);
	drawBackground()
	// draw goat
	info.context.drawImage(goatInfo.img, goatInfo.sourceX, goatInfo.sourceY, goatInfo.width, goatInfo.height, goatInfo.canvasX, goatInfo.canvasY, goatInfo.width, goatInfo.height);
	// move position on sprite to animate the movement
	goatInfo.sourceX += 48;
	// move the draw position on canvas so the goat doesn't "moonwalk"
	goatInfo.canvasX -= 12;
	// stay in range of left movement on sprite
	if (goatInfo.sourceX == goatInfo.sourceXMin + 144) goatInfo.sourceX = goatInfo.sourceXMin;
	// play video if goat is in the correct range
	playleftVideo();
	playRightVideo();
	// when leftvideo variable was initialized and goat moves out of movietheatre zone, stop the video
	if (goatInfo.leftVideo && !goatInfo.inLeftZone) stopLeftVideo();
	if (goatInfo.rightVideo && !goatInfo.inRightZone) stopRightVideo();
	// change goats fur color by moving to different position on sprite if the goat is in the "hair salon"
	changeColor();
}
// animate right movement
moveRight = () => {
	// set position on the sprite
	goatInfo.sourceY = 96;
	// set flag that checks if goat is in the movie theatre zone to false
	// this is part of the mechanism to stop the video when goat moves out of movie theatre zone
	goatInfo.inLeftZone = false;
	goatInfo.inRightZone = false;
	// clear canvas and redraw background
	info.context.clearRect(0, 0, 800, 600);
	drawBackground()
	// draw goat
	info.context.drawImage(goatInfo.img, goatInfo.sourceX, goatInfo.sourceY, goatInfo.width, goatInfo.height, goatInfo.canvasX, goatInfo.canvasY, goatInfo.width, goatInfo.height);
	// move position on sprite to animate the movement
	goatInfo.sourceX += 48;
	// move the draw position on canvas so the goat doesn't "moonwalk"
	goatInfo.canvasX += 12;
	// stay in range of right movement on sprite
	if (goatInfo.sourceX == goatInfo.sourceXMin + 144) goatInfo.sourceX = goatInfo.sourceXMin;
	// play video if goat is in the correct range
	playleftVideo();
	playRightVideo();
	// when leftvideo variable was initialized and goat moves out of movietheatre zone, stop the video
	if (goatInfo.leftVideo && !goatInfo.inLeftZone) stopLeftVideo();
	if (goatInfo.rightVideo && !goatInfo.inRightZone) stopRightVideo();
	// change goats fur color by moving to different position on sprite if the goat is in the "hair salon"
	changeColor();
}
// animate up movement
moveUp = () => {
	// set position on the sprite
	goatInfo.sourceY = 144;
	// set flag that checks if goat is in the movie theatre zone to false
	// this is part of the mechanism to stop the video when goat moves out of movie theatre zone
	goatInfo.inLeftZone = false;
	goatInfo.inRightZone = false;
	// clear canvas and redraw background
	info.context.clearRect(0, 0, 800, 600);
	drawBackground()
	// draw goat
	info.context.drawImage(goatInfo.img, goatInfo.sourceX, goatInfo.sourceY, goatInfo.width, goatInfo.height, goatInfo.canvasX, goatInfo.canvasY, goatInfo.width, goatInfo.height);
	// move position on sprite to animate the movement
	goatInfo.sourceX += 48;
	// move the draw position on canvas so the goat doesn't "moonwalk"
	goatInfo.canvasY -= 7;
	// stay in range of right movement on sprite
	if (goatInfo.sourceX == goatInfo.sourceXMin + 144) goatInfo.sourceX = goatInfo.sourceXMin;
	// play video if goat is in the correct range
	playleftVideo();
	playRightVideo();
	// when leftvideo variable was initialized and goat moves out of movietheatre zone, stop the video
	if (goatInfo.leftVideo && !goatInfo.inLeftZone) stopLeftVideo();
	if (goatInfo.rightVideo && !goatInfo.inRightZone) stopRightVideo();
	// change goats fur color by moving to different position on sprite if the goat is in the "hair salon"
	changeColor();
}
// animate down movement
moveDown = () => {
	// set position on the sprite
	goatInfo.sourceY = 0;
	// set flag that checks if goat is in the movie theatre zone to false
	// this is part of the mechanism to stop the video when goat moves out of movie theatre zone
	goatInfo.inLeftZone = false;
	goatInfo.inRightZone = false;
	// clear canvas and redraw background
	info.context.clearRect(0, 0, 800, 600);
	drawBackground()
	// draw goat
	info.context.drawImage(goatInfo.img, goatInfo.sourceX, goatInfo.sourceY, goatInfo.width, goatInfo.height, goatInfo.canvasX, goatInfo.canvasY, goatInfo.width, goatInfo.height);
	// move position on sprite to animate the movement
	goatInfo.sourceX += 48;
	// move the draw position on canvas so the goat doesn't "moonwalk"
	goatInfo.canvasY += 7;
	// stay in range of right movement on sprite
	if (goatInfo.sourceX == goatInfo.sourceXMin + 144) goatInfo.sourceX = goatInfo.sourceXMin;
	// play video if goat is in the correct range
	playleftVideo();
	playRightVideo();
	// when leftvideo variable was initialized and goat moves out of movietheatre zone, stop the video
	if (goatInfo.leftVideo && !goatInfo.inLeftZone) stopLeftVideo();
	if (goatInfo.rightVideo && !goatInfo.inRightZone) stopRightVideo();
	// change goats fur color by moving to different position on sprite if the goat is in the "hair salon"
	changeColor();
}
// play the left video if the goat walks in the left movie theatre zone
playleftVideo = () => {
	if (goatInfo.canvasX >= 120 && goatInfo.canvasX <= 340 && goatInfo.canvasY >= 290) {
		// clear automatic videoStop timer, so the video doesn't stop too early
		clearTimeout(goatInfo.timeout);
		// get reference to video tag
		goatInfo.leftVideo = document.querySelector("#leftVideo");
		// display video element
		goatInfo.leftVideo.style.display = "initial";
		// play video
		goatInfo.leftVideo.play();
		// stop video after 10 seconds
		goatInfo.timeout = setTimeout(stopLeftVideo, 10000);
		// set flag that checks if goat is in the movie theatre zone to false
		// this is part of the mechanism to stop the video when goat moves out of movie theatre zone
		goatInfo.inLeftZone = true;
	}
}
// stop the left video
stopLeftVideo = () => {
	// pause the left video
	goatInfo.leftVideo.pause();
	// reset the left video playing time to zero
	goatInfo.leftVideo.currentTime = 0;
	// fade out video and set style.display = "none" using jQuery's fadeOut() method
	$("#leftVideo").fadeOut(300);
}
// play the right video if the goat walks in the right movie theatre zone
playRightVideo = () => {
	if (goatInfo.canvasX >= 420 && goatInfo.canvasX <= 640 && goatInfo.canvasY >= 290) {
		// clear automatic videoStop timer, so the video doesn't stop too early
		clearTimeout(goatInfo.timeout);
		// get reference to the video tag
		goatInfo.rightVideo = document.querySelector("#rightVideo");
		// display video element
		goatInfo.rightVideo.style.display = "initial";
		// play left video
		goatInfo.rightVideo.play();
		// stop video after 10 seconds
		goatInfo.timeout = setTimeout(stopRightVideo, 10000);
		// set flag that checks if goat is in the movie theatre zone to false
		// this is part of the mechanism to stop the video when goat moves out of movie theatre zone
		goatInfo.inRightZone = true;
	}
}
// stop the right video
stopRightVideo = () => {
	// pause the left video
	goatInfo.rightVideo.pause();
	// reset the left video playing time to zero
	goatInfo.rightVideo.currentTime = 0;
	// fade out video and set style.display = "none" using jQuery's fadeOut() method
	$("#rightVideo").fadeOut(300);
}
// draw background elements on canvas
drawBackground = () => {
	// Hair Salon Text
	info.context.beginPath();
	info.context.font = "50px 'Aguafina Script'";
	info.context.fillStyle = "darkGrey";
	info.context.textAlign = "center";
	info.context.fillText("Hair Salon", info.canvas.width/2, 50);
	info.context.closePath();
	// black text underlining
	info.context.beginPath();
	info.context.strokeStyle = "black"
	info.context.moveTo(130, 55);
	info.context.lineTo(670, 55);
	info.context.stroke();
	info.context.closePath();
	// color box 1
	info.context.beginPath();
	info.context.fillStyle = "#F4F4F4";
	info.context.rect(130, 60, 50, 50);
	info.context.fill();
	info.context.stroke();
	info.context.closePath();
	// color box 2
	info.context.beginPath();
	info.context.fillStyle = "#FAEDD0";
	info.context.rect(200, 60, 50, 50);
	info.context.fill();
	info.context.stroke();
	info.context.closePath();
	// color box 3
	info.context.beginPath();
	info.context.fillStyle = "#141414";
	info.context.rect(270, 60, 50, 50);
	info.context.fill();
	info.context.stroke();
	info.context.closePath();
	// color box 4
	info.context.beginPath();
	info.context.fillStyle = "#5E5E5E";
	info.context.rect(340, 60, 50, 50);
	info.context.fill();
	info.context.stroke();
	info.context.closePath();
	// color box 5
	info.context.beginPath();
	info.context.fillStyle = "#FFFFFF";
	info.context.rect(410, 60, 50, 50);
	info.context.fill();
	info.context.stroke();
	info.context.closePath();
	// color box 6
	info.context.beginPath();
	info.context.fillStyle = "#EFDCB2";
	info.context.rect(480, 60, 50, 50);
	info.context.fill();
	info.context.stroke();
	info.context.closePath();
	// color box 7
	info.context.beginPath();
	info.context.fillStyle = "#9E751E";
	info.context.rect(550, 60, 50, 50);
	info.context.fill();
	info.context.stroke();
	info.context.closePath();
	// color box 8
	info.context.beginPath();
	info.context.fillStyle = "#BE9D54";
	info.context.rect(620, 60, 50, 50);
	info.context.fill();
	info.context.stroke();
	info.context.closePath();
	// left movie theatre
	info.context.beginPath();
	info.context.fillStyle = "MidnightBlue";
	info.context.rect(150, 330, 200, 70)
	info.context.fill();
	info.context.closePath();
	// left movie theatre text
	info.context.beginPath();
	info.context.font = "25px 'Impact'";
	info.context.fillStyle = "White";
	info.context.textAlign = "center";
	info.context.fillText("MOVIE THEATRE", 250, 380);
	info.context.closePath();
	// right movie theatre
	info.context.beginPath();
	info.context.fillStyle = "Maroon";
	info.context.rect(450, 330, 200, 70)
	info.context.fill();
	info.context.closePath();
	// right movie theatre text
	info.context.beginPath();
	info.context.font = "25px 'Impact'";
	info.context.fillStyle = "White";
	info.context.textAlign = "center";
	info.context.fillText("MOVIE THEATRE", 550, 380);
	info.context.closePath();
}
// change goats fur color when in right zone on canvas
changeColor = () => {
	// check for goats y position on canvas
	if(goatInfo.canvasY <= 70) {
		// check for goats x positions on canvas
		// light grey
		if(goatInfo.canvasX >= 120 && goatInfo.canvasX <= 140) {
			goatInfo.sourceXMin = 0;
			handleKeyup();
		}
		// white brown
		if(goatInfo.canvasX >= 190 && goatInfo.canvasX <= 210) {
			goatInfo.sourceXMin = 144;
			handleKeyup();
		}
		// black
		if(goatInfo.canvasX >= 260 && goatInfo.canvasX <= 280) {
			goatInfo.sourceXMin = 288;
			handleKeyup();
		}
		// grey
		if(goatInfo.canvasX >= 330 && goatInfo.canvasX <= 350) {
			goatInfo.sourceXMin = 432;
			handleKeyup();
		}
		// white
		if(goatInfo.canvasX >= 400 && goatInfo.canvasX <= 420) {
			goatInfo.sourceXMin = 576;
			handleKeyup();
		}
		// light brown
		if(goatInfo.canvasX >= 470 && goatInfo.canvasX <= 490) {
			goatInfo.sourceXMin = 720;
			handleKeyup();
		}
		// brown
		if(goatInfo.canvasX >= 540 && goatInfo.canvasX <= 560) {
			goatInfo.sourceXMin = 864;
			handleKeyup();
		}
		// medium brown
		if(goatInfo.canvasX >= 610 && goatInfo.canvasX <= 630) {
			goatInfo.sourceXMin = 1008;
			handleKeyup();
		}
	}
}