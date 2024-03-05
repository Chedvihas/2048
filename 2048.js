var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function(){
    setGame();
}


var setGame = () => {

    // board = [

    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ]
    board = [

        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for(let r=0; r< rows; r++){
        for(let c=0; c<columns;c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile,num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();

}


var hasEmptyTile = () =>{
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++){
            if(board[r][c]==0){
                return true;
            }
        }
    }
    return false;
}

var setTwo = () =>{

    if(!hasEmptyTile()){
        return;
    }

    let found = false;
    while(!found){
        let r = Math.floor(Math.random()*rows);
        let c = Math.floor(Math.random()*columns);

        if(board[r][c]==0){
            board[r][c]=2
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }

    }
}

var updateTile = (tile,num) => {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if(num>0){
        tile.innerText = num;
        if(num<=4096){
            tile.classList.add("x"+num.toString());
        }

        else{
            tile.classList.add("x8192");
        }
    }
}


document.addEventListener("keyup", (e) => {
    if(e.code=="ArrowLeft"){
        slideLeft();
        setTwo();
    }
    
    else if(e.code=="ArrowRight"){
        slideRight();
        setTwo();
    }
    else if(e.code=="ArrowUp"){
        slideUp();
        setTwo();
    }
    else if(e.code=="ArrowDown"){
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
}
)


var swipeStartX = 0;
var swipeStartY = 0;
var swipeEndX = 0;
var swipeEndY = 0;

document.addEventListener('pointerdown', handleSwipeStart, false);
document.addEventListener('touchstart', handleSwipeStart, false);

document.addEventListener('pointerup', handleSwipeEnd, false);
document.addEventListener('touchend', handleSwipeEnd, false);

function handleSwipeStart(event) {
    if (event.type === 'touchstart') {
        swipeStartX = event.touches[0].clientX;
        swipeStartY = event.touches[0].clientY;
    } else if (event.type === 'pointerdown') {
        swipeStartX = event.clientX;
        swipeStartY = event.clientY;
    }
}

function handleSwipeEnd(event) {
    if (event.type === 'touchend') {
        swipeEndX = event.changedTouches[0].clientX;
        swipeEndY = event.changedTouches[0].clientY;
    } else if (event.type === 'pointerup') {
        swipeEndX = event.clientX;
        swipeEndY = event.clientY;
    }
    handleGesture();
}

function handleGesture() {
    const dx = swipeEndX - swipeStartX;
    const dy = swipeEndY - swipeStartY;
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
            // Swipe right
            slideRight();
            setTwo();
        } else {
            // Swipe left
            slideLeft();
            setTwo();
        }
    } else {
        if (dy > 0) {
            // Swipe down
            slideDown();
            setTwo();
        } else {
            // Swipe up
            slideUp();
            setTwo();
        }
    }
}


var filterZero = (row) => {
    return row.filter(num=>num!=0);
}

var slide = (row) => {
row = filterZero(row);


for(let i=0;i<row.length - 1; i++){

    if(row[i]==row[i+1]){
        row[i] += row[i+1];
        row[i+1] = 0;
        score+=row[i];
    }
}

row = filterZero(row);

while(row.length<columns){
    row.push(0);
}
return row;

}


var slideLeft = () =>{
    for(let r=0;r<rows;r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for(let c=0;c<columns;c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, board[r][c]);
        }
    }
}

var slideRight = () =>{
    for(let r=0;r<rows;r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        for(let c=0;c<columns;c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, board[r][c]);
        }
    }
}

var slideUp = () =>{
    for(let c=0;c<columns;c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for(let r=0;r<rows;r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, board[r][c]);
        }
    }
}


var slideDown = () =>{
    for(let c=0;c<columns;c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for(let r=0;r<rows;r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, board[r][c]);
        }
    }
}

