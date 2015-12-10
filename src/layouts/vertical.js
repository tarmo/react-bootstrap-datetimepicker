import React, { Component } from "react"
import DateTimeToolbar from "../components/toolbar.js"
import DateTimeViewSlide from "../components/slide.js"
import {
    VIEW_TIME,
    VIEW_DATE,
    PLACEMENT_DEFAULT,
    PLACEMENT_TOP,
    PLACEMENT_BOTTOM
} from "../config.js"

class DateTimePickerLayoutVertical extends Component {

    static propTypes = {
        datePicker       : React.PropTypes.node,
        icons            : React.PropTypes.object,
        timePicker       : React.PropTypes.node,
        toolbarPlacement : React.PropTypes.string
    }

    state = {
        view : VIEW_DATE
    }

    renderDateTimeToolbar () {
        const { view } = this.state

        return (
            <li className="picker-switch">
                <DateTimeToolbar { ...this.props }
                                 onClickSwitch={ this.onClickSwitch }
                                 view={ view } />
            </li>
        )
    }

    renderPicker (viewType) {
        const {
            datePicker,
            timePicker
        } = this.props
        const { view } = this.state
        const picker = viewType === VIEW_TIME ? timePicker : datePicker

        return (
            <DateTimeViewSlide { ...this.props }
                               in={ viewType === view }>
                <li>{ picker }</li>
            </DateTimeViewSlide>
        )
    }

    onClickSwitch = (e) => {
        e.preventDefault()

        const { view } = this.state

        this.setState({
            view : view === VIEW_DATE ? VIEW_TIME : VIEW_DATE
        })
    }

    render () {
        const { toolbarPlacement } = this.props

        return (
            <ul className="list-unstyled">
                { toolbarPlacement === PLACEMENT_TOP && this.renderDateTimeToolbar() }
                { this.renderPicker(VIEW_DATE) }
                { toolbarPlacement === PLACEMENT_DEFAULT && this.renderDateTimeToolbar() }
                { this.renderPicker(VIEW_TIME) }
                { toolbarPlacement === PLACEMENT_BOTTOM && this.renderDateTimeToolbar() }
            </ul>
        )
    }

}

export default DateTimePickerLayoutVertical
