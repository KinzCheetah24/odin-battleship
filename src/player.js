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
}