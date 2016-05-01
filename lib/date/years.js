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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onClickPreviousDecade = function () {
            var _this$props = _this.props;
            var decade = _this$props.decade;
            var updateDecade = _this$props.updateDecade;

            updateDecade(decade - 10);
        }, _this.onClickNextDecade = function () {
            var _this$props2 = _this.props;
            var decade = _this$props2.decade;
            var updateDecade = _this$props2.updateDecade;

            updateDecade(decade + 10);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    DatePickerYears.prototype.startOfDecade = function startOfDecade(date) {
        return (0, _moment2.default)(date).year(Math.floor(date.year() / 10) * 10).startOf("year");
    };

    DatePickerYears.prototype.endOfDecade = function endOfDecade(date) {
        return (0, _moment2.default)(date).year(Math.floor(date.year() / 10 + 1) * 10 - 1).endOf("year");
    };

    DatePickerYears.prototype.renderPrevButton = function renderPrevButton() {
        var _props = this.props;
        var decade = _props.decade;
        var icons = _props.icons;
        var minDate = _props.minDate;
        var tooltips = _props.tooltips;

        var date = (0, _moment2.default)([decade]);
        var endDecade = this.endOfDecade((0, _moment2.default)(date).subtract(10, "years"));
        var inRange = (0, _utils.inRangeDates)((0, _moment2.default)(endDecade).subtract(1, "year"), "years", minDate);

        var classes = (0, _classnames2.default)("prev", {
            disabled: !inRange
        });

        return _react2.default.createElement(
            "th",
            { className: classes, onClick: inRange && this.onClickPreviousDecade },
            _react2.default.createElement("span", { className: icons.previous, title: tooltips.prevDecade })
        );
    };

    DatePickerYears.prototype.renderNextButton = function renderNextButton() {
        var _props2 = this.props;
        var decade = _props2.decade;
        var icons = _props2.icons;
        var maxDate = _props2.maxDate;
        var tooltips = _props2.tooltips;

        var date = (0, _moment2.default)([decade]);
        var startDecade = this.startOfDecade((0, _moment2.default)(date).add(10, "years"));
        var inRange = (0, _utils.inRangeDates)((0, _moment2.default)(startDecade).add(1, "year"), "years", null, maxDate);

        var classes = (0, _classnames2.default)("next", {
            disabled: !inRange
        });

        return _react2.default.createElement(
            "th",
            { className: classes, onClick: inRange && this.onClickNextDecade },
            _react2.default.createElement("span", { className: icons.next, title: tooltips.nextDecade })
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
            { className: classes, onClick: inRange && this.onClickPreviousDecade },
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
            { className: classes, onClick: inRange && this.onClickNextDecade },
            "…" + date.year()
        );
    };

    DatePickerYears.prototype.onClickYear = function onClickYear(date) {
        var _this2 = this;

        return function () {
            var _props3 = _this2.props;
            var dateTime = _props3.dateTime;
            var onSelect = _props3.onSelect;


            onSelect((0, _moment2.default)(dateTime).year(date.year()), false, true);
        };
    };

    DatePickerYears.prototype.render = function render() {
        var _this3 = this;

        var _props4 = this.props;
        var dateTime = _props4.dateTime;
        var decade = _props4.decade;
        var maxDate = _props4.maxDate;
        var minDate = _props4.minDate;
        var onClickDecades = _props4.onClickDecades;
        var selected = _props4.selected;
        var tooltips = _props4.tooltips;

        var date = (0, _moment2.default)([decade]);
        var firstYear = this.startOfDecade(date);
        var lastYear = this.endOfDecade(date);
        var decadeYears = _moment2.default.range(firstYear, lastYear);
        var years = [];

        decadeYears.by("year", function (y) {
            return years.push(y);
        });

        return _react2.default.createElement(
            "div",
            { className: "datepicker-years" },
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
                                title: tooltips.selectDecade,
                                onClick: onClickDecades },
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
                                var inRange = (0, _utils.inRangeDates)(y, "years", minDate, maxDate);
                                var sameYear = y.diff((0, _moment2.default)(dateTime).startOf("year"), "years") === 0;
                                var classes = (0, _classnames2.default)("year", {
                                    active: selected && sameYear,
                                    disabled: !inRange
                                });

                                return _react2.default.createElement(
                                    "span",
                                    { className: classes,
                                        key: y.year(),
                                        onClick: inRange && _this3.onClickYear(y) },
                                    y.year()
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
    onClickDecades: _react2.default.PropTypes.func,
    onSelect: _react2.default.PropTypes.func,
    selected: _react2.default.PropTypes.bool,
    tooltips: _react2.default.PropTypes.object,
    updateDecade: _react2.default.PropTypes.func
};
exports.default = DatePickerYears;
//# sourceMappingURL=years.js.map