import React, { Component } from "react"
import classNames from "classnames"
import Config from "../config.js"

class DateTimePickerInput extends Component {

    static propTypes = {
        bsSize     : React.PropTypes.string,
        icon       : React.PropTypes.bool,
        icons      : React.PropTypes.object,
        inputProps : React.PropTypes.object,
        mode       : React.PropTypes.string,
        onClick    : React.PropTypes.func,
        value      : React.PropTypes.string
    }

    onChangeInput = (e) => {
        e.preventDefault()
    }

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

        const iconClasses = mode === Config.MODE_TIME ? icons.time : icons.date

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
