import React, { Component } from "react"
import { Transition } from "react-overlays"

const TRANSITION_TIMEOUT = 200

class Fade extends Component {

    static propTypes = {
        children : React.PropTypes.element
    }

    render () {
        const { children } = this.props

        return (
            <Transition { ...this.props }
                        timeout={ TRANSITION_TIMEOUT }
                        className="fade"
                        enteringClassName="in"
                        enteredClassName="in">
                { children }
            </Transition>
        )
    }
}

export default Fade
