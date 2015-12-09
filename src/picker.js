import "core-js/fn/object/assign"
import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"
import { mountable, deprecated } from "react-prop-types"
import DatePicker from "./date/picker.js"
import TimePicker from "./time/picker.js"
import DateTimePickerLayoutInline from "./layouts/inline.js"
import DateTimePickerLayoutInput from "./layouts/input.js"
import {
    BOOTSTRAP_SIZE_SM,
    BOOTSTRAP_SIZE_LG,
    DEFAULT_FORMAT,
    INPUT_FORMAT_DATE,
    INPUT_FORMAT_DATETIME,
    INPUT_FORMAT_TIME,
    MODE_DATE,
    MODE_DATETIME,
    MODE_TIME,
    PLACEMENT_TOP,
    PLACEMENT_BOTTOM,
    VIEW_MODE_DAYS,
    VIEW_MODE_MONTHS,
    VIEW_MODE_YEARS,
    VIEW_DATE,
    VIEW_TIME
} from "./config.js"

const defaultIcons = {
    time     : "glyphicon glyphicon-time",
    date     : "glyphicon glyphicon-calendar",
    up       : "glyphicon glyphicon-chevron-up",
    down     : "glyphicon glyphicon-chevron-down",
    previous : "glyphicon glyphicon-chevron-left",
    next     : "glyphicon glyphicon-chevron-right",
    today    : "glyphicon glyphicon-screenshot",
    clear    : "glyphicon glyphicon-trash",
    close    : "glyphicon glyphicon-remove"
}

const defaultTooltips = {
    today           : "Go to today",
    clear           : "Clear selection",
    close           : "Close the picker",
    selectMonth     : "Select Month",
    prevMonth       : "Previous Month",
    nextMonth       : "Next Month",
    selectYear      : "Select Year",
    prevYear        : "Previous Year",
    nextYear        : "Next Year",
    selectDecade    : "Select Decade",
    prevDecade      : "Previous Decade",
    nextDecade      : "Next Decade",
    prevCentury     : "Previous Century",
    nextCentury     : "Next Century",
    pickHour        : "Pick Hour",
    incrementHour   : "Increment Hour",
    decrementHour   : "Decrement Hour",
    pickMinute      : "Pick Minute",
    incrementMinute : "Increment Minute",
    decrementMinute : "Decrement Minute",
    pickSecond      : "Pick Second",
    incrementSecond : "Increment Second",
    decrementSecond : "Decrement Second",
    togglePeriod    : "Toggle Period",
    selectTime      : "Select Time"
}

class DateTimePicker extends Component {

