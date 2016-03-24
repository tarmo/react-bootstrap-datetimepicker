"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactOverlays = require("react-overlays");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TRANSITION_DURATION = 200;
var TRANSITION_FRAME_DELAY = 5;
var TRANSITION_HALF = 0.5;

var DateTimePickerViewSlide = function (_Component) {
    _inherits(DateTimePickerViewSlide, _Component);

    function DateTimePickerViewSlide() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, DateTimePickerViewSlide);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DateTimePickerViewSlide)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.transition = function (slide, step) {
            var start = new Date();
            slide.style.overflow = "hidden";
            var timer = setInterval(function () {
                var timePassed = new Date() - start;
                var progress = Math.min(1, timePassed / TRANSITION_DURATION);

                var delta = _this.easeDelta(progress);

                step(delta);

                if (progress === 1) {
                    clearInterval(timer);
                    slide.style.removeProperty("height");
                    slide.style.removeProperty("overflow");
                }
            }, TRANSITION_FRAME_DELAY);
        }, _this.onEntering = function () {
            var slide = (0, _reactDom.findDOMNode)(_this.refs.slide);
            var parent = slide.parentNode;
            var clone = slide.cloneNode(true);
            clone.style.display = "block";
            parent.appendChild(clone);
            var height = clone.getBoundingClientRect().height;
            parent.removeChild(clone);
            _this.slideToggle(slide, 0, height);
        }, _this.onExiting = function () {
            var slide = (0, _reactDom.findDOMNode)(_this.refs.slide);
            var height = slide.getBoundingClientRect().height;
            _this.slideToggle(slide, height, 0);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DateTimePickerViewSlide, [{
        key: "easeDelta",
        value: function easeDelta(progress) {
            return progress < TRANSITION_HALF ? 2 * progress / 2 : (2 - 2 * (1 - progress)) / 2;
        }
    }, {
        key: "slideToggle",
        value: function slideToggle(slide, from, to) {
            slide.style.height = from + "px";

            this.transition(slide, function (delta) {
                var height = void 0;
                if (from > to) {
                    height = from - from * delta;
                } else {
                    height = to * delta;
                }
                slide.style.height = height + "px";
            });
        }
    }, {
        key: "renderWithCollapse",
        value: function renderWithCollapse() {
            var children = this.props.children;


            return _react2.default.createElement(
                _reactOverlays.Transition,
                { ref: "slide",
                    "in": this.props.in,
                    timeout: TRANSITION_DURATION,
                    onEntering: this.onEntering,
                    onExiting: this.onExiting,
                    enteredClassName: "collapse in",
                    exitedClassName: "collapse" },
                children
            );
        }
    }, {
        key: "renderWithoutCollapse",
        value: function renderWithoutCollapse() {
            var children = this.props.children;

            var child = _react2.default.Children.only(children);
            var styles = { display: "none" };

            return (0, _react.cloneElement)(child, Object.assign({}, child.props, {
                style: Object.assign({}, child.props.style, !this.props.in ? styles : {})
            }));
        }
    }, {
        key: "render",
        value: function render() {
            var collapse = this.props.collapse;

            return collapse ? this.renderWithCollapse() : this.renderWithoutCollapse();
        }
    }]);

    return DateTimePickerViewSlide;
}(_react.Component);

DateTimePickerViewSlide.propTypes = {
    children: _react2.default.PropTypes.element.isRequired,
    collapse: _react2.default.PropTypes.bool,
    in: _react2.default.PropTypes.bool
};
exports.default = DateTimePickerViewSlide;
//# sourceMappingURL=slide.js.map