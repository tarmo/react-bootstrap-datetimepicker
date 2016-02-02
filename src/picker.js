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
        daysOfWeekDisabled  : React.PropTypes.arrayOf(React.PropTypes.number),
        debug               : React.PropTypes.bool,
        defaultDate         : React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string,
            React.PropTypes.instanceOf(Date),
            MomentPropTypes.momentObj
        ]),
        disabledDates : React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.arrayOf(
                React.PropTypes.oneOfType([
                    React.PropTypes.number,
                    React.PropTypes.string,
                    React.PropTypes.instanceOf(Date),
                    MomentPropTypes.momentObj
                ])
            )
        ]),
        enabledDates : React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.arrayOf(
                React.PropTypes.oneOfType([
                    React.PropTypes.number,
                    React.PropTypes.string,
                    React.PropTypes.instanceOf(Date),
                    MomentPropTypes.momentObj
                ])
            )
        ]),
        focusOnShow : React.PropTypes.bool,
        format      : React.PropTypes.string,
        icon        : React.PropTypes.bool,
        icons       : React.PropTypes.objectOf(React.PropTypes.string),
        inline      : React.PropTypes.bool,
        inputFormat : React.PropTypes.string,
        inputProps  : React.PropTypes.object,
        keepOpen    : React.PropTypes.bool,
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
        placeholder      : React.PropTypes.string,
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
        useStrict        : React.PropTypes.bool,
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
        calendarWeeks         : React.PropTypes.any,
        keepInvalid           : React.PropTypes.any,
        disabledTimeIntervals : React.PropTypes.any,
        enabledHours          : React.PropTypes.any,
        disabledHours         : React.PropTypes.any
        */
    };

    static defaultProps = {
        collapse            : true,
        dayViewHeaderFormat : DEFAULT_DAY_VIEW_HEADER,
        disabledDates       : false,
        enabledDates        : false,
        focusOnShow         : true,
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
    };

    constructor (...args) {
        super(...args)

        const {
            defaultDate,
            icons,
            mode,
            tooltips,
            useCurrent,
            viewMode
        } = this.props

        this.icons = Object.assign({}, defaultIcons, icons)
        this.tooltips = Object.assign({}, tooltips, defaultTooltips)

        let dateTime = moment()

        if (defaultDate) {
            if (mode === MODE_DATE) {
                dateTime = moment(defaultDate).startOf("day")
            } else {
                dateTime = moment(defaultDate)
            }
        } else if (mode === MODE_DATE) {
            dateTime = moment().startOf("day")
        }

        this.state = Object.assign({}, this.state, {
            dateTime,
            selected : defaultDate || useCurrent,
            viewMode : this.state.viewMode || viewMode
        })
    }

    state = {
        view : VIEW_DATE
    };

    componentWillReceiveProps (props) {
        let state = {}
        if (props.value) {
            const dateTime = moment(props.value)
            if (dateTime.isValid()) {
                state = Object.assign({}, state, {
                    selected : true,
                    dateTime
                })
            }
        }
        this.setState(Object.assign({}, this.state, state))
    }

    icons = {};
    tooltips = {};

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

    onChangeInput = (dateTime) => {
        this.setState({
            selected : true,
            dateTime
        })
    };

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

            onChange(clear ? null : moment(dateTime).locale(locale).format(format))
        })
    };

    onClickToday = () => {
        const { dateTime } = this.state
        const date = moment()

        this.onChangeDateTime(moment(dateTime).year(date.year()).month(date.month()).date(date.date()))

    };

    onClickClear = () => {
        this.onChangeDateTime(moment(), true)
    };

    updateViewMode = (viewMode) => {
        this.setState({ viewMode })
    };

    render () {
        const {
            bsSize,
            inline,
            inputFormat,
            mode,
            placeholder,
            size,
            widgetParent
        } = this.props
        const {
            dateTime,
            selected
        } = this.state
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

        const inputValue = selected ? moment(this.state.dateTime).format(displayFormat) : placeholder

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
                                           selected={ selected }
                                           dateTime={ dateTime }
                                           container={ widgetParent }
                                           onChange={ this.onChangeInput }
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
