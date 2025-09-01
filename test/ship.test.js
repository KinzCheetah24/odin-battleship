const Ship = require("../src/ship");

test("Test Ship", () => {
    const ship = new Ship(3);

    ship.hit();

    expect(ship.hits).toBe(1);

    expect(ship.isSunk()).toBe(false);

    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
});