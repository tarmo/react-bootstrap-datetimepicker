"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactOverlays = require("react-overlays");

var _reactPropTypes = require("react-prop-types");

var _reactMomentProptypes = require("react-moment-proptypes");

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _fade = require("../components/fade.js");

var _fade2 = _interopRequireDefault(_fade);

var _input = require("../components/input.js");

var _input2 = _interopRequireDefault(_input);

var _container = require("../components/container.js");

var _container2 = _interopRequireDefault(_container);

var _horizontal = require("./horizontal.js");

var _horizontal2 = _interopRequireDefault(_horizontal);

var _vertical = require("./vertical.js");

var _vertical2 = _interopRequireDefault(_vertical);

var _config = require("../config.js");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var DateTimePickerLayoutInput = function (_Component) {
    _inherits(DateTimePickerLayoutInput, _Component);

    function DateTimePickerLayoutInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, DateTimePickerLayoutInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
            show: false
        }, _this.onClickInput = function (e) {
            e.preventDefault();

            _this.setState({
                show: !_this.state.show
            });
        }, _this.onHidePopup = function () {
            _this.setState({ show: false });
        }, _this.onClickClose = function () {
            _this.setState({ show: false });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    DateTimePickerLayoutInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
        var show = this.state.show;
        var mode = props.mode;
        var keepOpen = props.keepOpen;
        var dateTime = props.dateTime;
        var selected = props.selected;


        var dayChanged = (0, _moment2.default)(this.props.dateTime).date() !== (0, _moment2.default)(dateTime).date();

        if (show && selected && dayChanged && !keepOpen && mode === _config.MODE_DATE) {
            this.setState({ show: false });
        }
    };

    DateTimePickerLayoutInput.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props;
        var container = _props.container;
        var debug = _props.debug;
        var sideBySide = _props.sideBySide;
        var InputComponent = _props.inputComponent;
        var show = this.state.show;

        var picker = void 0;

        if (sideBySide) {
            picker = _react2.default.createElement(_horizontal2.default, this.props);
        } else {
            picker = _react2.default.createElement(_vertical2.default, _extends({}, this.props, {
                onClickClose: this.onClickClose }));
        }

        var target = function target() {
            return (0, _reactDom.findDOMNode)(_this2.refs.input);
        };

        return _react2.default.createElement(
            "div",
            { style: { position: "relative" } },
            _react2.default.createElement(InputComponent, _extends({}, this.props, {
                show: show,
                ref: "input",
                onClick: this.onClickInput })),
            _react2.default.createElement(
                _reactOverlays.Overlay,
                { placement: "bottom",
                    show: show,
                    rootClose: !debug,
                    transition: _fade2.default,
                    onHide: this.onHidePopup,
                    container: container,
                    unmountOnExit: true,
                    target: target },
                _react2.default.createElement(
                    _container2.default,
                    _extends({}, this.props, {
                        target: target }),
                    picker
                )
            )
        );
    };

    return DateTimePickerLayoutInput;
}(_react.Component);

DateTimePickerLayoutInput.propTypes = {
    bsSize: _react2.default.PropTypes.string,
    container: _reactPropTypes.mountable,
    datePicker: _react2.default.PropTypes.node,
    dateTime: _reactMomentProptypes2.default.momentObj,
    debug: _react2.default.PropTypes.bool,
    icon: _react2.default.PropTypes.bool,
    icons: _react2.default.PropTypes.object,
    sideBySide: _react2.default.PropTypes.bool,
    timePicker: _react2.default.PropTypes.node,
    value: _react2.default.PropTypes.string,

    inputComponent: _react2.default.PropTypes.func
};
DateTimePickerLayoutInput.defaultProps = {
    container: global.document.querySelector("body"),
    inputComponent: _input2.default
};
exports.default = DateTimePickerLayoutInput;
//# sourceMappingURL=input.js.map