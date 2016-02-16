import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"
import "moment-range"
import classNames from "classnames"
import { inRangeDates } from "../utils.js"

class DatePickerYears extends Component {

    static propTypes = {
        dateTime     : MomentPropTypes.momentObj,
        decade       : React.PropTypes.number,
        icons        : React.PropTypes.object,
        maxDate      : MomentPropTypes.momentObj,
        minDate      : MomentPropTypes.momentObj,
        onSelect     : React.PropTypes.func,
        selected     : React.PropTypes.bool,
        tooltips     : React.PropTypes.object,
        updateDecade : React.PropTypes.func
    };

    startOfCentury (date) {
        return moment(date).year(Math.floor(date.year() / 100) * 100).startOf("year")
    }

    endOfCentury (date) {
        return moment(date).year(Math.floor(date.year() / 100 + 1) * 100 - 1).endOf("year")
    }

    renderPrevButton () {
        const {
            decade,
            icons,
            minDate,
            tooltips
        } = this.props
        const date = moment([decade])
        const endCentury = this.endOfCentury(moment(date).subtract(100, "years"))
        const inRange = inRangeDates(moment(endCentury).subtract(1, "year"), "years", minDate)

        const classes = classNames("prev", {
            disabled : !inRange
        })

        return (
            <th className={ classes } onClick={ inRange && this.onClickPreviousCentury }>
                <span className={ icons.previous } title={ tooltips.prevCentury } />
            </th>
        )
    }

    renderNextButton () {
        const {
            decade,
            icons,
            maxDate,
            tooltips
        } = this.props
        const date = moment([decade])
        const startCentury = this.startOfCentury(moment(date).add(100, "years"))
        const inRange = inRangeDates(moment(startCentury).add(1, "year"), "years", null, maxDate)

        const classes = classNames("next", {
            disabled : !inRange
        })

        return (
            <th className={ classes } onClick={ inRange && this.onClickNextCentury }>
                <span className={ icons.next } title={ tooltips.nextCentury } />
            </th>
        )
    }

    renderLeftEdge (year) {
        const {
            minDate
        } = this.props
        const date = moment(year).subtract(1, "year")
        const inRange = inRangeDates(date, "years", minDate)

        const classes = classNames("year old", {
            disabled : !inRange
        })

        return (
            <span className={ classes } onClick={ inRange && this.onClickPreviousCentury }>
                { `…${date.year()}` }
            </span>
        )
    }

    renderRightEdge (year) {
        const {
            maxDate
        } = this.props
        const date = moment(year).add(1, "year")
        const inRange = inRangeDates(date, "years", null, maxDate)

        const classes = classNames("year old", {
            disabled : !inRange
        })

        return (
            <span className={ classes } onClick={ inRange && this.onClickNextCentury }>
                { `…${date.year()}` }
            </span>
        )
    }

    onClickDecade (date) {
        return () => {
            const { onSelect } = this.props
            onSelect(date, false, true)
        }
    }

    onClickPreviousCentury = () => {
        const {
            decade,
            updateDecade
        } = this.props
        updateDecade(decade - 100)
    };

    onClickNextCentury = () => {
        const {
            decade,
            updateDecade
        } = this.props
        updateDecade(decade + 100)
    };

    render () {
        const {
            dateTime,
            decade,
            maxDate,
            minDate,
            selected
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
                            { this.renderPrevButton() }
                            <th className="picker-switch"
                                colSpan="5">
                                { `${firstYear.year()}-${lastYear.year()}` }
                            </th>
                            { this.renderNextButton() }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="7">
                                { this.renderLeftEdge(firstYear) }
                                { years.map((y) => {
                                    const sameYear = dateTime.year() >= y.year() && dateTime.year() <= (y.year() + 9)
                                    const inRangeLow = inRangeDates(y, "years", null, maxDate)
                                    const inRangeHigh = inRangeDates(moment(y).add(9, "years"), "years", minDate)
                                    const classes = classNames(
                                        "decade",
                                        {
                                            active   : selected && sameYear,
                                            disabled : !inRangeLow || !inRangeHigh
                                        }
                                    )

                                    return (
                                        <span className={ classes }
                                              key={ y.year() }
                                              onClick={ inRangeLow && inRangeHigh && this.onClickDecade(y) }>
                                                { `${y.year()}-${moment(y).add(9, "years").year()}` }
                                            </span>
                                    )
                                }) }
                                { this.renderRightEdge(lastYear) }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default DatePickerYears
