import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"
import classNames from "classnames"
import DatePickerDays from "./days.js"
import DatePickerMonths from "./months.js"
import DatePickerYears from "./years.js"
import {
    VIEW_MODE_DAYS,
    VIEW_MODE_MONTHS,
    VIEW_MODE_YEARS,
    VIEW_MODE_DECADES
} from "../config.js"

class DatePicker extends Component {

    static propTypes = {
        dateTime : MomentPropTypes.momentObj,
        onChange : React.PropTypes.func
    }

    state = {
        viewMode : VIEW_MODE_DAYS
    }

    constructor (...args) {
        super(...args)

        this.state = Object.assign({}, this.state, { date : this.getDate(this.props) })
    }

    componentWillReceiveProps (props) {
        this.setState({ date : this.getDate(props) })
    }

    getDate (props) {
        const { dateTime } = props
        return moment(dateTime).startOf("day")
    }

    onClickMonths = (e) => {
        e.preventDefault()
        this.setState({
            viewMode : VIEW_MODE_MONTHS
        })
    }

    onClickYears = (e) => {
        e.preventDefault()
        this.setState({
            viewMode : VIEW_MODE_YEARS
        })
    }

    onClickDecades = (e) => {
        e.preventDefault()
        this.setState({
            viewMode : VIEW_MODE_DECADES
        })
    }

    onSelectDate = (date) => {
        const {
            dateTime,
            onChange
        } = this.props
        const { viewMode } = this.state

        onChange(moment(dateTime).year(date.year()).month(date.month()).date(date.date()))

        switch (viewMode) {
            case VIEW_MODE_DECADES :
                return this.setState({ viewMode : VIEW_MODE_YEARS })

            case VIEW_MODE_YEARS :
                return this.setState({ viewMode : VIEW_MODE_MONTHS })

            default :
                return this.setState({ viewMode : VIEW_MODE_DAYS })
        }
    }

    renderViewMode () {
        const {
            date,
            viewMode
        } = this.state

        switch (viewMode) {
            case VIEW_MODE_MONTHS :
                return (
                    <DatePickerMonths onClickYears={ this.onClickYears }
                                      onSelect={ this.onSelectDate }
                                      date={ date }
                                      { ...this.props } />
                )

            case VIEW_MODE_YEARS :
                return (
                    <DatePickerYears onClickDecades={ this.onClickDecades }
                                     onSelect={ this.onSelectDate }
                                     date={ date }
                                     { ...this.props } />
                )

            case VIEW_MODE_DECADES :
                return false

            default :
                return (
                    <DatePickerDays onClickMonths={ this.onClickMonths }
                                    onSelect={ this.onSelectDate }
                                    date={ date }
                                    { ...this.props } />
                )
        }
    }

    render () {
        return (
            <div className="datepicker">
                { this.renderViewMode() }
            </div>
        )
    }

}

export default DatePicker
