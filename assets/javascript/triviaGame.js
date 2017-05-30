//Why not use the window.onload = function() here?!?
$(document).ready(function() {

	var selectedTopic;
	var selectedOption;
	var currentTopicChoice;
	var currentTopicChoiceArray;
	var currentQuestion;
	var currentOptions;
	var currentAnswer;
	var gameTopics;
	var timerNumber;
	var intervalId;
	var questionTimeout;
	var correctCount;
	var incorrectCount ;
	var unansweredCount;
	var answerCount;
	var timeoutValue = 50000;
	var delayedValue = 30;

	//Hide Start Over Button
	$("#startOver").hide();	

	//Defining all questions and answers for the game
	var triviaGameObject = {
	"Countries": { 	"What is the only country with city named NYC?": ["USA",["Canada","Belgium","USA","Algeria"]],
					"Where did Brexit Occur?": ["UK", ["Ukraine","UK","Germany","USA"]],
					"Where is Brice in the Bootcamp 2 class from?" : ["Cameroon", ["Jamaica","Virgin Island","USA","Norway"]],
					"Where is Richard in the Bootcamp 2 class from?" : ["Phillipines", ["China","North Korea","Phillipines","Japan"]],
					"Where is Gigi in the Bootcamp 2 class from?" : ["Morocco", ["Afghanistan","Morocco","Algeria","USA"]],
				},
	"Computer Language": {"What language does bootstrap mostly use?": ["CSS",["HTML","CSS","Java","Javascript"]],
					"What language use the body element to add items to a web page?": ["html", ["css",".Net","C#","Ajax"]],
					"What language use the $ selector?" : ["jQuery", ["CSS","jQuery","Javascript","html"]],
					"Where are javascript elements located on the page" : ["body", ["head","title","link","body"]],
					"What tag element is a essential to a web page?" : ["html", ["title","div","img","h1"]],
				},				
	"Human Language": {"In what language do we say Bonjour": ["French",["English","French","Italian","World Language"]],
					"Where do we speak Spanish": ["Cape Verde", ["Cape Verde","Angola","Italy","Ukraine"]],
					"What is the translation of At Good Bread in french" : ["Au Bon Pain", ["A Petit trot","Pas tres Loing","Au Bon Pain","C'est ca"]],
					"This country is Bilingual" : ["Canada", ["USA","Germany","UK","Canada"]],
					"Translate 2 in spanish" : ["Dos", ["Uno","Dosso","Deux","TwoO"]],
				},				

	"World Cities": {"What is the capital of the US ": ["Washington, DC",["NYC","Washington, DC","Chicago","Boston"]],
					"Cities with the most air passengers traffic": ["Atlanta", ["Atlanta","New York City","London","Tokyo"]],
					"Most populated city in the world" : ["Tokyo", ["NYC","Tokyo","London","Los Angeles"]],
					"Most Literate city in the US" : ["Washington, DC", ["Washington, DC","NYC","Minneapolis","Atlanta"]],
					"Most Expensive city to live in the world" : ["Singapore", ["NYC","Tokyo","London","Singapore"]],
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
			currentTopicChoice = triviaGameObject[selectedTopic];

			//Clear the section to add Question Choices
			$("#options").empty();

			//List all questions choices
			ListTopicQuestions(currentTopicChoice);
		});

	}

	//Display options for each question with a timeout and a delay
	function ListTopicQuestions(choices){
		currentTopicChoiceArray = Object.keys(choices);

		//List Questions
		for (var i = 0; i < currentTopicChoiceArray.length; i++) {
			(function(index) {
		        questionTimeout = setTimeout(function() { 
		        	currentQuestion = currentTopicChoiceArray[index]; 
		        	displayQuestionAnswer(currentQuestion);
		        }, i * timeoutValue);
		    })(i);
      	}
	}

	//Get current question, answer and build buttons for each options
	function displayQuestionAnswer(question){
		$("#questionResponse").text(question);
		currentAnswer = currentTopicChoice[currentQuestion][0];
		currentOptions = currentTopicChoice[currentQuestion][1];

		//Build the button for all options proposed
		BuildOptionButtons(currentOptions);

	}

	//Build button for All question options
	function BuildOptionButtons(currentOptions){
		//Remove all existing options
		$("#options").empty();

		//Loop through array containing question options
		for (var i = 0; i < currentOptions.length; i++) {

			console.log(currentOptions)

	        // 2. Create a variable named "optionBtn" equal to $("<button>");
	        var optionBtn = $("<button>");

	        // 3. Then give each "letterBtn" the following classes: "letter-button" "letter" "letter-button-color".
	        optionBtn.addClass("option-button btn btn-primary btn-lg");

	        // 5. Then give each "letterBtns" a text equal to "letters[i]".
	        optionBtn.text(currentOptions[i]);

	        // 6. Finally, append each "letterBtn" to the "#buttons" div (provided).
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
  	 		//Count the number of answers overal
  	 		answerCount++;
			
			selectedOption = $(this).text();

			//Clear the section to add Question Choices
			$("#options").empty();

			//Display whether or not the correct answer was selected!
			if (selectedOption === currentAnswer){
				$("#questionResponse").text("You are correct");
				correctCount++;
			}
			else{
				$("#questionResponse").text("Wrong, the current answer was " + currentAnswer);
				incorrectCount++;
			}

			//Run the stop function.
        	stop();

			//Clear timeout of question
			clearTimeout(questionTimeout);

			//Display results if all questions were answered
	      	if (answerCount === currentTopicChoiceArray.length - 1){
		      	//Display Results
		      	displayResults();

		      	//Display Start Over Button
		      	$("#startOver").show();
			}	      	
		});
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

			//  Alert the user that time is up.
			$("#questionResponse").text("OUT OF TIME, the current answer was " + currentAnswer);
			unansweredCount++;

			//Clear timeout of question
			clearTimeout(questionTimeout);

			//Run the stop function.
			stop();

			//Display results if all questions were answered
			if (answerCount === currentTopicChoiceArray.length - 1){
		      	//Display Results
		      	displayResults();

		      	//Display Start Over Button
		      	$("#startOver").show();
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