const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");
const typingIndicator = document.getElementById("typingIndicator");
const sendButton = document.getElementById("sendButton");

chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = messageInput.value.trim();

    if (!message) {
        return;
    }

    addMessage(message, "user");

    messageInput.value = "";
    messageInput.focus();

    setTyping(true);

    try {
        /*
         * TEMPORARY LOCAL RESPONSE
         *
         * We are intentionally NOT connecting the API yet.
         * The Cloudflare Worker and API key will be added later.
         */

        await wait(700);

        addMessage(
            "I'm here. My connection isn't wired up yet, but the Boo interface is working. 🐻",
            "boo"
        );

    } catch (error) {
        console.error("Boo error:", error);

        addMessage(
            "Something went wrong. We'll get it fixed.",
            "boo"
        );

    } finally {
        setTyping(false);
    }
});


function addMessage(text, sender) {
    const message = document.createElement("div");

    message.className =
        sender === "user"
            ? "message user-message"
            : "message boo-message";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = sender === "user" ? "👤" : "🐻";

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    bubble.appendChild(paragraph);
    message.appendChild(avatar);
    message.appendChild(bubble);

    chatMessages.appendChild(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function setTyping(isTyping) {
    typingIndicator.style.display = isTyping ? "flex" : "none";
    sendButton.disabled = isTyping;
    messageInput.disabled = isTyping;
}


function wait(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}


messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        chatForm.requestSubmit();
    }
});
