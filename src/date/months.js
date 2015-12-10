import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"
import classNames from "classnames"

class DatePickerMonths extends Component {

    static propTypes = {
        date         : MomentPropTypes.momentObj,
        dateTime     : MomentPropTypes.momentObj,
        icons        : React.PropTypes.object,
        locale       : React.PropTypes.string,
        onClickYears : React.PropTypes.func,
        onSelect     : React.PropTypes.func,
        selected     : React.PropTypes.bool,
        tooltips     : React.PropTypes.object
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

    months = [
        0, 1, 2, 3,
        4, 5, 6, 7,
        8, 9, 10, 11
    ]

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
    }

    onClickNextYear = () => {
        const { date } = this.state

        this.setState({ date : moment(date).add(1, "year") })
    }

    render () {
        const {
            dateTime,
            icons,
            locale,
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
                            <th className="prev" onClick={ this.onClickPreviousYear }>
                                <span className={ icons.previous } title={ tooltips.prevYear } />
                            </th>
                            <th className="picker-switch"
                                colSpan="5"
                                title={ tooltips.selectYear }
                                onClick={ onClickYears }>
                                { date.format("YYYY") }
                            </th>
                            <th className="next" onClick={ this.onClickNextYear }>
                                <span className={ icons.next } title={ tooltips.nextYear } />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="7">
                                { this.months.map((m) => {
                                    const month = moment(date).locale(locale).month(m).startOf("month")
                                    const sameMonth = month.diff(moment(dateTime).startOf("month"), "months") === 0
                                    const classes = classNames(
                                        "month",
                                        {
                                            active : selected && sameMonth
                                        }
                                    )

                                    return (
                                        <span className={ classes }
                                            key={ m }
                                            onClick={ this.onClickMonth(month) }>
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
