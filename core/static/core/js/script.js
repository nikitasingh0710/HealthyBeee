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


/* Get CSRF Token */

function getCookie(name) {

    let cookieValue = null;

    if (document.cookie && document.cookie !== "") {

        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {

            cookie = cookie.trim();

            if (cookie.startsWith(name + "=")) {

                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );

                break;
            }
        }
    }

    return cookieValue;
}


/* Save Mood */

saveMoodButton.addEventListener("click", function() {

    if (selectedMood === null) {

        moodMessage.textContent = "Please select your mood first.";

        return;
    }


    fetch("/save-mood/", {

        method: "POST",

        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-CSRFToken": getCookie("csrftoken")
        },

        body: "mood=" + encodeURIComponent(selectedMood)

    })

    .then(function(response) {
        return response.json();
    })

    .then(function(data) {

        if (data.success) {

            moodMessage.textContent =
                "Thank you for sharing. Your mood has been saved 🐝";

        } else {

            moodMessage.textContent =
                "Something went wrong. Please try again.";

        }

    })

    .catch(function(error) {

        console.error("Error:", error);

        moodMessage.textContent =
            "Could not save your mood. Please try again.";

    });

});


/* Chat Button */

chatButton.addEventListener("click", function() {

    alert(
        "Hi! I'm HealthyBee 🐝\n\n" +
        "The real chatbot is coming soon!"
    );

});