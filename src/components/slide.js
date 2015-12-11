import React, { Component, cloneElement } from "react"
import { findDOMNode } from "react-dom"
import { Transition } from "react-overlays"

const TRANSITION_DURATION = 200
const TRANSITION_FRAME_DELAY = 5

class DateTimePickerViewSlide extends Component {

    static propTypes = {
        children : React.PropTypes.element.isRequired,
        collapse : React.PropTypes.bool,
        in       : React.PropTypes.bool
    }

    easeDelta (progress) {
        return (progress < 0.5) ? (2 * progress / 2) : ((2 - 2 * (1 - progress)) / 2)
    }

    transition = (slide, step) => {
        const start = new Date()
        slide.style.overflow = "hidden"
        const timer = setInterval(() => {
            const timePassed = new Date() - start
            const progress = Math.min(1, timePassed / TRANSITION_DURATION)

            const delta = this.easeDelta(progress)

            step(delta)

            if (progress == 1) {
                clearInterval(timer)
                slide.style.removeProperty("height")
                slide.style.removeProperty("overflow")
            }
        }, TRANSITION_FRAME_DELAY)
    }

    slideToggle (slide, from, to) {
        slide.style.height = `${from}px`

        this.transition(slide, (delta) => {
            let height
            if (from > to) {
                height = from - from * delta
            } else {
                height = to * delta
            }
            slide.style.height = `${height}px`
        })
    }

    onEntering = () => {
        const slide = findDOMNode(this.refs.slide)
        const parent = slide.parentNode
        const clone = slide.cloneNode(true)
        clone.style.display = "block"
        parent.appendChild(clone)
        const height = clone.getBoundingClientRect().height
        parent.removeChild(clone)
        this.slideToggle(slide, 0, height)
    }

    onExiting = () => {
        const slide = findDOMNode(this.refs.slide)
        const height = slide.getBoundingClientRect().height
        this.slideToggle(slide, height, 0)
    }

    renderWithCollapse () {
        const { children } = this.props

        return (
            <Transition ref="slide"
                        in={ this.props.in }
                        timeout={ TRANSITION_DURATION }
                        onEntering={ this.onEntering }
                        onExiting={ this.onExiting }
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
