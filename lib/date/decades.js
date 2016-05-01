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

require("moment-range");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var DatePickerYears = function (_Component) {
    _inherits(DatePickerYears, _Component);

    function DatePickerYears() {
        var _temp, _this, _ret;

        _classCallCheck(this, DatePickerYears);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onClickPreviousCentury = function () {
            var _this$props = _this.props;
            var decade = _this$props.decade;
            var updateDecade = _this$props.updateDecade;

            updateDecade(decade - 100);
        }, _this.onClickNextCentury = function () {
            var _this$props2 = _this.props;
            var decade = _this$props2.decade;
            var updateDecade = _this$props2.updateDecade;

            updateDecade(decade + 100);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    DatePickerYears.prototype.startOfCentury = function startOfCentury(date) {
        return (0, _moment2.default)(date).year(Math.floor(date.year() / 100) * 100).startOf("year");
    };

    DatePickerYears.prototype.endOfCentury = function endOfCentury(date) {
        return (0, _moment2.default)(date).year(Math.floor(date.year() / 100 + 1) * 100 - 1).endOf("year");
    };

    DatePickerYears.prototype.renderPrevButton = function renderPrevButton() {
        var _props = this.props;
        var decade = _props.decade;
        var icons = _props.icons;
        var minDate = _props.minDate;
        var tooltips = _props.tooltips;

        var date = (0, _moment2.default)([decade]);
        var endCentury = this.endOfCentury((0, _moment2.default)(date).subtract(100, "years"));
        var inRange = (0, _utils.inRangeDates)((0, _moment2.default)(endCentury).subtract(1, "year"), "years", minDate);

        var classes = (0, _classnames2.default)("prev", {
            disabled: !inRange
        });

        return _react2.default.createElement(
            "th",
            { className: classes, onClick: inRange && this.onClickPreviousCentury },
            _react2.default.createElement("span", { className: icons.previous, title: tooltips.prevCentury })
        );
    };

    DatePickerYears.prototype.renderNextButton = function renderNextButton() {
        var _props2 = this.props;
        var decade = _props2.decade;
        var icons = _props2.icons;
        var maxDate = _props2.maxDate;
        var tooltips = _props2.tooltips;

        var date = (0, _moment2.default)([decade]);
        var startCentury = this.startOfCentury((0, _moment2.default)(date).add(100, "years"));
        var inRange = (0, _utils.inRangeDates)((0, _moment2.default)(startCentury).add(1, "year"), "years", null, maxDate);

        var classes = (0, _classnames2.default)("next", {
            disabled: !inRange
        });

        return _react2.default.createElement(
            "th",
            { className: classes, onClick: inRange && this.onClickNextCentury },
            _react2.default.createElement("span", { className: icons.next, title: tooltips.nextCentury })
        );
    };

    DatePickerYears.prototype.renderLeftEdge = function renderLeftEdge(year) {
        var minDate = this.props.minDate;

        var date = (0, _moment2.default)(year).subtract(1, "year");
        var inRange = (0, _utils.inRangeDates)(date, "years", minDate);

        var classes = (0, _classnames2.default)("year old", {
            disabled: !inRange
        });

        return _react2.default.createElement(
            "span",
            { className: classes, onClick: inRange && this.onClickPreviousCentury },
            "…" + date.year()
        );
    };

    DatePickerYears.prototype.renderRightEdge = function renderRightEdge(year) {
        var maxDate = this.props.maxDate;

        var date = (0, _moment2.default)(year).add(1, "year");
        var inRange = (0, _utils.inRangeDates)(date, "years", null, maxDate);

        var classes = (0, _classnames2.default)("year old", {
            disabled: !inRange
        });

        return _react2.default.createElement(
            "span",
            { className: classes, onClick: inRange && this.onClickNextCentury },
            "…" + date.year()
        );
    };

    DatePickerYears.prototype.onClickDecade = function onClickDecade(date) {
        var _this2 = this;

        return function () {
            var onSelect = _this2.props.onSelect;

            onSelect(date, false, true);
        };
    };

    DatePickerYears.prototype.render = function render() {
        var _this3 = this;

        var _props3 = this.props;
        var dateTime = _props3.dateTime;
        var decade = _props3.decade;
        var maxDate = _props3.maxDate;
        var minDate = _props3.minDate;
        var selected = _props3.selected;

        var date = (0, _moment2.default)([decade]);
        var firstYear = this.startOfCentury(date);
        var lastYear = this.endOfCentury(date);
        var centuryYears = _moment2.default.range(firstYear, lastYear);
        var years = [];

        centuryYears.by("year", function (y) {
            if (y.year() % 10 === 0) {
                years.push(y);
            }
        });

        return _react2.default.createElement(
            "div",
            { className: "datepicker-decades" },
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
                                colSpan: "5" },
                            firstYear.year() + "-" + lastYear.year()
                        ),
                        this.renderNextButton()
                    )
                ),
                _react2.default.createElement(
                    "tbody",
                    null,
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "td",
                            { colSpan: "7" },
                            this.renderLeftEdge(firstYear),
                            years.map(function (y) {
                                var sameYear = dateTime.year() >= y.year() && dateTime.year() <= y.year() + 9;
                                var inRangeLow = (0, _utils.inRangeDates)(y, "years", null, maxDate);
                                var inRangeHigh = (0, _utils.inRangeDates)((0, _moment2.default)(y).add(9, "years"), "years", minDate);
                                var classes = (0, _classnames2.default)("decade", {
                                    active: selected && sameYear,
                                    disabled: !inRangeLow || !inRangeHigh
                                });

                                return _react2.default.createElement(
                                    "span",
                                    { className: classes,
                                        key: y.year(),
                                        onClick: inRangeLow && inRangeHigh && _this3.onClickDecade(y) },
                                    y.year() + "-" + (0, _moment2.default)(y).add(9, "years").year()
                                );
                            }),
                            this.renderRightEdge(lastYear)
                        )
                    )
                )
            )
        );
    };

    return DatePickerYears;
}(_react.Component);

DatePickerYears.propTypes = {
    dateTime: _reactMomentProptypes2.default.momentObj,
    decade: _react2.default.PropTypes.number,
    icons: _react2.default.PropTypes.object,
    maxDate: _reactMomentProptypes2.default.momentObj,
    minDate: _reactMomentProptypes2.default.momentObj,
    onSelect: _react2.default.PropTypes.func,
    selected: _react2.default.PropTypes.bool,
    tooltips: _react2.default.PropTypes.object,
    updateDecade: _react2.default.PropTypes.func
};
exports.default = DatePickerYears;
//# sourceMappingURL=decades.js.map