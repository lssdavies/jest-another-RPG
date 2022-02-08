//import player function
const Player = require("../lib/Player");
/*The require() line imports the Potion() constructor into the test, establishing Potion as a usable variable (otherwise new Potion() would throw an error). Then jest.mock() mocks/replaces the constructor's implementation with our faked data.*/
const Potion = require("../lib/Potion");
jest.mock("../lib/Potion");
console.log(new Potion());

test("creates a player object", () => {
  //The new keyword creates an empty object using the constructor function Player() and assigns it to this and then returns this
  const player = new Player("Dave");

  expect(player.name).toBe("Dave");
  expect(player.health).toEqual(expect.any(Number));
  expect(player.strength).toEqual(expect.any(Number));
  expect(player.agility).toEqual(expect.any(Number));

  expect(player.inventory).toEqual(
    expect.arrayContaining([expect.any(Object)])
  );
});
/*the getStats() method will return an object containing a subset of the player's properties. */
test("gets player's stats as an object", () => {
  const player = new Player("Dave");
  //we're checking that player.getStats() returns an object with four specific properties.
  expect(player.getStats()).toHaveProperty("potions");
  expect(player.getStats()).toHaveProperty("health");
  expect(player.getStats()).toHaveProperty("strength");
  expect(player.getStats()).toHaveProperty("agility");
});

/*the getInventory() method will return an array of Potion objects or return false if the inventory is empty.*/
test("gets inventory from player or returns false", () => {
  const player = new Player("Dave");

  expect(player.getInventory()).toEqual(expect.any(Array));

  player.inventory = [];

  expect(player.getInventory()).toEqual(false);
});
