import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"

class TimePickerTime extends Component {

    static propTypes = {
        dateTime       : MomentPropTypes.momentObj,
        icons          : React.PropTypes.object,
        locale         : React.PropTypes.string,
        modifyDateTime : React.PropTypes.func,
        onClickHours   : React.PropTypes.func,
        onClickMinutes : React.PropTypes.func,
        onSelect       : React.PropTypes.func,
        stepping       : React.PropTypes.number,
        tooltips       : React.PropTypes.object,
        use24Hours     : React.PropTypes.bool
    };

    renderAmPmSwitch () {
        const {
            dateTime,
            use24Hours,
            tooltips
        } = this.props

        if (use24Hours) {
            return false
        }

        return (
            <td>
                <button data-action
                        className="btn btn-primary"
                        title={ tooltips.togglePeriod }
                        onClick={ this.onClickAmPmToggle }>
                    { dateTime.format("A") }
                </button>
            </td>
        )
    }

    onClickAmPmToggle = (e) => {
        e.preventDefault()

        const {
            dateTime,
            onSelect
        } = this.props
        const date = moment(dateTime)

        onSelect(dateTime.hour() >= 12 ? date.subtract(12, "hours") : date.add(12, "hours"))
    };

    onClickAddHour = (e) => {
        e.preventDefault()

        const {
            dateTime,
            onSelect,
            stepping,
            use24Hours
        } = this.props
        const date = moment(dateTime).add(stepping, "hours")

        if (!use24Hours) {
            if (dateTime.hour() >= 12) {
                if (date.hour() < 12) {
                    date.add(12, "hours")
                }
            } else if (date.hour() >= 12) {
                date.subtract(12, "hours")
            }
        }

        onSelect(date.minutes(dateTime.minutes()))
    };

    onClickSubtractHour = (e) => {
        e.preventDefault()

        const {
            dateTime,
            onSelect,
            stepping,
            use24Hours
        } = this.props
        const date = moment(dateTime).subtract(stepping, "hours")

        if (!use24Hours) {
            if (dateTime.hour() >= 12) {
                if (date.hour() < 12) {
                    date.add(12, "hours")
                }
            } else if (date.hour() >= 12) {
                date.subtract(12, "hours")
            }
        }

        onSelect(date.minutes(dateTime.minutes()))
    };

    onClickAddMinute = (e) => {
        e.preventDefault()

        const {
            dateTime,
            stepping,
            onSelect
        } = this.props

        onSelect(moment(dateTime).add(stepping, "minute").hours(dateTime.hours()))
    };

    onClickSubtractMinute = (e) => {
        e.preventDefault()

        const {
            dateTime,
            stepping,
            onSelect
        } = this.props

        onSelect(moment(dateTime).subtract(stepping, "minute").hours(dateTime.hours()))
    };

    render () {
        const {
            dateTime,
            icons,
            onClickHours,
            onClickMinutes,
            use24Hours,
            tooltips
        } = this.props

        return (
            <div className="timepicker-picker">
                <table className="table-condensed">
                    <tbody>
                        <tr>
                            <td>
                                <a href="#"
                                   className="btn"
                                   title={ tooltips.incrementHour }
                                   onClick={ this.onClickAddHour }>
                                    <span className={ icons.up } />
                                </a>
                            </td>
                            <td className="separator" />
                            <td>
                                <a href="#"
                                   className="btn"
                                   title={ tooltips.incrementMinute }
                                   onClick={ this.onClickAddMinute }>
                                    <span className={ icons.up } />
                                </a>
                            </td>
                            <td className="separator" />
                        </tr>
                        <tr>
                            <td>
                                <span className="timepicker-hour"
                                      title={ tooltips.pickHour }
                                      onClick={ onClickHours }>
                                    { dateTime.format(use24Hours ? "HH" : "hh") }
                                </span>
                            </td>
                            <td className="separator">{ ":" }</td>
                            <td>
                                <span className="timepicker-minute"
                                      title={ tooltips.pickMinute }
                                      onClick={ onClickMinutes }>
                                    { dateTime.format("mm") }
                                </span>
                            </td>
                            { this.renderAmPmSwitch() }
                        </tr>
                        <tr>
                            <td>
                                <a href="#"
                                   className="btn"
                                   title={ tooltips.decrementHour }
                                   onClick={ this.onClickSubtractHour }>
                                    <span className={ icons.down } />
                                </a>
                            </td>
                            <td className="separator" />
                            <td>
                                <a href="#"
                                   className="btn"
                                   title={ tooltips.decrementMinute }
                                   onClick={ this.onClickSubtractMinute }>
                                    <span className={ icons.down } />
                                </a>
                            </td>
                            <td className="separator" />
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default TimePickerTime
