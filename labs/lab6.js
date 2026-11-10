
var likes = 100;
var dislikes = 20;
var comments = [];
 
var LIKES_COOKIE = "lab6_likes";
var DISLIKES_COOKIE = "lab6_dislikes";
var CHOICE_COOKIE = "lab6_choice";
var COMMENTS_COOKIE = "lab6_comments";
 
// ---------- Cookie helpers ----------
function saveCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) +
        "; expires=" + date.toUTCString() + "; path=/; SameSite=Lax";
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
    
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}
 

function loadState() {
    likes = parseInt(getCookie(LIKES_COOKIE)) || 0;
    dislikes = parseInt(getCookie(DISLIKES_COOKIE)) || 0;
 
    var saved = getCookie(COMMENTS_COOKIE);
    if (saved) {
        try {
            comments = JSON.parse(saved);
        } catch (e) {
            comments = [];
        }
    }
}
 

function updateUI() {
    var choice = getCookie(CHOICE_COOKIE);
 
    document.getElementById("likeCount").textContent = likes;
    document.getElementById("dislikeCount").textContent = dislikes;
 

    var voted = (choice != null);
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
        p.textContent = comments[i].text;
        list.appendChild(p);
    }
}
 
function showMessage(text) {
    document.getElementById("message").textContent = text;
}
 
// ---------- Like / Dislike ----------
function vote(type) {
    if (getCookie(CHOICE_COOKIE) != null) {
        showMessage("You have already voted.");
        return;
    }
 
    if (type == "like") {
        likes++;
    } else {
        dislikes++;
    }
 
    saveCookie(LIKES_COOKIE, likes, 30);
    saveCookie(DISLIKES_COOKIE, dislikes, 30);
    saveCookie(CHOICE_COOKIE, type, 30);
 
    showMessage("Thanks for your vote!");
    updateUI();
}
 

function submitComment() {
    var input = document.getElementById("commentInput");
    var text = input.value.trim();
 
    if (getCookie(COMMENTS_COOKIE) != null) {
        showMessage("You have already left a comment.");
        return;
    }
    if (text == "") {
        showMessage("Please write a comment first.");
        return;
    }
 
    comments.push({ text: text });
    saveCookie(COMMENTS_COOKIE, JSON.stringify(comments), 30);
 
    input.value = "";
    showMessage("Your comment was added.");
    updateUI();
}
 

function resetAll() {
    deleteCookie(LIKES_COOKIE);
    deleteCookie(DISLIKES_COOKIE);
    deleteCookie(CHOICE_COOKIE);
    deleteCookie(COMMENTS_COOKIE);
 
    likes = 0;
    dislikes = 0;
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
