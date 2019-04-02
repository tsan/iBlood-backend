"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _getDivElement = require("../utils/getDivElement");

var _getDivElement2 = _interopRequireDefault(_getDivElement);

var _getElement = require("../utils/getElement");

var _getElement2 = _interopRequireDefault(_getElement);

var _Formatter = require("../utils/Formatter");

var _Formatter2 = _interopRequireDefault(_Formatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = 'https://dondesang.efs.sante.fr/trouver-une-collecte';

var typeCollect = function typeCollect(container) {
  var img = (0, _getElement2.default)(container.children, 'tag', 'img', 'picto').attribs.src;

  return img.indexOf('collecte-fixe') >= 0;
};
var addrCollect = function addrCollect(container) {
  var addr = (0, _getElement2.default)(container.children, 'tag', 'div', 'address').children[0].data;

  addr = addr.split('\n');
  addr = addr.map(function (str) {
    return _Formatter2.default.removeSpace(str);
  });
  addr = addr.filter(function (str) {
    return str !== '';
  });

  addr = addr.join(', ');

  return addr;
};
var dateCollect = function dateCollect(container) {
  var date = (0, _getElement2.default)(container.children, 'tag', 'div', 'dates').children[0].data;

  date = date.split('\n');
  date = date.map(function (str) {
    return _Formatter2.default.removeSpace(str);
  });
  date = date.filter(function (str) {
    return str !== '';
  });

  date = date.join(', ');

  return date;
};
var samplesCollect = function samplesCollect(container) {
  var samples = {
    blood: false,
    plasma: false,
    platelet: false
  };

  var info = (0, _getDivElement2.default)(container.children, 'collect-item-middle');
  info = (0, _getDivElement2.default)(info.children, 'collect-item-middle-right');
  if (info) {
    samples.blood = (0, _getElement2.default)(info.children, 'tag', 'span', 'Sang') !== null;
    samples.plasma = (0, _getElement2.default)(info.children, 'tag', 'span', 'Plasma') !== null;
    samples.platelet = (0, _getElement2.default)(info.children, 'tag', 'span', 'Plaquettes') !== null;
  }
  return samples;
};
var infoCollect = function infoCollect(container) {
  var info = (0, _getDivElement2.default)(container.children, 'collect-item-middle');
  try {

    info = (0, _getDivElement2.default)(info.children, 'collect-item-middle-left  border-right ');
    info = (0, _getDivElement2.default)(info.children, 'more-infos');
    info = info.children[3];
  } catch (e) {
    // console.log(e);
    info = null;
  }
  var data = '';

  if (info) {
    data = info.data;
    data = data.split('\n');
    data = data.map(function (str) {
      return _Formatter2.default.removeSpace(str);
    });
    data = data.map(function (str) {
      return _Formatter2.default.stripHtmlTag(str);
    });
    data = data.map(function (str) {
      return _Formatter2.default.convertHtmlHEntities(str);
    });
    data = data.filter(function (str) {
      return str !== '';
    });
    data = data.join('\n');
  }

  return data;
};

var getCollects = async function getCollects() {
  var res = await _axios2.default.get(url);
  var collects = [];

  var $ = _cheerio2.default.load(res.data);
  var items = $('div.collectes-list div.collect-item');

  for (var i = 0; i < items.length; ++i) {
    var item = items[i];
    if (item && item.children) {

      var containerTop = (0, _getDivElement2.default)(item.children, 'collect-item-top');
      containerTop = (0, _getDivElement2.default)(containerTop.children, 'collect-item-top-middle');
      var infos = {
        name: (0, _getElement2.default)(containerTop.children, 'tag', 'h3', 'title').children[0].data,
        fixLocation: typeCollect(containerTop),
        addr: addrCollect(containerTop),
        dates: dateCollect(containerTop),
        sample: samplesCollect(item),
        info: infoCollect(item)
      };
      collects.push(infos);
    }
  }
  // console.log(collects)

  return collects;
};

exports.default = getCollects;