var currentIndex = 0;

var captions = [
    "Photo 1 - Mountain View",
    "Photo 2 - Beach Sunset",
    "Photo 3 - Green Forest",
    "Photo 4 - City at Night",
    "Photo 5 - Desert Dunes"
];

var totalImages = 5;

function showImage(newIndex) {
    var currentImg = document.getElementById("img" + currentIndex);
    currentImg.classList.remove("active");
    currentImg.classList.add("fading");

    setTimeout(function () {
        currentImg.classList.remove("fading");

        currentIndex = newIndex;

        var newImg = document.getElementById("img" + currentIndex);
        newImg.classList.add("active");

        document.getElementById("caption-text").innerHTML = captions[currentIndex];

        document.getElementById("slide-num").innerHTML = (currentIndex + 1) + " / " + totalImages;

    }, 400);
}

function nextImage() {
    var next = currentIndex + 1;
    if (next >= totalImages) {
        next = 0;
    }
    showImage(next);
}

function prevImage() {
    var prev = currentIndex - 1;
    if (prev < 0) {
        prev = totalImages - 1;
    }
    showImage(prev);
}
