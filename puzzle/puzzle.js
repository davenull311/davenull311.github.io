// Global variables
let VIDEO = null;
let CANVAS = null;
let CONTEXT = null;
let SCALER = 0.8;
let SIZE = {x: 0, y: 0, width: 0, height: 0};


function main(){
// Initialize canvas and context, set canvas size
    CANVAS = document.getElementById("puzzleCanvas");
    CONTEXT = CANVAS.getContext("2d");
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

// Initialize camera, create function to play video from source
    let promise = navigator.mediaDevices.getUserMedia({video:true});
    promise.then (function(signal){
        VIDEO = document.createElement("video");
        VIDEO.srcObject = signal;
        VIDEO.play();

        VIDEO.onloadeddata = function(){
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
            updateCanvas();
        }

// Deal with errors, i.e. no web came or denied privileges...
    }).catch (function(err){
        alert("Camera error: " +err);
    });
    
}

function updateCanvas(){
// Draw the video onto the HTML Canvas
    CONTEXT.drawImage(VIDEO, SIZE.x, SIZE.y, SIZE.width, SIZE.height);
    window.requestAnimationFrame(updateCanvas);

}