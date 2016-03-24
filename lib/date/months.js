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

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePickerMonths = function (_Component) {
    _inherits(DatePickerMonths, _Component);

    function DatePickerMonths() {
        var _Object$getPrototypeO;

        _classCallCheck(this, DatePickerMonths);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DatePickerMonths)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _initialiseProps.call(_this);

        var date = _this.props.date;

        _this.state = Object.assign({}, _this.state, { date: (0, _moment2.default)(date) });
        return _this;
    }

    _createClass(DatePickerMonths, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            this.setState({ date: (0, _moment2.default)(props.date) });
        }
    }, {
        key: "renderPrevButton",
        value: function renderPrevButton() {
            var _props = this.props;
            var icons = _props.icons;
            var minDate = _props.minDate;
            var tooltips = _props.tooltips;
            var date = this.state.date;

            var inRange = (0, _utils.inRangeDates)((0, _moment2.default)(date).subtract(1, "year"), "years", minDate);

            var classes = (0, _classnames2.default)("prev", {
                disabled: !inRange
            });

            return _react2.default.createElement(
                "th",
                { className: classes, onClick: inRange && this.onClickPreviousYear },
                _react2.default.createElement("span", { className: icons.previous, title: tooltips.prevYear })
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

            var inRange = (0, _utils.inRangeDates)((0, _moment2.default)(date).add(1, "year"), "years", null, maxDate);

            var classes = (0, _classnames2.default)("next", {
                disabled: !inRange
            });

            return _react2.default.createElement(
                "th",
                { className: classes, onClick: inRange && this.onClickNextYear },
                _react2.default.createElement("span", { className: icons.next, title: tooltips.nextYear })
            );
        }
    }, {
        key: "onClickMonth",
        value: function onClickMonth(date) {
            var _this2 = this;

            return function () {
                var _props3 = _this2.props;
                var dateTime = _props3.dateTime;
                var onSelect = _props3.onSelect;


                onSelect((0, _moment2.default)(dateTime).year(date.year()).month(date.month()), false, true);
            };
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _props4 = this.props;
            var dateTime = _props4.dateTime;
            var locale = _props4.locale;
            var maxDate = _props4.maxDate;
            var minDate = _props4.minDate;
            var onClickYears = _props4.onClickYears;
            var selected = _props4.selected;
            var tooltips = _props4.tooltips;
            var date = this.state.date;


            return _react2.default.createElement(
                "div",
                { className: "datepicker-months" },
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
                                    title: tooltips.selectYear,
                                    onClick: onClickYears },
                                date.format("YYYY")
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
                                this.months.map(function (m) {
                                    var month = (0, _moment2.default)(date).locale(locale).month(m).startOf("month");
                                    var sameMonth = month.diff((0, _moment2.default)(dateTime).startOf("month"), "months") === 0;
                                    var inRange = (0, _utils.inRangeDates)(month, "months", minDate, maxDate);
                                    var classes = (0, _classnames2.default)("month", {
                                        active: selected && sameMonth,
                                        disabled: !inRange
                                    });

                                    return _react2.default.createElement(
                                        "span",
                                        { className: classes,
                                            key: m,
                                            onClick: inRange && _this3.onClickMonth(month) },
                                        month.format("MMM")
                                    );
                                })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return DatePickerMonths;
}(_react.Component);

DatePickerMonths.propTypes = {
    date: _reactMomentProptypes2.default.momentObj,
    dateTime: _reactMomentProptypes2.default.momentObj,
    icons: _react2.default.PropTypes.object,
    locale: _react2.default.PropTypes.string,
    maxDate: _reactMomentProptypes2.default.momentObj,
    minDate: _reactMomentProptypes2.default.momentObj,
    onClickYears: _react2.default.PropTypes.func,
    onSelect: _react2.default.PropTypes.func,
    selected: _react2.default.PropTypes.bool,
    tooltips: _react2.default.PropTypes.object
};

var _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this.state = {
        date: null
    };
    this.months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    this.onClickPreviousYear = function () {
        var date = _this4.state.date;


        _this4.setState({ date: (0, _moment2.default)(date).subtract(1, "year") });
    };

    this.onClickNextYear = function () {
        var date = _this4.state.date;


        _this4.setState({ date: (0, _moment2.default)(date).add(1, "year") });
    };
};

exports.default = DatePickerMonths;
//# sourceMappingURL=months.js.map