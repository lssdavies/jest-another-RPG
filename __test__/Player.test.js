//import player function
const Player = require("../lib/Player");
/*The require() line imports the Potion() constructor into the test, establishing Potion as a usable variable (otherwise new Potion() would throw an error). Then jest.mock() mocks/replaces the constructor's implementation with our faked data.*/
const Potion = require("../lib/Potion");
jest.mock("../lib/Potion");
console.log(new Potion());

/*we create a new Player instance in every test even though we could choose to use the same one in all of our tests, but this might lead to unintended consequences. Now that our tests affect the Player object's property values, if we used the same object every time, we would no longer be testing properties and methods in isolation.*/

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

/*the getHealth() method will returns the players health*/
test("gets player's health value", () => {
  const player = new Player("Dave");

  expect(player.getHealth()).toEqual(
    expect.stringContaining(player.health.toString())
  );
});

//the isAlvie() method checks to see if the player is still alive
test("checks if player is alive or not", () => {
  const player = new Player("Dave");

  expect(player.isAlive()).toBeTruthy();

  player.health = 0;

  expect(player.isAlive()).toBeFalsy();
});

/*we will call the reduceHealth() method twice—the second time with an absurdly high value to make sure that it never goes negative.*/
test("subtracts from player's health", () => {
  const player = new Player("Dave");
  const oldHealth = player.health;

  player.reduceHealth(5);

  expect(player.health).toBe(oldHealth - 5);

  player.reduceHealth(99999);

  expect(player.health).toBe(0);
});

//the getAttackValue get the player's attack value
test("gets player's attack value", () => {
  const player = new Player("Dave");
  player.strength = 10;

  expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
  expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

/*As in previous methods, we need to modify properties on the Player object to test whether or not addPotion worked. In this case, we keep track of the old count so that we can ensure that adding a potion to our inventory actually increases the length of the player.inventory array.For the test we are the mock potion data imported on lines 4 & 5*/
test("adds a potion to the inventory", () => {
  const player = new Player("Dave");
  const oldCount = player.inventory.length;

  player.addPotion(new Potion());

  expect(player.inventory.length).toBeGreaterThan(oldCount);
});

/*the usePotion method removes a potion from the players inventory when a player uses it*/
test("uses a potion from inventory", () => {
  const player = new Player("Dave");
  player.inventory = [new Potion(), new Potion(), new Potion()];
  const oldCount = player.inventory.length;

  player.usePotion(1);

  expect(player.inventory.length).toBeLessThan(oldCount);
});
