var fs = require("fs");

// Constructor for Cloze-Deleted Flashcards
var ClozeDeletedFlashcard = function(fullText, clozeDelet) {

	this.fullText = fullText;

	this.clozeDelet = clozeDelet;

	this.front = this.fullText.replace(this.clozeDelet, "^________^");
};

ClozeDeletedFlashcard.prototype.displayFullText = function() {

	console.log(`Full Text: ${this.fullText}`);
}

ClozeDeletedFlashcard.prototype.displayCloze = function() {

	console.log(`Back of the flashcard: ${this.clozeDelet}`);
};

ClozeDeletedFlashcard.prototype.displayFront = function() {

	console.log(`Front of the flashcard: ${this.front}`);
};

ClozeDeletedFlashcard.prototype.appendToTheTextFile = function(textFileName) {
	fs.appendFile(textFileName, "Question:" + this.front + " | Answer:" + this.clozeDelet + "\n", function(err) {

  // If an error was experienced we say it.
    if (err) {
      console.log(err);
    }

  });
}

module.exports = ClozeDeletedFlashcard;