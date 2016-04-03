"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("core-js/fn/object/assign");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactMomentProptypes = require("react-moment-proptypes");

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _reactPropTypes = require("react-prop-types");

var _picker = require("./date/picker.js");

var _picker2 = _interopRequireDefault(_picker);

var _picker3 = require("./time/picker.js");

var _picker4 = _interopRequireDefault(_picker3);

var _inline = require("./layouts/inline.js");

var _inline2 = _interopRequireDefault(_inline);

var _input = require("./layouts/input.js");

var _input2 = _interopRequireDefault(_input);

var _config = require("./config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultIcons = {
    time: "glyphicon glyphicon-time",
    date: "glyphicon glyphicon-calendar",
    up: "glyphicon glyphicon-chevron-up",
    down: "glyphicon glyphicon-chevron-down",
    previous: "glyphicon glyphicon-chevron-left",
    next: "glyphicon glyphicon-chevron-right",
    today: "glyphicon glyphicon-screenshot",
    clear: "glyphicon glyphicon-trash",
    close: "glyphicon glyphicon-remove"
};

var defaultTooltips = {
    today: "Go to today",
    clear: "Clear selection",
    close: "Close the picker",
    selectMonth: "Select Month",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    selectYear: "Select Year",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    selectDecade: "Select Decade",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevCentury: "Previous Century",
    nextCentury: "Next Century",
    pickHour: "Pick Hour",
    incrementHour: "Increment Hour",
    decrementHour: "Decrement Hour",
    pickMinute: "Pick Minute",
    incrementMinute: "Increment Minute",
    decrementMinute: "Decrement Minute",
    pickSecond: "Pick Second",
    incrementSecond: "Increment Second",
    decrementSecond: "Decrement Second",
    togglePeriod: "Toggle Period",
    selectTime: "Select Time"
};

