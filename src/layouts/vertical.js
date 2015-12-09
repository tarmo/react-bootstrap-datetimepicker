import React, { Component } from "react"
import classNames from "classnames"
import Config from "../config.js"
import DateTimeSwitch from "../components/switch.js"
import DateTimeViewSlide from "../components/slide.js"

class DateTimePickerLayoutVertical extends Component {

    static propTypes = {
        datePicker : React.PropTypes.node,
        icons      : React.PropTypes.object,
        timePicker : React.PropTypes.node
    }

    state = {
        view : Config.VIEW_DATE
    }

    renderDateTimeSwitch () {
        const {
            datePicker,
            icons,
            timePicker
        } = this.props

        const {
            view
        } = this.state

        if (!datePicker || !timePicker) {
            return false
        }

        return (
            <DateTimeSwitch icons={ icons }
                            onClick={ this.onClickSwitch }
                            view={ view } />
        )
    }

    renderPicker (viewType) {
        const {
            datePicker,
            timePicker
        } = this.props
        const {
            view
        } = this.state
        const picker = viewType === Config.VIEW_TIME ? timePicker : datePicker

        return (
            <DateTimeViewSlide in={ viewType === view }>
                <li>{ picker }</li>
            </DateTimeViewSlide>
        )
    }

    onClickSwitch = (e) => {
        e.preventDefault()

        const {
            view
        } = this.state

        this.setState({
            view : view === Config.VIEW_DATE ? Config.VIEW_TIME : Config.VIEW_DATE
        })
    }

    render () {
        return (
            <ul className="list-unstyled">
                { this.renderPicker(Config.VIEW_DATE) }
                { this.renderDateTimeSwitch() }
                { this.renderPicker(Config.VIEW_TIME) }
            </ul>
        )
    }

}

export default DateTimePickerLayoutVertical
