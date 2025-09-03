class DomDisplay {
    constructor() {
        this._realPlayerBoardDisplay = document.querySelector(".real-player-board-div");
        this._computerPlayerBoardDisplay = document.querySelector(".computer-player-board-div");
    }

    displayPlayerBoard(type, board) {
        let boardDisplay = null;
        if(type === "real") {
            boardDisplay = this._realPlayerBoardDisplay;
        } else {
            boardDisplay = this._computerPlayerBoardDisplay;
        }

        for(let i = 0 ; i < board.length ; i++) {
            for (let j = 0 ; j < board[0].length ; j++) {
                let square = document.createElement("div");
                square.className = "board-square";

                if(board[i][j] === "hit") {
                    square.style.backgroundColor = "red";
                }
                if(board[i][j] === "missed") {
                    square.style.backgroundColor = "blue";
                }

                boardDisplay.appendChild(square);
            }
        }
    }
}

module.exports = DomDisplay;