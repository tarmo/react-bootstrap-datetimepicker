import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"
import classNames from "classnames"
import { inRangeDates } from "../utils.js"

class DatePickerMonths extends Component {

    static propTypes = {
        date         : MomentPropTypes.momentObj,
        dateTime     : MomentPropTypes.momentObj,
        icons        : React.PropTypes.object,
        locale       : React.PropTypes.string,
        maxDate      : MomentPropTypes.momentObj,
        minDate      : MomentPropTypes.momentObj,
        onClickYears : React.PropTypes.func,
        onSelect     : React.PropTypes.func,
        selected     : React.PropTypes.bool,
        tooltips     : React.PropTypes.object
    };

    constructor (...args) {
        super(...args)

        const { date } = this.props
        this.state = Object.assign({}, this.state, { date : moment(date) })
    }

    state = {
        date : null
    };

    componentWillReceiveProps (props) {
        this.setState({ date : moment(props.date) })
    }

    months = [
        0, 1, 2, 3,
        4, 5, 6, 7,
        8, 9, 10, 11
    ];

    renderPrevButton () {
        const {
            icons,
            minDate,
            tooltips
            } = this.props
        const { date } = this.state
        const inRange = inRangeDates(moment(date).subtract(1, "year"), "years", minDate)

        const classes = classNames("prev", {
            disabled : !inRange
        })

        return (
            <th className={ classes } onClick={ inRange && this.onClickPreviousYear }>
                <span className={ icons.previous } title={ tooltips.prevYear } />
            </th>
        )
    }

    renderNextButton () {
        const {
            icons,
            maxDate,
            tooltips
            } = this.props
        const { date } = this.state
        const inRange = inRangeDates(moment(date).add(1, "year"), "years", null, maxDate)

        const classes = classNames("next", {
            disabled : !inRange
        })

        return (
            <th className={ classes } onClick={ inRange && this.onClickNextYear }>
                <span className={ icons.next } title={ tooltips.nextYear } />
            </th>
        )
    }

    onClickMonth (date) {
        return () => {
            const {
                dateTime,
                onSelect
            } = this.props

            onSelect(moment(dateTime).year(date.year()).month(date.month()))
        }
    }

    onClickPreviousYear = () => {
        const { date } = this.state

        this.setState({ date : moment(date).subtract(1, "year") })
    };

    onClickNextYear = () => {
        const { date } = this.state

        this.setState({ date : moment(date).add(1, "year") })
    };

    render () {
        const {
            dateTime,
            locale,
            maxDate,
            minDate,
            onClickYears,
            selected,
            tooltips
        } = this.props
        const { date } = this.state

        return (
            <div className="datepicker-months">
                <table className="table-condensed">
                    <thead>
                        <tr>
                            { this.renderPrevButton() }
                            <th className="picker-switch"
                                colSpan="5"
                                title={ tooltips.selectYear }
                                onClick={ onClickYears }>
                                { date.format("YYYY") }
                            </th>
                            { this.renderNextButton() }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="7">
                                { this.months.map((m) => {
                                    const month = moment(date).locale(locale).month(m).startOf("month")
                                    const sameMonth = month.diff(moment(dateTime).startOf("month"), "months") === 0
                                    const inRange = inRangeDates(month, "months", minDate, maxDate)
                                    const classes = classNames(
                                        "month",
                                        {
                                            active   : selected && sameMonth,
                                            disabled : !inRange
                                        }
                                    )

                                    return (
                                        <span className={ classes }
                                            key={ m }
                                            onClick={ inRange && this.onClickMonth(month) }>
                                            { month.format("MMM") }
                                        </span>
                                    )
                                }) }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default DatePickerMonths
