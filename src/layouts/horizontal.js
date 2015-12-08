import React, { Component } from "react"

class DateTimePickerLayoutHorizontal extends Component {

    static propTypes = {
        datePicker : React.PropTypes.node,
        timePicker : React.PropTypes.node
    }

    render () {
        const {
            datePicker,
            timePicker
        } = this.props

        const style = {
            display : "inline-block"
        }

        return (
            <div>
                <div style={ style }>
                    { datePicker }
                </div>
                <div style={ style }>
                    { timePicker }
                </div>
            </div>
        )
    }

}

export default DateTimePickerLayoutHorizontal
