var inquirer = require('inquirer'); // include inquirer package

var fs = require('fs'); //include fs package
 
var BasicCard = require('./BasicCard.js'); // include BasicFlashcard Constructor

var ClozeCard = require('./ClozeCard.js'); // // include ClozeFlashcard Constructor

// Question to ask on script run.
var runQuestion = {
   
    name: 'runType',
    message: 'Would you like to view flashcards or create new flashcards?',
    type: 'list',
    choices: ['View', 'Create']

};

// Questions to ask when creating new cards.
var createCardQuestions = [
    {
        name: 'type',
        type: 'list',
        message: 'What kind of flashcard would you like to make?',
        choices: ['basic', 'cloze']
    },
    {
        name: 'front',
        type: 'input',
        message: 'What should be on the front of the card?',
        when: function (answers) {
            
            return (answers.type === 'basic');
        
        }
    },
    {
        name: 'back',
        type: 'input',
        message: 'What should be on the back of the card?',
        when: function (answers) {
            
            return (answers.type === 'basic');
        
        }
    },
    {
        name: 'text',
        type: 'input',
        message: 'What should be the full text of the card?',
        when: function (answers) {
            
            return (answers.type === 'cloze');
        
        }
    },
    {
        name: 'cloze',
        type: 'input',
        message: 'What should be the cloze deleted text of the card?',
        when: function (answers) {
            
            return (answers.type === 'cloze');
        
        }
    }
];

// Inquirer prompt on script run.
var runPrompt = function () {
    
    inquirer.prompt(runQuestion).then(function (answers) {
        
        if (answers.runType === 'View') 
          {
            
            viewCards();
            //viewFlashCards();
        
          } 
           else 
             {
                createCardPrompt();
             }
    });
};

// On script run, run the initial prompt.
runPrompt();

// Inquirer prompt to get new card data.
var createCardPrompt = function () {
    inquirer.prompt(createCardQuestions).then(function (answers) {
        
        logCard(answers);
        
    });
};

// Save the new card to cards.txt.
var logCard = function (answers) {
    var appendText;
    if (answers.type === 'basic') {
        appendText = {
            type: answers.type,
            front: answers.front,
            back: answers.back
        };
    } else {
        appendText = {
            type: answers.type,
            text: answers.text,
            cloze: answers.cloze
        };
    }

    fs.appendFile("cards.txt", JSON.stringify(appendText) + '\r\n');
};

// Read cards from cards.txt and create a new card of that type with the correct constructor.
// Then,run the constructor methods to show the card content.
var viewCards = function () {
    // Read cards.
    inquirer.prompt({

        name: 'cardType',
        message: 'Choose the type of flashcards you want to view?',
        type: 'list',
        choices: ['basic', 'cloze']


    }).then(function (answers) {

    fs.readFile("cards.txt", 'utf8', function (error, data) {
        if(error) console.log(error);
        
        // Split on line breaks.
         var cards = data.split("\n");

        // For each card,
        cards.forEach(function (card) {
            
            // If it's not a blank line,
            if (card.length > 0) {
                // Parse the JSON.
                card = JSON.parse(card);

                 // Create a basic card if the type is basic.
                 if (card.type === "basic" && answers.cardType === "basic") {

                    var newBasicCard = new BasicCard(card.front, card.back);
                    // View the front of the basic flashcard
                    console.log(newBasicCard.showFront());
                    
                // Create a cloze card if the type is cloze.
                } else {

                 if (card.type === "cloze" && answers.cardType === "cloze") {

                    var newClozeCard = new ClozeCard(card.text, card.cloze);
                    // view the partial text of the cloze deleted flashcard
                    console.log(newClozeCard.showPartial());
                    
                }

              }
        
            }
    });
});
});

};