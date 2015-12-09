import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"

class TimePickerHours extends Component {

    static propTypes = {
        dateTime     : MomentPropTypes.momentObj,
        onSelect     : React.PropTypes.func,
        onSelectHour : React.PropTypes.func,
        use24Hours   : React.PropTypes.bool
    }

    hours12 = [
        ["12", "01", "02", "03"],
        ["04", "05", "06", "07"],
        ["08", "09", "10", "11"]
    ]

    hours24 = [
        ["00", "01", "02", "03"],
        ["04", "05", "06", "07"],
        ["08", "09", "10", "11"],
        ["12", "13", "14", "15"],
        ["16", "17", "18", "19"],
        ["20", "21", "22", "23"]
    ]

    onClickSetHour (value) {
        return () => {
            const {
                dateTime,
                onSelect,
                use24Hours
            } = this.props
            const date = moment(dateTime).hour(parseInt(value, 10))

            if (!use24Hours) {
                if (dateTime.hour() >= 12) {
                    if (date.hour() !== 12) {
                        date.add(12, "hours")
                    }
                } else {
                    if (date.hour() === 12) {
                        date.hour(0)
                    }
                }
            }

            onSelect(date.minutes(dateTime.minutes()))
        }
    }

    render () {
        const { use24Hours } = this.props
        return (
            <div className="timepicker-hours">
                <table className="table-condensed">
                    <tbody>
                    { (use24Hours ? this.hours24 : this.hours12).map((row, i) => (
                        <tr key={ i }>
                            { row.map((h) => (
                                <td className="hour"
                                    key={ h }
                                    onClick={ this.onClickSetHour(h) }>
                                    { h }
                                </td>
                            )) }
                        </tr>
                    )) }
                    </tbody>
                </table>
            </div>
        )
    }

}

export default TimePickerHours
