'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fade = undefined;

var _fade = require('./components/slideshow/fade');

Object.defineProperty(exports, 'Fade', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_fade).default;
  }
});

var _jss = require('jss');

var _jss2 = _interopRequireDefault(_jss);

var _jssPresetDefault = require('jss-preset-default');

var _jssPresetDefault2 = _interopRequireDefault(_jssPresetDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jss2.default.setup((0, _jssPresetDefault2.default)());