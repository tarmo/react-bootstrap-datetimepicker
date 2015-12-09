import React, { Component } from "react"
import { findDOMNode } from "react-dom"
import { Overlay } from "react-overlays"
import { mountable } from "react-prop-types"
import DateTimePickerInput from "../components/input.js"
import DateTimePickerContainer from "../components/container.js"
import DateTimePickerLayoutHorizontal from "./horizontal.js"
import DateTimePickerLayoutVertical from "./vertical.js"

class DateTimePickerLayoutPopup extends Component {

    static propTypes = {
        bsSize     : React.PropTypes.string,
        container  : mountable,
        datePicker : React.PropTypes.node,
        icon       : React.PropTypes.bool,
        icons      : React.PropTypes.object,
        sideBySide : React.PropTypes.bool,
        timePicker : React.PropTypes.node,
        value      : React.PropTypes.string
    }

    static defaultProps = {
        container : global.document.querySelector("body")
    }

    state = {
        show : false
    }

    onClickInput = (e) => {
        e.preventDefault()

        this.setState({
            show : !this.state.show
        })
    }

    onHidePopup = () => {
        this.setState({
            show : false
        })
    }

    render () {
        const {
            bsSize,
            container,
            datePicker,
            icon,
            icons,
            sideBySide,
            timePicker,
            value
        } = this.props

        const {
            show
        } = this.state

        let picker

        if (sideBySide) {
            picker = (
                <DateTimePickerLayoutHorizontal datePicker={ datePicker }
                                                timePicker={ timePicker } />
            )
        } else {
            picker = (
                <DateTimePickerLayoutVertical datePicker={ datePicker }
                                              icons={ icons }
                                              timePicker={ timePicker } />
            )
        }

        return (
            <div style={ { position : "relative" } }>
                <DateTimePickerInput ref="input"
                                     bsSize={ bsSize }
                                     icon={ icon }
                                     icons={ icons }
                                     onClick={ this.onClickInput }
                                     value={ value } />
                <Overlay placement="bottom"
                         show={ show }
                         onHide={ this.onHidePopup }
                         container={ container }
                         target={ () => findDOMNode(this.refs.input) }>
                    <DateTimePickerContainer>
                        { picker }
                    </DateTimePickerContainer>
                </Overlay>
            </div>
        )
    }

}

export default DateTimePickerLayoutPopup
