let selectedMood = null;


/* =========================
   Elements
========================= */

const moodButtons = document.querySelectorAll(".mood-button");
const saveMoodButton = document.getElementById("saveMoodButton");
const moodMessage = document.getElementById("moodMessage");

const chatInput = document.getElementById("chatInput");
const sendChatButton = document.getElementById("sendChatButton");
const chatMessages = document.getElementById("chatMessages");


/* =========================
   Select Mood
========================= */

moodButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        moodButtons.forEach(function(otherButton) {
            otherButton.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedMood = button.dataset.mood;

    });

});


/* =========================
   Get CSRF Token
========================= */

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


/* =========================
   Save Mood
========================= */

if (saveMoodButton) {

    saveMoodButton.addEventListener("click", function() {

        if (selectedMood === null) {

            moodMessage.textContent =
                "Please select your mood first.";

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

}


/* =========================
   HealthyBee Chat
========================= */

function sendChatMessage() {

    const message = chatInput.value.trim();

    if (message === "") {
        return;
    }


    /* User message */

    const userMessage = document.createElement("div");

    userMessage.className = "user-message";

    userMessage.textContent =
        "You: " + message;

    chatMessages.appendChild(userMessage);


    /* HealthyBee reply */

    const beeReply = document.createElement("div");

    beeReply.className = "bee-message";

    const lowerMessage = message.toLowerCase();


    if (
        lowerMessage.includes("hello") ||
        lowerMessage.includes("hi")
    ) {

        beeReply.textContent =
            "🐝 Hello! I'm happy to chat with you.";

    }

    else if (lowerMessage.includes("happy")) {

        beeReply.textContent =
            "🐝 That's lovely to hear! Keep enjoying your day.";

    }

    else if (
        lowerMessage.includes("sad") ||
        lowerMessage.includes("upset")
    ) {

        beeReply.textContent =
            "🐝 I'm sorry you're having a difficult moment. You can talk about what's bothering you.";

    }

    else if (
        lowerMessage.includes("stress") ||
        lowerMessage.includes("stressed")
    ) {

        beeReply.textContent =
            "🐝 Take a small pause and breathe slowly. I'm here to listen.";

    }

    else if (lowerMessage.includes("thank")) {

        beeReply.textContent =
            "🐝 You're welcome! I'm always happy to listen.";

    }

    else {

        beeReply.textContent =
            "🐝 Thanks for sharing that with me. Tell me more if you'd like.";

    }


    chatMessages.appendChild(beeReply);


    /* Clear input */

    chatInput.value = "";

    chatInput.focus();


    /* Scroll down */

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


/* =========================
   Chat Events
========================= */

if (sendChatButton && chatInput && chatMessages) {

    sendChatButton.addEventListener(
        "click",
        sendChatMessage
    );


    chatInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                sendChatMessage();

            }

        }
    );

}