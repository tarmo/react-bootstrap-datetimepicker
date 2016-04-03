"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactMomentProptypes = require("react-moment-proptypes");

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

require("moment-range");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePickerDays = function (_Component) {
    _inherits(DatePickerDays, _Component);

    function DatePickerDays() {
        var _Object$getPrototypeO;

        _classCallCheck(this, DatePickerDays);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DatePickerDays)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _initialiseProps.call(_this);

        var date = _this.props.date;

        _this.state = Object.assign({}, _this.state, { date: (0, _moment2.default)(date) });
        return _this;
    }

    _createClass(DatePickerDays, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            this.setState({ date: (0, _moment2.default)(props.date) });
        }
    }, {
        key: "getCalendarDays",
        value: function getCalendarDays() {
            var locale = this.props.locale;
            var date = this.state.date;

            var startDate = (0, _moment2.default)(date).locale(locale).startOf("month").startOf("day");
            var firstDay = (0, _moment2.default)(startDate).startOf("month");
            var lastDay = (0, _moment2.default)(startDate).endOf("month");
            var monthRange = _moment2.default.range(firstDay, lastDay);
            var weeks = [];
            var calendarDays = [];

            monthRange.by("days", function (d) {
                var week = d.week();
                if (weeks.indexOf(week) === -1) {
                    return weeks.push(week);
                }
            });

            weeks.forEach(function (w, i) {
                var firstWeekDay = void 0;
                var lastWeekDay = void 0;

                if (i > 0 && w < weeks[i - 1]) {
                    // Next year case
                    firstWeekDay = (0, _moment2.default)(startDate).add(1, "year").week(w).startOf("week");
                    lastWeekDay = (0, _moment2.default)(startDate).add(1, "year").week(w).endOf("week");
                } else {
                    firstWeekDay = (0, _moment2.default)(startDate).week(w).startOf("week");
                    lastWeekDay = (0, _moment2.default)(startDate).week(w).endOf("week");
                }

                calendarDays.push(_moment2.default.range(firstWeekDay, lastWeekDay));
            });

            return calendarDays;
        }
    }, {
        key: "enabled",
        value: function enabled(date) {
            var enabledDates = this.props.enabledDates;

            var d = (0, _moment2.default)(date).startOf("day");

            if (!enabledDates) {
                return true;
            }

            for (var i = 0, l = enabledDates.length; i < l; i++) {
                if (d.diff((0, _moment2.default)(enabledDates[i]).startOf("day")) === 0) {
                    return true;
                }
            }

            return false;
        }
    }, {
        key: "disabled",
        value: function disabled(date) {
            var disabledDates = this.props.disabledDates;

            var d = (0, _moment2.default)(date).startOf("day");

            if (!disabledDates) {
                return false;
            }

            for (var i = 0, l = disabledDates.length; i < l; i++) {
                if (d.diff((0, _moment2.default)(disabledDates[i]).startOf("day")) === 0) {
                    return true;
                }
            }

            return false;
        }
    }, {
        key: "disabledWeekday",
        value: function disabledWeekday(date) {
            var daysOfWeekDisabled = this.props.daysOfWeekDisabled;


            if (!daysOfWeekDisabled || daysOfWeekDisabled.length === 0) {
                return false;
            }

            return daysOfWeekDisabled.indexOf(date.day()) !== -1;
        }
    }, {
        key: "renderPrevButton",
        value: function renderPrevButton() {
            var _props = this.props;
            var icons = _props.icons;
            var minDate = _props.minDate;
            var tooltips = _props.tooltips;
            var date = this.state.date;

            var inRange = (0, _utils.inRangeDates)((0, _moment2.default)(date).subtract(1, "month"), "months", minDate);

            var classes = (0, _classnames2.default)("prev", {
                disabled: !inRange
            });

            return _react2.default.createElement(
                "th",
                { className: classes, onClick: inRange && this.onClickPreviousMonth },
                _react2.default.createElement("span", { className: icons.previous, title: tooltips.prevMonth })
            );
        }
    }, {
        key: "renderNextButton",
        value: function renderNextButton() {
            var _props2 = this.props;
            var icons = _props2.icons;
            var maxDate = _props2.maxDate;
            var tooltips = _props2.tooltips;
            var date = this.state.date;

            var inRange = (0, _utils.inRangeDates)((0, _moment2.default)(date).add(1, "month"), "months", null, maxDate);

            var classes = (0, _classnames2.default)("next", {
                disabled: !inRange
            });

            return _react2.default.createElement(
                "th",
                { className: classes, onClick: inRange && this.onClickNextMonth },
                _react2.default.createElement("span", { className: icons.next, title: tooltips.nextMonth })
            );
        }
    }, {
        key: "renderDays",
        value: function renderDays() {
            var _this2 = this;

            var _props3 = this.props;
            var maxDate = _props3.maxDate;
            var minDate = _props3.minDate;
            var selected = _props3.selected;
            var showToday = _props3.showToday;
            var date = this.state.date;

            var weeks = this.getCalendarDays();

            return _react2.default.createElement(
                "tbody",
                null,
                weeks.map(function (week, i) {
                    var days = [];
                    week.by("days", function (d) {
                        var inRange = (0, _utils.inRangeDates)(d, "days", minDate, maxDate);
                        var disabled = !inRange || _this2.disabledWeekday(d) || _this2.disabled(d) || !_this2.enabled(d);
                        var classes = (0, _classnames2.default)("day", {
                            active: selected && d.diff((0, _moment2.default)(_this2.props.date).startOf("day"), "days") === 0,
                            today: showToday && d.diff((0, _moment2.default)().startOf("day"), "days") === 0,
                            old: d.month() < date.month(),
                            weekend: [0, 6].indexOf(d.day()) !== -1,
                            new: d.month() > date.month(),
                            disabled: disabled
                        });

                        days.push(_react2.default.createElement(
                            "td",
                            { key: d.format("x"),
                                className: classes,
                                onClick: !disabled && inRange && _this2.onClickDay(d) },
                            d.format("DD")
                        ));
                    });
                    return _react2.default.createElement(
                        "tr",
                        { key: i },
                        days
                    );
                })
            );
        }
    }, {
        key: "onClickDay",
        value: function onClickDay(date) {
            var _this3 = this;

            return function () {
                var onSelect = _this3.props.onSelect;

                onSelect(date);
            };
        }
    }, {
        key: "render",
        value: function render() {
            var _props4 = this.props;
            var dayViewHeaderFormat = _props4.dayViewHeaderFormat;
            var locale = _props4.locale;
            var onClickMonths = _props4.onClickMonths;
            var tooltips = _props4.tooltips;
            var date = this.state.date;


            var dateLocale = (0, _moment2.default)(date).locale(locale);

            return _react2.default.createElement(
                "div",
                { className: "datepicker-days" },
                _react2.default.createElement(
                    "table",
                    { className: "table-condensed" },
                    _react2.default.createElement(
                        "thead",
                        null,
                        _react2.default.createElement(
                            "tr",
                            null,
                            this.renderPrevButton(),
                            _react2.default.createElement(
                                "th",
                                { className: "picker-switch",
                                    colSpan: "5",
                                    title: tooltips.selectMonth,
                                    onClick: onClickMonths },
                                dateLocale.format(dayViewHeaderFormat)
                            ),
                            this.renderNextButton()
                        ),
                        _react2.default.createElement(
                            "tr",
                            null,
                            [0, 1, 2, 3, 4, 5, 6].map(function (d) {
                                return _react2.default.createElement(
                                    "th",
                                    { key: d, className: "dow" },
                                    dateLocale.weekday(d).format("dd")
                                );
                            })
                        )
                    ),
                    this.renderDays()
                )
            );
        }
    }]);

    return DatePickerDays;
}(_react.Component);

