import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"
import "moment-range"
import classNames from "classnames"

class DatePickerYears extends Component {

    static propTypes = {
        dateTime : MomentPropTypes.momentObj,
        locale   : React.PropTypes.string,
        onSelect : React.PropTypes.func
    }

    months = [
        0, 1, 2, 3,
        4, 5, 6, 7,
        8, 9, 10, 11
    ]

    state = {
        date : null
    }

    constructor (...args) {
        super(...args)

        const { date } = this.props
        this.state = Object.assign({}, this.state, { date : moment(date) })
    }

    componentWillReceiveProps (props) {
        this.setState({ date : moment(props.date) })
    }

    startOfDecade (date) {
        return moment(date).year(Math.floor(date.year() / 10) * 10).startOf("year")
    }

    endOfDecade (date) {
        return moment(date).year(Math.ceil(date.year() / 10 + 1) * 10 - 1).endOf("year")
    }

    onClickYear (date) {
        return () => {
            const {
                dateTime,
                onSelect
            } = this.props

            onSelect(moment(dateTime).year(date.year()))
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
            onClickDecades,
            tooltips
            } = this.props
        const { date } = this.state
        const firstYear = this.startOfDecade(date)
        const lastYear = this.endOfDecade(date)
        const decade = moment.range(firstYear, lastYear)
        const years = []

        decade.by("year", (y) => {
            years.push(y)
        })

        return (
            <div className="datepicker-years">
                <table className="table-condensed">
                    <thead>
                    <tr>
                        <th className="prev" onClick={ this.onClickPreviousYear }>
                            <span className={ icons.previous } title={ tooltips.prevYear } />
                        </th>
                        <th className="picker-switch"
                            colSpan="5"
                            title={ tooltips.selectDecade }
                            onClick={ onClickDecades }>
                            { `${firstYear.year()}-${lastYear.year()}` }
                        </th>
                        <th className="next" onClick={ this.onClickNextYear }>
                            <span className={ icons.next } title={ tooltips.nextYear } />
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colSpan="7">
                            { years.map((y) => {
                                const classes = classNames(
                                    "year",
                                    {
                                        active : y.diff(moment(dateTime).startOf("year"), "years") === 0
                                    }
                                )

                                return (
                                    <span className={ classes }
                                          key={ y.year() }
                                          onClick={ this.onClickYear(y) }>
                                            { y.year() }
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

export default DatePickerYears
