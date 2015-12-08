import React, { Component } from "react"
import classNames from "classnames"
import Config from "../config.js"

class DateTimeSwitch extends Component {

    static propTypes = {
        icons   : React.PropTypes.object,
        onClick : React.PropTypes.func,
        view    : React.PropTypes.oneOf([
            Config.VIEW_DATE,
            Config.VIEW_TIME
        ])
    }

    render () {
        const {
            icons,
            onClick,
            view
        } = this.props

        const iconClasses = classNames({
            [icons.date] : view === Config.VIEW_TIME,
            [icons.time] : view === Config.VIEW_DATE
        })

        return (
            <li className="picker-switch">
                <table className="table-condensed">
                    <tbody>
                        <tr>
                            <td>
                                <a title="Select Time" onClick={ onClick }>
                                    <span className={ iconClasses } />
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </li>
        )
    }

}

export default DateTimeSwitch