DatePickerDays.propTypes = {
    date: _reactMomentProptypes2.default.momentObj,
    dayViewHeaderFormat: _react2.default.PropTypes.string,
    daysOfWeekDisabled: _react2.default.PropTypes.array,
    disabledDates: _react2.default.PropTypes.any,
    enabledDates: _react2.default.PropTypes.any,
    icons: _react2.default.PropTypes.object,
    locale: _react2.default.PropTypes.string,
    maxDate: _reactMomentProptypes2.default.momentObj,
    minDate: _reactMomentProptypes2.default.momentObj,
    onClickMonths: _react2.default.PropTypes.func,
    onSelect: _react2.default.PropTypes.func,
    selected: _react2.default.PropTypes.bool,
    showToday: _react2.default.PropTypes.bool,
    tooltips: _react2.default.PropTypes.object
};

var _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this.state = {
        date: null
    };

    this.onClickPreviousMonth = function () {
        var date = _this4.state.date;

        _this4.setState({ date: (0, _moment2.default)(date).subtract(1, "month") });
    };

    this.onClickNextMonth = function () {
        var date = _this4.state.date;

        _this4.setState({ date: (0, _moment2.default)(date).add(1, "month") });
    };
};

exports.default = DatePickerDays;
//# sourceMappingURL=days.js.map