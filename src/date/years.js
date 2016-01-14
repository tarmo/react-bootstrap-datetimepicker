import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"
import "moment-range"
import classNames from "classnames"
import { inRangeDates } from "../utils.js"

class DatePickerYears extends Component {

    static propTypes = {
        dateTime       : MomentPropTypes.momentObj,
        decade         : React.PropTypes.number,
        icons          : React.PropTypes.object,
        maxDate        : MomentPropTypes.momentObj,
        minDate        : MomentPropTypes.momentObj,
        onClickDecades : React.PropTypes.func,
        onSelect       : React.PropTypes.func,
        selected       : React.PropTypes.bool,
        tooltips       : React.PropTypes.object,
        updateDecade   : React.PropTypes.func
    };

    startOfDecade (date) {
        return moment(date).year(Math.floor(date.year() / 10) * 10).startOf("year")
    }

    endOfDecade (date) {
        return moment(date).year(Math.floor(date.year() / 10 + 1) * 10 - 1).endOf("year")
    }

    renderPrevButton () {
        const {
            decade,
            icons,
            minDate,
            tooltips
        } = this.props
        const date = moment([decade])
        const endDecade = this.endOfDecade(moment(date).subtract(10, "years"))
        const inRange = inRangeDates(moment(endDecade).subtract(1, "year"), "years", minDate)

        const classes = classNames("prev", {
            disabled : !inRange
        })

        return (
            <th className={ classes } onClick={ inRange && this.onClickPreviousDecade }>
                <span className={ icons.previous } title={ tooltips.prevDecade } />
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
        const startDecade = this.startOfDecade(moment(date).add(10, "years"))
        const inRange = inRangeDates(moment(startDecade).add(1, "year"), "years", null, maxDate)

        const classes = classNames("next", {
            disabled : !inRange
        })

        return (
            <th className={ classes } onClick={ inRange && this.onClickNextDecade }>
                <span className={ icons.next } title={ tooltips.nextDecade } />
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
            <span className={ classes } onClick={ inRange && this.onClickPreviousDecade }>
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
            <span className={ classes } onClick={ inRange && this.onClickNextDecade }>
                { `…${date.year()}` }
            </span>
        )
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

    onClickPreviousDecade = () => {
        const {
            decade,
            updateDecade
        } = this.props
        updateDecade(decade - 10)
    };

    onClickNextDecade = () => {
        const {
            decade,
            updateDecade
            } = this.props
        updateDecade(decade + 10)
    };

    render () {
        const {
            dateTime,
            decade,
            maxDate,
            minDate,
            onClickDecades,
            selected,
            tooltips
        } = this.props
        const date = moment([decade])
        const firstYear = this.startOfDecade(date)
        const lastYear = this.endOfDecade(date)
        const decadeYears = moment.range(firstYear, lastYear)
        const years = []

        decadeYears.by("year", (y) => years.push(y))

        return (
            <div className="datepicker-years">
                <table className="table-condensed">
                    <thead>
                        <tr>
                            { this.renderPrevButton() }
                            <th className="picker-switch"
                                colSpan="5"
                                title={ tooltips.selectDecade }
                                onClick={ onClickDecades }>
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
                                    const inRange = inRangeDates(y, "years", minDate, maxDate)
                                    const sameYear = y.diff(moment(dateTime).startOf("year"), "years") === 0
                                    const classes = classNames(
                                        "year",
                                        {
                                            active   : selected && sameYear,
                                            disabled : !inRange
                                        }
                                    )

                                    return (
                                        <span className={ classes }
                                              key={ y.year() }
                                              onClick={ inRange && this.onClickYear(y) }>
                                                { y.year() }
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
