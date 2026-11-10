
var API_URL = "https://api.unsplash.com/search/photos?query=";

function getKey() {
    var key = sessionStorage.getItem("unsplashKey");
    if (!key) {
        key = prompt("Enter your Unsplash Access Key:");
        if (key) sessionStorage.setItem("unsplashKey", key.trim());
    }
    return key;
}


function showPhotos(photos) {
    var gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    photos.forEach(photo => {
        var img = document.createElement("img");
        img.src = photo.urls.small;
        img.alt = photo.alt_description || "Unsplash photo";
        
        img.style.height = "200px";
        img.style.objectFit = "cover";
        gallery.appendChild(img);
    });
}


function searchUsingXHR() {
    var userId = document.getElementById("inputBox").value;
    var sampElem = document.getElementById("sampleOutput");

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var responseObj = JSON.parse(xhr.responseText);
            showPhotos(responseObj.results);                  // تغيّر
            sampElem.innerHTML = "Loaded using XHR";          // تغيّر
        }
    };
    xhr.open("GET", API_URL + userId, true);                  // تغيّر
    xhr.setRequestHeader("Authorization", "Client-ID " + getKey());  // جديد
    xhr.send();
}


function searchUsingFetch() {
    var userId = document.getElementById("inputBox").value;
    var sampElem = document.getElementById("sampleOutput");

    fetch(API_URL + userId, { headers: { Authorization: "Client-ID " + getKey() } })  // تغيّر
        .then(response => {
            return response.json()
        })
        .then(data => {
            showPhotos(data.results);                         // تغيّر
            sampElem.innerHTML = "Loaded using fetch with promises";
        })
}


async function searchUsingFetchAwaitAsync() {
    var userId = document.getElementById("inputBox").value;
    var sampElem = document.getElementById("sampleOutput");

    let response = await fetch(API_URL + userId, { headers: { Authorization: "Client-ID " + getKey() } });  // تغيّر
    let data = await response.json();
    showPhotos(data.results);                                 // تغيّر
    sampElem.innerHTML = "Loaded using async and await";
}


document.getElementById("inputBox").addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        searchUsingFetchAwaitAsync();
    }
});