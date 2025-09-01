const Ship = require("../src/ship");


class Gameboard {
    constructor(size) {
        this._size = size;
        this._board = this._createBoard(size);
        this._ships = [];
    }

    placeShip(x0, x1, y0, y1, shipLength) {
        if(!(x0 < this._size && x1 < this._size && y0 < this._size && y1 < this._size)) {
            return -1;
        }
        if(((x1 - x0 + 1) !== shipLength && (y1 - y0 + 1) !== shipLength) || ((x1 - x0 + 1) === shipLength && (y1 - y0 + 1) === shipLength)) {
            return -1;
        }

        let coordinates = [x0, x1, y0, y1];
        let ship = new Ship(shipLength);

        let shipData = [coordinates, ship];

        this._ships.push(shipData);

        return shipData;
    }

    _createBoard(size) {
        let board = [];

        for(let i = 0 ; i < size ; i++) {
            let line = [];
            for(let j = 0 ; j < size ; j++) {
                line.push(false);
            }
            board.push(line);
        }

        return board;
    }

    get size() {
        return this._size;
    }

    get board() {
        return this._board;
    }

    get ships() {
        return this._ships;
    }
}

module.exports = Gameboard;