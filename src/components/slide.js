import React, { Component } from "react"
import { findDOMNode } from "react-dom"
import { Transition } from "react-overlays"

const TRANSITION_DURATION = 5000
const MAX_HEIGHT = "100vh"

class DateTimePickerViewSlide extends Component {

    static propTypes = {
        children : React.PropTypes.element.isRequired,
        "in"     : React.PropTypes.bool
    }

    state = {
        style : {}
    }

    styles = {
        slide : {
            maxHeight : 0,
            transition : "all .5s ease",
            overflowY : "auto"
        },
        slideIn : {
            maxHeight : MAX_HEIGHT
        }
    }


    constructor (...args) {
        super(...args)

        this.state = {
            style : this.state = Object.assign({}, this.styles.slide, this.props.in ? this.styles.slideIn : {})
        }
    }
        /*
        .slide {
    max-height: 0;
    transition: max-height .5s ease-in-out;
    overflow-y: hidden;

&.in {
    max-height: 100vh;
}
}
*/

    render () {
        const {
            children
        } = this.props

        const {
            style
        } = this.state

        /*
        return (
            <div style={ style }>
                { children }
            </div>
        )
        */

        return (
            <Transition in={ this.props.in }
                        timeout={ TRANSITION_DURATION }
                        onEnter={ this.enter }
                        onEntering={ this.entering }
                        onEntered={ this.entered }
                        onExit={ this.exit }
                        onExiting={ this.exiting }
                        onExited={ this.exited }>
                <div style={ style } ref="slide">
                    { children }
                </div>
            </Transition>
        )
    }

    enter = () => {
        const slide = findDOMNode(this.refs.slide)
        slide.style.maxHeight = MAX_HEIGHT
        console.warn("enter", slide)
    }

    entering () {
        console.warn("entering")
    }

    entered () {
        console.warn("entered")
    }

    exit = () => {
        const slide = findDOMNode(this.refs.slide)
        slide.style.maxHeight = 0
        console.warn("exit", slide)
    }

    exiting () {
        console.warn("exiting")
    }

    exited () {
        console.warn("exited")
    }

}

export default DateTimePickerViewSlide
