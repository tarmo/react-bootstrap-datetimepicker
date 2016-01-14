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

var TimePickerHours = function (_Component) {
    _inherits(TimePickerHours, _Component);

    function TimePickerHours() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, TimePickerHours);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TimePickerHours)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.hours12 = [["12", "01", "02", "03"], ["04", "05", "06", "07"], ["08", "09", "10", "11"]], _this.hours24 = [["00", "01", "02", "03"], ["04", "05", "06", "07"], ["08", "09", "10", "11"], ["12", "13", "14", "15"], ["16", "17", "18", "19"], ["20", "21", "22", "23"]], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TimePickerHours, [{
        key: "onClickSetHour",
        value: function onClickSetHour(value) {
            var _this2 = this;

            return function () {
                var _props = _this2.props;
                var dateTime = _props.dateTime;
                var onSelect = _props.onSelect;
                var use24Hours = _props.use24Hours;

                var date = (0, _moment2.default)(dateTime).hour(parseInt(value, 10));

                if (!use24Hours) {
                    if (dateTime.hour() >= 12) {
                        if (date.hour() !== 12) {
                            date.add(12, "hours");
                        }
                    } else if (date.hour() === 12) {
                        date.hour(0);
                    }
                }

                onSelect(date.minutes(dateTime.minutes()));
            };
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var use24Hours = this.props.use24Hours;

            return _react2.default.createElement(
                "div",
                { className: "timepicker-hours" },
                _react2.default.createElement(
                    "table",
                    { className: "table-condensed" },
                    _react2.default.createElement(
                        "tbody",
                        null,
                        (use24Hours ? this.hours24 : this.hours12).map(function (row, i) {
                            return _react2.default.createElement(
                                "tr",
                                { key: i },
                                row.map(function (h) {
                                    return _react2.default.createElement(
                                        "td",
                                        { className: "hour",
                                            key: h,
                                            onClick: _this3.onClickSetHour(h) },
                                        h
                                    );
                                })
                            );
                        })
                    )
                )
            );
        }
    }]);

    return TimePickerHours;
}(_react.Component);

TimePickerHours.propTypes = {
    dateTime: _reactMomentProptypes2.default.momentObj,
    onSelect: _react2.default.PropTypes.func,
    onSelectHour: _react2.default.PropTypes.func,
    use24Hours: _react2.default.PropTypes.bool
};
exports.default = TimePickerHours;
//# sourceMappingURL=hours.js.map