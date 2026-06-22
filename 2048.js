var board;
var score = 0;
var rows = 4;
var columns = 4;
var money = 0;
var spawnFourMode = false;
var alwaysSpawnFour = false;

window.onload = function() {
    setGame();

}

function setGame() {
    board = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
    ]
       //   board = [ 
      //  [2, 2, 2, 2],
       // [2, 2, 2, 2],
       // [4, 4, 8, 8],
        //[4, 4, 8, 8]
    //]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
            
        }
    }

    setTwo();
    setTwo();
}

function hasEmptyTile(){
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if(board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;  
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }

    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if(board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function updateTile(tile, num) {
    tile.innerHTML = "";
    tile.classList.value  ="";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerHTML = num;
        if (num <=4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        } 
   }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft()
        setTwo()
        
        
        
    }
    else if (e.code == "ArrowRight") {
        slideright();
        setTwo()
    }
    else if (e.code == "ArrowUp") {
        slideup();
        setTwo()
        
    }
    else if (e.code == "ArrowDown") {
        slidedown();
        setTwo()
    }
    document.getElementById("score").innerText = score;
})

function filterZero(row) {
    return row.filter(num => num != 0);


}

function slide(row) {
    row = filterZero(row);

    for(let i =0; i < row.length; i++) {
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i +1] = 0;
            score += row[i];

        }

    }
    row = filterZero(row);

    while ( row.length < columns) {
        row.push(0);

    }
    return row;


}


function slideLeft() {
    for (let r = 0; r < rows; r++){
        let  row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideright() {
    for (let r = 0; r < rows; r++){
        let  row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideup() {
    for (let c = 0; c < columns; c++){
        let row =[board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
    
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}


function slidedown() {
    for (let c = 0; c < columns; c++){
        let row =[board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
    
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

let startX;
let startY;

document.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    startY = e.clientY;
});

document.addEventListener("mouseup", (e) => {
    let dx = e.clientX - startX;
    let dy = e.clientY - startY;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 50) {
            slideright();
        } else if (dx < -50) {
            slideLeft();
        }
    } else {
        if (dy > 50) {
            slidedown();
        } else if (dy < -50) {
            slideup();
        }
    }

    setTwo();
    document.getElementById("score").innerText = score;
});

function moveLeft() {
    slideLeft();
    setTwo();
    document.getElementById("score").innerText = score;
}

function moveRight() {
    slideright();
    setTwo();
    document.getElementById("score").innerText = score;
}

function moveUp() {
    slideup();
    setTwo();
    document.getElementById("score").innerText = score;
}

function moveDown() {
    slidedown();
    setTwo();
    document.getElementById("score").innerText = score;
}
