import React, { Component } from "react"
import { findDOMNode } from "react-dom"
import classNames from "classnames"
import moment from "moment"
import { MODE_TIME } from "../config.js"

class DateTimePickerInput extends Component {

    static propTypes = {
        bsSize     : React.PropTypes.string,
        icon       : React.PropTypes.bool,
        icons      : React.PropTypes.object,
        inputProps : React.PropTypes.object,
        mode       : React.PropTypes.string,
        onChange   : React.PropTypes.func,
        onClick    : React.PropTypes.func,
        value      : React.PropTypes.string
    };

    componentDidUpdate () {
        const {
            focusOnShow,
            show
        } = this.props
        const input = findDOMNode(this.refs.input)

        if (show && focusOnShow && input) {
            input.focus()
        }
    }

    onChangeInput = (e) => {
        e.preventDefault()

        const { onChange } = this.props
        const value = e.target.value
        const dateTime = moment(value)
        if (dateTime.isValid()) {
            onChange(dateTime)
        }
    };

    render () {
        const {
            bsSize,
            icons,
            inputProps,
            mode,
            onClick,
            value
        } = this.props

        const classes = classNames(
            "input-group",
            "date",
            {
                [`input-group-${bsSize}`] : bsSize
            }
        )

        const iconClasses = mode === MODE_TIME ? icons.time : icons.date

        return (
            <div className={ classes }>
                <input className="form-control"
                       type="text"
                       ref="input"
                       value={ value }
                       onChange={ this.onChangeInput }
                       { ...inputProps } />

                <span className="input-group-addon"
                      onClick={ onClick }>
                    <span className={ iconClasses } />
                </span>
            </div>
        )
    }

}

export default DateTimePickerInput
