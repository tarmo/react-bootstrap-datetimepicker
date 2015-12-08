import React, { Component } from "react"
import { render } from "react-dom"
import DateTimePicker from "../../src/index.js"

const style = {
    marginBottom: 30
}

class Example extends Component {
    render () {
        return (
            <div className="row" style={ style }>
                <div className="col-md-4">
                    <DateTimePicker sideBySide />
                </div>
            </div>
        )
    }
}

class Docs extends Component {
    render () {
        return (
            <div className="container-fluid">
                <div className="container">
                <h1>Works</h1>
                    <div className="row" style={ style }>
                        <div className="col-md-4">
                            <DateTimePicker />
                        </div>
                    </div>

                    <div className="row" style={ style }>
                        <div className="col-md-4">
                            <DateTimePicker sideBySide />
                        </div>
                    </div>

                    <div className="row" style={ style }>
                        <div className="col-md-12">
                            <DateTimePicker inline />
                        </div>
                    </div>

                    <div className="row" style={ style }>
                        <div className="col-md-12">
                            <DateTimePicker inline sideBySide />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

render(<Docs />, document.querySelector(".docs"))
