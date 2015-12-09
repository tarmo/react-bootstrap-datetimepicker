import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"

class TimePickerHours extends Component {

    static propTypes = {
        dateTime     : MomentPropTypes.momentObj,
        onChange     : React.PropTypes.func,
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
                onChange,
                onSelectHour,
                use24Hours
            } = this.props
            const hour = parseInt(value, 10)
            let adjustedHour = hour

            if (!use24Hours) {
                if (dateTime.format("a") === "pm") {
                    if (hour !== 12) {
                        adjustedHour += 12
                    }
                } else {
                    if (hour === 12) {
                        adjustedHour = 0
                    }
                }
            }

            onChange(moment(dateTime).hours(adjustedHour))
            onSelectHour()
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
