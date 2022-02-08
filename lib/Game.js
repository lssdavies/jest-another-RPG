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
      //the name is then passed to the player constructor function to create the player pobject*/
      this.startNewBattle();
      /* test the object creation
         console.log(this.currentEnemy, this.player); */
      // Replaced consolelog with a call to this.startNewBattle()
    });
};

Game.prototype.startNewBattle = function () {
  /*this determines who goes fiurst based on who has the higher agility stat*/
  if (this.player.agility > this.currentEnemy.agility) {
    this.isPlayerTurn = true;
  } else {
    this.isPlayerTurn = false;
  }
  console.log("Your stats are as follows:");
  //console.table dispays information in a table as opposed to a string
  console.table(this.player.getStats());
  console.log(this.currentEnemy.getDescription());

  //this method is responsible for for each turn in the round
  this.battle();
};

//
Game.prototype.battle = function () {
  //check if isPlayerTurn = true
  if (this.isPlayerTurn) {
    //ask the question
    inquirer
      .prompt({
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: ["Attack", "Use potion"],
      })
      .then(({ action }) => {
        //if answer = use potion
        if (action === "Use potion") {
          /*checks if getInventory = false ie empty. If the inventory is empty, immediately return to end the Player turn*/
          if (!this.player.getInventory()) {
            console.log("You don't have any potions!");
            return this.checkEndOfBattle();
          } else {
            //if this.player.getInventory = true ask the following question
            inquirer
              .prompt({
                type: "list",
                message: "Which potion would you like to use?",
                name: "action",
                /*the usePotion() method we set up uses the index of the object in the array (e.g., usePotion(0)) and inquirer reutrns a string. One solution would be to populate the choices array with strings that contain the Potion name and its index (e.g., '1: health'), then strip out the index after the user has chosen. We can do this using the .map() method*/
                choices: this.player
                  .getInventory()
                  .map((item, index) => `${index + 1}: ${item.name}`),
                /*the map() callback has a second optional parameter to capture the index of the item. We're using that index to create a human-readable number for the user. Many users might not know that arrays start at zero, so adding 1 will make more sense to them. We can always subtract 1 later to get the true value*/
              })
              .then(({ action }) => {
                /*When the user selects a Potion, the returned value will be a string like '2: agility'. We can use the .split() method, to split on the ': ', giving us an array ['2', 'agility']). here we are using a const of potionDetails to store the array*/
                const potionDetails = action.split(": ");
                this.player.usePotion(potionDetails[0] - 1);
                /*Subtracting 1 from the number which is at potionDetail[0] ie the first index of the array created by .split will put us back at the original array index*/
                console.log(`You used a ${potionDetails[1]} potion.`);
                console.table(this.player.getStats());

                return this.checkEndOfBattle();
              });
          }
        }
        // if answer = attack
        else {
          const damage = this.player.getAttackValue();
          this.currentEnemy.reduceHealth(damage);

          console.log(`You attacked the ${this.currentEnemy.name}`);
          console.log(this.currentEnemy.getHealth());

          return this.checkEndOfBattle();
        }
      });
  } else {
    const damage = this.currentEnemy.getAttackValue();
    this.player.reduceHealth(damage);

    console.log(`You were attacked by the ${this.currentEnemy.name}`);
    console.log(this.player.getHealth());

    this.checkEndOfBattle();
  }
};

Game.prototype.checkEndOfBattle = function () {
  //check if both characters are still alive
  if (this.player.isAlive() && this.currentEnemy.isAlive()) {
    /*this changes the turn order based on the current value of isPlayerTurn ie. true or false*/
    this.isPlayerTurn = !this.isPlayerTurn;
    this.battle();
  } //if the player is alive and enemy is defeated and adds a potion to this.player.inventory
  else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
    console.log(`You've defeated the ${this.currentEnemy.name}`);
    //adds the defeated enemy's potion to player's inventory
    this.player.addPotion(this.currentEnemy.potion);
    console.log(
      `${this.player.name} found a ${this.currentEnemy.potion.name} potion`
    );
    //increments roundNumber
    this.roundNumber++;
    //checks if roundNumber exceeds enemies.length to see if there is enemies to fight
    if (this.roundNumber < this.enemies.length) {
      //uses roundNumber to update currentEnemy to the next enemy in the array
      this.currentEnemy = this.enemies[this.roundNumber];
      this.startNewBattle();
    } else {
    /*if there are no enemies left in the array ie roundNumber is greater than this.enemies.length*/
      console.log("You win!");
    }
  }
  //if pleayer is defeated ie isAlive() evalutes to fasle or !isAlive()
  else {
    console.log("You've been defeated!");
  }
};

module.exports = Game;
