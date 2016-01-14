"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactOverlays = require("react-overlays");

var _reactPropTypes = require("react-prop-types");

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimePickerLayoutInput = function (_Component) {
    _inherits(DateTimePickerLayoutInput, _Component);

    function DateTimePickerLayoutInput() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, DateTimePickerLayoutInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DateTimePickerLayoutInput)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
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

    _createClass(DateTimePickerLayoutInput, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var container = _props.container;
            var sideBySide = _props.sideBySide;
            var show = this.state.show;

            var picker = undefined;

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
                _react2.default.createElement(_input2.default, _extends({}, this.props, {
                    ref: "input",
                    onClick: this.onClickInput })),
                _react2.default.createElement(
                    _reactOverlays.Overlay,
                    { placement: "bottom",
                        show: show,
                        rootClose: true,
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
        }
    }]);

    return DateTimePickerLayoutInput;
}(_react.Component);

DateTimePickerLayoutInput.propTypes = {
    bsSize: _react2.default.PropTypes.string,
    container: _reactPropTypes.mountable,
    datePicker: _react2.default.PropTypes.node,
    icon: _react2.default.PropTypes.bool,
    icons: _react2.default.PropTypes.object,
    sideBySide: _react2.default.PropTypes.bool,
    timePicker: _react2.default.PropTypes.node,
    value: _react2.default.PropTypes.string
};
DateTimePickerLayoutInput.defaultProps = {
    container: global.document.querySelector("body")
};
exports.default = DateTimePickerLayoutInput;
//# sourceMappingURL=input.js.map