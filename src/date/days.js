import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"
import "moment-range"
import classNames from "classnames"

class DatePickerDays extends Component {

    static propTypes = {
        date          : MomentPropTypes.momentObj,
        icons         : React.PropTypes.object,
        locale        : React.PropTypes.string,
        onClickMonths : React.PropTypes.func,
        onSelect      : React.PropTypes.func,
        selected      : React.PropTypes.bool,
        showToday     : React.PropTypes.bool,
        tooltips      : React.PropTypes.object
    }

    constructor (...args) {
        super(...args)

        const { date } = this.props
        this.state = Object.assign({}, this.state, { date : moment(date) })
    }

    state = {
        date : null
    }

    componentWillReceiveProps (props) {
        this.setState({ date : moment(props.date) })
    }

    getCalendarDays () {
        const { locale } = this.props
        const { date } = this.state
        const startDate = moment(date).locale(locale).startOf("month").startOf("day")
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
                firstWeekDay = moment(startDate).add(1, "year").week(w).startOf("week")
                lastWeekDay = moment(startDate).add(1, "year").week(w).endOf("week")
            } else {
                firstWeekDay = moment(startDate).week(w).startOf("week")
                lastWeekDay = moment(startDate).week(w).endOf("week")
            }

            calendarDays.push(moment.range(firstWeekDay, lastWeekDay))
        })

        return calendarDays
    }

    renderDays () {
        const {
            selected,
            showToday
        } = this.props
        const { date } = this.state
        const weeks = this.getCalendarDays()

        return (
            <tbody>
                { weeks.map((week, i) => {
                    const days = []
                    week.by("days", (d) => {
                        const classes = classNames(
                            "day",
                            {
                                active  : selected && d.diff(moment(this.props.date).startOf("day"), "days") === 0,
                                today   : showToday && d.diff(moment().startOf("day"), "days") === 0,
                                old     : d.month() < date.month(),
                                weekend : [0, 6].indexOf(d.day()) !== -1,
                                new     : d.month() > date.month()
                            }
                        )

                        days.push(
                            <td key={ d.format("x") }
                                className={ classes }
                                onClick={ this.onClickDay(d) }>
                                { d.format("DD") }
                            </td>
                        )
                    })
                    return (<tr key={ i }>{ days }</tr>)
                }) }
            </tbody>
        )
    }

    onClickDay (date) {
        return () => {
            const { onSelect } = this.props
            onSelect(date)
        }
    }

    onClickPreviousMonth = () => {
        const { date } = this.state

        this.setState({ date : moment(date).subtract(1, "month") })
    }

    onClickNextMonth = () => {
        const { date } = this.state

        this.setState({ date : moment(date).add(1, "month") })
    }

    render () {
        const {
            icons,
            locale,
            onClickMonths,
            tooltips
        } = this.props
        const { date } = this.state

        const dateLocale = moment(date).locale(locale)

        return (
            <div className="datepicker-days">
                <table className="table-condensed">
                    <thead>
                        <tr>
                            <th className="prev" onClick={ this.onClickPreviousMonth }>
                                <span className={ icons.previous } title={ tooltips.prevMonth } />
                            </th>
                            <th className="picker-switch"
                                colSpan="5"
                                title={ tooltips.selectMonth }
                                onClick={ onClickMonths }>
                                { dateLocale.format("MMMM YYYY") }
                            </th>
                            <th className="next" onClick={ this.onClickNextMonth }>
                                <span className={ icons.next } title={ tooltips.nextMonth } />
                            </th>
                        </tr>
                        <tr>
                            { [0, 1, 2, 3, 4, 5, 6].map((d) => (
                                <th key={ d } className="dow">{ dateLocale.weekday(d).format("dd") }</th>
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
