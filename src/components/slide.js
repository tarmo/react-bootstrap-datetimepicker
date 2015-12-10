import React, { Component, cloneElement } from "react"
import { findDOMNode } from "react-dom"
import { Transition } from "react-overlays"

const TRANSITION_DURATION = 350
const TRANSITION_FRAME_DELAY = 10

class DateTimePickerViewSlide extends Component {

    static propTypes = {
        children : React.PropTypes.element.isRequired,
        collapse : React.PropTypes.bool,
        in       : React.PropTypes.bool
    }

    easeDelta (progress) {
        return (progress < 0.5) ? (2 * progress / 2) : ((2 - 2 * (1 - progress)) / 2)
    }

    transition (step) {
        const start = new Date()
        const timer = setInterval(() => {
            const timePassed = new Date() - start
            const progress = Math.min(1, timePassed / TRANSITION_DURATION)

            const delta = this.easeDelta(progress)

            step(delta)

            if (progress == 1) {
                clearInterval(timer)
            }
        }, TRANSITION_FRAME_DELAY)
    }

    slideToggle (slide, from, to) {
        slide.style.height = `${from}px`

        this.transition((delta) => {
            let height
            if (from > to) {
                height = from - from * delta
            } else {
                height = to * delta
            }
            slide.style.height = `${height}px`
        })
    }

    onEnter = () => {
        const slide = findDOMNode(this.refs.slide)
        slide.style.overflow = "hidden"
        this.slideToggle(slide, 0, 229)
    }

    onEntered = () => {
        const slide = findDOMNode(this.refs.slide)
        slide.style.height = null
        slide.style.overflow = null
    }

    onExit = () => {
        const slide = findDOMNode(this.refs.slide)
        this.slideToggle(slide, 240, 0)
    }

    onExited = () => {
        const slide = findDOMNode(this.refs.slide)
        slide.style.height = null
        slide.style.overflow = null
    }

    renderWithCollapse () {
        const { children } = this.props

        return (
            <Transition ref="slide"
                        in={ this.props.in }
                        timeout={ TRANSITION_DURATION }
                        onEnter={ this.onEnter }
                        onEntered={ this.onEntered }
                        onExit={ this.onExit }
                        onExited={ this.onExited }
                        enteredClassName="collapse in"
                        exitedClassName="collapse">
                { children }
            </Transition>
        )
    }

    renderWithoutCollapse () {
        const { children } = this.props
        const child = React.Children.only(children)
        const styles = { display : "none" }

        return cloneElement(child, Object.assign({}, child.props, {
            style : Object.assign({}, child.props.style, !this.props.in ? styles : {})
        }))
    }

    render () {
        const { collapse } = this.props
        return collapse ? this.renderWithCollapse() : this.renderWithoutCollapse()
    }

}

export default DateTimePickerViewSlide
