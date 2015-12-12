"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _config = require("../config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimeToolbar = (function (_Component) {
    _inherits(DateTimeToolbar, _Component);

    function DateTimeToolbar() {
        _classCallCheck(this, DateTimeToolbar);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DateTimeToolbar).apply(this, arguments));
    }

    _createClass(DateTimeToolbar, [{
        key: "renderToday",
        value: function renderToday() {
            var _props = this.props;
            var icons = _props.icons;
            var onClickToday = _props.onClickToday;
            var tooltips = _props.tooltips;

            return _react2.default.createElement(
                "td",
                null,
                _react2.default.createElement(
                    "a",
                    { title: tooltips.today, onClick: onClickToday },
                    _react2.default.createElement("span", { className: icons.today })
                )
            );
        }
    }, {
        key: "renderClear",
        value: function renderClear() {
            var _props2 = this.props;
            var icons = _props2.icons;
            var onClickClear = _props2.onClickClear;
            var tooltips = _props2.tooltips;

            return _react2.default.createElement(
                "td",
                null,
                _react2.default.createElement(
                    "a",
                    { title: tooltips.clear, onClick: onClickClear },
                    _react2.default.createElement("span", { className: icons.clear })
                )
            );
        }
    }, {
        key: "renderClose",
        value: function renderClose() {
            var _props3 = this.props;
            var icons = _props3.icons;
            var onClickClose = _props3.onClickClose;
            var tooltips = _props3.tooltips;

            return _react2.default.createElement(
                "td",
                null,
                _react2.default.createElement(
                    "a",
                    { title: tooltips.close, onClick: onClickClose },
                    _react2.default.createElement("span", { className: icons.close })
                )
            );
        }
    }, {
        key: "renderSwitch",
        value: function renderSwitch() {
            var _classNames;

            var _props4 = this.props;
            var icons = _props4.icons;
            var onClickSwitch = _props4.onClickSwitch;
            var tooltips = _props4.tooltips;
            var view = _props4.view;

            var iconClasses = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, icons.date, view === _config.VIEW_TIME), _defineProperty(_classNames, icons.time, view === _config.VIEW_DATE), _classNames));

            return _react2.default.createElement(
                "td",
                null,
                _react2.default.createElement(
                    "a",
                    { title: tooltips.selectTime, onClick: onClickSwitch },
                    _react2.default.createElement("span", { className: iconClasses })
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _props5 = this.props;
            var inline = _props5.inline;
            var mode = _props5.mode;
            var showTodayButton = _props5.showTodayButton;
            var showClear = _props5.showClear;
            var showClose = _props5.showClose;

            return _react2.default.createElement(
                "table",
                { className: "table-condensed" },
                _react2.default.createElement(
                    "tbody",
                    null,
                    _react2.default.createElement(
                        "tr",
                        null,
                        showTodayButton && this.renderToday(),
                        mode === _config.MODE_DATETIME && this.renderSwitch(),
                        showClear && this.renderClear(),
                        !inline && showClose && this.renderClose()
                    )
                )
            );
        }
    }]);

    return DateTimeToolbar;
})(_react.Component);

DateTimeToolbar.propTypes = {
    icons: _react2.default.PropTypes.object,
    inline: _react2.default.PropTypes.bool,
    mode: _react2.default.PropTypes.string,
    onClickClear: _react2.default.PropTypes.func,
    onClickClose: _react2.default.PropTypes.func,
    onClickSwitch: _react2.default.PropTypes.func,
    onClickToday: _react2.default.PropTypes.func,
    showClear: _react2.default.PropTypes.bool,
    showClose: _react2.default.PropTypes.bool,
    showTodayButton: _react2.default.PropTypes.bool,
    tooltips: _react2.default.PropTypes.object,
    view: _react2.default.PropTypes.oneOf([_config.VIEW_DATE, _config.VIEW_TIME])
};
exports.default = DateTimeToolbar;
//# sourceMappingURL=toolbar.js.map