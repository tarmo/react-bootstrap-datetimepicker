import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"
import classNames from "classnames"
import DatePickerDays from "./days.js"
import DatePickerMonths from "./months.js"
import DatePickerYears from "./years.js"
import DatePickerDecades from "./decades.js"
import {
    VIEW_MODE_DAYS,
    VIEW_MODE_MONTHS,
    VIEW_MODE_YEARS,
    VIEW_MODE_DECADES
} from "../config.js"

class DatePicker extends Component {

    static propTypes = {
        dateTime       : MomentPropTypes.momentObj,
        onChange       : React.PropTypes.func,
        sideBySide     : React.PropTypes.bool,
        updateViewMode : React.PropTypes.func,
        viewMode       : React.PropTypes.string
    }

    constructor (...args) {
        super(...args)

        const date = this.getDate(this.props)
        this.state = Object.assign({}, this.state, { date, decade : this.getDecade(date.year()) })
    }

    componentWillReceiveProps (props) {
        this.setState({ date : this.getDate(props) })
    }

    getDate (props) {
        const { dateTime } = props
        return moment(dateTime).startOf("day")
    }

    getDecade (year) {
        return Math.floor(year / 10) * 10
    }

    onClickMonths = (e) => {
        e.preventDefault()

        const { updateViewMode } = this.props
        updateViewMode(VIEW_MODE_MONTHS)
    }

    onClickYears = (e) => {
        e.preventDefault()

        const { updateViewMode } = this.props
        updateViewMode(VIEW_MODE_YEARS)
    }

    onClickDecades = (e) => {
        e.preventDefault()

        const { updateViewMode } = this.props
        updateViewMode(VIEW_MODE_DECADES)
    }

    onSelectDate = (date) => {
        const {
            dateTime,
            onChange,
            updateViewMode,
            viewMode
        } = this.props
        const decade = this.getDecade(date.year())

        onChange(moment(dateTime).year(date.year()).month(date.month()).date(date.date()))

        switch (viewMode) {
            case VIEW_MODE_YEARS :
                return this.setState({ decade }, () => updateViewMode(VIEW_MODE_MONTHS))

            default :
                return this.setState({ decade }, () => updateViewMode(VIEW_MODE_DAYS))
        }
    }

    onSelectDecade = (date) => {
        const { updateViewMode } = this.props
        const decade = this.getDecade(date.year())

        return this.setState({ decade }, () => updateViewMode(VIEW_MODE_YEARS))
    }

    updateDecade = (year) => {
        this.setState({ decade : this.getDecade(year) })
    }

    renderViewMode () {
        const { viewMode } = this.props
        const {
            date,
            decade
        } = this.state

        switch (viewMode) {
            case VIEW_MODE_MONTHS :
                return (
                    <DatePickerMonths { ...this.props }
                                      onClickYears={ this.onClickYears }
                                      onSelect={ this.onSelectDate }
                                      date={ date } />
                )

            case VIEW_MODE_YEARS :
                return (
                    <DatePickerYears { ...this.props }
                                     onClickDecades={ this.onClickDecades }
                                     onSelect={ this.onSelectDate }
                                     updateDecade={ this.updateDecade }
                                     decade={ decade } />
                )

            case VIEW_MODE_DECADES :
                return (
                    <DatePickerDecades { ...this.props }
                                       onSelect={ this.onSelectDecade }
                                       updateDecade={ this.updateDecade }
                                       decade={ decade } />
                )

            default :
                return (
                    <DatePickerDays { ...this.props }
                                    onClickMonths={ this.onClickMonths }
                                    onSelect={ this.onSelectDate }
                                    date={ date } />
                )
        }
    }

    render () {
        const { sideBySide } = this.props
        const classes = classNames("datepicker", { "col-md-6" : sideBySide })
        return (
            <div className={ classes }>
                { this.renderViewMode() }
            </div>
        )
    }

}

export default DatePicker
