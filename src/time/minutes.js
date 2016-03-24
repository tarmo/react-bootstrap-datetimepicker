import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import moment from "moment"

class TimePickerMinutes extends Component {

    static propTypes = {
        dateTime        : MomentPropTypes.momentObj,
        onSelect        : React.PropTypes.func,
        onSelectMinutes : React.PropTypes.func
    };

    minutes = [
        ["00", "05", "10", "15"],
        ["20", "25", "30", "35"],
        ["40", "45", "50", "55"]
    ];

    onClickSetMinutes (value) {
        return () => {
            const {
                dateTime,
                onSelect
            } = this.props

            onSelect(moment(dateTime).minutes(parseInt(value, 10)))
        }
    }

    render () {
        return (
            <div className="timepicker-minutes">
                <table className="table-condensed">
                    <tbody>
                        { this.minutes.map((row, i) => (
                            <tr key={ i }>
                                { row.map((m) => (
                                    <td className="minute"
                                        key={ m }
                                        onClick={ this.onClickSetMinutes(m) }>
                                        { m }
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

export default TimePickerMinutes
