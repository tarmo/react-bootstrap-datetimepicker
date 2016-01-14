import React, { Component } from "react"

class DateTimePickerLayoutHorizontal extends Component {

    static propTypes = {
        datePicker : React.PropTypes.node,
        timePicker : React.PropTypes.node
    };

    render () {
        const {
            datePicker,
            timePicker
        } = this.props

        return (
            <div className="row">
                { datePicker }
                { timePicker }
            </div>
        )
    }

}

export default DateTimePickerLayoutHorizontal
