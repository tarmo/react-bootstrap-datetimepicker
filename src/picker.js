import React, { Component } from "react"
import { findDOMNode } from "react-dom"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"
import { Overlay } from "react-overlays"
import classNames from "classnames"
import Config from "./config.js"
import { mountable, deprecated } from "react-prop-types"
import DateTimePickerContainer from "./container.js"
import DatePicker from "./date/picker.js"
import TimePicker from "./time/picker.js"

class DateTimeField extends Component {

    static propTypes = {
        bsSize: React.PropTypes.oneOf([
            Config.BOOTSTRAP_SIZE_SM,
            Config.BOOTSTRAP_SIZE_LG
        ]),
        container: mountable,
        dateTime: deprecated(React.PropTypes.string, "Use \"value\" instead"),
        format: React.PropTypes.string,
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
        mode        : Config.MODE_DATETIME,
        placement   : Config.PLACEMENT_BOTTOM,
        viewMode    : Config.VIEW_MODE_DAYS
    }

    state = {
        show  : false,
        value : moment()
    }

    constructor (...args) {
        super(...args)
    }

    componentWillUpdate (props, state) {
        const input = findDOMNode(this.refs.input)
        if (state.show) {
            input.focus()
        }
    }

    getMoment (value) {
        const {
            format,
            locale
        } = this.props

        if (typeof value === "number") {
            return moment(new Date(value))
        } else if (typeof value === "string") {
            return moment(value, format, locale || moment.locale(), true)
        }

        return moment(value)
    }

    getViewportOffset () {

    }

    renderDateTimePicker () {
        return (
            <span>Picker</span>
        )
    }

    onFocusInput () {

    }

    onBlurInput () {

    }

    onClickToggle = () => {
        this.setState({
            show   : !this.state.show,
            offset : this.getViewportOffset()
        })
    }

    onChangeInput = (e) => {
        e.preventDefault()
    }

    render () {
        const {
            bsSize,
            container,
            dateTime,
            icons,
            inputFormat,
            inputProps,
            mode,
            placement,
            size,
            value
        } = this.props

        const {
            show
        } = this.state

        const inputSize = size ? size : bsSize

        const classes = classNames(
            "input-group",
            "date",
            {
                [`input-group-${inputSize}`] : inputSize
            }
        )
        const iconClasses = mode === Config.MODE_TIME ? icons.time : icons.date
        let inputValue

        if (value) {
            inputValue = this.getMoment(value)
        } else if (dateTime) {
            inputValue = moment(dateTime)
        } else {
            inputValue = moment(this.state.value)
        }

        return (
            <div ref="component">
                <div className={ classes } ref="dateTimePicker">
                    <input className="form-control"
                           type="text"
                           ref="input"
                           value={ inputValue.format(inputFormat) }
                           onChange={ this.onChangeInput }
                           { ...inputProps } />
                    <span className="input-group-addon"
                          ref="pickerButton"
                          onBlur={ this.onBlur }
                          onClick={ this.onClickToggle }>
                        <span className={ iconClasses } />
                    </span>
                </div>
                <Overlay placement={ placement }
                         show={ show }
                         container={ container }
                         className="open"
                         target={ () =>  findDOMNode(this.refs.dateTimePicker) }>
                    <DateTimePickerContainer target={ () =>  findDOMNode(this.refs.dateTimePicker) }>
                        { this.renderDateTimePicker() }
                    </DateTimePickerContainer>
                </Overlay>
            </div>
        )
    }

}

export default DateTimeField
