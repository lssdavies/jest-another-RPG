/*Potion.js is a constructor function which will be used to create new potions. Note that the P in Poition is capitalized, it is not required but recommended because it is the popular naming convention for constructor functions. Also constructor functions can't be arrow functions because arrow fuctions change the meaning of keyword this*/
function Potion(name) {
  /*Notice that the this.name function is set to name or this.types[Math.floor(Math.random() * this.types.length)]. This is another use case of the or ' || ' operator. This expression will be evaluated so that if name is truthy—that is to say, it can be coerced to true i.e. has a value —then this.name = name. If name is not truthy, i.e doesnt have a value or undefined then this.name = this.types[Math.floor(Math.random() * this.types.length)] or a random type of potion. the random potion type is essentially the same as this.type[1] i.e accessing a value in an array using the index position*/
  this.types = ["strength", "agility", "health"];
  this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

  if (this.name === "health") {
    this.value = Math.floor(Math.random() * 10 + 30);
  } else {
    this.value = Math.floor(Math.random() * 5 + 7);
  }
}

module.exports = Potion;
