"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimePickerTime = function (_Component) {
    _inherits(TimePickerTime, _Component);

    function TimePickerTime() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, TimePickerTime);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TimePickerTime)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onClickAmPmToggle = function (e) {
            e.preventDefault();

            var _this$props = _this.props;
            var dateTime = _this$props.dateTime;
            var onSelect = _this$props.onSelect;

            var date = (0, _moment2.default)(dateTime);

            onSelect(dateTime.hour() >= 12 ? date.subtract(12, "hours") : date.add(12, "hours"));
        }, _this.onClickAddHour = function (e) {
            e.preventDefault();

            var _this$props2 = _this.props;
            var dateTime = _this$props2.dateTime;
            var onSelect = _this$props2.onSelect;
            var stepping = _this$props2.stepping;
            var use24Hours = _this$props2.use24Hours;

            var date = (0, _moment2.default)(dateTime).add(stepping, "hours");

            if (!use24Hours) {
                if (dateTime.hour() >= 12) {
                    if (date.hour() < 12) {
                        date.add(12, "hours");
                    }
                } else if (date.hour() >= 12) {
                    date.subtract(12, "hours");
                }
            }

            onSelect(date.minutes(dateTime.minutes()));
        }, _this.onClickSubtractHour = function (e) {
            e.preventDefault();

            var _this$props3 = _this.props;
            var dateTime = _this$props3.dateTime;
            var onSelect = _this$props3.onSelect;
            var stepping = _this$props3.stepping;
            var use24Hours = _this$props3.use24Hours;

            var date = (0, _moment2.default)(dateTime).subtract(stepping, "hours");

            if (!use24Hours) {
                if (dateTime.hour() >= 12) {
                    if (date.hour() < 12) {
                        date.add(12, "hours");
                    }
                } else if (date.hour() >= 12) {
                    date.subtract(12, "hours");
                }
            }

            onSelect(date.minutes(dateTime.minutes()));
        }, _this.onClickAddMinute = function (e) {
            e.preventDefault();

            var _this$props4 = _this.props;
            var dateTime = _this$props4.dateTime;
            var stepping = _this$props4.stepping;
            var onSelect = _this$props4.onSelect;

            onSelect((0, _moment2.default)(dateTime).add(stepping, "minute").hours(dateTime.hours()));
        }, _this.onClickSubtractMinute = function (e) {
            e.preventDefault();

            var _this$props5 = _this.props;
            var dateTime = _this$props5.dateTime;
            var stepping = _this$props5.stepping;
            var onSelect = _this$props5.onSelect;

            onSelect((0, _moment2.default)(dateTime).subtract(stepping, "minute").hours(dateTime.hours()));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TimePickerTime, [{
        key: "renderAmPmSwitch",
        value: function renderAmPmSwitch() {
            var _props = this.props;
            var dateTime = _props.dateTime;
            var use24Hours = _props.use24Hours;
            var tooltips = _props.tooltips;

            if (use24Hours) {
                return false;
            }

            return _react2.default.createElement(
                "td",
                null,
                _react2.default.createElement(
                    "button",
                    { "data-action": true,
                        className: "btn btn-primary",
                        title: tooltips.togglePeriod,
                        onClick: this.onClickAmPmToggle },
                    dateTime.format("A")
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _props2 = this.props;
            var dateTime = _props2.dateTime;
            var icons = _props2.icons;
            var onClickHours = _props2.onClickHours;
            var onClickMinutes = _props2.onClickMinutes;
            var use24Hours = _props2.use24Hours;
            var tooltips = _props2.tooltips;

            return _react2.default.createElement(
                "div",
                { className: "timepicker-picker" },
                _react2.default.createElement(
                    "table",
                    { className: "table-condensed" },
                    _react2.default.createElement(
                        "tbody",
                        null,
                        _react2.default.createElement(
                            "tr",
                            null,
                            _react2.default.createElement(
                                "td",
                                null,
                                _react2.default.createElement(
                                    "a",
                                    { href: "#",
                                        className: "btn",
                                        title: tooltips.incrementHour,
                                        onClick: this.onClickAddHour },
                                    _react2.default.createElement("span", { className: icons.up })
                                )
                            ),
                            _react2.default.createElement("td", { className: "separator" }),
                            _react2.default.createElement(
                                "td",
                                null,
                                _react2.default.createElement(
                                    "a",
                                    { href: "#",
                                        className: "btn",
                                        title: tooltips.incrementMinute,
                                        onClick: this.onClickAddMinute },
                                    _react2.default.createElement("span", { className: icons.up })
                                )
                            ),
                            _react2.default.createElement("td", { className: "separator" })
                        ),
                        _react2.default.createElement(
                            "tr",
                            null,
                            _react2.default.createElement(
                                "td",
                                null,
                                _react2.default.createElement(
                                    "span",
                                    { className: "timepicker-hour",
                                        title: tooltips.pickHour,
                                        onClick: onClickHours },
                                    dateTime.format(use24Hours ? "HH" : "hh")
                                )
                            ),
                            _react2.default.createElement(
                                "td",
                                { className: "separator" },
                                ":"
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                _react2.default.createElement(
                                    "span",
                                    { className: "timepicker-minute",
                                        title: tooltips.pickMinute,
                                        onClick: onClickMinutes },
                                    dateTime.format("mm")
                                )
                            ),
                            this.renderAmPmSwitch()
                        ),
                        _react2.default.createElement(
                            "tr",
                            null,
                            _react2.default.createElement(
                                "td",
                                null,
                                _react2.default.createElement(
                                    "a",
                                    { href: "#",
                                        className: "btn",
                                        title: tooltips.decrementHour,
                                        onClick: this.onClickSubtractHour },
                                    _react2.default.createElement("span", { className: icons.down })
                                )
                            ),
                            _react2.default.createElement("td", { className: "separator" }),
                            _react2.default.createElement(
                                "td",
                                null,
                                _react2.default.createElement(
                                    "a",
                                    { href: "#",
                                        className: "btn",
                                        title: tooltips.decrementMinute,
                                        onClick: this.onClickSubtractMinute },
                                    _react2.default.createElement("span", { className: icons.down })
                                )
                            ),
                            _react2.default.createElement("td", { className: "separator" })
                        )
                    )
                )
            );
        }
    }]);

    return TimePickerTime;
}(_react.Component);

TimePickerTime.propTypes = {
    dateTime: _reactMomentProptypes2.default.momentObj,
    icons: _react2.default.PropTypes.object,
    locale: _react2.default.PropTypes.string,
    modifyDateTime: _react2.default.PropTypes.func,
    onClickHours: _react2.default.PropTypes.func,
    onClickMinutes: _react2.default.PropTypes.func,
    onSelect: _react2.default.PropTypes.func,
    stepping: _react2.default.PropTypes.number,
    tooltips: _react2.default.PropTypes.object,
    use24Hours: _react2.default.PropTypes.bool
};
exports.default = TimePickerTime;
//# sourceMappingURL=time.js.map