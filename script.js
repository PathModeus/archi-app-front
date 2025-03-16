document.addEventListener("DOMContentLoaded", function () {
    loadServerURL(); // Charger l'URL du serveur
    updateMessages(); // Charger les messages
});

let serverURL = localStorage.getItem("serverURL") || "http://localhost:8080"; // URL par défaut
let selectedAvatar = "avatarDefault.webp"; // Avatar par défaut

function loadServerURL() {
    const urlInput = document.getElementById("server-url");
    if (urlInput) {
        urlInput.value = serverURL; // Afficher l'URL actuelle
    }
}

function saveServerURL() {
    const urlInput = document.getElementById("server-url").value.trim();
    if (urlInput) {
        serverURL = urlInput;
        localStorage.setItem("serverURL", serverURL);
        alert("Server URL updated!");
    }
}

function updateMessages() {
    fetch(`${serverURL}/msg/getAll`)
        .then(response => response.json())
        .then(data => {
            const messageList = document.getElementById("message-list");
            messageList.innerHTML = ""; // Vider la liste avant d'ajouter les nouveaux messages

            data.forEach(msg => {
                const li = document.createElement("li");
                li.classList.add("message-item");

                // Formatage de la date et de l'heure
                const timestamp = new Date(msg.date);
                const formattedTime = timestamp.toLocaleString();

                // Création de l'avatar
                const avatarImg = document.createElement("img");
                avatarImg.src = `avatars/${msg.avatar || "avatarDefault.webp"}`; // Avatar par défaut si absent
                avatarImg.alt = `${msg.pseudo}'s avatar`;
                avatarImg.classList.add("avatar");

                // Création du contenu du message
                const messageContent = document.createElement("div");
                messageContent.classList.add("message-content");

                const usernameSpan = document.createElement("span");
                usernameSpan.classList.add("username");
                usernameSpan.textContent = msg.pseudo;

                const timeSpan = document.createElement("span");
                timeSpan.classList.add("timestamp");
                timeSpan.textContent = formattedTime;

                const messageText = document.createElement("p");
                messageText.classList.add("text");
                messageText.textContent = msg.message;

                // Assemblage des éléments
                messageContent.appendChild(usernameSpan);
                messageContent.appendChild(timeSpan);
                messageContent.appendChild(messageText);

                li.appendChild(avatarImg);
                li.appendChild(messageContent);
                messageList.appendChild(li);
            });
        })
        .catch(error => console.error("Erreur lors de la récupération des messages :", error));
}

function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const username = document.getElementById("username-input").value.trim();
    const message = messageInput.value.trim();

    if (!message || !username) {
        alert("Please enter a username and message!");
        return;
    }

    fetch(`${serverURL}/msg/post/${encodeURIComponent(username)}/${encodeURIComponent(message)}?avatar=${selectedAvatar}`)
    .then(response => response.json())
    .then(() => {
        messageInput.value = ""; // Effacer le champ après envoi
        updateMessages(); // Mettre à jour les messages après envoi
    })
    .catch(error => console.error("Error sending message:", error));
}

// Fonction pour mettre à jour l'avatar sélectionné
document.querySelectorAll('.avatar-option').forEach(img => {
    img.addEventListener('click', function() {
        // Désélectionner toutes les options et sélectionner l'avatar cliqué
        document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
        this.classList.add('selected');
        selectedAvatar = this.dataset.avatar; // Mettre à jour l'avatar sélectionné

        const username = document.getElementById('username-input').value.trim();
    });
});

// Charger les messages dès l'ouverture
document.addEventListener("DOMContentLoaded", updateMessages);

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const themeButton = document.getElementById("theme-button");
    if (document.body.classList.contains("dark-theme")) {
        themeButton.innerText = "Light Theme";
    } else {
        themeButton.innerText = "Dark Theme";
    }
}
