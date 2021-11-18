// const { format } = require("path");

// Global variables
let VIDEO = null;
let CANVAS = null;
let CONTEXT = null;
let SCALER = 0.75;                                                          // Sets percent of screen the image takes up
let SIZE = {x: 0, y: 0, width: 0, height: 0, rows: 3, columns: 3};          // X, y, width and height set dynamically with 'setDifficulty' function - DO NOT ADJUST HERE
let PIECES = [];
let SELECTED_PIECE = null;
let START_TIME = null;
let END_TIME = null;

// Define game sounds
let CLICK_SOUND = new Audio('sounds/click.wav');
CLICK_SOUND.volume = 0.2;
let WIN_SOUND = new Audio('sounds/win.wav');
WIN_SOUND.volume = 0.2;

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
            updateGame();
        }

// Deal with errors, i.e. no web came or denied privileges...
    }).catch (function(err){
        alert("Camera error: " +err);
    });
    
}

function setDifficulty(){
    let diff = document.getElementById("difficulty").value;
    switch(diff){
        case "easy":
            initializePieces(3,3);
            break;
        case "medium":
            initializePieces(5,5);
            break;
        case "hard":
            initializePieces(10,10);
            break;
        case "insane":
            initializePieces(20,20);
            break;
    }
}

function restart(){
    START_TIME = new Date().getTime();
    END_TIME = null;
    randomizePieces();
    document.getElementById("menuItems").style.display = "none";
}

function updateTime(){
    let now = new Date().getTime();
    if(START_TIME != null){
        if(END_TIME != null){
            document.getElementById("time").innerHTML = formatTime(END_TIME - START_TIME);
        } else {
            document.getElementById("time").innerHTML = formatTime(now - START_TIME);
        }
    }
}

function isComplete(){
    for (let i = 0; i < PIECES.length; i++){
        if(PIECES[i].correct == false){
            return false;
        }
    }
    return true;
}

function formatTime(milliseconds){
    let seconds = Math.floor(milliseconds / 1000);
    let s = Math.floor(seconds % 60);
    let m = Math.floor((seconds % (60 * 60)) / 60);
    let h = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));

    let formattedTime = h.toString().padStart(2,'0');
    formattedTime += ":";
    formattedTime += m.toString().padStart(2,'0');
    formattedTime += ":";
    formattedTime += s.toString().padStart(2,'0');

    return formattedTime;
}

function addEventListeners(){
// Event listeners for drag/drop functionality
    CANVAS.addEventListener("mousedown", onMouseDown);
    CANVAS.addEventListener("mousemove", onMouseMove);
    CANVAS.addEventListener("mouseup", onMouseUp);
    CANVAS.addEventListener("touchstart", onTouchStart);
    CANVAS.addEventListener("touchmove", onTouchMove);
    CANVAS.addEventListener("touchend", onTouchEnd);
}

function onMouseDown(evt){
    const imgData = CONTEXT.getImageData(evt.x, evt.y, 1, 1);
    if(imgData.data[3] == 0){
        return;
    }
    const clickedColor = "rgb(" + imgData.data[0] + "," + imgData.data[1] + "," + imgData.data[2] + ")";
    SELECTED_PIECE = getPressedPiece(evt);
    if(SELECTED_PIECE!=null){
        const index = PIECES.indexOf(SELECTED_PIECE);
        if (index > -1){
            PIECES.splice(index,1);
            PIECES.push(SELECTED_PIECE);
        }
        SELECTED_PIECE.offset = {
            x: evt.x-SELECTED_PIECE.x,
            y: evt.y-SELECTED_PIECE.y
        }
        SELECTED_PIECE.correct = false;
    }
}

function onTouchStart(evt){
    let loc = {x: evt.touches[0].clientX,
        y: evt.touches[0].clientY};
    onMouseDown(loc);
}

function onTouchMove(evt){
    let loc = {x: evt.touches[0].clientX,
        y: evt.touches[0].clientY};
    onMouseMove(loc);
}

function onTouchEnd(){
    onMouseUp();
}

function onMouseMove(evt){
    if(SELECTED_PIECE!=null){
        SELECTED_PIECE.x = evt.x-SELECTED_PIECE.offset.x;
        SELECTED_PIECE.y = evt.y-SELECTED_PIECE.offset.y;
    }
}

function onMouseUp(){
    if(SELECTED_PIECE && SELECTED_PIECE.isClose()){
        SELECTED_PIECE.snap();
        if(isComplete() && END_TIME == null){
            let now = new Date().getTime();
            END_TIME = now;
            WIN_SOUND.play();
            showEndScreen();
        }
    }
    SELECTED_PIECE = null;
}

