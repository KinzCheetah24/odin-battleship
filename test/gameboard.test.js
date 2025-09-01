const Gameboard = require("../src/gameboard");

test("Test Gameboard", () => {
    const board = new Gameboard(10);

    expect(board.board.length).toBe(10);
    expect(board.board[0].length).toBe(10);

    let shipData = board.placeShip(0, 0, 1, 2, 2);

    expect(board.ships[0]).toEqual(shipData);
});