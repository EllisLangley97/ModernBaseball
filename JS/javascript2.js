window.onload = function (){
    var dataImage = localStorage.getItem('imgData');
    bannerImg = document.getElementById('tableBanner');
    bannerImg.src = "data:image/png;base64," + dataImage;
    //Loads the saved image from local storage, and assigns it to the <img> tag
}