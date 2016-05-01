"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactMomentProptypes = require("react-moment-proptypes");

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var TimePickerMinutes = function (_Component) {
    _inherits(TimePickerMinutes, _Component);

    function TimePickerMinutes() {
        var _temp, _this, _ret;

        _classCallCheck(this, TimePickerMinutes);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.minutes = [["00", "05", "10", "15"], ["20", "25", "30", "35"], ["40", "45", "50", "55"]], _temp), _possibleConstructorReturn(_this, _ret);
    }

    TimePickerMinutes.prototype.onClickSetMinutes = function onClickSetMinutes(value) {
        var _this2 = this;

        return function () {
            var _props = _this2.props;
            var dateTime = _props.dateTime;
            var onSelect = _props.onSelect;


            onSelect((0, _moment2.default)(dateTime).minutes(parseInt(value, 10)));
        };
    };

    TimePickerMinutes.prototype.render = function render() {
        var _this3 = this;

        return _react2.default.createElement(
            "div",
            { className: "timepicker-minutes" },
            _react2.default.createElement(
                "table",
                { className: "table-condensed" },
                _react2.default.createElement(
                    "tbody",
                    null,
                    this.minutes.map(function (row, i) {
                        return _react2.default.createElement(
                            "tr",
                            { key: i },
                            row.map(function (m) {
                                return _react2.default.createElement(
                                    "td",
                                    { className: "minute",
                                        key: m,
                                        onClick: _this3.onClickSetMinutes(m) },
                                    m
                                );
                            })
                        );
                    })
                )
            )
        );
    };

    return TimePickerMinutes;
}(_react.Component);

TimePickerMinutes.propTypes = {
    dateTime: _reactMomentProptypes2.default.momentObj,
    onSelect: _react2.default.PropTypes.func,
    onSelectMinutes: _react2.default.PropTypes.func
};
exports.default = TimePickerMinutes;
//# sourceMappingURL=minutes.js.map