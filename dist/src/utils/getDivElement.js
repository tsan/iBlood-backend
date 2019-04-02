'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getElement = require('./getElement');

var _getElement2 = _interopRequireDefault(_getElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDivElement = function getDivElement(list, className) {
  return (0, _getElement2.default)(list, 'tag', 'div', className);
};

exports.default = getDivElement;