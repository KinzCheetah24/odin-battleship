const {RealPlayer, ComputerPlayer, Player} = require("./player");
const DomDisplay = require("./domDisplay");

class GameController {

    constructor(size) {
        this.shipsForPlacement = [[1, 5], [1, 4], [2, 3], [4, 2]];

        this._realPlayer = new Player(size, new RealPlayer());
        this._computerPlayer = new Player(size, new ComputerPlayer());

        this._domDisplay = new DomDisplay();
        this._turn = {playerTurn : "real"};
        this._size = size;
    }

    init() {
        // Select default or custom
        this._domDisplay.displayPlayerBoard("real", this);
        this._domDisplay.displayPlayerBoard("computer", this);

        this._domDisplay.gameTypeDisplay(this);
        // Start Game

        // this._realPlayer.defaultGame();
        // this._computerPlayer.defaultGame();

        // this._domDisplay.displayPlayerBoard("real", this);
        // this._domDisplay.displayPlayerBoard("computer", this);

        // this._domDisplay.squareEventListeners("real", this);
        // this._domDisplay.squareEventListeners("computer", this);
    }

    processAttack(x, y) {
        let attackResult = null, winner = null;

        if(this._turn.playerTurn === "real") {
            attackResult = this._computerPlayer.gameboard.receiveAttack(x, y);
            winner = this._computerPlayer.gameboard.shipsSunken() ? "real" : null;
            this._turn.playerTurn = attackResult === -1 ? "real" : "computer";
            this._turn.playerTurn = winner !== null ? "finished" : this._turn.playerTurn;
        } else {
            attackResult = this._realPlayer.gameboard.receiveAttack(x, y);
            winner = this._realPlayer.gameboard.shipsSunken() ? "computer" : null;
            this._turn.playerTurn = attackResult === -1 ? "computer" : "real";
            this._turn.playerTurn = winner !== null ? "finished" : this._turn.playerTurn;
        }

        return {
            attackResult : attackResult,
            winner : winner
        };
    }

    computerAttack() {
        let coordinates = this._randomCoordinates();

        while(this._realPlayer.gameboard.board[coordinates.x][coordinates.y] !== false) {
            coordinates = this._randomCoordinates();
        }

        let attackResult = this.processAttack(coordinates.x, coordinates.y);
        attackResult.coordinates = coordinates;

        return attackResult;
    }

    allShipsPlaced(type) {
        if(type === "real") {
            return this._checkAllShips(this._realPlayer.gameboard.ships) === shipsForPlacement;
        } else {
            return this._checkAllShips(this._computerPlayer.gameboard.ships) === shipsForPlacement;
        }
    }

    shipPlacementTurn(ships) {
        let shipsPlaced = this._checkAllShips(ships);

        for(let i = 0 ; i < shipsPlaced.length ; i++) {
            if(this.shipsForPlacement[i][0] - shipsPlaced[i][0] > 0) {
                return [this.shipsForPlacement[i][0] - shipsPlaced[i][0], this.shipsForPlacement[i][1]];
            }
        }

        return -1;
    }

    _randomCoordinates() {
        let number = Math.floor(Math.random() * this._size * this._size);

        return {
            x : Math.floor(number / this._size),
            y : number % this._size
        }
    }

    _shipPlacementArray() {
        return [[0, 5], [0, 4], [0, 3], [0, 2]];
    }

    _checkAllShips(ships) {
        let shipsArray = this._shipPlacementArray();

        for(let i = 0 ; i < ships.length ; i++) {
            let shipLength = ships[i][1].length;

            shipsArray.forEach(element => {
                if(element[1] === shipLength) {
                    element[0]++;
                }
            });
        }

        return shipsArray;
    }

    get realPlayer() {
        return this._realPlayer;
    }

    get computerPlayer() {
        return this._computerPlayer;
    }

    get domDisplay() {
        return this._domDisplay;
    }

    get turn() {
        return this._turn;
    }

    get size() {
        return this._size;
    }
}

module.exports = GameController;