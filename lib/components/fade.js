"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactOverlays = require("react-overlays");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var TRANSITION_TIMEOUT = 200;

var Fade = function (_Component) {
    _inherits(Fade, _Component);

    function Fade() {
        _classCallCheck(this, Fade);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Fade.prototype.render = function render() {
        var children = this.props.children;


        return _react2.default.createElement(
            _reactOverlays.Transition,
            _extends({}, this.props, {
                timeout: TRANSITION_TIMEOUT,
                className: "fade",
                enteringClassName: "in",
                enteredClassName: "in" }),
            children
        );
    };

    return Fade;
}(_react.Component);

Fade.propTypes = {
    children: _react2.default.PropTypes.element
};
exports.default = Fade;
//# sourceMappingURL=fade.js.map