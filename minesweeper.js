var Board = function (w, h, n) {
    this.width = w,
    this.height = h,
    this.noOfMines = n,
    this.remainingMines = n,
    this.map,
    this.squareCount = 0;
    this.minesArr = [],
    this.flagArr = [],
    this.mines = function () {
        //This function generate Mines array
        var totalSquares = this.width * this.height;
        var minesArr = [];
        //Generate random location for mines 
        while (minesArr.length < this.noOfMines) {
            var randomnumber = Math.floor(Math.random() * totalSquares) + 1;
            if (minesArr.indexOf(randomnumber) > -1) continue;
            minesArr[minesArr.length] = randomnumber;
        }
        return minesArr;
    },
    this.mineMap = function () {
        var mineMap = [];
        var square = 0;
        //Add mines to the map first
        var mines = this.mines();
        var k = 0;
        for (let i = 0; i < this.height; i++) {
            mineMap[i] = [];
            for (let j = 0; j < this.width; j++) {
                square++;
                if (mines.indexOf(square) > -1) {
                    mines.splice(mines.indexOf(square), 1);
                    mineMap[i][j] = "*";
                    this.minesArr[k] = "" + i + j;
                    k++;
                }
                else {
                    mineMap[i][j] = 0;
                }
            }
        }
        this.map = mineMap;
        mineMap = this.generateMineMap();
        return mineMap;
    },
    this.generateMineMap = function () {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.map[i][j] == "*") {
                    let tmpi = i - 1;
                    let tmpj = j - 1;
                    for (let k = tmpi; k < tmpi + 3; k++) {
                        for (let l = tmpj; l < tmpj + 3; l++) {
                            this.changeMapValue(k, l);
                        }
                    }
                }
            }
        }
        return this.map;
    },
    this.changeMapValue = function (i, j) {
        if ((i >= 0 && i < this.height) && (j >= 0 && j < this.width) && this.map[i][j] != "*") {
            this.map[i][j] += 1;
        }
        return;
    },
    this.drawMineGrid = function () {
        var gridCol;
        var minesweeperGrid = document.getElementById("minesweeperGrid");
        remainingMines = this.noOfMines
        document.getElementById("remainingMines").textContent = pad(this.remainingMines);
        var mineMap = this.mineMap();
        for (let i = 0; i < board.height; i++) {
            gridCol = document.createElement("div");
            gridCol.className = "mineRow";
            for (let j = 0; j < board.width; j++) {
                let mineSquare = document.createElement("div");
                mineSquare.id = "" + i + j;
                mineSquare.setAttribute("style", "background-image:url('" + this.imageUrl('E') + "')");
                mineSquare.className = "mineSquare";
                gridCol.appendChild(mineSquare);
            }
            minesweeperGrid.appendChild(gridCol);
        }
        minesweeperGrid.addEventListener("click", clickEventFunc);
        minesweeperGrid.addEventListener("contextmenu", rightClickEventFunc);
    },
    this.imageUrl = function (value) {
        switch (value) {
            case '0':
                return "images/emptyOpen.png";
            case '1':
                return "images/1.png";
            case '2':
                return "images/2.png";
            case '3':
                return "images/3.png";
            case '4':
                return "images/4.png";
            case '5':
                return "images/5.png";
            case '6':
                return "images/6.png";
            case '7':
                return "images/7.png";
            case '8':
                return "images/8.png";
            case 'E':
                return "images/emptyClose.png";
            case '*':
                return "images/mine.png";
            case '**':
                return "images/minered.png";
            case 'F':
                return "images/flag.png";
            case '?':
                return "images/question.png";
            case 'L':
                return "images/sad.png";
            case 'H':
                return "images/happy.png";
            case 'W':
                return "images/cool.png";
        }
    };

};
//CountUp Timer
function setTime() {
    ++totalSeconds;
    document.getElementById("seconds").textContent = pad(totalSeconds);
}
function pad(val) {
    var valString = val + "";
    if (valString.length == 1) {
        return "00" + valString;
    }
    else if (valString.length == 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
}
// Function for rightclick event 
rightClickEventFunc = function (event) {
    let squareId = event.srcElement.id;
    let i = parseInt(squareId.charAt(0));
    let j = parseInt(squareId.charAt(1));
    if (!("" + board.map[i][j]).includes("F")) {
        changeImage(squareId, 'F');
        board.squareCount++;
        board.remainingMines = board.remainingMines - 1;
        document.getElementById("remainingMines").textContent = pad(board.remainingMines);
        board.map[i][j] += "F";
        isPlayerWon();
    }
    event.preventDefault();
};
//Function for click event
clickEventFunc = function (event) {
    let squareId = event.srcElement.id;
    let i = parseInt(squareId.charAt(0));
    let j = parseInt(squareId.charAt(1));
    //Reintialize flag array map elements as 0 for each click 
    for (let x = 0; x < board.height; x++) {
        board.flagArr[x] = [];
        for (let y = 0; y < board.width; y++) {
            board.flagArr[x][y] = 0;
        }
    }
    if (("" + board.map[i][j]).includes("F")) {
        let newStr = board.map[i][j];
        newStr = newStr.substr(0, newStr.length - 1);
        board.map[i][j] = "" + newStr;
        board.squareCount--;
        board.remainingMines++;
        document.getElementById("remainingMines").textContent = pad(board.remainingMines);
        changeImage(squareId, '?');
    }
    else if (("" + board.map[i][j]).includes("*")) {
        gameOverFunc(i, j);
    } 
    else {
        var currentSquare = checkCurrentSquare(i, j);
        if (currentSquare == "0") {
            checkAdjSquares(i, j);
        }
        isPlayerWon();
    }
};
//Check the clicked square 
function checkCurrentSquare(x, y) {
    //console.log(board.flagArr);
    
    board.flagArr[x][y] = 1;
    if (("" + board.map[x][y]).includes("*")||("" + board.map[x][y]).includes("F")) {
        return "-1";
    }
    else if ("12345678".includes(board.map[x][y])) {
        board.squareCount++;
        changeImage("" + x + y, "" + board.map[x][y]);
        return "1";
    } else if (("" + board.map[x][y]).includes("0")) {
        board.squareCount++;
        changeImage("" + x + y, "" + board.map[x][y]);
        return "0";
    }
    return;
}
//Check the neighbour squares 
function checkAdjSquares(x, y) {
    let tmpx = x - 1;
    let tmpy = y - 1;
    for (let k = tmpx; k < tmpx + 3; k++) {
        for (let l = tmpy; l < tmpy + 3; l++) {
            if ((k >= 0 && k < board.height) && (l >= 0 && l < board.width)) {
                if (board.flagArr[k][l] == 0) {
                    var currentSquare = checkCurrentSquare(k, l);
                    if (currentSquare == "0") {
                        checkAdjSquares(k, l);
                    }
                }
            }
        }
    }
    return;
}
//Function called when the game is over
gameOverFunc = function(x, y) {
    
    for (let k = 0; k < board.minesArr.length; k++) {
        let mineLoc = "" + board.minesArr[k];
        let i = parseInt(mineLoc.charAt(0));
        let j = parseInt(mineLoc.charAt(1));
        changeImage("" + i + j, "*");
    }
    board.map[x][y] += "*";
    changeImage("" + x + y, "" + board.map[x][y]);
    document.getElementById("messegeDiv").textContent = "You Lost :("
    changeImage("gameStatusImage", 'L');
    clearTimeout(myTimer);
    // To disable the board
    document.getElementById('minesweeperGrid').style.pointerEvents = 'none';
};
//Function to check if the player has won the game
isPlayerWon = function () {
    if (board.squareCount == board.width * board.height) {
        document.getElementById("messegeDiv").textContent = "You Won :)"
        changeImage("gameStatusImage", 'W');
        clearTimeout(myTimer);
        // To disable the board
        document.getElementById('minesweeperGrid').style.pointerEvents = 'none';
    }
};
//Function to change the image for particular square 
function changeImage(elementId, imgId) {
    let mineSquare = document.getElementById(elementId);
    mineSquare.setAttribute("style", "background-image:url('" + board.imageUrl(imgId) + "')");
    return;
}
//Start a new game
function startANewGame() {
    let h = document.getElementById("height").value;
    let w = document.getElementById("width").value;
    let n = document.getElementById("noOfMines").value;
    // To disable the board
    document.getElementById('minesweeperGrid').style.pointerEvents = 'auto';
   //Removing all the children elements and event listeners
    var mineGrid = document.getElementById("minesweeperGrid");
    var cloneGrid = mineGrid.cloneNode();
    mineGrid.parentNode.replaceChild(cloneGrid, mineGrid);
    if (w < 1 || h < 1 || n < 1) {
        if (board) {
            w = board.width;
            h = board.height;
            n = board.noOfMines;
        } else {
            w = 5;
            h = 5;
            n = 5;
        }
        document.getElementById("height").value = h;
        document.getElementById("width").value = w;
        document.getElementById("noOfMines").value = n;
    }
    board = new Board(w, h, n);
    board.drawMineGrid();
    changeImage("gameStatusImage", 'H');
    document.getElementById("messegeDiv").textContent = "";
    //Clearing the Interval 
    totalSeconds = 0;
    clearInterval(myTimer);
    myTimer = setInterval(setTime, 1000);
}
var board;
var totalSeconds;
var myTimer = setInterval(setTime, 1000);
startANewGame();