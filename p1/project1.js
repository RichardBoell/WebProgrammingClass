init = () => {
	// Adjust the height of the black layer to cover (only) the picture
	positionAllElements();
	/* Update time and quote/author one time at beginning,
	because setInterval fires not before 500, 5000 Milliseconds respectively */
	updateDateTime()
	updateQuotes()
	// Call updateDateTime function every 500 Milliseconds
	setInterval(updateDateTime, 500);
	// Call updateQuotes function every 5 seconds
	setInterval(updateQuotes, 5000);

	
}

// Function to set the text in the #dateSpan to the String of the current time
updateDateTime = () => document.querySelector("#dateSpan").innerHTML = Date()

// Function to update the innerHTML of #quoteSpan and #authorSpan with a random quote/author
updateQuotes = () => {
	// Two synchronized arrays containing famous quotations and their authors
	let quotations = [
		"\"Only two things are infinite, the universe and human stupidity, and I'm not sure about the former.\"",
		"\"If the facts don't fit the theory, change the facts.\"",
		"\"Design is not just what it looks like and feels like. Design is how it works.\"",
		"\"When something is important enough, you do it even if the odds are not in your favor.\"",
		"\"The first principle is that you must not fool yourself and you are the easiest person to fool.\""
	];
	let authors = [
		"Albert Einstein",
		"Albert Einstein",
		"Steve Jobs",
		"Elon Musk",
		"Richard P. Feynman"
	];
	// get reference to the two spans
	let quoteSpan = document.querySelector("#quoteSpan");
	let authorSpan = document.querySelector("#authorSpan");
	// get random number between 0 and 4
	let randomNumber = Math.floor(Math.random() * quotations.length)
	// update innerHTML of the spans corresponding to the random number
	quoteSpan.innerHTML = quotations[randomNumber];
	authorSpan.innerHTML = authors[randomNumber];
}
// Adjust the height of the black layer to cover (only) the picture
positionAllElements = () => {
	let headerSectionDiv = document.querySelector("#headerSection");
	let blackLayer = document.querySelector("#blackLayer");
	blackLayer.style.height = `${headerSectionDiv.offsetHeight}px`
}

window.onload = init;
window.onresize =positionAllElements;