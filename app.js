// Loading the NPM Package inquirer
var inquirer = require("inquirer");
// Load ingthe NPM Package fs
var fs = require("fs");
// Loading the BasicFlashcard constructor
var BasicFlashcard = require("./basicflashcard");
// Loading the ClozeDeletedFlashcard constructor
var ClozeDeletedFlashcard = require("./clozedeletedflashcard");

var qAndaArray = [];
// An array to hold Basic Flashcards
var basicFlashcardsArray = [];
// An array to hold Cloze=Deleted Flashcards
var clozedDeletedFlachcardsArray = [];
// a variable to hold the position af the cloze-deleted
var position;

var temp = [];

var questionCounter = 0;

// Reading the Basic Flashcards textfile and creating an instance of BasicFlashcard object
// with the question and answer properties and finally adding it to the basicFlashcardsArray
var readAndSplitBasicFlashcardTextFile = function() {

  fs.readFile("basicflashcards.txt", "utf8", function(err, data) {
    // If there is no error
    if(!err) {
      // removing the newline character 
      qAndaArray = data.split("\n");

      // For each line (which contains a question and it's answer)      
      for (var i = 0; i < qAndaArray.length; i++) {
        // removing the question and answer separator (" | ")
        temp = qAndaArray[i].split(" | ");
        // removing "Question:" and "Answer:" from the text, creating an instance of
        // the BasicFlashcard object and set the properties to question and answer
        aBasicFlashcard = new BasicFlashcard(temp[0].slice(9), temp[1].slice(7));
        
        // Empty the array
        temp.length = 0;
        // Add the object to the array
        basicFlashcardsArray.push(aBasicFlashcard);
      }
    }
    //if there is an error log the message
    else {
      console.log(err);
    }
     readAndSplitClozeDeletedFlashcardTextFile();  
  });
};

var readAndSplitClozeDeletedFlashcardTextFile = function() {

  fs.readFile("clozedeletedflashcards.txt", "utf8", function(err, data) {
    // If there is no error
    if(!err) {
      // removing the newline character 
      qAndaArray = data.split("\n");

      // For each line (which contains a question and it's answer)      
      for (var i = 0; i < qAndaArray.length; i++) {
        // removing the question and answer separator (" | ")
        temp = qAndaArray[i].split(" | ");
        // removing "Question:" and "Answer:" from the text, creating an instance of
        // the BasicFlashcard object and set the properties to question and answer
        aClozeDeletedFlashcard = new ClozeDeletedFlashcard(temp[0].slice(9), temp[1].slice(7));
        // Emty the array
        temp.length = 0;
        // Add the object to the array
        clozedDeletedFlachcardsArray.push(aClozeDeletedFlashcard);
      }
    }
    //if there is an error log the message
    else {
      console.log(err);
    }
     runThePrompt();  
  });
};



