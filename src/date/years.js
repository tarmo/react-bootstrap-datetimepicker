import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"
import "moment-range"
import classNames from "classnames"

class DatePickerYears extends Component {

    static propTypes = {
        dateTime       : MomentPropTypes.momentObj,
        decade         : React.PropTypes.number,
        icons          : React.PropTypes.object,
        onClickDecades : React.PropTypes.func,
        onSelect       : React.PropTypes.func,
        selected       : React.PropTypes.bool,
        tooltips       : React.PropTypes.object,
        updateDecade   : React.PropTypes.func
    }

    startOfDecade (date) {
        return moment(date).year(Math.floor(date.year() / 10) * 10).startOf("year")
    }

    endOfDecade (date) {
        return moment(date).year(Math.floor(date.year() / 10 + 1) * 10 - 1).endOf("year")
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
    }

    onClickNextDecade = () => {
        const {
            decade,
            updateDecade
            } = this.props
        updateDecade(decade + 10)
    }

    render () {
        const {
            dateTime,
            decade,
            icons,
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
                            <th className="prev" onClick={ this.onClickPreviousDecade }>
                                <span className={ icons.previous } title={ tooltips.prevDecade } />
                            </th>
                            <th className="picker-switch"
                                colSpan="5"
                                title={ tooltips.selectDecade }
                                onClick={ onClickDecades }>
                                { `${firstYear.year()}-${lastYear.year()}` }
                            </th>
                            <th className="next" onClick={ this.onClickNextDecade }>
                                <span className={ icons.next } title={ tooltips.nextDecade } />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="7">
                                <span className="year old" onClick={ this.onClickPreviousDecade }>
                                    { `…${moment(firstYear).subtract(1, "year").year()}` }

                                </span>
                                { years.map((y) => {
                                    const classes = classNames(
                                        "year",
                                        {
                                            active : selected && y.diff(moment(dateTime).startOf("year"), "years") === 0
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
                                <span className="year old" onClick={ this.onClickNextDecade }>
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
