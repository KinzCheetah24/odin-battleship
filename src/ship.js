class Ship {
    constructor(length) {
        this._length = length;
        this._hits = 0;
        this._sunk = false;
    }

    hit() {
        this._hits++;
    }

    isSunk() {
        return (this._hits >= this._length);
    }

    get length() {
        return this._length;
    }

    get hits() {
        return this._hits;
    }

    get sunk() {
        return this._sunk;
    }

    set length(length) {
        this._length = length;
    }

    set hits(hits) {
        this._hits = hits;
    }

    set sunk(sunk) {
        this._sunk = sunk;
    }
}

module.exports = Ship;