import React, { Component } from "react"
import { findDOMNode } from "react-dom"
import { mountable } from "react-prop-types"
import classNames from "classnames"

class DateTimePickerContainer extends Component {

    static propTypes = {
        children  : React.PropTypes.node,
        container : mountable,
        placement : React.PropTypes.oneOf(["top", "bottom"]),
        target    : React.PropTypes.func
    }

    state = {
        offset
    }
    
    componentDidMount () {

    }

    getOffset () {
        const {
            target
        } = this.props

        const targetNode = target()
        const rect = targetNode.getBoundingClientRect()
        return rect.left
    }

    render () {
        const {
            children,
            offset,
            placement
        } = this.props
        const classes = classNames(
            "bootstrap-datetimepicker-widget",
            "dropdown-menu",
            placement
        )

        const style = {
            display : "block",
            top     : "auto",
            left    : this.getOffset()
        };

        return (
            <div className={ classes } style={ style }>
                { children }
            </div>
        )
    }

}

export default DateTimePickerContainer
