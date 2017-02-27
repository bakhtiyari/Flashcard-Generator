var fs = require("fs");

// Constructor for Basic Flashcards
var BasicFlashcard = function(front, back) {

	this.front = front;

	this.back = back;
};

BasicFlashcard.prototype.displayFront = function() {

	console.log(`Front of the flashcard: ${this.front}`);
};

BasicFlashcard.prototype.displayBack = function() {

	console.log(`Back of the flashcard: ${this.back}`);
};

BasicFlashcard.prototype.displayFlashcard = function() {

	console.log(`Front of the flashcard: ${this.front}\nBack of the flashcard:  ${this.back}`);
}

BasicFlashcard.prototype.appendToTheTextFile = function(textFileName) {
	fs.appendFile(textFileName, "Question:" + this.front + " | Answer:" + this.back + "\n", function(err) {

  // If an error was experienced we say it.
    if (err) {
      console.log(err);
    }

  });
}

module.exports = BasicFlashcard;