var runThePrompt = function() {
// Creating a "Prompt" for selecting the flashcard type or exiting the app
  inquirer.prompt([

    {
      type: "list",
      name: "menu",
      message: "\nWhat would you like to do?",
      choices: ["Create Basic Flashcrad", "Create Cloze-Deleted Flashcard", "Play Basic Flashcards", "Play Cloze-Deleted Flashcards", "Exit"]
    }


    ]).then(function(user) {
      // If the user has chosen to creat Basic Flashcards
      if (user.menu === "Create Basic Flashcrad") {
        promptForBasicFlashcardsContent();
      }
      // If the user has chosen to creat Cloze-Deleted Flashcards
      else if (user.menu === "Create Cloze-Deleted Flashcard"){
        promptForClozeDeletedFlashcardsContent();
      }
      else if (user.menu === "Play Basic Flashcards") {
        promptForPlayingBasicFlashcards();
      }
      else if (user.menu === "Play Cloze-Deleted Flashcards") {
        promptForPlayingClozeDeletedFlashcards();
      }
      // If the user has chosen to quit
      else {
        process.exit();
      }
  });

};
// A function beeing called when the user has chosen to create Basic Flashcards.
var promptForBasicFlashcardsContent = function() {
  // Prompt for getting the contents of front and back of the Basic Flashcard.
  inquirer.prompt([
  
  {
    type: "input",
    name: "front",
    message: "Please type the question to be displayed on the flashcard's front.\n",
    //validating the input to make sure it has been entered
    validate: function(value) {
      
      if (value !== "") {
        return true;
      }
      else {
        return false;
      }
    }
  },

  {
    type: "input",
    name: "back",
    message: "Please type the answer to be displayed on the flashcard's back.\n",
    //validating the input to make sure it has been entered
    validate: function(value) {
      if (value !== "") {
        return true;
      }
      else {
        return false;
      }
    }
  }

  ]).then(function(user) {
    // Making an instance of Basic Flashcard
    var aBasicFlashcard = new BasicFlashcard(user.front, user.back);
    // Giving the option to the user to save or discard the Basic Flashcard just was created
    inquirer.prompt([
  
      {
        type: "confirm",
        name: "confirmAddingToTheBasicFlashcards",
        message: `Would you like to add this flashcard to the deck of Basic flashcards:\nQuestion: ${user.front}\nAnswer: ${user.back}\n`
      }
    ]).then(function(user) {
      // User wants to save the Basic Flashcard.
      if (user.confirmAddingToTheBasicFlashcards) {

        console.log("\nFollowing Basic Flashcard was added to the deck of Basic Flashcards:");
        // Display the Flashcard
        aBasicFlashcard.displayFlashcard();
        // Appendin the flashcard to the text file
        aBasicFlashcard.appendToTheTextFile("basicflashcards.txt");
        // Adding the flashcard to the array
        basicFlashcardsArray.push(aBasicFlashcard);
      }
      // User does not want to save the Basic Flashcard.
      else {
        console.log("The flashcard was not added to the deck of Basic Flashcards.");
      }

      }).then(function() {
          runThePrompt();
      });
  });
};
// A function beeing called when the user has chosen to create Cloze-Deleted Flashcards.
var promptForClozeDeletedFlashcardsContent = function() {
  // Prompt for getting the contents of front and back of the Cloze-Deletred Flashcard
  inquirer.prompt([
  
  {
    type: "input",
    // User enters the whole question including the cloze-deleted part
    name: "fullText",
    message: "Please type the whole contents including the part which should be cloze deleted.\n",
    //validating the input to make sure it has been entered
    validate: function(value) {
      if (value !== "") {
        return true;
      }
      else {
        return false;
      }
    }
  },

  {
    type: "input",
    name: "clozeDeleted",
    message: "Please type only the part which should be cloze deleted .\n",
    //validating the input to make sure it has been entered
    validate: function(value) {
      
      if (value !== "") {
        return true;
      }
      else {
        return false;
      }
    }
  }

  ]).then(function(user) {
    // Finding the location of the cloze-deleted answer in the question
    position = user.fullText.indexOf(user.clozeDeleted);
    // If the entered answer is in the question entered by the user
    if (position !== -1) {   
      // Making an instance of Basic Flashcard
      var aClozeDeletedFlashcard = new ClozeDeletedFlashcard(user.fullText, user.clozeDeleted);
      // Giving the option to the user to save or discard the Flashcard just was created
      inquirer.prompt([
    
        {
          type: "confirm",
          name: "confirmAddingToTheClozeDeletedFlashcards",
          message: `Would you like to add this flashcard to the deck of Cloze-Deleted flashcards:\nQuestion: ${aClozeDeletedFlashcard.front}\nAnswer: ${aClozeDeletedFlashcard.clozeDelet}\n`
        }



      ]).then(function(user) {
        // If the user has confirmed adding the flashcard
        if ((user.confirmAddingToTheClozeDeletedFlashcards) && (position !== -1)) {
        
        console.log("\nFollowing Cloze Deleted Flashcard was added to the deck of ClozeDeleted Flashcards:");
        // Displaying front of the Cloze0deleted flashcard
        aClozeDeletedFlashcard.displayFront();
        // Displaying back of the Cloze0deleted flashcard
        aClozeDeletedFlashcard.displayCloze();
        // Appendin the flashcard to the text file
        aClozeDeletedFlashcard.appendToTheTextFile("clozedeletedflashcards.txt");
        // Adding the flashcard to the array
        clozedDeletedFlachcardsArray.push(aClozeDeletedFlashcard);
        }
        // If the user does not want to add the flashcard to the array
        else {
          console.log("The flashcard was not added to the deck of Cloze-Deleted Flashcards.");
        }

      }).then(function() {
          runThePrompt();
      });
    }
    //If the user has entered a cloze deleted question and does not want to save it
    else {
      console.log(`${user.clozeDeleted} is not part of the ${user.fullText}\nFlashcard has been discarded.`);
      runThePrompt();
    }
  });
}

var promptForPlayingBasicFlashcards = function() {
  // A loop with the index of questionCounter
  if (questionCounter < basicFlashcardsArray.length) {

    console.log("\n" + basicFlashcardsArray[questionCounter].front + "\n")

    inquirer.prompt([
    
      {
        type: "input",
        name: "basicFlashcardanswer",
        message: "Please type the answer.\n",
        //validating the input to make sure it has been entered
        validate: function(value) {
          
          if (value !== "") {
            return true;
          }
          else {
            return false;
          }
        }
      }
    ]).then(function(user) {
        // Checking the user's answer vs right answer (case insensitive)
        if (user.basicFlashcardanswer.toUpperCase() === basicFlashcardsArray[questionCounter].back.toUpperCase()) {
          console.log("Right Answer");
        }
        else {
          console.log("Wrong Answer\nThe right answer is: " + basicFlashcardsArray[questionCounter].back);
        }
         // Incrementing the loop index
        questionCounter++;
        // recursion in loop
        promptForPlayingBasicFlashcards();
      });

  }

  else {
    
    console.log("\nThere are no more Basic Flashcards to play.");
    // Reseting the loop counter
    questionCounter = 0;

    runThePrompt();
  }

};

var promptForPlayingClozeDeletedFlashcards = function() {
  // A loop with the index of questionCounter  
  if (questionCounter < clozedDeletedFlachcardsArray.length) {

    console.log("\n" + clozedDeletedFlachcardsArray[questionCounter].fullText + "\n");

    inquirer.prompt([   
    
      {
        type: "input",
        name: "clozeDeletedFlashcardanswer",
        message: "Please type the answer.\n",
        //validating the input to make sure it has been entered
        validate: function(value) {
          
          if (value !== "") {
            return true;
          }
          else {
            return false;
          }
        }
      }
    ]).then(function(user) {
        // Checking the user's answer vs right answer (case insensitive)
        if (user.clozeDeletedFlashcardanswer.toUpperCase() === clozedDeletedFlachcardsArray[questionCounter].clozeDelet.toUpperCase()) {
          console.log("Right Answer");
        }
        else {
          console.log("Wrong Answer\nThe right answer is: " + clozedDeletedFlachcardsArray[questionCounter].clozeDelet);
        }
        // Incrementing the loop index
        questionCounter++;
        // recursion in loop
        promptForPlayingClozeDeletedFlashcards();
      });

  }

  else {

    console.log("\nThere are no more Cloze Deleted Flashcards to play.");
    // Reseting the loop counter
    questionCounter = 0;

    runThePrompt();
  }
};

readAndSplitBasicFlashcardTextFile();
