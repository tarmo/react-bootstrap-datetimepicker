import React, { Component } from "react"
import moment from "moment"
import "moment-range"

class DatePickerDays extends Component {

    static propTypes = {
        dateTime       : React.PropTypes.object,
        locale         : React.PropTypes.string,
        modifyDateTime : React.PropTypes.func
    }

    constructor (...args) {
        super(...args)

        const {
            dateTime,
            locale
        } = this.props

        moment.locale(locale)

        this.state = {
            date : moment(dateTime)
        }
    }

    getCalendarDays () {
        const { date } = this.state
        const startDate = moment([date.get("year"), date.get("month")])
        const firstDay = moment(startDate).startOf("month")
        const lastDay = moment(startDate).endOf("month")
        const monthRange = moment.range(firstDay, lastDay)
        const weeks = []
        const calendarDays = []

        monthRange.by("days", (d) => {
            const week = d.week()
            if (weeks.indexOf(week) === -1) {
                return weeks.push(week)
            }
        })

        weeks.forEach((w, i) => {
            let firstWeekDay
            let lastWeekDay

            if (i > 0 && w < weeks[i - 1]) {
                // Next year
                firstWeekDay = moment(startDate).add(1, "year").week(w).day(1)
                lastWeekDay = moment(startDate).add(1, "year").week(w).day(7)
            } else {
                firstWeekDay = moment(startDate).week(w).day(1)
                lastWeekDay = moment(startDate).week(w).day(7)
            }
            calendarDays.push(moment.range(firstWeekDay, lastWeekDay))
        })

        return calendarDays
    }

    onClickSetMinutes (value) {
        return () => {
            const {
                modifyDateTime,
                onSelectMinutes
                } = this.props
            onSelectMinutes()
            modifyDateTime(parseInt(value, 10), "minutes")
        }
    }

    render () {
        console.warn(this.getCalendarDays())

        return (
            <div className="datepicker-days">
                <table className="table-condensed">
                    <tbody>

                    </tbody>
                </table>
            </div>
        )
    }

}

export default DatePickerDays
