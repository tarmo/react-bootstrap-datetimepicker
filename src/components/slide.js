import React, { Component } from "react"
import { Transition } from "react-overlays"

const TRANSITION_DURATION = 5000

class DateTimePickerViewSlide extends Component {

    static propTypes = {
        children : React.PropTypes.element.isRequired,
        "in"     : React.PropTypes.bool
    }

    render () {
        const {
            children
        } = this.props

        return (
            <Transition in={ this.props.in }
                        timeout={ TRANSITION_DURATION }
                        onEnter={ this.enter }
                        onEntering={ this.entering }
                        onEntered={ this.entered }
                        onExit={ this.exit }
                        onExiting={ this.exiting }
                        onExited={ this.exited }>
                { children }
            </Transition>
        )
    }

    enter () {
        console.warn("enter")
    }

    entering () {
        console.warn("entering")
    }

    entered () {
        console.warn("entered")
    }

    exit () {
        console.warn("exit")
    }

    exiting () {
        console.warn("exiting")
    }

    exited () {
        console.warn("exited")
    }

}

export default DateTimePickerViewSlide