    static propTypes = {
        bsSize : React.PropTypes.oneOf([BOOTSTRAP_SIZE_SM, BOOTSTRAP_SIZE_LG]),
        dateTime    : deprecated(React.PropTypes.string, "Use \"value\" instead"),
        format      : React.PropTypes.string,
        icon        : React.PropTypes.bool,
        icons       : React.PropTypes.objectOf(React.PropTypes.string),
        inline      : React.PropTypes.bool,
        inputFormat : React.PropTypes.string,
        inputProps  : React.PropTypes.object,
        locale      : React.PropTypes.string,
        maxDate     : React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string,
            React.PropTypes.instanceOf(Date),
            MomentPropTypes.momentObj
        ]),
        minDate : React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string,
            React.PropTypes.instanceOf(Date),
            MomentPropTypes.momentObj
        ]),
        mode              : React.PropTypes.oneOf([MODE_DATE, MODE_TIME, MODE_DATETIME]),
        onChange          : React.PropTypes.func,
        showToday         : React.PropTypes.bool,
        sideBySide        : React.PropTypes.bool,
        size              : deprecated(React.PropTypes.string, "Use \"bsSize\" instead"),
        tooltips          : React.PropTypes.object,
        value             : React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string,
            React.PropTypes.instanceOf(Date),
            MomentPropTypes.momentObj
        ]),
        viewMode : React.PropTypes.oneOf([VIEW_MODE_DAYS, VIEW_MODE_MONTHS, VIEW_MODE_YEARS]),
        widgetParent      : mountable,
        widgetPositioning : React.PropTypes.oneOf([PLACEMENT_TOP, PLACEMENT_BOTTOM]),

        // TODO: Properties to implement
        dayViewHeaderFormat          : React.PropTypes.any,
        extraFormats          : React.PropTypes.any,
        stepping :React.PropTypes.any,
        useCurrent: React.PropTypes.any,
        collapse : React.PropTypes.any,
        defaultDate : React.PropTypes.any,
        disabledDates: React.PropTypes.any,
        enabledDates: React.PropTypes.any,
        useStrict : React.PropTypes.any,
        calendarWeeks: React.PropTypes.any,
        toolbarPlacement: React.PropTypes.any,
        showClear       : React.PropTypes.any,
        showClose       : React.PropTypes.any,
        showTodayButton : React.PropTypes.any,
        direction          : React.PropTypes.any,
        keepOpen: React.PropTypes.any,
        keepInvalid : React.PropTypes.any,
        debug: React.PropTypes.any,
        disabledTimeIntervals: React.PropTypes.any,
        focusOnShow: React.PropTypes.any,
        enabledHours: React.PropTypes.any,
        disabledHours: React.PropTypes.any,
        daysOfWeekDisabled : React.PropTypes.arrayOf(React.PropTypes.number)
    }

    static defaultProps = {
        format    : DEFAULT_FORMAT,
        icon : true,
        icons     : {},
        locale      : moment.locale(),
        mode        : MODE_DATETIME,
        onChange    : (v) => console.log(v),
        placement   : PLACEMENT_BOTTOM,
        tooltips    : {},
        viewMode    : VIEW_MODE_DAYS
    }

    state = {
        show     : false,
        dateTime : moment(),
        view     : VIEW_DATE
    }

    icons = {}
    tooltips = {}

    constructor (...args) {
        super(...args)

        const {
            icons,
            tooltips
        } = this.props

        this.icons = Object.assign({}, icons, defaultIcons)
        this.tooltips = Object.assign({}, tooltips, defaultTooltips)
    }

    renderDatePicker () {
        const {
            locale,
            mode,
            viewMode
        } = this.props

        const {
            dateTime,
            view
        } = this.state

        if (mode === MODE_DATETIME || mode === MODE_DATE) {
            return (
                <DatePicker icons={ this.icons }
                            tooltips={ this.tooltips }
                            show={ view === VIEW_DATE }
                            locale={ locale }
                            onChange={ this.onChangeDateTime }
                            dateTime={ dateTime }
                            viewMode={ viewMode } />
            )
        }
    }

    renderTimePicker () {
        const {
            locale,
            mode
        } = this.props

        const {
            dateTime,
            view
        } = this.state

        if (mode === MODE_DATETIME || mode === MODE_TIME) {
            return (
                <TimePicker icons={ this.icons }
                            tooltips={ this.tooltips }
                            locale={ locale }
                            onChange={ this.onChangeDateTime }
                            dateTime={ dateTime }
                            show={ view === VIEW_TIME } />
            )
        }
    }

    onChangeDateTime = (date) => {
        this.setState({
            dateTime : moment(date)
        }, () => {
            const {
                format,
                locale,
                onChange
            } = this.props

            const {
                dateTime
            } = this.state

            onChange(moment(dateTime).locale(locale).format(format))
        })
    }

    render () {
        const {
            bsSize,
            icon,
            inline,
            inputFormat,
            mode,
            sideBySide,
            size,
            widgetParent
        } = this.props
        let displayFormat = inputFormat

        if (!inputFormat) {
            switch (mode) {
                case MODE_DATE :
                    displayFormat = INPUT_FORMAT_DATE
                    break

                case MODE_TIME :
                    displayFormat = INPUT_FORMAT_TIME
                    break

                default :
                    displayFormat = INPUT_FORMAT_DATETIME
            }
        }

        const inputValue = moment(this.state.dateTime).format(displayFormat)

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
                                           icons={ this.icons }
                                           bsSize={ bsSize || size }
                                           value={ inputValue }
                                           container={ widgetParent }
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
