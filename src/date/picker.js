import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"
import classNames from "classnames"
import DatePickerDays from "./days.js"
import {
    VIEW_MODE_DAYS,
    VIEW_MODE_MONTHS,
    VIEW_MODE_YEARS,
    VIEW_MODE_DECADES
} from "../config.js"

class DatePicker extends Component {

    static propTypes = {
        dateTime : MomentPropTypes.momentObj
    }

    state = {
        viewMode : VIEW_MODE_DAYS
    }

    constructor (...args) {
        super(...args)

        const { dateTime } = this.props

        this.state = Object.assign({}, this.state, {
            date : moment(dateTime)
        })
    }

    onClickMonths = (e) => {
        e.preventDefault()
        this.setState({
            viewMode : VIEW_MODE_MONTHS
        })
    }

    renderViewMode () {
        const {
            date,
            viewMode
        } = this.state

        switch (viewMode) {
            case VIEW_MODE_MONTHS :
                return false

            case VIEW_MODE_YEARS :
                return false

            case VIEW_MODE_DECADES :
                return false

            default :
                return (
                    <DatePickerDays onClickMonths={ this.onClickMonths }
                                    onSelectDay={ this.onSelectDay }
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
