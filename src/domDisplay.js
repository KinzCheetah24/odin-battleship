class DomDisplay {
    constructor() {
        this._realPlayerBoardDisplay = document.querySelector(".real-player-board-div");
        this._computerPlayerBoardDisplay = document.querySelector(".computer-player-board-div");
        this._messageDisplay = document.getElementById("info-display");

        this._gamePlacementMode = document.getElementById("select-ship-placement");
        this._customPlacement = document.querySelector(".placement");
        this._placeShipBtn = document.querySelector(".place-btn");
        this._startGameBtn = document.querySelector(".start-game-btn");
    }

    displayPlayerBoard(type, gameController) {
        this._removePlayerBoardDisplay(type);

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
                if(shipsBoard[i][j] === "ship" && type === "real") {
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

                    this._displayAttackResultSquare(e.target, result, gameController.turn.playerTurn);

                } else if(gameController.turn.playerTurn === "finished") {
                    console.log("Game finished");
                } else {
                    console.log("Not your turn");
                }

                if(gameController.turn.playerTurn === "computer") {
                    let result = gameController.computerAttack();
                    let square = this._realPlayerBoardDisplay.children[result.coordinates.x * gameController.size + result.coordinates.y];

                    this._displayAttackResultSquare(square, result, gameController.turn.playerTurn);
                }
            });
        }
    }

    gameTypeDisplay(gameController) {
        this._displayCustomPlacement(this._gamePlacementMode.value, gameController);

        this._gamePlacementMode.addEventListener("change", (e) => {
            this._displayCustomPlacement(e.target.value, gameController);

        });
    }

    startGame(gameController) {
        this._startGameBtn.addEventListener("click", () => {
            if(gameController.allShipsPlaced("real")) {
                this._messageDisplay.textContent = "Real Player Turn";

                this._gamePlacementMode.style.display = "none";
                this._customPlacement.style.display = "none";
                this._placeShipBtn.style.display = "none";
                this._startGameBtn.style.display = "none";

                gameController.computerShipsPlacement();

                this.squareEventListeners("real", gameController);
                this.squareEventListeners("computer", gameController);
            }
        });
    }

    _removePlayerBoardDisplay(type) {
        let boardDisplay = null;
        if(type === "real") {
            boardDisplay = this._realPlayerBoardDisplay;
        } else {
            boardDisplay = this._computerPlayerBoardDisplay;
        }

        while(boardDisplay.children.length > 0) {
            boardDisplay.removeChild(boardDisplay.children[0]);
        }
    }

    _displayAttackResultSquare(square, result, turn) {
        if (result.attackResult === "hit") {
            square.textContent = "x";
        } else if(result.attackResult === "missed") {
            square.style.backgroundColor = "lightblue";
        }

        if(turn === "real") {
            this._messageDisplay.textContent = "Real Player Turn";
        } else if(turn === "computer") {
            this._messageDisplay.textContent = "Computer Player Turn";
        } else if(turn === "finished") {
            this._messageDisplay.textContent = "Game Ended, " + (result.winner === "real" ? "Real" : result.winner === "computer" ? "Computer" : "None")+ " Player Wins";
        }
    }

    _displayCustomPlacement(value, gameController) {
        gameController.realPlayer.resetBoard();
        this.displayPlayerBoard("real", gameController);

        if(value === "default") {
            this._customPlacement.style.display = "none";
            gameController.realPlayer.defaultGame();
            this.displayPlayerBoard("real", gameController);
        } else if(value === "custom") {
            this._customPlacement.style.display = "flex";
            this._placeShipBtn = this._removeEventListeners(this._placeShipBtn);
            this._manageCustomPlacement(gameController);
        }
    }

    _manageCustomPlacement(gameController) {
        let shipTurn = gameController.shipPlacementTurn(gameController.realPlayer.gameboard.ships);

        document.querySelector(".ship-for-placement").textContent = `${shipTurn[0]}x${shipTurn[1]}`;

        this._placeShipBtn.addEventListener("click", () => {
            if(shipTurn !== -1) {
                let y = parseInt(document.getElementById("x-start").value);
                let x = parseInt(document.getElementById("y-start").value);

                let result = -1;

                if(x !== NaN && y !== NaN) {
                    if(document.getElementById("ship-direction").value === "horizontal") {
                        result = gameController.realPlayer.gameboard.placeShip(x, x, y, y + shipTurn[1] - 1, shipTurn[1]);
                    } else {
                        result = gameController.realPlayer.gameboard.placeShip(x, x + shipTurn[1] - 1, y, y, shipTurn[1]);
                    }
                }

                if(result === -1) {
                    document.querySelector(".ship-for-placement").textContent = `Incorrect values, place ship again (${shipTurn[0]}x${shipTurn[1]})`;
                } else {
                    this.displayPlayerBoard("real", gameController);
                    shipTurn = gameController.shipPlacementTurn(gameController.realPlayer.gameboard.ships);

                    shipTurn !== -1 ? document.querySelector(".ship-for-placement").textContent = `${shipTurn[0]}x${shipTurn[1]}` : document.querySelector(".ship-for-placement").textContent = "Start the game";
                }
            }
        })
    }

    _removeEventListeners(node) {
        let newNode = node.cloneNode(true);

        node.parentNode.replaceChild(newNode, node);

        return newNode;
    }
}

module.exports = DomDisplay;