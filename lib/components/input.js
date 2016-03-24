"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _config = require("../config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimePickerInput = function (_Component) {
    _inherits(DateTimePickerInput, _Component);

    function DateTimePickerInput() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, DateTimePickerInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DateTimePickerInput)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onChangeInput = function (e) {
            e.preventDefault();

            var onChange = _this.props.onChange;

            var value = e.target.value;
            var dateTime = (0, _moment2.default)(value);
            if (dateTime.isValid()) {
                onChange(dateTime);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DateTimePickerInput, [{
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            var _props = this.props;
            var focusOnShow = _props.focusOnShow;
            var show = _props.show;

            var input = (0, _reactDom.findDOMNode)(this.refs.input);

            if (show && focusOnShow && input) {
                input.focus();
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _props2 = this.props;
            var bsSize = _props2.bsSize;
            var icons = _props2.icons;
            var inputProps = _props2.inputProps;
            var mode = _props2.mode;
            var onClick = _props2.onClick;
            var value = _props2.value;


            var classes = (0, _classnames2.default)("input-group", "date", _defineProperty({}, "input-group-" + bsSize, bsSize));

            var iconClasses = mode === _config.MODE_TIME ? icons.time : icons.date;

            return _react2.default.createElement(
                "div",
                { className: classes },
                _react2.default.createElement("input", _extends({ className: "form-control",
                    type: "text",
                    ref: "input",
                    value: value,
                    onChange: this.onChangeInput
                }, inputProps)),
                _react2.default.createElement(
                    "span",
                    { className: "input-group-addon",
                        onClick: onClick },
                    _react2.default.createElement("span", { className: iconClasses })
                )
            );
        }
    }]);

    return DateTimePickerInput;
}(_react.Component);

DateTimePickerInput.propTypes = {
    bsSize: _react2.default.PropTypes.string,
    focusOnShow: _react2.default.PropTypes.bool,
    icon: _react2.default.PropTypes.bool,
    icons: _react2.default.PropTypes.object,
    inputProps: _react2.default.PropTypes.object,
    mode: _react2.default.PropTypes.string,
    onChange: _react2.default.PropTypes.func,
    onClick: _react2.default.PropTypes.func,
    show: _react2.default.PropTypes.bool,
    value: _react2.default.PropTypes.string
};
exports.default = DateTimePickerInput;
//# sourceMappingURL=input.js.map