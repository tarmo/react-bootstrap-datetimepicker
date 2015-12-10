import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"
import "moment-range"
import classNames from "classnames"

class DatePickerYears extends Component {

    static propTypes = {
        dateTime     : MomentPropTypes.momentObj,
        decade       : React.PropTypes.number,
        icons        : React.PropTypes.object,
        onSelect     : React.PropTypes.func,
        selected     : React.PropTypes.bool,
        tooltips     : React.PropTypes.object,
        updateDecade : React.PropTypes.func
    }

    startOfCentury (date) {
        return moment(date).year(Math.floor(date.year() / 100) * 100).startOf("year")
    }

    endOfCentury (date) {
        return moment(date).year(Math.floor(date.year() / 100 + 1) * 100 - 1).endOf("year")
    }

    onClickDecade (date) {
        return () => {
            const { onSelect } = this.props
            onSelect(date)
        }
    }

    onClickPreviousCentury = () => {
        const {
            decade,
            updateDecade
        } = this.props
        updateDecade(decade - 100)
    }

    onClickNextCentury = () => {
        const {
            decade,
            updateDecade
        } = this.props
        updateDecade(decade + 100)
    }

    render () {
        const {
            dateTime,
            decade,
            icons,
            selected,
            tooltips
        } = this.props
        const date = moment([decade])
        const firstYear = this.startOfCentury(date)
        const lastYear = this.endOfCentury(date)
        const centuryYears = moment.range(firstYear, lastYear)
        const years = []

        centuryYears.by("year", (y) => {
            if (y.year() % 10 === 0) {
                years.push(y)
            }
        })

        return (
            <div className="datepicker-decades">
                <table className="table-condensed">
                    <thead>
                        <tr>
                            <th className="prev" onClick={ this.onClickPreviousCentury }>
                                <span className={ icons.previous } title={ tooltips.prevCentury } />
                            </th>
                            <th className="picker-switch"
                                colSpan="5">
                                { `${firstYear.year()}-${lastYear.year()}` }
                            </th>
                            <th className="next" onClick={ this.onClickNextCentury }>
                                <span className={ icons.next } title={ tooltips.nextCentury } />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="7">
                                <span className="year old" onClick={ this.onClickPreviousCentury }>
                                    { `…${moment(firstYear).subtract(1, "year").year()}` }

                                </span>
                                { years.map((y) => {
                                    const sameYear = dateTime.year() >= y.year() && dateTime.year() <= (y.year() + 9)
                                    const classes = classNames(
                                        "decade",
                                        {
                                            active : selected && sameYear
                                        }
                                    )

                                    return (
                                        <span className={ classes }
                                              key={ y.year() }
                                              onClick={ this.onClickDecade(y) }>
                                                { `${y.year()}-${moment(y).add(9, "years").year()}` }
                                            </span>
                                    )
                                }) }
                                <span className="year old" onClick={ this.onClickNextCentury }>
                                    { `${moment(lastYear).add(1, "year").year()}…` }
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default DatePickerYears
