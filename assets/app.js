$(document).ready(function () {
    var presidents = ["Ronald Reagan", "Bill Clinton", "George Washington", "Abraham Lincoln", "Thomas Jefferson", "Theodore Roosevelt"]
    console.log(presidents);

    // Add buttons for original presidents array
	function renderButtons() {
		$("#presidentBtn").empty();
		for (i = 0; i < presidents.length; i++) {
            // This is rendering the buttons, but I don't understand the syntax. I kept gettting no buttons and NaNNaNNaNNaNN...
			$("#presidentBtn").append("<button class='btn btn-danger' data-president='" + presidents[i] + "'>" + presidents[i] + "</button>");
		}
	}

	renderButtons();

	// Adding a button for president entered
	$("#add-president").on("click", function () {
        //This event prevents the button for the president the uyser enetered from being deleted when renderButtons is called below
        event.preventDefault();
        //sets the variable president to the user input
        var president = $("#president-input").val()
        //Pushes president variable into the presidents array
        presidents.push(president);
        //creates the buttons over again
		renderButtons();
		console.log(presidents, president);
		
	});
    
        // JQuery selector telling it to modify the DOM when a clcik is made    
        $(document).on("click", "button", function () {
            // Create an alert telling user what to do
            alert("Click on the pictures to see them in action!");
        // Establishing variable president and attatch user input to it. "this" selects only the current element, so that we only get the applicable ones inserted in the DOM
        var president = $(this).attr("data-president");
        // Setting up the queryURL to use with ajax
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			president + "&api_key=Mu2lLvMJDEjWMEXdgEsLc5BuupDkqrDa&limit=10"
        // this is our ajax call
		$.ajax({
			url: queryURL,
			method: "GET"
        })
        //waits for reply of network call and makes information available (stored as reply)
        .done(function (reply) {
            var results = reply.data;
            // Holy cow there's a lot of information with each one of these gifs
            console.log(results);
            // Time to populate #presidents from the DOM. empty clears it of any previosly populated data
            $("#presidents").empty();
            // for loop that puts each image in the dom in their still state
			for (var i = 0; i < results.length; i++) {
				var presidentDiv = $("<div>");
				var presidentImg = $("<img>");
				presidentImg.attr("src", results[i].images.original_still.url);
				presidentImg.attr("data-still", results[i].images.original_still.url);
				presidentImg.attr("data-animate", results[i].images.original.url);
				presidentImg.attr("data-state", "still");
				presidentImg.attr("class", "gif");
				presidentDiv.append(presidentImg);
				$("#presidents").append(presidentDiv);
			}
		});
	});
    // defining the animate function so that clucking the image take appropriate action
	function animate(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}

    // runs the animate function when gif is clicked on
	$(document).on("click", ".gif", animate);

});