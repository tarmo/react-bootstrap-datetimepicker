import React, { Component } from "react"
import { render } from "react-dom"
import DateTimePicker from "../../src/index.js"
import moment from "moment"

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
                            <DateTimePicker useCurrent={false} showClose showClear showTodayButton toolbarPlacement="bottom" />
                        </div>
                    </div>

                    <div className="row" style={ style }>
                        <div className="col-md-4">
                            <DateTimePicker showClose showClear showTodayButton toolbarPlacement="bottom" mode="date" />
                        </div>
                    </div>

                    <div className="row" style={ style }>
                        <div className="col-md-4">
                            <DateTimePicker sideBySide />
                        </div>
                    </div>

                    <div className="row" style={ style }>
                        <div className="col-md-4">
                            <DateTimePicker inline />
                        </div>
                    </div>

                    <div className="row" style={ style }>
                        <div className="col-md-8">
                            <DateTimePicker inline sideBySide />
                        </div>
                    </div>

                    <div className="row" style={ style }>
                        <div className="col-md-8">
                            <DateTimePicker minDate={ moment([1990, 4, 13]) } maxDate={ moment() }  inline sideBySide locale="pl" format="LLL" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

render(<Docs />, document.querySelector(".docs"))
