"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactMomentProptypes = require("react-moment-proptypes");

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _time = require("./time.js");

var _time2 = _interopRequireDefault(_time);

var _hours = require("./hours.js");

var _hours2 = _interopRequireDefault(_hours);

var _minutes = require("./minutes.js");

var _minutes2 = _interopRequireDefault(_minutes);

var _config = require("../config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var TimePicker = function (_Component) {
    _inherits(TimePicker, _Component);

    function TimePicker() {
        _classCallCheck(this, TimePicker);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

        _this.state = {
            use24Hours: false,
            viewMode: _config.VIEW_MODE_TIME
        };

        _this.onClickHours = function (e) {
            e.preventDefault();
            _this.setState({
                viewMode: _config.VIEW_MODE_HOURS
            });
        };

        _this.onClickMinutes = function (e) {
            e.preventDefault();
            _this.setState({
                viewMode: _config.VIEW_MODE_MINUTES
            });
        };

        _this.onSelectTime = function (date) {
            var _this$props = _this.props;
            var dateTime = _this$props.dateTime;
            var onChange = _this$props.onChange;


            onChange((0, _moment2.default)(dateTime).hour(date.hour()).minutes(date.minutes()));

            _this.setState({
                viewMode: _config.VIEW_MODE_TIME
            });
        };

        _this.state = Object.assign({}, _this.state, { use24Hours: _this.get24HoursFlag() });
        return _this;
    }

    TimePicker.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
        this.setState({ use24Hours: this.get24HoursFlag() });
    };

    TimePicker.prototype.get24HoursFlag = function get24HoursFlag() {
        var locale = this.props.locale;

        var momentLocale = (0, _moment2.default)().locale(locale);
        var actualFormat = ["LT", "LTS"].map(function (f) {
            return momentLocale.localeData().longDateFormat(f);
        }).join(" ");

        return actualFormat.toLowerCase().indexOf("a") < 1 && actualFormat.replace(/\[.*?\]/g, "").indexOf("h") < 1;
    };

    TimePicker.prototype.renderViewMode = function renderViewMode() {
        var _state = this.state;
        var use24Hours = _state.use24Hours;
        var viewMode = _state.viewMode;


        switch (viewMode) {
            case _config.VIEW_MODE_HOURS:
                return _react2.default.createElement(_hours2.default, _extends({}, this.props, {
                    use24Hours: use24Hours,
                    onSelect: this.onSelectTime }));

            case _config.VIEW_MODE_MINUTES:
                return _react2.default.createElement(_minutes2.default, _extends({}, this.props, {
                    onSelect: this.onSelectTime }));

            default:
                return _react2.default.createElement(_time2.default, _extends({ use24Hours: use24Hours,
                    onClickHours: this.onClickHours,
                    onClickMinutes: this.onClickMinutes,
                    onSelect: this.onSelectTime
                }, this.props));
        }
    };

    TimePicker.prototype.render = function render() {
        var sideBySide = this.props.sideBySide;

        var classes = (0, _classnames2.default)("timepicker", { "col-md-6": sideBySide });
        return _react2.default.createElement(
            "div",
            { className: classes },
            this.renderViewMode()
        );
    };

    return TimePicker;
}(_react.Component);

TimePicker.propTypes = {
    dateTime: _reactMomentProptypes2.default.momentObj,
    locale: _react2.default.PropTypes.string,
    onChange: _react2.default.PropTypes.func,
    sideBySide: _react2.default.PropTypes.bool
};
exports.default = TimePicker;
//# sourceMappingURL=picker.js.map