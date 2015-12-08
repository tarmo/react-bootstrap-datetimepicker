import React, { Component } from "react"
import { mountable } from "react-prop-types"
import classNames from "classnames"
import Config from "../config.js"

class DateTimePickerContainer extends Component {

    static propTypes = {
        children  : React.PropTypes.node,
        placement : React.PropTypes.oneOf([
            Config.PLACEMENT_TOP,
            Config.PLACEMENT_BOTTOM
        ]),
        style : React.PropTypes.object
    }

    render () {
        const {
            children,
            placement,
            style
        } = this.props

        const classes = classNames(
            "bootstrap-datetimepicker-widget",
            "dropdown-menu",
            placement
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
