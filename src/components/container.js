import React, { Component } from "react"
import classNames from "classnames"
import Config from "../config.js"

class DateTimePickerContainer extends Component {

    static propTypes = {
        children  : React.PropTypes.node,
        placement : React.PropTypes.oneOf([
            Config.PLACEMENT_TOP,
            Config.PLACEMENT_BOTTOM
        ]),
        sideBySide : React.PropTypes.bool,
        style      : React.PropTypes.object
    }

    render () {
        const {
            children,
            placement,
            sideBySide,
            style
        } = this.props

        const classes = classNames(
            "bootstrap-datetimepicker-widget",
            "dropdown-menu",
            placement,
            { "timepicker-sbs" : sideBySide }
        )

        const inlineStyle = Object.assign({}, style, {
            position : "absolute",
            display  : "block"
        })

        return (
            <div className={ classes } style={ inlineStyle }>
                { children }
            </div>
        )
    }

}

export default DateTimePickerContainer
