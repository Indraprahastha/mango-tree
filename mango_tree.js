"use strict"
var FruitTree = require('./fruit_tree.js');
// release 0

class MangoTree extends FruitTree {
  // Produce some mangoes
  constructor(name, currentAge, currentHeight, berbuah, healthyStatus) {
    super(name, currentAge, currentHeight, berbuah, healthyStatus);
    this._maxAge = 15;
    this._heightGrow = 1.2;
  }
}
module.exports = MangoTree;

// Release 3
