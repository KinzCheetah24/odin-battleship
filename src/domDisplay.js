class DomDisplay {
    constructor() {
        this._realPlayerBoardDisplay = document.querySelector(".real-player-board-div");
        this._computerPlayerBoardDisplay = document.querySelector(".computer-player-board-div");
        this._messageDisplay = document.getElementById("info-display");
    }

    displayPlayerBoard(type, gameController) {

        let boardDisplay = null, board = null, shipsBoard = null;
        if(type === "real") {
            boardDisplay = this._realPlayerBoardDisplay;
            board = gameController.realPlayer.gameboard.board;
            shipsBoard = gameController.realPlayer.gameboard.shipsBoard;
        } else {
            boardDisplay = this._computerPlayerBoardDisplay;
            board = gameController.computerPlayer.gameboard.board;
            shipsBoard = gameController.computerPlayer.gameboard.shipsBoard;
        }

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

    squareEventListeners(type, gameController) {
        let boardDisplay = null;
        if(type === "real") {
            boardDisplay = this._computerPlayerBoardDisplay;
        } else {
            boardDisplay = this._realPlayerBoardDisplay;
        }

        for(let i = 0 ; i < boardDisplay.children.length ; i++) {
            boardDisplay.children[i].addEventListener("click", (e) => {
                if(gameController.turn.playerTurn === type) {
                    let x = Math.floor(i / gameController.size), y = i % gameController.size;

                    let result = gameController.processAttack(x, y);

                    if (result.attackResult === "hit") {
                        e.target.textContent = "x";
                    } else if(result.attackResult === "missed") {
                        e.target.style.backgroundColor = "lightblue";
                    }

                    if(gameController.turn.playerTurn === "real") {
                        this._messageDisplay.textContent = "Real Player Turn";
                    } else if(gameController.turn.playerTurn === "computer") {
                        this._messageDisplay.textContent = "Computer Player Turn";
                    } else if(gameController.turn.playerTurn === "finished") {
                        this._messageDisplay.textContent = "Game Ended, " + (result.winner === "real" ? "Real" : result.winner === "computer" ? "Computer" : "None")+ " Player Wins";
                    }

                } else if(gameController.turn.playerTurn === "finished") {
                    console.log("Game finished");
                } else {
                    console.log("Not your turn");
                }
            });
        }
    }
}

module.exports = DomDisplay;