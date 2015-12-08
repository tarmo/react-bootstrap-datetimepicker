import React, { Component } from "react"
import classNames from "classnames"
import DatePickerDays from "./days.js"

class DatePicker extends Component {

    render () {
        return (
            <div className="datepicker">
                <DatePickerDays />
            </div>
        )
    }

}

export default DatePicker
