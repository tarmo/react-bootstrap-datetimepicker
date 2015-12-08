import "core-js/fn/object/assign"
import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"
import Config from "./config.js"
import { mountable, deprecated } from "react-prop-types"
import DatePicker from "./date/picker.js"
import TimePicker from "./time/picker.js"
import DateTimePickerLayoutInline from "./layouts/inline.js"
import DateTimePickerLayoutInput from "./layouts/input.js"

class DateTimePicker extends Component {

    static propTypes = {
        bsSize : React.PropTypes.oneOf([
            Config.BOOTSTRAP_SIZE_SM,
            Config.BOOTSTRAP_SIZE_LG
        ]),
        container   : mountable,
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
        mode : React.PropTypes.oneOf([
            Config.MODE_DATE,
            Config.MODE_TIME,
            Config.MODE_DATETIME
        ]),
        onChange  : React.PropTypes.func,
        placement : React.PropTypes.oneOf([
            Config.PLACEMENT_TOP,
            Config.PLACEMENT_BOTTOM
        ]),
        showClear       : React.PropTypes.bool,
        showClose       : React.PropTypes.bool,
        showToday       : React.PropTypes.bool,
        showTodayButton : React.PropTypes.bool,
        sideBySide      : React.PropTypes.bool,
        size            : deprecated(React.PropTypes.string, "Use \"bsSize\" instead"),
        tooltips        : React.PropTypes.object,
        value           : React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string,
            React.PropTypes.instanceOf(Date),
            MomentPropTypes.momentObj
        ]),
        viewMode : React.PropTypes.oneOf([
            Config.VIEW_MODE_DAYS,
            Config.VIEW_MODE_MONTHS,
            Config.VIEW_MODE_YEARS
        ]),

        // TODO: Properties to implement
        direction          : React.PropTypes.string,
        daysOfWeekDisabled : React.PropTypes.arrayOf(React.PropTypes.number)
    }

    static defaultProps = {
        container : global.document.querySelector("body"),
        format    : Config.DEFAULT_FORMAT,
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
        locale      : moment.locale(),
        mode        : Config.MODE_DATETIME,
        onChange    : (v) => console.log(v),
        placement   : Config.PLACEMENT_BOTTOM,
        tooltips    : {
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
        },
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
            format,
            locale
        } = this.props

        moment.locale(locale)

        const actualFormat = ["LT", "LTS"].map((f) => moment.localeData().longDateFormat(f)).join(" ")
        const use24Hours = (
            actualFormat.toLowerCase().indexOf("a") < 1 && actualFormat.replace(/\[.*?\]/g, "").indexOf("h") < 1
        )

        this.state = Object.assign({}, this.state, { use24Hours })
    }

    renderDatePicker () {
        const {
            icons,
            locale,
            mode,
            viewMode
        } = this.props

        const {
            dateTime,
            view
        } = this.state

        if (mode === Config.MODE_DATETIME || mode === Config.MODE_DATE) {
            return (
                <DatePicker icons={ icons }
                            show={ view === Config.VIEW_DATE }
                            locale={ locale }
                            // mopduify
                            dateTime={ dateTime }
                            viewMode={ viewMode } />
            )
        }
    }

    renderTimePicker () {
        const {
            icons,
            locale,
            mode,
            tooltips
        } = this.props

        const {
            dateTime,
            use24Hours,
            view
        } = this.state

        if (mode === Config.MODE_DATETIME || mode === Config.MODE_TIME) {
            return (
                <TimePicker icons={ icons }
                            tooltips={ tooltips }
                            locale={ locale }
                            addSubtractDateTime={ this.addSubtractDateTime }
                            modifyDateTime={ this.modifyDateTime }
                            dateTime={ dateTime }
                            use24Hours={ use24Hours }
                            show={ view === Config.VIEW_TIME } />
            )
        }
    }

    addSubtractDateTime = (value, unit, subtract = false) => {
        const { dateTime } = this.state
        const date = dateTime.clone()

        if (subtract) {
            date.subtract(value, unit)
        } else {
            date.add(value, unit)
        }

        return date
    }

    modifyDateTime = (value, unit) => {
        const { dateTime } = this.state
        const date = dateTime.clone()

        date.set(unit, value)

        console.warn(value, unit, date.toISOString())
        this.onChangeDateTime(date)
    }

    onChangeDateTime = (date) => {
        this.setState({
            dateTime : date.clone()
        }, () => {
            const {
                format,
                onChange
            } = this.props

            const {
                dateTime
            } = this.state

            onChange(dateTime.format(format))
        })
    }

    render () {
        const {
            bsSize,
            icon,
            icons,
            inline,
            inputFormat,
            mode,
            sideBySide,
            size
        } = this.props
        let displayFormat = inputFormat

        if (!inputFormat) {
            switch (mode) {
                case Config.MODE_DATE :
                    displayFormat = Config.INPUT_FORMAT_DATE
                    break

                case Config.MODE_TIME :
                    displayFormat = Config.INPUT_FORMAT_TIME
                    break

                default :
                    displayFormat = Config.INPUT_FORMAT_DATETIME
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
