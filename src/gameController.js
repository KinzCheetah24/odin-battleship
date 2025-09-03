const {RealPlayer, ComputerPlayer, Player} = require("./player");
const DomDisplay = require("./domDisplay");

class GameController {
    constructor(size) {
        this._realPlayer = new Player(size, new RealPlayer());
        this._computerPlayer = new Player(size, new ComputerPlayer());

        this._domDisplay = new DomDisplay();
        this._turn = {playerTurn : "real"};
        this._size = size;
    }

    init() {
        this._realPlayer.defaultGame();
        this._computerPlayer.defaultGame();

        this._domDisplay.displayPlayerBoard("real", this);
        this._domDisplay.displayPlayerBoard("computer", this);

        this._domDisplay.squareEventListeners("real", this);
        this._domDisplay.squareEventListeners("computer", this);
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

        console.log(winner);

        return {
            attackResult : attackResult,
            winner : winner
            };
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