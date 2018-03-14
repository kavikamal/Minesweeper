var board = {
    width: 8,
    height: 8,
    noOfMines: 10,
    totalSquare: this.width * this.height,
    mines: function () {
        //This function generate Mines array
        var totalSquares = this.width * this.height;
        var minesArr = [];
        //Generate random location for mines 
        while (minesArr.length < this.noOfMines) {
            var randomnumber = Math.floor(Math.random() * totalSquares) + 1;
            if (minesArr.indexOf(randomnumber) > -1) continue;
            minesArr[minesArr.length] = randomnumber;
        }
        return minesArr.sort;
    }
};
// Constructor function for Cell object
function Cell(value) {
        this.cellValue = value,
        this.imageUrl = function () {
            
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
                default:
                    return "images/emptyClose.png";    
            }
        };
};

drawMineGrid();

function drawMineGrid() {
    var gridCol;
    var minesweeperGrid = document.getElementById("minesweeperGrid");
    var mines = board.mines();
    var square = 0;
    document.getElementById("totalMines").textContent = mines.length;
    document.getElementById("remainingMines").textContent = mines.length;

    var mineMap =[];

    generateMineMap(mines);

    for (let i = 0; i < board.width; i++) {
        gridCol = document.createElement("div");
        gridCol.className = "mineRow";
        for (let j = 0; j < board.height; j++) {
            square++;
            let mineSquare = document.createElement("div");
            mineSquare.setAttribute("style", "background-image:url('images/emptyClose.png')")
            mineSquare.className = "mineSquare";
            mineSquare.textContent = square;
            gridCol.appendChild(mineSquare);
        }
        minesweeperGrid.appendChild(gridCol);
    }
    
    console.log(mineMap.length);
    console.log(mineMap);
}

function generateMineMap(mines) {

    for (let i = 0; i < board.totalSquare; i++) {

    }
}

