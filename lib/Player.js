/*This import the the mock data for potion since jest will look for potion.js inside __mocks__*/
const Potion = require("../lib/Potion");

function Player(name = "") {
  this.name = name;
  // generates a random number for relevent stat
  this.health = Math.floor(Math.random() * 10 + 95);
  this.strength = Math.floor(Math.random() * 5 + 7);
  this.agility = Math.floor(Math.random() * 5 + 7);

  this.inventory = [new Potion("health"), new Potion()];

  // returns an object with various player properties
  Player.prototype.getStats = function () {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility,
    };
  };
  /*When using prototype, you are only creating the method once on the constructor itself. New player objects simply inherit the method from the constructor rather than having their own instances of that method as in the case of using this. . Such inheritance can traverse multiple levels, meaning if the method being called doesn't exist on Player(), JavaScript will look for it on the next constructor up the chain. In this case, the next constructor would be the built-in Object data type.*/

  // returns the inventory array or false if empty
  Player.prototype.getInventory = function () {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
  };
}

//this method returns the player health as a string
Player.prototype.getHealth = function () {
  return `${this.name}'s health is now ${this.health}!`;
};

//this method check the players health
Player.prototype.isAlive = function () {
  if (this.health === 0) {
    return false;
  }
  return true;
};

//this method reduces the players health
Player.prototype.reduceHealth = function (health) {
  this.health -= health;

  if (this.health < 0) {
    this.health = 0;
  }
};

//this method gets the players attack value
Player.prototype.getAttackValue = function () {
  const min = this.strength - 5;
  const max = this.strength + 5;

  return Math.floor(Math.random() * (max - min) + min);
};

//this method adds a potion to the inventory array use push()
Player.prototype.addPotion = function (potion) {
  this.inventory.push(potion);
};

/*The .splice() method removes items from an array and returns the removed item(s) as a new array. Thus, two things are happening here: the original inventory array has a single Potion removed at the specified index value and put into a new "removed items" array, then the Potion at index [0] of this "removed items" array is saved in a potion variable.*/
Player.prototype.usePotion = function(index) {
  const potion = this.getInventory().splice(index, 1)[0];

  switch (potion.name) {
    case 'agility':
      this.agility += potion.value;
      break;
    case 'health':
      this.health += potion.value;
      break;
    case 'strength':
      this.strength += potion.value;
      break;
  }
};

module.exports = Player;

/*This is one way of creating methods using this. another way is using prototype. using this.methodName() probably makes more sense. It clearly shows that you are creating methods for each player. This also is a problem: it creates new methods for each player. If you have a game that creates 100 Player objects, your code will create a hundred getStats() methods.


  // returns an object with various player properties
  this.getStats = function () {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility,
    };
  };

  // returns the inventory array or false if empty
  this.getInventory = function () {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
  };

*/
