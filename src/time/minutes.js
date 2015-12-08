import React, { Component } from "react"

class TimePickerMinutes extends Component {

    static propTypes = {
        modifyDateTime  : React.PropTypes.func,
        onSelectMinutes : React.PropTypes.func
    }

    minutes = [
        ["00", "05", "10", "15"],
        ["20", "25", "30", "35"],
        ["40", "45", "50", "55"]
    ]

    onClickSetMinutes (value) {
        return () => {
            const {
                modifyDateTime,
                onSelectMinutes
            } = this.props
            onSelectMinutes()
            modifyDateTime(parseInt(value, 10), "minutes")
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