function getPressedPiece(loc){
    for(let i = PIECES.length - 1; i >= 0; i--){
        if(loc.x > PIECES[i].x && loc.x < PIECES[i].x + PIECES[i].width && loc.y > PIECES[i].y && loc.y < PIECES[i].y + PIECES[i].height){
            return PIECES[i];
        }
    }
    return null;
}

function getPressedPieceByColor(loc,color){
    for(let i = PIECES.length - 1; i >= 0; i--){
        if(PIECES[i].color == color){
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

function updateGame(){
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

    updateTime();
    window.requestAnimationFrame(updateGame);

}

function getRandomColor(){
    const red = Math.floor(Math.random()*255);
    const green = Math.floor(Math.random()*255);
    const blue = Math.floor(Math.random()*255);
    return "rgb(" + red + "," + green + "," + blue + ")";
}

function initializePieces(rows, cols){
// Set the number of rows and columns in the global SIZE variable
    SIZE.rows = rows;
    SIZE.columns = cols;

// Initialize the puzzle pieces, iterate through the rows (i) and columns (j)
    PIECES = [];
    const uniqueRandomColors = [];
    for (let i = 0; i < SIZE.rows; i++){
        for (let j = 0; j < SIZE.columns; j++){
            let color = getRandomColor();
            while(uniqueRandomColors.includes(color)){
                color = getRandomColor();
            }
            PIECES.push(new Piece(i,j,color));
        }
    }

    let count = 0;
    for (let i = 0; i < SIZE.rows; i++){
        for (let j = 0; j < SIZE.columns; j++){
            const piece = PIECES[count];
            if(i == SIZE.rows-1){
                piece.bottom = null;
            }else{
                const sign = (Math.random()-0.5) < 0? -1:1;
                piece.bottom = sign* (Math.random()*0.4+0.3);
            }

            if(j == SIZE.columns-1){
                piece.right = null;
            }else{
                const sign = (Math.random()-0.5) <0? -1:1;
                piece.right = sign* (Math.random()*0.4+0.3);
            }

            if(j == 0){
                piece.left = null;
            }else{
                piece.left = -PIECES[count - 1].right;
            }

            if(i == 0){
                piece.top = null;
            }else{
                piece.top = -PIECES[count-SIZE.columns].bottom;
            }
            count++;
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
        PIECES[i].correct = false;
    }
}

class Piece {
    constructor(rowIndex, colIndex, color){
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.width = SIZE.width / SIZE.columns;                             // Sets piece width to total width / number of columns
        this.height = SIZE.height / SIZE.rows;                              // Sets piece height to total height / number of rows
        this.x = SIZE.x + SIZE.width * this.colIndex / SIZE.columns;        // Sets x coordinate in order (will change)
        this.y = SIZE.y + SIZE.height * this.rowIndex / SIZE.rows;          // Sets y coordinate in order (will change)
        this.xCorrect = this.x;                                             // Save the xCorrect value at initiation
        this.yCorrect = this.y;                                             // Save the yCorrect value at initiation
        this.correct = true;                                                // Assigns a "correct" place for each piece
        this.color = color;                                                 // Allows tabs to be used to move pieces
    }

    draw (context, useCam = true){
        context.beginPath();

// Draw video into the pieces
        
        // set puzzle tab dimensions
        const size = Math.min(this.width, this.height);
        const neck = 0.1 * size;
        const tabWidth = 0.2 * size;
        const tabHeight = 0.2 * size;

        // draw tabs on the pieces
        // context.rect(this.x, this.y, this.width, this.height);
        // from top left
        context.moveTo(this.x, this.y); 
        // to top right
        if(this.top){
            context.lineTo(this.x + this.width * Math.abs(this.top) - neck, this.y);
            context.bezierCurveTo(
                this.x + this.width * Math.abs(this.top) - neck,
                this.y - tabHeight * Math.sign(this.top) * 0.2,

                this.x + this.width * Math.abs(this.top) - tabWidth,
                this.y - tabHeight * Math.sign(this.top),

                this.x + this.width * Math.abs(this.top),
                this.y - tabHeight * Math.sign(this.top)
            );
            context.bezierCurveTo(
                this.x + this.width * Math.abs(this.top) + tabWidth,
                this.y - tabHeight * Math.sign(this.top),

                this.x + this.width * Math.abs(this.top) + neck,
                this.y - tabHeight * Math.sign(this.top) * 0.2,

                this.x + this.width * Math.abs(this.top) + neck,
                this.y
            );
            
            context.lineTo(this.x + this.width * Math.abs(this.top) + neck, this.y);
        }
        context.lineTo(this.x + this.width, this.y); 

        // to bottom right
        if(this.right){
            context.lineTo(this.x + this.width, this.y + this.height * Math.abs(this.right) - neck);
            context.bezierCurveTo(
                this.x + this.width - tabHeight * Math.sign(this.right) * 0.2,
                this.y + this.height * Math.abs(this.right) - neck,

                this.x + this.width - tabHeight * Math.sign(this.right),
                this.y + this.height * Math.abs(this.right) - tabWidth,

                this.x + this.width - tabHeight * Math.sign(this.right),
                this.y + this.height * Math.abs(this.right)
            );
            context.bezierCurveTo(
                this.x + this.width - tabHeight * Math.sign(this.right),
                this.y + this.height * Math.abs(this.right) + tabWidth,

                this.x + this.width - tabHeight * Math.sign(this.right) * 0.2,
                this.y + this.height * Math.abs(this.right) + neck,

                this.x + this.width,
                this.y + this.height * Math.abs(this.right) + neck
            );
            context.lineTo(this.x + this.width, this.y + this.height * Math.abs(this.right) + neck);
        }
        context.lineTo(this.x + this.width, this.y + this.height); 

        // to bottom left
        if(this.bottom){
            context.lineTo(this.x + this.width * Math.abs(this.bottom) + neck, this.y + this.height);
            context.bezierCurveTo(
                this.x + this.width * Math.abs(this.bottom) + neck,
                this.y + this.height + tabHeight * Math.sign(this.bottom) * 0.2,

                this.x + this.width * Math.abs(this.bottom) + tabWidth,
                this.y + this.height + tabHeight * Math.sign(this.bottom),

                this.x + this.width * Math.abs(this.bottom),
                this.y + this.height + tabHeight * Math.sign(this.bottom)
            );
            context.bezierCurveTo(
                this.x + this.width * Math.abs(this.bottom) - tabWidth,
                this.y + this.height + tabHeight * Math.sign(this.bottom),

                this.x + this.width * Math.abs(this.bottom) - neck,
                this.y + this.height + tabHeight * Math.sign(this.bottom) * 0.2,

                this.x + this.width * Math.abs(this.bottom) - neck,
                this.y + this.height
            );
            context.lineTo(this.x + this.width * Math.abs(this.bottom) - neck, this.y + this.height);
        }
        context.lineTo(this.x, this.y + this.height); 
        // to top left
        if(this.left){
            context.lineTo(this.x, this.y + this.height * Math.abs(this.left) + neck);
            context.bezierCurveTo(
                this.x + tabHeight * Math.sign(this.left) * 0.2,
                this.y + this.height * Math.abs(this.left) + neck,

                this.x + tabHeight * Math.sign(this.left),
                this.y + this.height * Math.abs(this.left) + tabWidth,

                this.x + tabHeight * Math.sign(this.left),
                this.y + this.height * Math.abs(this.left)
            );
            context.bezierCurveTo(
                this.x + tabHeight * Math.sign(this.left),
                this.y + this.height * Math.abs(this.left) - tabWidth,

                this.x + tabHeight * Math.sign(this.left) * 0.2,
                this.y + this.height * Math.abs(this.left) - neck,

                this.x,
                this.y + this.height * Math.abs(this.left) - neck
            );
            context.lineTo(this.x, this.y + this.height * Math.abs(this.left) - neck);
        }
        context.lineTo(this.x, this.y); 

        context.save();
        context.clip();

        const scaledTabHeight = Math.min(VIDEO.videoWidth / SIZE.columns, VIDEO.videoHeight / SIZE.rows) * tabHeight / size;
        
        if(useCam){
            context.drawImage(VIDEO,
                this.colIndex * VIDEO.videoWidth / SIZE.columns - scaledTabHeight,
                this.rowIndex * VIDEO.videoHeight / SIZE.rows - scaledTabHeight,
                VIDEO.videoWidth / SIZE.columns + scaledTabHeight * 2,
                VIDEO.videoHeight / SIZE.rows + scaledTabHeight * 2,
                this.x - tabHeight,
                this.y - tabHeight,
                this.width + tabHeight * 2,
                this.height + tabHeight * 2
            );
        }else{
            context.fillStyle = this.color;
            context.fillRect(this.x - tabHeight, this.y - tabHeight,
                this.width + tabHeight * 2, this.height + tabHeight * 2);
        }
        context.restore();

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
        this.correct = true;
        CLICK_SOUND.play();
    }

}

function distance(p1,p2){
    return Math.sqrt(
        (p1.x-p2.x) * (p1.x-p2.x) + 
        (p1.y-p2.y) * (p1.y-p2.y));
}

function showEndScreen(){
    const time = Math.floor((END_TIME - START_TIME) / 1000);
    document.getElementById("scoreValue").innerHTML="Time: " + time + " seconds";
    document.getElementById("endScreen").style.display="block";
}

function showMenu(){
    document.getElementById("endScreen").style.display="none";
    document.getElementById("menuItems").style.display="block";

}