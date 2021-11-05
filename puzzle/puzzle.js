// Global variables
let VIDEO = null;
let CANVAS = null;
let CONTEXT = null;
let SCALER = 0.9;       // Sets percent of screen the image takes up
let SIZE = {x: 0, y: 0, width: 0, height: 0};       // Set dynamically below - DO NOT ADJUST HERE


function main(){
// Initialize canvas and context, set canvas size
    CANVAS = document.getElementById("puzzleCanvas");
    CONTEXT = CANVAS.getContext("2d");
    

// Initialize camera, create function to play video from source
    let promise = navigator.mediaDevices.getUserMedia({video:true});
    promise.then (function(signal){
        VIDEO = document.createElement("video");
        VIDEO.srcObject = signal;
        VIDEO.play();

        VIDEO.onloadeddata = function(){
            handleResize();
            window.addEventListener('resize',handleResize);
            updateCanvas();
        }

// Deal with errors, i.e. no web came or denied privileges...
    }).catch (function(err){
        alert("Camera error: " +err);
    });
    
}

function handleResize(){
// Automatically resize the window and orientation of the canvas with change to the window
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;    
    
    let resizer = SCALER*
        Math.min(
            window.innerWidth / VIDEO.videoWidth,
            window.innerHeight / VIDEO.videoHeight
        );
// Size the incoming image to an optimal size, centered on the canvas, with room to move pieces            
    SIZE.width = resizer * VIDEO.videoWidth;
    SIZE.height = resizer * VIDEO.videoHeight;
    SIZE.x = window.innerWidth/2 - SIZE.width/2;
    SIZE.y = window.innerHeight/2 - SIZE.height/2;
}

function updateCanvas(){
// Draw the video onto the HTML Canvas
    CONTEXT.drawImage(VIDEO, SIZE.x, SIZE.y, SIZE.width, SIZE.height);
    window.requestAnimationFrame(updateCanvas);

}