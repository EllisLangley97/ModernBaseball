var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
//First block is creating finding where on the DOM the canvas should be

var colour = document.getElementById("line_colour");
var radius = document.getElementById("line_size");
var mouseDown = false;
//This block is defining a handful of variables to be used within the code (Pen width and colour, and if the user is pressing the mouse button)

canvas.width = window.innerWidth - 300;
canvas.height = window.innerHeight - 300;
//This block is defining how large the canvas itself should actually be

var Draw = function(e){
    if (mouseDown) {
        context.lineWidth = radius.value*2;
        context.strokeStyle=colour.value;
        context.fillStyle=colour.value;

        context.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        context.stroke();
        context.beginPath();
        context.arc(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, radius.value, 0, Math.PI * 2);
        context.fill();
        context.beginPath();
        context.moveTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        //The Draw function creates a series of circles (line23), whilst simultaneously linking these circles with a path
    }
    //console.log("mousemove")
}

var engage = function(){
    mouseDown = true;
    //Simply makes the mouseDown variable true
    //console.log("mousedown")
}

var disengage = function(){
    mouseDown = false;
    context.beginPath();
    //Simply makes the mouseDown variable true
    //Additionally, it also ends the current path when the mouse button is lifted
    //console.log("mouseup")
}

var save = function(){
    canvas = document.getElementById("canvas");
    imgData = getBase64Image(canvas);
    localStorage.setItem("imgData", imgData);
    //Saving the image to local storage
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    //Converting image to a base64 string (via https://stackoverflow.com/a/19183658)
}

function contin(){
    location.href = "customAlbum.html";
    //Loads the customAlbum webpage
}

canvas.addEventListener('mousedown', engage); //Looks for a mousedown event, allowing the placement of single dots
canvas.addEventListener('mousedown',Draw); //Looks for a mousedown event
canvas.addEventListener('mouseup', disengage); //Looks for mouseup event

canvas.addEventListener('mousemove', Draw); //Looks for mouse movement, and starts drawing

document.getElementById("tool_clear").addEventListener("click", function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    //Clears the canvas when the clear button is pressed
});

document.getElementById("tool_save").addEventListener("click", function(){
    save();
    //Saves the canvas
});

document.getElementById("tool_continue").addEventListener("click", function(){
    contin();
    //Continues to next webpage
});