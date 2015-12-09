import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"
import "moment-range"
import classNames from "classnames"

class DatePickerDays extends Component {

    static propTypes = {
        date     : MomentPropTypes.momentObj,
        locale   : React.PropTypes.string,
        icons    : React.PropTypes.object,
        onChange : React.PropTypes.func,
        tooltips : React.PropTypes.object
    }

    getCalendarDays () {
        const { date } = this.props
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
                // Next year case
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

    onClickSetDay (value) {
        return () => {
            const {
                modifyDateTime,
                onSelectMinutes
                } = this.props
            onSelectMinutes()
            modifyDateTime(parseInt(value, 10), "minutes")
        }
    }

    renderDays () {
        const { date } = this.props
        const weeks = this.getCalendarDays()

        return (
            <tbody>
                { weeks.map((week, i) => {
                    const days = []
                    week.by("days", (d) => {
                        console.warn(d.toISOString(), date.toISOString())
                        const classes = classNames(
                            "day",
                            {
                                active  : d.diff(date, "days") === 0,
                                today   : d.diff(moment(), "days") === 0,
                                old     : d.month() < date.month(),
                                weekend : false,
                                "new"   : d.month() > date.month()
                            }
                        )

                        days.push(
                            <td key={ d.format("x") } className={ classes }>{ d.format("DD") }</td>
                        )
                    })
                    return (<tr key={ i }>{ days }</tr>)
                })}
            </tbody>
        )
    }

    render () {
        const {
            date,
            icons,
            locale,
            tooltips
        } = this.props

        return (
            <div className="datepicker-days">
                <table className="table-condensed">
                    <thead>
                        <tr>
                            <th className="prev">
                                <span className={ icons.previous } title={ tooltips.prevMonth } />
                            </th>
                            <th className="picker-switch" colSpan="5" title={ tooltips.selectMonth }>
                                { moment(date).locale(locale).format("MMMM YYYY") }
                            </th>
                            <th className="next">
                                <span className={ icons.next } title={ tooltips.nextMonth } />
                            </th>
                        </tr>
                        <tr>
                            { [0, 1, 2, 3, 4, 5, 6].map((d) => (
                                <th key={ d } className="dow">{ moment().weekday(d).format("dd") }</th>
                            )) }
                        </tr>
                    </thead>
                    { this.renderDays() }
                </table>
            </div>
        )
    }

}

export default DatePickerDays
