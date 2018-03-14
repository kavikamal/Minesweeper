function Board(w, h, n) {
    this.width = w,
        this.height = h,
        this.noOfMines = n,
        this.totalSquare = this.width * this.height,
        this.map,
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
            var mines = this.mines();
            for (let i = 0; i < this.height; i++) {
                mineMap[i] = [];
                for (let j = 0; j < this.width; j++) {
                    square++;
                    if (mines.indexOf(square) > -1) {
                        mines.splice(mines.indexOf(square), 1);
                        mineMap[i][j] = "*";
                    }
                    else {
                        mineMap[i][j] = 0;
                    }
                }
            }
            //console.log(mineMap);
            this.map = mineMap;
            mineMap = this.generateMineMap();

            return mineMap;
        },

        this.generateMineMap = function () {
            var previousCol;
            var nextCol;
            var previousRow;
            var nextRow;
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {

                    if (this.map[i][j] == "*") {
                        this.changeMapValue(i - 1, j - 1);
                        this.changeMapValue(i - 1, j);
                        this.changeMapValue(i - 1, j + 1);
                        this.changeMapValue(i, j - 1);
                        this.changeMapValue(i, j + 1);
                        this.changeMapValue(i + 1, j - 1);
                        this.changeMapValue(i + 1, j);
                        this.changeMapValue(i + 1, j + 1);
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
            document.getElementById("remainingMines").textContent = pad(this.noOfMines);
            //document.getElementById("remainingMines").textContent = this.noOfMines;
            var k = 0;

            var mineMap = this.mineMap();
            for (let i = 0; i < board.height; i++) {
                gridCol = document.createElement("div");
                gridCol.className = "mineRow";

                for (let j = 0; j < board.width; j++) {

                    let mineSquare = document.createElement("div");
                    mineSquare.id = "" + i + j;
                    mineSquare.setAttribute("style", "background-image:url('" + this.imageUrl('E') + "')");
                    //mineSquare.setAttribute("style", "background-image:url('" + this.imageUrl(mineMap[i][j]) + "')");
                    mineSquare.className = "mineSquare";
                    gridCol.appendChild(mineSquare);
                }
                minesweeperGrid.appendChild(gridCol);
            }
            minesweeperGrid.addEventListener("click", this.clickEventFunc);
            minesweeperGrid.addEventListener("contextmenu", this.rightClickEventFunc);

        },

        this.clickEventFunc = function (event) {
            alert("Click" + "id" + event.srcElement.id);

        },

        this.rightClickEventFunc = function (event) {
            let mineSquare = document.getElementById(event.srcElement.id);
            mineSquare.setAttribute("style", "background-image:url('" + board.imageUrl('F') + "')");
            event.preventDefault();
        },
        this.imageUrl = function (value) {
            switch (value) {
                case 0:
                    return "images/emptyOpen.png";
                case 1:
                    return "images/1.png";
                case 2:
                    return "images/2.png";
                case 3:
                    return "images/3.png";
                case 4:
                    return "images/4.png";
                case 5:
                    return "images/5.png";
                case 6:
                    return "images/6.png";
                case 7:
                    return "images/7.png";
                case 8:
                    return "images/8.png";
                case 'E':
                    return "images/emptyClose.png";
                case '*':
                    return "images/mine1.png";
                case '**':
                    return "images/mine.png";
                case 'F':
                    return "images/flag.png";


            }
        };
};


//CountUp Timer



function setTime() {
    ++totalSeconds;
    document.getElementById("seconds").textContent = pad(totalSeconds % 60);

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

function startANewGame() {
    //Removing all the children elements and event listeners
    var mineGrid = document.getElementById("minesweeperGrid");
    var cloneGrid = mineGrid.cloneNode();
    mineGrid.parentNode.replaceChild(cloneGrid, mineGrid);

    board = new Board(10, 10, 20);
    board.drawMineGrid();
    
    //Clearing the Interval 
    totalSeconds = 0;
    clearInterval(myTimer);
    myTimer = setInterval(setTime, 1000);
}


var board;
var totalSeconds;
var myTimer = setInterval(setTime, 4000);
startANewGame();




