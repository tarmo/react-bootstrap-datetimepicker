import React, { Component } from "react"

class DateTimePickerLayoutInline extends Component {

    static propTypes = {
        datePicker : React.PropTypes.node,
        sideBySide : React.PropTypes.bool,
        timePicker : React.PropTypes.node
    }

    render () {
        const {
            datePicker,
            sideBySide,
            timePicker
        } = this.props

        const style = {
            display : "inline-block"
        }

        return (
            <div className="bootstrap-datetimepicker-widget">
                <div style={ sideBySide && style }>
                    { datePicker }
                </div>
                <div style={ sideBySide && style }>
                    { timePicker }
                </div>
            </div>
        )
    }

}

export default DateTimePickerLayoutInline
