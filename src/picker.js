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
    DEFAULT_DAY_VIEW_HEADER,
    DEFAULT_FORMAT,
    INPUT_FORMAT_DATE,
    INPUT_FORMAT_DATETIME,
    INPUT_FORMAT_TIME,
    MODE_DATE,
    MODE_DATETIME,
    MODE_TIME,
    PLACEMENT_DEFAULT,
    PLACEMENT_TOP,
    PLACEMENT_BOTTOM,
    VIEW_MODE_DAYS,
    VIEW_MODE_MONTHS,
    VIEW_MODE_YEARS,
    VIEW_MODE_DECADES,
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
        bsSize              : React.PropTypes.oneOf([BOOTSTRAP_SIZE_SM, BOOTSTRAP_SIZE_LG]),
        collapse            : React.PropTypes.bool,
        dateTime            : deprecated(React.PropTypes.string, "Use \"value\" instead"),
        dayViewHeaderFormat : React.PropTypes.string,
        defaultDate         : React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string,
            React.PropTypes.instanceOf(Date),
            MomentPropTypes.momentObj
        ]),
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
        mode             : React.PropTypes.oneOf([MODE_DATE, MODE_TIME, MODE_DATETIME]),
        onChange         : React.PropTypes.func,
        showClear        : React.PropTypes.bool,
        showClose        : React.PropTypes.bool,
        showToday        : React.PropTypes.bool,
        showTodayButton  : React.PropTypes.bool,
        sideBySide       : React.PropTypes.bool,
        size             : deprecated(React.PropTypes.string, "Use \"bsSize\" instead"),
        stepping         : React.PropTypes.number,
        toolbarPlacement : React.PropTypes.oneOf([PLACEMENT_DEFAULT, PLACEMENT_TOP, PLACEMENT_BOTTOM]),
        tooltips         : React.PropTypes.object,
        useCurrent       : React.PropTypes.bool,
        value            : React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string,
            React.PropTypes.instanceOf(Date),
            MomentPropTypes.momentObj
        ]),
        viewMode : React.PropTypes.oneOf([
            VIEW_MODE_DAYS,
            VIEW_MODE_MONTHS,
            VIEW_MODE_YEARS,
            VIEW_MODE_DECADES
        ]),
        widgetParent      : mountable,
        widgetPositioning : React.PropTypes.oneOf([PLACEMENT_TOP, PLACEMENT_BOTTOM])

        // TODO: Properties to implement from original plugin
        // http://eonasdan.github.io/bootstrap-datetimepicker/Options/
        /*
        extraFormats          : React.PropTypes.any,
        disabledDates         : React.PropTypes.any,
        enabledDates          : React.PropTypes.any,
        useStrict             : React.PropTypes.any,
        calendarWeeks         : React.PropTypes.any,
        keepOpen              : React.PropTypes.any,
        keepInvalid           : React.PropTypes.any,
        debug                 : React.PropTypes.any,
        disabledTimeIntervals : React.PropTypes.any,
        focusOnShow           : React.PropTypes.any,
        enabledHours          : React.PropTypes.any,
        disabledHours         : React.PropTypes.any,
        daysOfWeekDisabled    : React.PropTypes.arrayOf(React.PropTypes.number)
        */
    }

    static defaultProps = {
        collapse            : true,
        dayViewHeaderFormat : DEFAULT_DAY_VIEW_HEADER,
        format              : DEFAULT_FORMAT,
        icon                : true,
        icons               : {},
        locale              : moment.locale(),
        mode                : MODE_DATETIME,
        onChange            : () => {},
        placement           : PLACEMENT_BOTTOM,
        showToday           : true,
        stepping            : 1,
        toolbarPlacement    : PLACEMENT_DEFAULT,
        tooltips            : {},
        useCurrent          : true,
        viewMode            : VIEW_MODE_DAYS
    }

    constructor (...args) {
        super(...args)

        const {
            defaultDate,
            icons,
            tooltips,
            useCurrent,
            viewMode
        } = this.props

        this.icons = Object.assign({}, icons, defaultIcons)
        this.tooltips = Object.assign({}, tooltips, defaultTooltips)

        this.state = Object.assign({}, this.state, {
            dateTime : defaultDate ? moment(defaultDate) : moment(),
            selected : defaultDate || useCurrent,
            viewMode : this.state.viewMode || viewMode
        })
    }

    state = {
        show : false,
        view : VIEW_DATE
    }

    icons = {}
    tooltips = {}

    renderDatePicker () {
        const { mode } = this.props

        const {
            dateTime,
            selected,
            view,
            viewMode
        } = this.state

        if (mode === MODE_DATETIME || mode === MODE_DATE) {
            return (
                <DatePicker { ...this.props }
                            icons={ this.icons }
                            tooltips={ this.tooltips }
                            show={ view === VIEW_DATE }
                            onChange={ this.onChangeDateTime }
                            viewMode={ viewMode }
                            selected={ selected }
                            updateViewMode={ this.updateViewMode }
                            dateTime={ dateTime } />
            )
        }
    }

    renderTimePicker () {
        const { mode } = this.props

        const {
            dateTime,
            selected,
            view
        } = this.state

        if (mode === MODE_DATETIME || mode === MODE_TIME) {
            return (
                <TimePicker { ...this.props }
                            icons={ this.icons }
                            tooltips={ this.tooltips }
                            onChange={ this.onChangeDateTime }
                            dateTime={ dateTime }
                            selected={ selected }
                            show={ view === VIEW_TIME } />
            )
        }
    }

    onChangeDateTime = (date, clear = false) => {
        this.setState({
            dateTime : moment(date),
            selected : !clear
        }, () => {
            const {
                format,
                locale,
                onChange
            } = this.props
            const { dateTime } = this.state

            onChange(moment(dateTime).locale(locale).format(format))
        })
    }

    onClickToday = () => {
        const { dateTime } = this.state
        const date = moment()

        this.onChangeDateTime(moment(dateTime).year(date.year()).month(date.month()).date(date.date()))

    }

    onClickClear = () => {
        this.onChangeDateTime(moment().startOf("day"), true)
    }

    updateViewMode = (viewMode) => {
        this.setState({ viewMode })
    }

    render () {
        const {
            bsSize,
            inline,
            inputFormat,
            mode,
            size,
            widgetParent
        } = this.props
        const { selected } = this.state
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

        const inputValue = selected ? moment(this.state.dateTime).format(displayFormat) : null

        let picker

        if (inline) {
            picker = (
                <DateTimePickerLayoutInline { ...this.props }
                                            tooltips={ this.tooltips }
                                            icons={ this.icons }
                                            onClickToday={ this.onClickToday }
                                            onClickClear={ this.onClickClear }
                                            datePicker={ this.renderDatePicker() }
                                            timePicker={ this.renderTimePicker() } />
            )
        } else {
            picker = (
                <DateTimePickerLayoutInput { ...this.props }
                                           tooltips={ this.tooltips }
                                           icons={ this.icons }
                                           bsSize={ bsSize || size }
                                           value={ inputValue }
                                           container={ widgetParent }
                                           onClickToday={ this.onClickToday }
                                           onClickClear={ this.onClickClear }
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
