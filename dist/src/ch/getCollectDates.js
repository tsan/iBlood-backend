"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mappingBarometer = {
  "grey": 5,
  "blue": 4,
  "green": 3,
  "yellow": 2,
  "red": 1
};
var urlBarometer = 'https://www.blutspende.ch/api/blood_supplies/gesamt.js';

var getBarometer = async function getBarometer() {
  var res = await _axios2.default.get(urlBarometer);

  var barometers = {};
  Object.entries(res.data.blood_supplies).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    var refactorKey = key.replace('0', 'O').toUpperCase();
    barometers[refactorKey] = mappingBarometer[value];
  });

  return {
    date: res.data.date,
    values: barometers
  };
};

exports.default = getBarometer;