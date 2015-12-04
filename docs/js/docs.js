import React, { Component } from "react"
import { render } from "react-dom"
import DateTimePicker from "../../src/index.js"

class Docs extends Component {
    render () {
        return (
            <div className="container-fluid">
                <div className="container">
                <h1>Works</h1>
                    <div className="col-md-4">
                        <DateTimePicker />
                    </div>
                </div>
            </div>
        )
    }
}

render(<Docs />, document.querySelector(".docs"))
