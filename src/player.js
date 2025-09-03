const Gameboard = require("./gameboard");

class RealPlayer {
    constructor() {

    }
}

class ComputerPlayer {
    constructor() {
        
    }
}

class Player {
    constructor(boardSize, playerType) {
        this._board = new Gameboard(boardSize);
        this._playerTypeFunctions = playerType;
    }

    defaultGame() {
        this._board.placeShip(6, 8, 0, 0, 3);
        this._board.placeShip(1, 4, 1, 1, 4);
        this._board.placeShip(8, 8, 2, 3, 2);
        this._board.placeShip(2, 2, 3, 4, 2);
        this._board.placeShip(5, 5, 3, 4, 2);
        this._board.placeShip(2, 3, 6, 6, 2);
        this._board.placeShip(6, 8, 6, 6, 3);
        this._board.placeShip(5, 9, 8, 8, 5);
    }

    get gameboard() {
        return this._board;
    }
}

module.exports = {RealPlayer, ComputerPlayer, Player};