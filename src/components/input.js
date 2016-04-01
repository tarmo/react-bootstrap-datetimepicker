import React, { Component } from "react"
import { findDOMNode } from "react-dom"
import classNames from "classnames"
import moment from "moment"
import { MODE_TIME } from "../config.js"

class DateTimePickerInput extends Component {

    static propTypes = {
        bsSize      : React.PropTypes.string,
        focusOnShow : React.PropTypes.bool,
        icon        : React.PropTypes.bool,
        icons       : React.PropTypes.object,
        inputProps  : React.PropTypes.object,
        mode        : React.PropTypes.string,
        onChange    : React.PropTypes.func,
        onClick     : React.PropTypes.func,
        show        : React.PropTypes.bool,
        value       : React.PropTypes.string
    };

    state = {
        value: this.props.value
    };

    componentDidUpdate () {
        const {
            focusOnShow,
            show,
            value
        } = this.props
        const input = findDOMNode(this.refs.input)

        if (show && focusOnShow && input) {
            input.focus()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({ value: nextProps.value })
        }
    }

    onChangeInput = (e) => {
        e.preventDefault()

        this.setState({ value: e.target.value })
    };

    commitChange () {
        const {
            onChange,
            displayFormat,
            value: propsValue
        } = this.props

        const {
            value
        } = this.state;

        if (!value) {
            onChange(null);
            return;
        }

        if (propsValue === value) {
            // No change to commit
            return;
        }

        const dateTime = moment(value, displayFormat)

        if (dateTime.isValid()) {
            onChange(dateTime)
        } else {
            const dateTimeIso = moment(this.state.value)

            if (dateTimeIso.isValid()) {
                onChange(dateTimeIso)
            }
        }
    }

    onBlur = () => {
        this.commitChange()
    };

    onKeyPress = (e) => {
        if (e.charCode === 13) {
            this.commitChange()
        }
    };

    render () {
        const {
            bsSize,
            icons,
            inputProps,
            mode,
            onClick,
        } = this.props

        const {
            value
        } = this.state

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
                       onBlur={ this.onBlur }
                       onKeyPress={ this.onKeyPress }
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
