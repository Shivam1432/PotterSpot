var questions = [{
    question: "What is the platform number and name of station Harry needs to be at?",
    choices: ["Platform 9 3/4, King's Stop", "Platform 9 3/4, King's Cross", "Platform 9 1/3,King's Cross", "Platform 9 3/4, Queen's Cross"],
    correctAnswer: 1
}, {
    question: "Where does Hermione buy Crookshanks from?",
    choices: ["Magical Pet Store", "Cat and Owls", "Eeylops Emporium", "Magical Menagerie"],
    correctAnswer: 3
}, {
    question: "What is the name of Voldemort's and Dumbledore's mother respectively?",
    choices: ["Merope, Jane", "Merope, Kendra", "Kendra, Narcissa", "Lily, Molly"],
    correctAnswer: 1
}, {
    question: "What is the patronus form of Cho Chang?",
    choices: ["Hare", "Otter", "Swan", "Horse"],
    correctAnswer: 2
}, {
    question: "What is the codename for Lee Jordan on Potterwatch?",
    choices: ["River", "Royal", "Romulus", "Rapier"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
    if(correctAnswers/questions.length>.85)
    {
        document.getElementById("res").innerHTML="Congratulations! You are a certified PotterHead. The Sorting Hat might consider putting you in Ravenclaw.";
    }
    else if(correctAnswers/questions.length>.65 && correctAnswers/questions.length<=.85)
    {
        document.getElementById("res").innerHTML="That was an impressive attempt. But not one of the best. Maybe try again later?";
    }
    else if(correctAnswers/questions.length>.35 && correctAnswers/questions.length<=.65)
    {
        document.getElementById("res").innerHTML="That would have gotten you an A for Acceptable in your O.W.L.S. Maybe a Remembrall would help.";
    }
    else
    {
        document.getElementById("res").innerHTML="Maybe you're a Muggle who found this by accident. Anyways, Welcome to the Wizarding World";
    }
}

function hideScore() {
    $(document).find(".result").hide();
}