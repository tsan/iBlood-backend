"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ch = require("./ch");

var _ch2 = _interopRequireDefault(_ch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONSTANTS = {
  'CH': _ch2.default
};

var getConstants = function getConstants(countryCode) {
  return CONSTANTS.hasOwnProperty(countryCode) ? CONSTANTS[countryCode] : {};
};

exports.default = getConstants;