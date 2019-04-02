'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _htmlEntities = require('html-entities');

var Formatter = {
    removeSpace: function removeSpace(str) {
        return str.replace(/ +(?= )/g, '').trimStart().trimEnd();
    },
    stripHtmlTag: function stripHtmlTag(str) {
        return str.replace(/<[^>]*>/g, '');
    },
    convertHtmlHEntities: function convertHtmlHEntities(str) {
        var entities = new _htmlEntities.AllHtmlEntities();
        return entities.decode(str);
    }
};

exports.default = Formatter;