import React, { Component } from "react"
import { findDOMNode } from "react-dom"
import { Overlay } from "react-overlays"
import { mountable } from "react-prop-types"
import MomentPropTypes from "react-moment-proptypes"
import Fade from "../components/fade.js"
import DateTimePickerInput from "../components/input.js"
import DateTimePickerContainer from "../components/container.js"
import DateTimePickerLayoutHorizontal from "./horizontal.js"
import DateTimePickerLayoutVertical from "./vertical.js"
import { MODE_DATE } from "../config.js"
import moment from "moment"

class DateTimePickerLayoutInput extends Component {

    static propTypes = {
        bsSize     : React.PropTypes.string,
        container  : mountable,
        datePicker : React.PropTypes.node,
        dateTime   : MomentPropTypes.momentObj,
        debug      : React.PropTypes.bool,
        icon       : React.PropTypes.bool,
        icons      : React.PropTypes.object,
        sideBySide : React.PropTypes.bool,
        timePicker : React.PropTypes.node,
        value      : React.PropTypes.string,

        inputComponent: React.PropTypes.func
    };

    static defaultProps = {
        container : global.document.querySelector("body"),
        inputComponent: DateTimePickerInput
    };

    state = {
        show : false
    };

    componentWillReceiveProps (props) {
        const { show } = this.state
        const {
            mode,
            keepOpen,
            dateTime,
            selected
        } = props

        const dayChanged = moment(this.props.dateTime).date() !== moment(dateTime).date()

        if (show && selected && dayChanged && !keepOpen && mode === MODE_DATE) {
            this.setState({ show : false })
        }
    }

    onClickInput = (e) => {
        e.preventDefault()

        this.setState({
            show : !this.state.show
        })
    };

    onHidePopup = () => {
        this.setState({ show : false })
    };

    onClickClose = () => {
        this.setState({ show : false })
    };

    render () {
        const {
            container,
            debug,
            sideBySide,
            inputComponent: InputComponent
        } = this.props
        const { show } = this.state
        let picker

        if (sideBySide) {
            picker = (
                <DateTimePickerLayoutHorizontal { ...this.props } />
            )
        } else {
            picker = (
                <DateTimePickerLayoutVertical { ...this.props }
                                              onClickClose={ this.onClickClose } />
            )
        }

        const target = () => findDOMNode(this.refs.input)

        return (
            <div style={ { position : "relative" } }>
                <InputComponent { ...this.props }
                                     show={ show }
                                     ref="input"
                                     onClick={ this.onClickInput } />
                <Overlay placement="bottom"
                         show={ show }
                         rootClose={ !debug }
                         transition={ Fade }
                         onHide={ this.onHidePopup }
                         container={ container }
                         unmountOnExit
                         target={ target }>
                    <DateTimePickerContainer { ...this.props }
                                             target={ target }>
                        { picker }
                    </DateTimePickerContainer>
                </Overlay>
            </div>
        )
    }

}

export default DateTimePickerLayoutInput
