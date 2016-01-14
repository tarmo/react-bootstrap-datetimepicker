"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _config = require("../config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimePickerContainer = function (_Component) {
    _inherits(DateTimePickerContainer, _Component);

    function DateTimePickerContainer() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, DateTimePickerContainer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DateTimePickerContainer)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
            offset: 0
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DateTimePickerContainer, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.setPositionOffset();
        }
    }, {
        key: "setPositionOffset",
        value: function setPositionOffset() {
            var target = this.props.target;

            var targetWidth = target().getBoundingClientRect().width;
            var width = (0, _reactDom.findDOMNode)(this.refs.container).getBoundingClientRect().width;
            var offset = (targetWidth - width) / 2;
            this.setState({ offset: offset });
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props;
            var children = _props.children;
            var className = _props.className;
            var placement = _props.placement;
            var sideBySide = _props.sideBySide;
            var style = _props.style;
            var offset = this.state.offset;

            var classes = (0, _classnames2.default)("bootstrap-datetimepicker-widget", "dropdown-menu", placement, { "timepicker-sbs": sideBySide }, className);

            var inlineStyle = Object.assign({}, style, {
                position: "absolute",
                display: "block",
                left: style.left - offset
            });

            return _react2.default.createElement(
                "div",
                { ref: "container",
                    className: classes,
                    style: inlineStyle },
                children
            );
        }
    }]);

    return DateTimePickerContainer;
}(_react.Component);

DateTimePickerContainer.propTypes = {
    children: _react2.default.PropTypes.node,
    className: _react2.default.PropTypes.string,
    placement: _react2.default.PropTypes.oneOf([_config.PLACEMENT_TOP, _config.PLACEMENT_BOTTOM]),
    sideBySide: _react2.default.PropTypes.bool,
    style: _react2.default.PropTypes.object,
    target: _react2.default.PropTypes.func
};
exports.default = DateTimePickerContainer;
//# sourceMappingURL=container.js.map