"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = (function () {
    function Config() {
        _classCallCheck(this, Config);

        this.DEFAULT_FORMAT = "x";
        this.BOOTSTRAP_SIZE_SM = "sm";
        this.BOOTSTRAP_SIZE_LG = "lg";
        this.MODE_DATE = "date";
        this.MODE_TIME = "time";
        this.MODE_DATETIME = "datetime";
        this.VIEW_MODE_DAYS = "days";
        this.VIEW_MODE_MONTHS = "months";
        this.VIEW_MODE_YEARS = "years";
        this.VIEW_MODE_TIME = "time";
        this.VIEW_MODE_HOURS = "hours";
        this.VIEW_MODE_MINUTES = "minutes";
        this.VIEW_MODE_SECONDS = "seconds";
        this.INPUT_FORMAT_DATE = "L";
        this.INPUT_FORMAT_TIME = "LT";
        this.INPUT_FORMAT_DATETIME = "L LT";
        this.VIEW_DATE = "date";
        this.VIEW_TIME = "time";
        this.PLACEMENT_TOP = "top";
        this.PLACEMENT_BOTTOM = "bottom";
    }

    _createClass(Config, [{
        key: "getProp",
        value: function getProp(name) {
            return Config.props[name];
        }
    }, {
        key: "setProp",
        value: function setProp(name, value) {
            Config.props = Object.assign({}, Config.props, _defineProperty({}, name, value));
        }
    }]);

    return Config;
})();

Config.props = {};
exports.default = new Config();
var BOOTSTRAP_SIZE_SM = exports.BOOTSTRAP_SIZE_SM = "sm";
var BOOTSTRAP_SIZE_LG = exports.BOOTSTRAP_SIZE_LG = "lg";
var DEFAULT_DAY_VIEW_HEADER = exports.DEFAULT_DAY_VIEW_HEADER = "MMMM YYYY";
var DEFAULT_FORMAT = exports.DEFAULT_FORMAT = "x";
var INPUT_FORMAT_DATE = exports.INPUT_FORMAT_DATE = "L";
var INPUT_FORMAT_TIME = exports.INPUT_FORMAT_TIME = "LT";
var INPUT_FORMAT_DATETIME = exports.INPUT_FORMAT_DATETIME = "L LT";
var MODE_DATE = exports.MODE_DATE = "date";
var MODE_TIME = exports.MODE_TIME = "time";
var MODE_DATETIME = exports.MODE_DATETIME = "datetime";
var PLACEMENT_AUTO = exports.PLACEMENT_AUTO = "auto";
var PLACEMENT_DEFAULT = exports.PLACEMENT_DEFAULT = "default";
var PLACEMENT_TOP = exports.PLACEMENT_TOP = "top";
var PLACEMENT_BOTTOM = exports.PLACEMENT_BOTTOM = "bottom";
var VIEW_MODE_DAYS = exports.VIEW_MODE_DAYS = "days";
var VIEW_MODE_MONTHS = exports.VIEW_MODE_MONTHS = "months";
var VIEW_MODE_YEARS = exports.VIEW_MODE_YEARS = "years";
var VIEW_MODE_DECADES = exports.VIEW_MODE_DECADES = "decades";
var VIEW_MODE_TIME = exports.VIEW_MODE_TIME = "time";
var VIEW_MODE_HOURS = exports.VIEW_MODE_HOURS = "hours";
var VIEW_MODE_MINUTES = exports.VIEW_MODE_MINUTES = "minutes";
var VIEW_MODE_SECONDS = exports.VIEW_MODE_SECONDS = "seconds";
var VIEW_DATE = exports.VIEW_DATE = "date";
var VIEW_TIME = exports.VIEW_TIME = "time";
//# sourceMappingURL=config.js.map