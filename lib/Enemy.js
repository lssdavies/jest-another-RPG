//imports potion and jest will use the mock data for potion
const Potion = require("./Potion");

//very similar to the Player constructor function
function Enemy(name, weapon) {
  this.name = name;
  this.weapon = weapon;
  this.potion = new Potion();

  this.health = Math.floor(Math.random() * 10 + 85);
  this.strength = Math.floor(Math.random() * 5 + 5);
  this.agility = Math.floor(Math.random() * 5 + 5);
}

/* these methods are exactly the same as the player methos refer to player.js for notes*/
Enemy.prototype.getHealth = function () {
  return `The ${this.name}'s health is now ${this.health}!`;
};

Enemy.prototype.isAlive = function () {
  if (this.health === 0) {
    return false;
  }
  return true;
};

Enemy.prototype.getAttackValue = function () {
  const min = this.strength - 5;
  const max = this.strength + 5;

  return Math.floor(Math.random() * (max - min) + min);
};

Enemy.prototype.reduceHealth = function (health) {
  this.health -= health;

  if (this.health < 0) {
    this.health = 0;
  }
};

//this is an additional method for the enemy description
Enemy.prototype.getDescription = function () {
  return `A ${this.name} holding a ${this.weapon} has appeared!`;
};

module.exports = Enemy;
