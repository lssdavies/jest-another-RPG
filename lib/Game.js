/*Importing dependencies game doesnt require potion since it is already implemented in P/ayer and Enemy*/
const inquirer = require("inquirer");
const Enemy = require("../lib/Enemy");
const Player = require("../lib/Player");

/*this is the constructor function for the game logic. Note that currentEnemy and player are currently undefined. They will be assigned when the initializeGame() method is called. Including them now simply helps convey which properties a Game object is intended to have.*/
function Game() {
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;
}

Game.prototype.initializeGame = function () {
  /*here we populate the empty enemies array established in Game() constructor function above*/
  this.enemies.push(new Enemy("goblin", "sword"));
  this.enemies.push(new Enemy("orc", "baseball bat"));
  this.enemies.push(new Enemy("skeleton", "axe"));
  //current enemy is assigned the 1st enemy in the enemies array
  this.currentEnemy = this.enemies[0];

  //using inquirer to capture the Plater's name
  inquirer
    .prompt({
      type: "text",
      name: "name",
      message: "What is your name?",
    })
    /* destructure name from the prompt object. We are using an arrow function because the function keyword would have created a new lexical scope where this no longer references the Game object. To avoid this problem, use the arrow shorthand for all inquirer callbacks in this project*/
    .then(({ name }) => {
      this.player = new Player(name);
      //the caputered name is then passed to the player constructor function to create the player pobject*/

      // test the object creation
      console.log(this.currentEnemy, this.player);
    });
};
module.exports = Game;
