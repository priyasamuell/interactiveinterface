// Select all <button> elements on my page
let buttons = document.querySelectorAll("button");

// Select first HTML element with class of score
let scoreElement = document.querySelector(".score");

// Keep track of score
let score = 0;

// Define check function
function check(event) {

    // Find clicked button
    let button = event.target;

    // Find current question
    let question = button.parentElement;

    // Ger class name of button
    let name = button.className;

    if (name == "correct") {
        //If answer is correct
        button.style.boxShadow = "0px 0px 20px 5px green";

        // Update score
        score = score + 1

        // Display score on page
        scoreElement.textContent = score;
        

        let correctexplanation = question.querySelector(".correctexplanation");

             // If an explanation exists
             if (correctexplanation) {
                // Show explanation
                correctexplanation.style.display = "block";
            }     
        }

            // If answer is wrong
     else {
        // Paint button red
        button.style.boxShadow = "0px 0px 20px 5px red";
        
        //Find the explanation element
        let incorrectexplanation = question.querySelector(".incorrectexplanation");

        // If an explanation exists
        if (incorrectexplanation) {
            // Show explanation
            incorrectexplanation.style.display = "block";
        }        
    }
    
    // Find all button elements inside current question
    let questionButtons = question.querySelectorAll("button");

    // Disable other buttons
    for (let button of questionButtons) {
        button.disabled = true; 
    }

}
// For each button on my list
for (let button of buttons) {
    // Run check function when it's clicked
    button.onclick = check;
}