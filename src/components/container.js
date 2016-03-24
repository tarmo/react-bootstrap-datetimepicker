import React, { Component } from "react"
import { findDOMNode } from "react-dom"
import classNames from "classnames"
import {
    PLACEMENT_TOP,
    PLACEMENT_BOTTOM
} from "../config.js"

class DateTimePickerContainer extends Component {

    static propTypes = {
        children   : React.PropTypes.node,
        className  : React.PropTypes.string,
        placement  : React.PropTypes.oneOf([PLACEMENT_TOP, PLACEMENT_BOTTOM]),
        sideBySide : React.PropTypes.bool,
        style      : React.PropTypes.object,
        target     : React.PropTypes.func
    };

    state = {
        offset : 0
    };

    componentDidMount () {
        this.setPositionOffset()
    }

    setPositionOffset () {
        const { target } = this.props
        const targetWidth = target().getBoundingClientRect().width
        const width = findDOMNode(this.refs.container).getBoundingClientRect().width
        const offset = (targetWidth - width) / 2
        this.setState({ offset })
    }

    render () {
        const {
            children,
            className,
            placement,
            sideBySide,
            style
        } = this.props
        const { offset } = this.state
        const classes = classNames(
            "bootstrap-datetimepicker-widget",
            "dropdown-menu",
            placement,
            { "timepicker-sbs" : sideBySide },
            className
        )

        const inlineStyle = Object.assign({}, style, {
            position : "absolute",
            display  : "block",
            left     : style.left - offset
        })

        return (
            <div ref="container"
                 className={ classes }
                 style={ inlineStyle }>
                { children }
            </div>
        )
    }

}

export default DateTimePickerContainer
