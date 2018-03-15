var Board = function (w, h, n) {
    this.width = w,
    this.height = h,
    this.noOfMines = n,
    this.remainingMines=n,
    this.map,
    this.minesArr=[],
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
            //Add mines  the map first
            var mines = this.mines();
            
            var k=0;
            for (let i = 0; i < this.height; i++) {
                mineMap[i] = [];
                for (let j = 0; j < this.width; j++) {
                    square++;
                    if (mines.indexOf(square) > -1) {
                        mines.splice(mines.indexOf(square), 1);
                        mineMap[i][j] = "*";
                        this.minesArr[k]=""+i+j;
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
                        let tmpi=i-1;
                        let tmpj=j-1;
                        for(let k=tmpi;k<tmpi+3;k++ ){
                            for(let l=tmpj;l<tmpj+3;l++){
                                this.changeMapValue(k,l);
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
            remainingMines=this.noOfMines
            document.getElementById("remainingMines").textContent = pad(this.remainingMines);
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

            //Testing --Start

            for (let i = 0; i < board.height; i++) {
                gridCol = document.createElement("div");
                gridCol.className = "mineRow";
                for (let j = 0; j < board.width; j++) {
                    let mineSquare = document.createElement("div");
                    mineSquare.id = "" + i + j;
                    
                    //mineSquare.setAttribute("style", "background-image:url('" + this.imageUrl('E') + "')");
                    mineSquare.setAttribute("style", "background-image:url('" + this.imageUrl(""+mineMap[i][j]) + "')");
                    mineSquare.className = "mineSquare";
                    gridCol.appendChild(mineSquare);
                }
                document.body.appendChild(gridCol);
            }
            //Testing End

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
    document.getElementById("seconds").textContent = pad(totalSeconds % 60);
}

function pad(val) {
    var valString = val + "";
    if (valString.length == 1 ) {
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
    let i=parseInt(squareId.charAt(0));
    let j=parseInt(squareId.charAt(1));   
    if (!(""+board.map[i][j]).includes("F")){
        changeImage(squareId,'F');
        board.remainingMines=board.remainingMines-1;
        document.getElementById("remainingMines").textContent = pad(board.remainingMines);
        let i=parseInt(squareId.charAt(0));
        let j=parseInt(squareId.charAt(1));
        board.map[i][j]=board.map[i][j]+"F";
    }
    event.preventDefault();
};

//Function for click event
clickEventFunc = function (event) {
    let squareId = event.srcElement.id;      
    let i=parseInt(squareId.charAt(0));
    let j=parseInt(squareId.charAt(1));   
    //let mineSquare = document.getElementById(squareId);
    
    if ((""+board.map[i][j]).includes("*")){
        gameOverFunc(i,j);
    }else if ((""+board.map[i][j]).includes("F")){
        let newStr=board.map[i][j];
        newStr=newStr.substr(0, newStr.length-1);
        board.map[i][j]= ""+newStr;
        board.remainingMines=board.remainingMines+1;
        document.getElementById("remainingMines").textContent = pad(board.remainingMines);
        changeImage(squareId,'?');
    }
    else {
        if (checkCurrentSquare(i,j)){
             checkAdjSquares(i,j);
        }   
    }
};

function gameOverFunc(x,y){
    
    board.map[x][y]+="*";
    changeImage(""+x+y,board.map[x][y]);
    
    console.log(board.minesArr)
    for (let k=0;k<board.minesArr.length;k++)
      {
          console.log(board.minesArr[k]);
          let mineLoc=""+board.minesArr[k];
          let i=parseInt(mineLoc.charAt(0));
          let j=parseInt(mineLoc.charAt(1));
          changeImage(""+i+j,board.map[i][j]);
     
      }
      changeImage("gameStatusImage",'L');
    
}

function checkCurrentSquare(x,y)
 {
    if ((""+board.map[x][y]).includes("*")){
        return false;
    }
    else if ("12345678".includes(board.map[x][y])){
        changeImage(""+x+y,board.map[x][y]);
        return false;
    }else if ((""+board.map[x][y]).includes("0")){
        changeImage(""+x+y,board.map[x][y]);
        return true;
    }
 }

function checkAdjSquares(x,y){
   let tmpx=x-1;
   let tmpy=y-1;
   for(let k=tmpx;k<tmpx+3;k++ ){
        for(let l=tmpy;l<tmpy+3;l++){
            if ((k >= 0 && k < board.height) && (l >= 0 && l < board.width) && (checkCurrentSquare(k,l))){
                checkAdjSquares(k,l);
            }  
         }
    return;        
    }      
}
      
//Function to change the image for particular square 
function changeImage(elementId,imgId){
    let mineSquare = document.getElementById(elementId);
    mineSquare.setAttribute("style", "background-image:url('" + board.imageUrl(imgId) + "')");
    return;
}

function startANewGame() {
    let h=document.getElementById("height").value ;
    let w=document.getElementById("width").value ;
    let n=document.getElementById("noOfMines").value ;
    //Removing all the children elements and event listeners
    var mineGrid = document.getElementById("minesweeperGrid");
    var cloneGrid = mineGrid.cloneNode();
    mineGrid.parentNode.replaceChild(cloneGrid, mineGrid);
    if (w<1 || h<1 || n<1){ 
        console.log(board);
        if (board){
            w=board.width;
            h=board.height;
            n=board.noOfMines;
        }else{
            w=5;
            h=5;
            n=5;
        }
        document.getElementById("height").value=h ;
        document.getElementById("width").value=w ;
        document.getElementById("noOfMines").value=n ;
    }
    board = new Board(w, h, n);
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




