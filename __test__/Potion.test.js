//Importing  poition
const Potion = require("../lib/Potion");

/*Test function that takes 2 args i.e a descriptive string of the expected result and a call back arrow function*/
test("creates a random potion object", () => {
  //The new keyword creates an empty object using the constructor function Potion() and assigns it to this and then returns this
  const potion = new Potion();

  //we chain toEqual with a toBeGreater than to test any string or number for potion name and potion value. the toBeGreater is checking that potion is not blank using name.length since if there is a name length will be greater than 0.
  expect(potion.name).toEqual(expect.any(String));
  expect(potion.name.length).toBeGreaterThan(0);
  expect(potion.value).toEqual(expect.any(Number));
});