var DateTimePicker = function (_Component) {
    _inherits(DateTimePicker, _Component);

    function DateTimePicker() {
        var _Object$getPrototypeO;

        _classCallCheck(this, DateTimePicker);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DateTimePicker)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _initialiseProps.call(_this);

        var _this$props = _this.props;
        var defaultDate = _this$props.defaultDate;
        var icons = _this$props.icons;
        var mode = _this$props.mode;
        var tooltips = _this$props.tooltips;
        var useCurrent = _this$props.useCurrent;
        var viewMode = _this$props.viewMode;


        _this.icons = Object.assign({}, defaultIcons, icons);
        _this.tooltips = Object.assign({}, tooltips, defaultTooltips);

        var dateTime = (0, _moment2.default)();

        if (defaultDate) {
            if (mode === _config.MODE_DATE) {
                dateTime = (0, _moment2.default)(defaultDate).startOf("day");
            } else {
                dateTime = (0, _moment2.default)(defaultDate);
            }
        } else if (mode === _config.MODE_DATE) {
            dateTime = (0, _moment2.default)().startOf("day");
        }

        _this.state = Object.assign({}, _this.state, {
            dateTime: dateTime,
            selected: !!defaultDate || useCurrent,
            viewMode: _this.state.viewMode || viewMode
        });
        return _this;
    }

    // TODO: Properties to implement from original plugin
    // http://eonasdan.github.io/bootstrap-datetimepicker/Options/
    /*
    extraFormats          : React.PropTypes.any,
    calendarWeeks         : React.PropTypes.any,
    keepInvalid           : React.PropTypes.any,
    disabledTimeIntervals : React.PropTypes.any,
    enabledHours          : React.PropTypes.any,
    disabledHours         : React.PropTypes.any
    */


    _createClass(DateTimePicker, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            var state = {};
            if (props.value) {
                var dateTime = (0, _moment2.default)(props.value);
                if (dateTime.isValid()) {
                    state = Object.assign({}, state, {
                        selected: true,
                        dateTime: dateTime
                    });
                }
            } else if (!props.value) {
                state = Object.assign({}, state, {
                    selected: false
                });
            }
            this.setState(Object.assign({}, this.state, state));
        }
    }, {
        key: "renderDatePicker",
        value: function renderDatePicker() {
            var mode = this.props.mode;
            var _state = this.state;
            var dateTime = _state.dateTime;
            var selected = _state.selected;
            var view = _state.view;
            var viewMode = _state.viewMode;


            if (mode === _config.MODE_DATETIME || mode === _config.MODE_DATE) {
                return _react2.default.createElement(_picker2.default, _extends({}, this.props, {
                    icons: this.icons,
                    tooltips: this.tooltips,
                    show: view === _config.VIEW_DATE,
                    onChange: this.onChangeDateTime,
                    viewMode: viewMode,
                    selected: selected,
                    updateViewMode: this.updateViewMode,
                    dateTime: dateTime }));
            }
        }
    }, {
        key: "renderTimePicker",
        value: function renderTimePicker() {
            var mode = this.props.mode;
            var _state2 = this.state;
            var dateTime = _state2.dateTime;
            var selected = _state2.selected;
            var view = _state2.view;


            if (mode === _config.MODE_DATETIME || mode === _config.MODE_TIME) {
                return _react2.default.createElement(_picker4.default, _extends({}, this.props, {
                    icons: this.icons,
                    tooltips: this.tooltips,
                    onChange: this.onChangeDateTime,
                    dateTime: dateTime,
                    selected: selected,
                    show: view === _config.VIEW_TIME }));
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props;
            var bsSize = _props.bsSize;
            var inline = _props.inline;
            var inputFormat = _props.inputFormat;
            var mode = _props.mode;
            var placeholder = _props.placeholder;
            var size = _props.size;
            var widgetParent = _props.widgetParent;
            var _state3 = this.state;
            var dateTime = _state3.dateTime;
            var selected = _state3.selected;

            var displayFormat = inputFormat;

            if (!inputFormat) {
                switch (mode) {
                    case _config.MODE_DATE:
                        displayFormat = _config.INPUT_FORMAT_DATE;
                        break;

                    case _config.MODE_TIME:
                        displayFormat = _config.INPUT_FORMAT_TIME;
                        break;

                    default:
                        displayFormat = _config.INPUT_FORMAT_DATETIME;
                }
            }

            var inputValue = selected ? (0, _moment2.default)(dateTime).format(displayFormat) : placeholder;

            var picker = void 0;

            if (inline) {
                picker = _react2.default.createElement(_inline2.default, _extends({}, this.props, {
                    displayFormat: displayFormat,
                    tooltips: this.tooltips,
                    icons: this.icons,
                    onClickToday: this.onClickToday,
                    onClickClear: this.onClickClear,
                    datePicker: this.renderDatePicker(),
                    timePicker: this.renderTimePicker() }));
            } else {
                picker = _react2.default.createElement(_input2.default, _extends({}, this.props, {
                    displayFormat: displayFormat,
                    tooltips: this.tooltips,
                    icons: this.icons,
                    bsSize: bsSize || size,
                    value: inputValue,
                    selected: selected,
                    dateTime: dateTime,
                    container: widgetParent,
                    onChange: this.onChangeInput,
                    onClickToday: this.onClickToday,
                    onClickClear: this.onClickClear,
                    datePicker: this.renderDatePicker(),
                    timePicker: this.renderTimePicker() }));
            }

            return _react2.default.createElement(
                "div",
                { ref: "component" },
                picker
            );
        }
    }]);

    return DateTimePicker;
}(_react.Component);

