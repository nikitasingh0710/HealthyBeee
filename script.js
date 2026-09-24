let selectedMood = null;

const moodButtons = document.querySelectorAll(".mood-button");

const saveMoodButton = document.getElementById("saveMoodButton");

const moodMessage = document.getElementById("moodMessage");

const chatButton = document.getElementById("chatButton");


/* Select Mood */

moodButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        moodButtons.forEach(function(otherButton) {
            otherButton.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedMood = button.dataset.mood;

    });

});


/* Save Mood */

saveMoodButton.addEventListener("click", function() {

    if (selectedMood === null) {

        moodMessage.textContent = "Please select your mood first.";

        return;

    }

    moodMessage.textContent =
        "Thank you for sharing. HealthyBee knows you're feeling " +
        selectedMood +
        " today 🐝";

});


/* Chat Button */

chatButton.addEventListener("click", function() {

    alert(
        "Hi! I'm HealthyBee 🐝\n\n" +
        "The real chatbot is coming soon!"
    );

});