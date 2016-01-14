import React, { Component } from "react"

class DateTimePickerLayoutInline extends Component {

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
            <div className="bootstrap-datetimepicker-widget">
                <div className="row">
                    { datePicker }
                    { timePicker }
                </div>
            </div>
        )
    }

}

export default DateTimePickerLayoutInline