DateTimePicker.propTypes = {
    bsSize: _react2.default.PropTypes.oneOf([_config.BOOTSTRAP_SIZE_SM, _config.BOOTSTRAP_SIZE_LG]),
    collapse: _react2.default.PropTypes.bool,
    dateTime: (0, _reactPropTypes.deprecated)(_react2.default.PropTypes.string, "Use \"value\" instead"),
    dayViewHeaderFormat: _react2.default.PropTypes.string,
    daysOfWeekDisabled: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
    debug: _react2.default.PropTypes.bool,
    defaultDate: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string, _react2.default.PropTypes.instanceOf(Date), _reactMomentProptypes2.default.momentObj]),
    disabledDates: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.func, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string, _react2.default.PropTypes.instanceOf(Date), _reactMomentProptypes2.default.momentObj]))]),
    enabledDates: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.func, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string, _react2.default.PropTypes.instanceOf(Date), _reactMomentProptypes2.default.momentObj]))]),
    focusOnShow: _react2.default.PropTypes.bool,
    format: _react2.default.PropTypes.string,
    icon: _react2.default.PropTypes.bool,
    icons: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.string),
    inline: _react2.default.PropTypes.bool,
    inputFormat: _react2.default.PropTypes.string,
    inputProps: _react2.default.PropTypes.object,
    keepOpen: _react2.default.PropTypes.bool,
    locale: _react2.default.PropTypes.string,
    maxDate: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string, _react2.default.PropTypes.instanceOf(Date), _reactMomentProptypes2.default.momentObj]),
    minDate: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string, _react2.default.PropTypes.instanceOf(Date), _reactMomentProptypes2.default.momentObj]),
    mode: _react2.default.PropTypes.oneOf([_config.MODE_DATE, _config.MODE_TIME, _config.MODE_DATETIME]),
    onChange: _react2.default.PropTypes.func,
    placeholder: _react2.default.PropTypes.string,
    showClear: _react2.default.PropTypes.bool,
    showClose: _react2.default.PropTypes.bool,
    showToday: _react2.default.PropTypes.bool,
    showTodayButton: _react2.default.PropTypes.bool,
    sideBySide: _react2.default.PropTypes.bool,
    size: (0, _reactPropTypes.deprecated)(_react2.default.PropTypes.string, "Use \"bsSize\" instead"),
    stepping: _react2.default.PropTypes.number,
    toolbarPlacement: _react2.default.PropTypes.oneOf([_config.PLACEMENT_DEFAULT, _config.PLACEMENT_TOP, _config.PLACEMENT_BOTTOM]),
    tooltips: _react2.default.PropTypes.object,
    useCurrent: _react2.default.PropTypes.bool,
    useStrict: _react2.default.PropTypes.bool,
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string, _react2.default.PropTypes.instanceOf(Date), _reactMomentProptypes2.default.momentObj]),
    viewMode: _react2.default.PropTypes.oneOf([_config.VIEW_MODE_DAYS, _config.VIEW_MODE_MONTHS, _config.VIEW_MODE_YEARS, _config.VIEW_MODE_DECADES]),
    widgetParent: _reactPropTypes.mountable,
    widgetPositioning: _react2.default.PropTypes.oneOf([_config.PLACEMENT_TOP, _config.PLACEMENT_BOTTOM]) };
DateTimePicker.defaultProps = {
    collapse: true,
    dayViewHeaderFormat: _config.DEFAULT_DAY_VIEW_HEADER,
    disabledDates: false,
    enabledDates: false,
    focusOnShow: true,
    format: _config.DEFAULT_FORMAT,
    icon: true,
    icons: {},
    locale: _moment2.default.locale(),
    mode: _config.MODE_DATETIME,
    onChange: function onChange() {},
    placement: _config.PLACEMENT_BOTTOM,
    showToday: true,
    stepping: 1,
    toolbarPlacement: _config.PLACEMENT_DEFAULT,
    tooltips: {},
    useCurrent: true,
    viewMode: _config.VIEW_MODE_DAYS
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.state = {
        view: _config.VIEW_DATE
    };
    this.icons = {};
    this.tooltips = {};

    this.onChangeInput = function (dateTime) {
        _this2.onChangeDateTime(dateTime);
    };

    this.onChangeDateTime = function (date) {
        var clear = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        var ignore = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

        _this2.setState({
            dateTime: date ? (0, _moment2.default)(date) : (0, _moment2.default)(),
            selected: date && !clear
        }, function () {
            var _props2 = _this2.props;
            var format = _props2.format;
            var locale = _props2.locale;
            var onChange = _props2.onChange;
            var _state4 = _this2.state;
            var dateTime = _state4.dateTime;
            var selected = _state4.selected;


            if (!ignore) {
                onChange(clear || !selected ? null : (0, _moment2.default)(dateTime).locale(locale).format(format));
            }
        });
    };

    this.onClickToday = function () {
        var dateTime = _this2.state.dateTime;

        var date = (0, _moment2.default)();

        _this2.onChangeDateTime((0, _moment2.default)(dateTime).year(date.year()).month(date.month()).date(date.date()));
    };

    this.onClickClear = function () {
        _this2.onChangeDateTime((0, _moment2.default)(), true);
    };

    this.updateViewMode = function (viewMode) {
        _this2.setState({ viewMode: viewMode });
    };
};

exports.default = DateTimePicker;
//# sourceMappingURL=picker.js.map