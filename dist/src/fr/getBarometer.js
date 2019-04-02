"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mappingBarometer = {
  "completed": 5,
  "c": 4,
  "half": 3,
  "q": 2,
  "near_zero": 1
};
var urlBarometer = 'https://dondesang.efs.sante.fr/barometre';

var getBarometer = async function getBarometer() {
  var className = 'image-sanguins';
  var res = await _axios2.default.get(urlBarometer);
  var barometers = {};

  var $ = _cheerio2.default.load(res.data);
  var items = $('div.blood-group-items div.group-item');

  for (var j = 0; j < items.length; ++j) {

    var item = items[j];

    for (var i = 0; i < item.children.length; ++i) {

      var child = item.children[i];
      if (child.type === 'tag' && child.attribs.class === className) {

        var level = child.children[1].children[0].attribs.src.split('/');
        level = level[level.length - 1].replace('.png', '');
        barometers[child.children[1].attribs.title.toUpperCase()] = mappingBarometer[level];
      }
    }
  }

  return barometers;
};

exports.default = getBarometer;