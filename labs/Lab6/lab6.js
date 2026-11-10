
var START_LIKES = 100;
var START_DISLIKES = 20;

var likes = START_LIKES;
var dislikes = START_DISLIKES;
var comments = [];



function saveCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) +
        "; expires=" + date.toUTCString() + "; path=/";
}

function getCookie(name) {
    var parts = document.cookie.split("; ");
    for (var i = 0; i < parts.length; i++) {
        var pair = parts[i].split("=");
        if (pair[0] == name) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
}

function deleteCookie(name) {
    saveCookie(name, "", -1);
}



function loadState() {
    if (getCookie("likes") != null) {
        likes = parseInt(getCookie("likes"));
    }
    if (getCookie("dislikes") != null) {
        dislikes = parseInt(getCookie("dislikes"));
    }
    if (getCookie("comment") != null) {
        comments = [getCookie("comment")];
    }
}



function updateUI() {
    document.getElementById("likeCount").textContent = likes;
    document.getElementById("dislikeCount").textContent = dislikes;


    var voted = (getCookie("choice") != null);
    document.getElementById("likeButton").disabled = voted;
    document.getElementById("dislikeButton").disabled = voted;


    var commented = (comments.length > 0);
    document.getElementById("commentInput").disabled = commented;
    document.getElementById("submitButton").disabled = commented;


    var list = document.getElementById("commentsList");
    list.innerHTML = "";
    if (comments.length == 0) {
        list.textContent = "No comments yet.";
    }
    for (var i = 0; i < comments.length; i++) {
        var p = document.createElement("p");
        p.textContent = comments[i];
        list.appendChild(p);
    }
}

function showMessage(text) {
    document.getElementById("message").textContent = text;
}



function vote(type) {
    if (getCookie("choice") != null) {
        showMessage("You have already voted.");
        return;
    }

    if (type == "like") {
        likes++;
    } else {
        dislikes++;
    }

    saveCookie("likes", likes, 30);
    saveCookie("dislikes", dislikes, 30);
    saveCookie("choice", type, 30);

    showMessage("Thanks for your vote!");
    updateUI();
}



function submitComment() {
    var input = document.getElementById("commentInput");
    var text = input.value.trim();

    if (text == "") {
        showMessage("Please write a comment first.");
        return;
    }

    comments.push(text);
    saveCookie("comment", text, 30);

    input.value = "";
    showMessage("Your comment was added.");
    updateUI();
}



function resetAll() {
    deleteCookie("likes");
    deleteCookie("dislikes");
    deleteCookie("choice");
    deleteCookie("comment");

    likes = START_LIKES;
    dislikes = START_DISLIKES;
    comments = [];

    showMessage("Your vote and comment were cleared. You can vote again.");
    updateUI();
}



document.getElementById("likeButton").addEventListener("click", function () { vote("like"); });
document.getElementById("dislikeButton").addEventListener("click", function () { vote("dislike"); });
document.getElementById("submitButton").addEventListener("click", submitComment);
document.getElementById("resetButton").addEventListener("click", resetAll);



loadState();
updateUI();