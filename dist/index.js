"use strict";

var _getCollects = require("./src/ch/getCollects");

var _getCollects2 = _interopRequireDefault(_getCollects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var main = async function main() {
  // let items = await collect.items();
  var items = await (0, _getCollects2.default)();
  console.log(items[0]);
}; // import collect from "./src/fr/getCollects";


main();