"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactMomentProptypes = require("react-moment-proptypes");

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _days = require("./days.js");

var _days2 = _interopRequireDefault(_days);

var _months = require("./months.js");

var _months2 = _interopRequireDefault(_months);

var _years = require("./years.js");

var _years2 = _interopRequireDefault(_years);

var _decades = require("./decades.js");

var _decades2 = _interopRequireDefault(_decades);

var _config = require("../config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePicker = function (_Component) {
    _inherits(DatePicker, _Component);

    function DatePicker() {
        var _Object$getPrototypeO;

        _classCallCheck(this, DatePicker);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DatePicker)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _initialiseProps.call(_this);

        var date = _this.getDate(_this.props);
        _this.state = Object.assign({}, _this.state, { date: date, decade: _this.getDecade(date.year()) });
        return _this;
    }

    _createClass(DatePicker, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            this.setState({ date: this.getDate(props) });
        }
    }, {
        key: "getDate",
        value: function getDate(props) {
            var dateTime = props.dateTime;

            return (0, _moment2.default)(dateTime).startOf("day");
        }
    }, {
        key: "getDecade",
        value: function getDecade(year) {
            return Math.floor(year / 10) * 10;
        }
    }, {
        key: "renderViewMode",
        value: function renderViewMode() {
            var viewMode = this.props.viewMode;
            var _state = this.state;
            var date = _state.date;
            var decade = _state.decade;


            switch (viewMode) {
                case _config.VIEW_MODE_MONTHS:
                    return _react2.default.createElement(_months2.default, _extends({}, this.props, {
                        onClickYears: this.onClickYears,
                        onSelect: this.onSelectDate,
                        date: date }));

                case _config.VIEW_MODE_YEARS:
                    return _react2.default.createElement(_years2.default, _extends({}, this.props, {
                        onClickDecades: this.onClickDecades,
                        onSelect: this.onSelectDate,
                        updateDecade: this.updateDecade,
                        decade: decade }));

                case _config.VIEW_MODE_DECADES:
                    return _react2.default.createElement(_decades2.default, _extends({}, this.props, {
                        onSelect: this.onSelectDecade,
                        updateDecade: this.updateDecade,
                        decade: decade }));

                default:
                    return _react2.default.createElement(_days2.default, _extends({}, this.props, {
                        onClickMonths: this.onClickMonths,
                        onSelect: this.onSelectDate,
                        date: date }));
            }
        }
    }, {
        key: "render",
        value: function render() {
            var sideBySide = this.props.sideBySide;

            var classes = (0, _classnames2.default)("datepicker", { "col-md-6": sideBySide });
            return _react2.default.createElement(
                "div",
                { className: classes },
                this.renderViewMode()
            );
        }
    }]);

    return DatePicker;
}(_react.Component);

DatePicker.propTypes = {
    dateTime: _reactMomentProptypes2.default.momentObj,
    onChange: _react2.default.PropTypes.func,
    sideBySide: _react2.default.PropTypes.bool,
    updateViewMode: _react2.default.PropTypes.func,
    viewMode: _react2.default.PropTypes.string
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.onClickMonths = function (e) {
        e.preventDefault();

        var updateViewMode = _this2.props.updateViewMode;

        updateViewMode(_config.VIEW_MODE_MONTHS);
    };

    this.onClickYears = function (e) {
        e.preventDefault();

        var updateViewMode = _this2.props.updateViewMode;

        updateViewMode(_config.VIEW_MODE_YEARS);
    };

    this.onClickDecades = function (e) {
        e.preventDefault();

        var updateViewMode = _this2.props.updateViewMode;

        updateViewMode(_config.VIEW_MODE_DECADES);
    };

    this.onSelectDate = function (date) {
        var _props = _this2.props;
        var dateTime = _props.dateTime;
        var onChange = _props.onChange;
        var updateViewMode = _props.updateViewMode;
        var viewMode = _props.viewMode;

        var decade = _this2.getDecade(date.year());

        onChange((0, _moment2.default)(dateTime).year(date.year()).month(date.month()).date(date.date()));

        switch (viewMode) {
            case _config.VIEW_MODE_YEARS:
                return _this2.setState({ decade: decade }, function () {
                    return updateViewMode(_config.VIEW_MODE_MONTHS);
                });

            default:
                return _this2.setState({ decade: decade }, function () {
                    return updateViewMode(_config.VIEW_MODE_DAYS);
                });
        }
    };

    this.onSelectDecade = function (date) {
        var updateViewMode = _this2.props.updateViewMode;

        var decade = _this2.getDecade(date.year());

        return _this2.setState({ decade: decade }, function () {
            return updateViewMode(_config.VIEW_MODE_YEARS);
        });
    };

    this.updateDecade = function (year) {
        _this2.setState({ decade: _this2.getDecade(year) });
    };
};

exports.default = DatePicker;
//# sourceMappingURL=picker.js.map