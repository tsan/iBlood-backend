"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlCollectDate = 'https://www.blutspende.ch/fr/don_de_sang/dates_de_collecte_de_sang/terminliste?utf8=%E2%9C%93&blood_donation_search%5Bsearch_term%5D=&blood_donation_search%5Bsurrounding_search%5D=0&blood_donation_search%5Bradius%5D=5&blood_donation_search%5Bstart_date_h%5D=&commit=chercher';

var getCollects = async function getCollects() {
  var res = await _axios2.default.get(urlCollectDate);

  var $ = _cheerio2.default.load(res.data);
  var collectsTarget = $('div.termin');
  var collects = [];
  for (var i = 0; i < collectsTarget.length; ++i) {
    collects.push(getInfoCollect(collectsTarget[i]));
  }

  return collects;
};

var getInfoCollect = function getInfoCollect(element) {
  var info = {};
  var pp = getPlaceAndPeriod(element);
  console.log(pp);

  info.name = pp[0];
  info.fixLocation = false;
  info.date = getDate(element);
  info.info = pp[2];
  info.addr = pp[1] + ", " + pp[0];
  info.sample = { blood: true, plasma: true, platelet: true };

  return info;
};
var getDate = function getDate(element) {
  var className = 'termindatum';
  var tag = 'strong';
  var dateContainer = null;
  var date = "";

  for (var i = 0; i < element.children.length; ++i) {
    if (element.children[i].type === 'tag' && element.children[i].attribs.class === className) {
      dateContainer = element.children[i];
      break;
    }
  }

  if (dateContainer) {
    for (var _i = 0; _i < dateContainer.children.length; ++_i) {
      if (dateContainer.children[_i].type === 'tag' && dateContainer.children[_i].name === tag) {
        date = dateContainer.children[_i].children[0].data;
        break;
      }
    }
  }
  return date;
};
var getPlaceAndPeriod = function getPlaceAndPeriod(element) {
  var className = 'terminort';
  var placeContainer = null;
  var data = ["", "", ""];

  for (var i = 0; i < element.children.length; ++i) {
    if (element.children[i].type === 'tag' && element.children[i].attribs.class === className) {
      placeContainer = element.children[i];
      break;
    }
  }

  if (placeContainer) {

    data = placeContainer.children.map(function (i) {
      if (i.type === 'text') return i.data.replace(/\n/g, '').replace(/ +(?= )/g, '').trimStart().trimEnd();else if (i.children.length > 0) return i.children[0].data;
    });
    data = data.filter(function (el) {
      return el && el !== '';
    });
  }

  return data;
};

exports.default = getCollects;