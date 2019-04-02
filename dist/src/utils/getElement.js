"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getElement = function getElement(list, type, tag, className) {
  var element = null;

  for (var i = 0; i < list.length; ++i) {
    var item = list[i];
    if (item.type === type && item.name === tag && item.attribs.class === className) {
      element = item;
      break;
    }
  }

  return element;
};

exports.default = getElement;