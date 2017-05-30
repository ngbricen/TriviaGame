//Why not use the window.onload = function() here?!?
$(document).ready(function() {

	var selectedTopic;
	var selectedOption;
	var currentTopicChoice;
	var currentTopicChoiceArray;
	var currentQuestion;
	var currentQuestionIndex;
	var currentOptions;
	var currentAnswer;
	var currentAnswerImage;
	var gameTopics;
	var timerNumber;
	var intervalId;
	var questionTimeout;
	var correctCount;
	var incorrectCount ;
	var unansweredCount;
	var answerCount;
	var timeoutQuestionValue =12000;
	var delayedValue = 10;
	var timeoutResultValue = 3000;

	//Hide Start Over Button
	$("#startOver").hide();	

	//Defining all questions and answers for the game
	var triviaGameObject = {
	"Countries": { 	"What is the only country with city named NYC?": ["USA",["Canada","Belgium","USA","Algeria"],"usa.jpg"],
					"Where did Brexit Occur?": ["UK", ["Ukraine","UK","Germany","USA"],"uk.jpg"],
					"Where is Brice in the Bootcamp 2 class from?" : ["Cameroon", ["Jamaica","Cameroon","USA","Norway"],"cameroon.jpg"],
					"Where is Richard in the Bootcamp 2 class from?" : ["Philippines", ["China","North Korea","Philippines","Japan"],"philippines.png"],
					"Where is Gigi in the Bootcamp 2 class from?" : ["Morocco", ["Afghanistan","Morocco","Algeria","USA"],"morocco.jpg"],
				},
	"Computer Language": {"What language does bootstrap mostly use?": ["CSS",["HTML","CSS","Java","Javascript"],"win.jpg"],
					"What language use the body element to add items to a web page?": ["html", ["css",".Net","C#","html"],"win.jpg"],
					"What language use the $ selector?" : ["jQuery", ["CSS","jQuery","Javascript","html"],"win.jpg"],
					"Where are javascript elements located on the page" : ["body", ["head","title","link","body"],"win.jpg"],
					"What tag element is a essential to a web page?" : ["html", ["title","div","img","html"],"win.jpg"],
				},				
	"Human Language": {"In what language do we say Bonjour": ["French",["English","French","Italian","World Language"],"win.jpg"],
					"Where do we speak Spanish": ["Cape Verde", ["Cape Verde","Angola","Italy","Ukraine"],"win.jpg"],
					"What is the translation of At Good Bread in french" : ["Au Bon Pain", ["A Petit trot","Pas tres Loing","Au Bon Pain","C'est ca"],"win.jpg"],
					"This country is Bilingual" : ["Canada", ["USA","Germany","UK","Canada"],"win.jpg"],
					"Translate 2 in spanish" : ["Dos", ["Uno","Dosso","Dos","TwoO"],"win.jpg"],
				},				

	"World Cities": {"What is the capital of the US ": ["Washington, DC",["NYC","Washington, DC","Chicago","Boston"],"win.jpg"],
					"Cities with the most air passengers traffic": ["Atlanta", ["Atlanta","New York City","London","Tokyo"],"win.jpg"],
					"Most populated city in the world" : ["Tokyo", ["NYC","Tokyo","London","Los Angeles"],"win.jpg"],
					"Most Literate city in the US" : ["Washington, DC", ["Washington, DC","NYC","Minneapolis","Atlanta"],"win.jpg"],
					"Most Expensive city to live in the world" : ["Singapore", ["NYC","Tokyo","London","Singapore"],"win.jpg"],
				},		

	// "World Cities": ["Waterfalls","tlc.jpg"],
	// "Music": ["All My Life","kciandjojo.jpg"],
	// "Bootcamp Staff": ["No Diggity","blackstreet.jpg"],
	};

	//Starting the game
	$("#start").on("click", function(){

		//Get the list of all topics to be later displayed on the screen		
		gameTopics = Object.keys(triviaGameObject);

		//Create the main button topics
		initializeGameTopics(gameTopics);

 	});

 	//Restarting the game without reloading the page
 	$("#startOver").on("click", function(){

 		//Clear the question text section
 		$("#questionResponse").text("");

		//Clear the Options section
		$("#options").empty();

		//Create the main button topics
		initializeGameTopics(gameTopics);

 	});


	//Initialize variables and create buttons, including events 	
	function initializeGameTopics(gameTopics){
		//Remove Buttons
		$("#start").hide();
		$("#startOver").hide();
		$("#timeRemaining").hide();

		correctCount = 0;
		incorrectCount = 0;
		unansweredCount = 0;
		answerCount = 0;
		currentQuestionIndex = 0;

		for (var i = 0; i < gameTopics.length; i++) {

	        // 2. Create a variable named "topicBtn" equal to $("<button>");
	        var topicBtn = $("<button>");

	        // 3. Then give each "letterBtn" the following classes: "letter-button" "letter" "letter-button-color".
	        topicBtn.addClass("topic-button btn btn-primary btn-lg");

	        // 5. Then give each "letterBtns" a text equal to "letters[i]".
	        topicBtn.text(gameTopics[i]);

	        // 6. Finally, append each "letterBtn" to the "#buttons" div (provided).
	        $("#options").append(topicBtn);

      	}

      	//Executing on click event for each of the topics selected
  	 	$(".topic-button").on("click", function(){

  	 		//Display the topic header
			selectedTopic = $(this).text();
			
			//Get Current Array of questions/options for selected topic
			currentTopicChoice = triviaGameObject[selectedTopic];
			currentTopicChoiceArray = Object.keys(currentTopicChoice);
			
			//Clear the section to add Question Choices
			$("#options").empty();

			//List all questions choices
			ListTopicQuestions();
		});

	}

	//Display options for each question with a timeout and a delay
	function ListTopicQuestions(){
		questionTimeout = {};

		//List Questions
		for (var i = 0; i < currentTopicChoiceArray.length; i++) {

			//This will only be performed if the question was not already displayed
			if (i >= currentQuestionIndex){	

				(function(i) {
			        questionTimeout[i] = setTimeout(function() { 
			   			currentQuestion = currentTopicChoiceArray[i];
			        	displayQuestionAnswer(currentQuestion);
			        }, (i - currentQuestionIndex) * timeoutQuestionValue);
			        
			    })(i);
		    }
      	}
	}

	//Get current question, answer and build buttons for each options
	function displayQuestionAnswer(question){
		$("#questionResponse").text(question);
		currentAnswer = currentTopicChoice[currentQuestion][0];
		currentOptions = currentTopicChoice[currentQuestion][1];
		currentAnswerImage = currentTopicChoice[currentQuestion][2];

		//Build the button for all options proposed
		BuildOptionButtons(currentOptions);

	}

	//Build button for All question options
	function BuildOptionButtons(currentOptions){
		//Remove all existing options
		$("#options").empty();

		//Loop through array containing question options
		for (var i = 0; i < currentOptions.length; i++) {
	        // 1. Create a variable named "optionBtn" equal to $("<button>");
	        var optionBtn = $("<button>");

	        // 2. Then give each "letterBtn" the following classes: "letter-button" "letter" "letter-button-color".
	        optionBtn.addClass("option-button btn btn-primary btn-lg");

	        // 3. Then give each "letterBtns" a text equal to "letters[i]".
	        optionBtn.text(currentOptions[i]);

	        // 4. Finally, append each "letterBtn" to the "#buttons" div (provided).
	        $("#options").append(optionBtn);

      	}

      	//After having build all butons and display them, we need to start the timer
      	$("#timeRemaining").show();
      	timerNumber = delayedValue;
      	
      	//  Show the number in the #show-number tag.
      	$("#timeRemaining").html("<h3>Time Remaining " + timerNumber + "</h2>");

      	run();

      	//Adding on click event for each of the buttons
  	 	$(".option-button").on("click", function(){
  	 		//Reset Time out
  	 		clearQuestionTimeout();

  	 		//Count the number of answers overal
  	 		answerCount++;
			
			//Increase the index for the next question
			currentQuestionIndex++;



			selectedOption = $(this).text();

			//Clear the section to add Question Choices
			$("#options").empty();

			//Display whether or not the correct answer was selected!
			if (selectedOption === currentAnswer){
				$("#questionResponse").text("You are correct");
				correctCount++;
				$("#options").html("<img src='assets\\images\\" + currentAnswerImage +"'>");
			}
			else{
				$("#questionResponse").text("Wrong, the current answer was " + currentAnswer);
				incorrectCount++;
				$("#options").html("<img src='assets\\images\\looser.gif'>");
			}

			//Run the stop function.
        	stop();

			//Clear timeout of question
			clearTimeout(questionTimeout);

			//Display results if all questions were answered
	      	if (answerCount === currentTopicChoiceArray.length){
		      	//Display Results
		      	setTimeout(displayResults,timeoutResultValue);
		      	
			}	      	
		});
	}

	function clearQuestionTimeout(){
   		for (var k in questionTimeout) {
        	clearTimeout(questionTimeout[k]);
    	}

    	//Display the next question
    	setTimeout(ListTopicQuestions,timeoutResultValue);
	}

	//Display Final Results on the screen
	function displayResults(){
		//Clear the Options section
		$("#options").empty();

		//Display Text Results in various sections
		$("#questionResponse").text("Here is your tally!");

		$("#options").append("<p>Correct Answers: " + correctCount + " </p>");
		$("#options").append("<p>Incorrect Answers: " + incorrectCount + " </p>");
		$("#options").append("<p>Unanswered: " + unansweredCount + " </p>");

		//Display Start Over Button
		$("#startOver").show();
	}

	//  The run function sets an interval
    //  that runs the decrement function once a second.
    function run() {
      intervalId = setInterval(decrement, 1000);
    }

    //  The decrement function.
    function decrement() {

      	// Decrease number by one.
    	timerNumber--;

      	//  Show the number in the #show-number tag.
      	$("#timeRemaining").html("<h3>Time Remaining " + timerNumber + "</h2>");

		//  Once number hits zero...
		if (timerNumber === 0) {

			//Clear the section to add Question Choices
			$("#options").empty();

			//Count the number of answers overal
		 	answerCount++;

		 	//Increase the index for the next question
			currentQuestionIndex++;

			//  Alert the user that time is up.
			$("#questionResponse").text("OUT OF TIME, the correct answer was " + currentAnswer);
			unansweredCount++;
			$("#options").html("<img src='assets\\images\\outoftime.gif'>");

			//Clear timeout of question
  	 		clearQuestionTimeout();

			//Run the stop function.
			stop();

			//Display results if all questions were answered
			if (answerCount === currentTopicChoiceArray.length){
		      	
		      	//Display Results
		      	setTimeout(displayResults,timeoutResultValue);
			}	      	
		}
    }

    //  The stop function
    function stop() {

      //  Clears our intervalId
      //  We just pass the name of the interval
      //  to the clearInterval function.
      clearInterval(intervalId);
    }
    
});