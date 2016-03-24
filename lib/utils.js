"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMoment = getMoment;
exports.inRangeDates = inRangeDates;

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMoment(value, format, locale) {
    var useStrict = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    if (typeof value === "number") {
        return (0, _moment2.default)(new Date(value));
    } else if (typeof value === "string") {
        return (0, _moment2.default)(value, format, locale || _moment2.default.locale(), useStrict);
    }

    return (0, _moment2.default)(value);
}

function inRangeDates(date, unit) {
    var min = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var max = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    var inRange = true;

    if (min) {
        inRange = (0, _moment2.default)(date).endOf(unit).isAfter((0, _moment2.default)(min).startOf(unit));
    }

    if (max && inRange) {
        inRange = (0, _moment2.default)(date).startOf(unit).isBefore((0, _moment2.default)(max).endOf(unit));
    }

    return inRange;
}
//# sourceMappingURL=utils.js.map