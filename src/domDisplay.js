class DomDisplay {
    constructor() {
        this._realPlayerBoardDisplay = document.querySelector(".real-player-board-div");
        this._computerPlayerBoardDisplay = document.querySelector(".computer-player-board-div");
    }

    displayPlayerBoard(type, board, shipsBoard) {
        let boardDisplay = null;
        if(type === "real") {
            boardDisplay = this._realPlayerBoardDisplay;
        } else {
            boardDisplay = this._computerPlayerBoardDisplay;
        }

        console.log(shipsBoard);

        for(let i = 0 ; i < board.length ; i++) {
            for (let j = 0 ; j < board[0].length ; j++) {
                let square = document.createElement("div");
                square.className = "board-square";

                if(board[i][j] === "hit") {
                    square.textContent = "x";
                }
                if(board[i][j] === "missed") {
                    square.style.backgroundColor = "lightblue";
                }
                if(shipsBoard[i][j] === "ship") {
                    square.style.backgroundColor = "blue";
                }

                boardDisplay.appendChild(square);
            }
        }
    }
}

module.exports = DomDisplay;