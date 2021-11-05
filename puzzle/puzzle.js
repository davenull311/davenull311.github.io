// Global variables
let VIDEO = null;
let CANVAS = null;
let CONTEXT = null;
let SCALER = 0.75;                                                          // Sets percent of screen the image takes up
let SIZE = {x: 0, y: 0, width: 0, height: 0, rows: 3, columns: 3};          // X, y, width and height set dynamically below - DO NOT ADJUST HERE
let PIECES = [];
let SELECTED_PIECE = null;

function main(){
// Initialize canvas and context, set canvas size
    CANVAS = document.getElementById("puzzleCanvas");
    CONTEXT = CANVAS.getContext("2d");
    
// Add event listeners to the Canvas for drag/drop functionality
    addEventListeners();

// Initialize camera, create function to play video from source
    let promise = navigator.mediaDevices.getUserMedia({video:true});
    promise.then (function(signal){
        VIDEO = document.createElement("video");
        VIDEO.srcObject = signal;
        VIDEO.play();

        VIDEO.onloadeddata = function(){
            handleResize();
            window.addEventListener('resize',handleResize);
            initializePieces(SIZE.rows, SIZE.columns);
            updateCanvas();
        }

// Deal with errors, i.e. no web came or denied privileges...
    }).catch (function(err){
        alert("Camera error: " +err);
    });
    
}

function addEventListeners(){
// Event listeners for drag/drop functionality
    CANVAS.addEventListener("mousedown", onMouseDown);
    CANVAS.addEventListener("mousemove", onMouseMove);
    CANVAS.addEventListener("mouseup", onMouseUp);

}

function onMouseDown(evt){
    SELECTED_PIECE = getPressedPiece(evt);
    if(SELECTED_PIECE!=null){
        SELECTED_PIECE.offset = {
            x: evt.x-SELECTED_PIECE.x,
            y: evt.y-SELECTED_PIECE.y
        }
    }
}

function onMouseMove(evt){
    if(SELECTED_PIECE!=null){
        SELECTED_PIECE.x = evt.x-SELECTED_PIECE.offset.x;
        SELECTED_PIECE.y = evt.y-SELECTED_PIECE.offset.y;
    }
}

function onMouseUp(evt){
    if(SELECTED_PIECE.isClose()){
        SELECTED_PIECE.snap();
    }
    SELECTED_PIECE = null;
}

function getPressedPiece(loc){
    for(let i = 0; i < PIECES.length; i++){
        if(loc.x > PIECES[i].x && loc.x < PIECES[i].x + PIECES[i].width && loc.y > PIECES[i].y && loc.y < PIECES[i].y + PIECES[i].height){
            return PIECES[i];
        }
    }
    return null;
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
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);

// Make background image transparent, print in the center of the Canvas
    CONTEXT.globalAlpha=0.4;
    CONTEXT.drawImage(VIDEO, SIZE.x, SIZE.y, SIZE.width, SIZE.height);
// Reset transparency so pieces appear normally
    CONTEXT.globalAlpha=1;

    for (let i = 0; i < PIECES.length; i++){
        PIECES[i].draw(CONTEXT);
    }

    window.requestAnimationFrame(updateCanvas);

}

function initializePieces(rows, cols){
// Set the number of rows and columns in the global SIZE variable
    SIZE.rows = rows;
    SIZE.columns = cols;

// Initialize the puzzle pieces, iterate through the rows (i) and columns (j)
    PIECES = [];
    for (let i = 0; i < SIZE.rows; i++){
        for (let j = 0; j < SIZE.columns; j++){
            PIECES.push(new Piece(i,j));
        }
    }
}

function randomizePieces(){
// Place the pieces in random locations on the screen, like a puzzle on a table
    for (let i = 0; i < PIECES.length; i++){
        let loc = {
            x:Math.random() * (CANVAS.width - PIECES[i].width),
            y:Math.random() * (CANVAS.height - PIECES[i].height)
        }
        PIECES[i].x = loc.x;
        PIECES[i].y = loc.y;
    }
}

class Piece {
    constructor(rowIndex, colIndex){
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.width = SIZE.width / SIZE.columns;                             // Sets piece width to total width / number of columns
        this.height = SIZE.height / SIZE.rows;                              // Sets piece height to total height / number of rows
        this.x = SIZE.x + SIZE.width * this.colIndex / SIZE.columns;        // Sets x coordinate in order (will change)
        this.y = SIZE.y + SIZE.height * this.rowIndex / SIZE.rows;          // Sets y coordinate in order (will change)
        this.xCorrect = this.x;                                             // Save the xCorrect value at initiation
        this.yCorrect = this.y;                                             // Save the yCorrect value at initiation
    }

    draw (context){
        context.beginPath();

// Draw video into the pieces
        context.drawImage(VIDEO,
            this.colIndex * VIDEO.videoWidth / SIZE.columns,
            this.rowIndex * VIDEO.videoHeight / SIZE.rows,
            VIDEO.videoWidth / SIZE.columns,
            VIDEO.videoHeight / SIZE.rows,
            this.x,
            this.y,
            this.width,
            this.height);

        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();
    }

    isClose(){
        if(distance({x: this.x, y: this.y}, {x: this.xCorrect, y: this.yCorrect}) < this.width / 3){
            return true;
        }
        return false;
    }

    snap(){
        this.x = this.xCorrect;
        this.y = this.yCorrect;
    }

}

function distance(p1,p2){
    return Math.sqrt(
        (p1.x-p2.x) * (p1.x-p2.x) + 
        (p1.y-p2.y) * (p1.y-p2.y));
}