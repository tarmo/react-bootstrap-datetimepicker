import React, { Component } from "react"
import { findDOMNode } from "react-dom"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"
import classNames from "classnames"
import Config from "./config.js"
import { mountable, deprecated } from "react-prop-types"
import DatePicker from "./date/picker.js"
import TimePicker from "./time/picker.js"
import DateTimePickerLayoutInline from "./layouts/inline.js"
import DateTimePickerLayoutInput from "./layouts/input.js"

class DateTimePicker extends Component {

    static propTypes = {
        bsSize: React.PropTypes.oneOf([
            Config.BOOTSTRAP_SIZE_SM,
            Config.BOOTSTRAP_SIZE_LG
        ]),
        container: mountable,
        dateTime: deprecated(React.PropTypes.string, "Use \"value\" instead"),
        format: React.PropTypes.string,
        icon : React.PropTypes.bool,
        icons: React.PropTypes.objectOf(React.PropTypes.string),
        inline: React.PropTypes.bool,
        inputFormat: React.PropTypes.string,
        inputProps: React.PropTypes.object,
        locale: React.PropTypes.string,
        maxDate: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string,
            React.PropTypes.instanceOf(Date),
            MomentPropTypes.momentObj
        ]),
        minDate: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string,
            React.PropTypes.instanceOf(Date),
            MomentPropTypes.momentObj
        ]),
        mode: React.PropTypes.oneOf([
            Config.MODE_DATE,
            Config.MODE_TIME,
            Config.MODE_DATETIME
        ]),
        onChange: React.PropTypes.func,
        placement: React.PropTypes.oneOf([
            Config.PLACEMENT_TOP,
            Config.PLACEMENT_BOTTOM
        ]),
        showClear: React.PropTypes.bool,
        showClose: React.PropTypes.bool,
        showToday: React.PropTypes.bool,
        showTodayButton: React.PropTypes.bool,
        sideBySide: React.PropTypes.bool,
        size: deprecated(React.PropTypes.string, "Use \"bsSize\" instead"),
        value: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string,
            React.PropTypes.instanceOf(Date),
            MomentPropTypes.momentObj
        ]),
        viewMode: React.PropTypes.oneOf([
            Config.VIEW_MODE_DAYS,
            Config.VIEW_MODE_MONTHS,
            Config.VIEW_MODE_YEARS
        ]),

        // TODO: Properties to implement
        direction: React.PropTypes.string,
        daysOfWeekDisabled: React.PropTypes.arrayOf(React.PropTypes.number)
    }

    static defaultProps = {
        container : global.document.querySelector("body"),
        format    : "x",
        icon : true,
        icons     : {
            time     : "glyphicon glyphicon-time",
            date     : "glyphicon glyphicon-calendar",
            up       : "glyphicon glyphicon-chevron-up",
            down     : "glyphicon glyphicon-chevron-down",
            previous : "glyphicon glyphicon-chevron-left",
            next     : "glyphicon glyphicon-chevron-right",
            today    : "glyphicon glyphicon-screenshot",
            clear    : "glyphicon glyphicon-trash",
            close    : "glyphicon glyphicon-remove"
        },
        inputFormat : Config.INPUT_FORMAT_DATETIME,
        locale      : moment.locale(),
        mode        : Config.MODE_DATETIME,
        placement   : Config.PLACEMENT_BOTTOM,
        viewMode    : Config.VIEW_MODE_DAYS
    }

    state = {
        show     : false,
        dateTime : moment(),
        view     : Config.VIEW_DATE
    }

    constructor (...args) {
        super(...args)

        const {
            locale
        } = this.props

        moment.locale(locale)
    }

    renderDatePicker () {
        const {
            icons,
            mode,
            viewMode
        } = this.props

        const {
            view
        } = this.state

        if (mode === Config.MODE_DATETIME || mode === Config.MODE_DATE) {
            return (
                <DatePicker icons={ icons }
                            show={ view === Config.VIEW_DATE }
                            viewMode={ viewMode } />
            )
        }
    }

    renderTimePicker () {
        const {
            icons,
            mode,
        } = this.props

        const {
            view
        } = this.state

        if (mode === Config.MODE_DATETIME || mode === Config.MODE_TIME) {
            return (
                <TimePicker icons={ icons }
                            show={ view === Config.VIEW_TIME } />
            )
        }
    }

    render () {
        const {
            bsSize,
            icon,
            icons,
            inline,
            inputFormat,
            sideBySide,
            size
        } = this.props

        const inputValue = moment(this.state.dateTime).format(inputFormat)

        let picker

        if (inline) {
            picker = (
                <DateTimePickerLayoutInline sideBySide={ sideBySide }
                                            datePicker={ this.renderDatePicker() }
                                            timePicker={ this.renderTimePicker() } />
            )
        } else {
            picker = (
                <DateTimePickerLayoutInput sideBySide={ sideBySide }
                                           icon={ icon }
                                           icons={ icons }
                                           bsSize={ bsSize || size }
                                           value={ inputValue }
                                           datePicker={ this.renderDatePicker() }
                                           timePicker={ this.renderTimePicker() } />
            )
        }

        return (
            <div ref="component">
                { picker }
            </div>
        )
    }

}

export default DateTimePicker
