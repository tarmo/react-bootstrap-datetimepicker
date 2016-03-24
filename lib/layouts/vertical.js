"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _toolbar = require("../components/toolbar.js");

var _toolbar2 = _interopRequireDefault(_toolbar);

var _slide = require("../components/slide.js");

var _slide2 = _interopRequireDefault(_slide);

var _config = require("../config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimePickerLayoutVertical = function (_Component) {
    _inherits(DateTimePickerLayoutVertical, _Component);

    function DateTimePickerLayoutVertical() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, DateTimePickerLayoutVertical);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DateTimePickerLayoutVertical)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
            view: _config.VIEW_DATE
        }, _this.onClickSwitch = function (e) {
            e.preventDefault();

            var view = _this.state.view;


            _this.setState({
                view: view === _config.VIEW_DATE ? _config.VIEW_TIME : _config.VIEW_DATE
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DateTimePickerLayoutVertical, [{
        key: "renderDateTimeToolbar",
        value: function renderDateTimeToolbar() {
            var view = this.state.view;


            return _react2.default.createElement(
                "li",
                { className: "picker-switch" },
                _react2.default.createElement(_toolbar2.default, _extends({}, this.props, {
                    onClickSwitch: this.onClickSwitch,
                    view: view }))
            );
        }
    }, {
        key: "renderPicker",
        value: function renderPicker(viewType) {
            var _props = this.props;
            var datePicker = _props.datePicker;
            var timePicker = _props.timePicker;
            var view = this.state.view;

            var picker = viewType === _config.VIEW_TIME ? timePicker : datePicker;

            return _react2.default.createElement(
                _slide2.default,
                _extends({}, this.props, {
                    "in": viewType === view }),
                _react2.default.createElement(
                    "li",
                    null,
                    picker
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var toolbarPlacement = this.props.toolbarPlacement;


            return _react2.default.createElement(
                "ul",
                { className: "list-unstyled" },
                toolbarPlacement === _config.PLACEMENT_TOP && this.renderDateTimeToolbar(),
                this.renderPicker(_config.VIEW_DATE),
                toolbarPlacement === _config.PLACEMENT_DEFAULT && this.renderDateTimeToolbar(),
                this.renderPicker(_config.VIEW_TIME),
                toolbarPlacement === _config.PLACEMENT_BOTTOM && this.renderDateTimeToolbar()
            );
        }
    }]);

    return DateTimePickerLayoutVertical;
}(_react.Component);

DateTimePickerLayoutVertical.propTypes = {
    datePicker: _react2.default.PropTypes.node,
    icons: _react2.default.PropTypes.object,
    timePicker: _react2.default.PropTypes.node,
    toolbarPlacement: _react2.default.PropTypes.string
};
exports.default = DateTimePickerLayoutVertical;
//# sourceMappingURL=vertical.js.map