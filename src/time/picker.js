import React, { Component } from "react"
import MomentPropTypes from "react-moment-proptypes"
import classNames from "classnames"
import moment from "moment"
import TimePickerTime from "./time.js"
import TimePickerHours from "./hours.js"
import TimePickerMinutes from "./minutes.js"
import {
    VIEW_MODE_TIME,
    VIEW_MODE_HOURS,
    VIEW_MODE_MINUTES,
    VIEW_MODE_SECONDS
} from "../config.js"

class TimePicker extends Component {

    state = {
        viewMode : VIEW_MODE_TIME
    }

    onClickHours = (e) => {
        e.preventDefault()
        this.setState({
            viewMode : VIEW_MODE_HOURS
        })
    }

    onClickMinutes = (e) => {
        e.preventDefault()
        this.setState({
            viewMode : VIEW_MODE_MINUTES
        })
    }

    onSelectHourOrMinutes = () => {
        this.setState({
            viewMode : VIEW_MODE_TIME
        })
    }

    renderViewMode () {
        const { viewMode } = this.state

        switch (viewMode) {
            case VIEW_MODE_HOURS :
                return (<TimePickerHours onSelectHour={ this.onSelectHourOrMinutes } { ...this.props } />)

            case VIEW_MODE_MINUTES :
                return (<TimePickerMinutes onSelectMinutes={ this.onSelectHourOrMinutes } { ...this.props } />)

            default :
                return (
                    <TimePickerTime onClickHours={ this.onClickHours }
                                    onClickMinutes={ this.onClickMinutes }
                                    { ...this.props } />
                )
        }
    }

    render () {
        return (
            <div className="timepicker">
                { this.renderViewMode() }
            </div>
        )
    }

}

export default TimePicker
