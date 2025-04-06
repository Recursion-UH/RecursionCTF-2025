function updateImage() {
    var imageSelector = document.getElementById("image");
    var selectedValue = imageSelector.value;

    var imageDisplay = document.getElementById("selectedImage");
    imageDisplay.src = selectedValue;
}
