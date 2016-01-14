import React, { Component } from "react"
import classNames from "classnames"
import {
    MODE_DATETIME,
    VIEW_DATE,
    VIEW_TIME
} from "../config.js"

class DateTimeToolbar extends Component {

    static propTypes = {
        icons           : React.PropTypes.object,
        inline          : React.PropTypes.bool,
        mode            : React.PropTypes.string,
        onClickClear    : React.PropTypes.func,
        onClickClose    : React.PropTypes.func,
        onClickSwitch   : React.PropTypes.func,
        onClickToday    : React.PropTypes.func,
        showClear       : React.PropTypes.bool,
        showClose       : React.PropTypes.bool,
        showTodayButton : React.PropTypes.bool,
        tooltips        : React.PropTypes.object,
        view            : React.PropTypes.oneOf([VIEW_DATE, VIEW_TIME])
    };

    renderToday () {
        const {
            icons,
            onClickToday,
            tooltips
        } = this.props

        return (
            <td>
                <a title={ tooltips.today } onClick={ onClickToday }>
                    <span className={ icons.today } />
                </a>
            </td>
        )
    }

    renderClear () {
        const {
            icons,
            onClickClear,
            tooltips
        } = this.props

        return (
            <td>
                <a title={ tooltips.clear } onClick={ onClickClear }>
                    <span className={ icons.clear } />
                </a>
            </td>
        )
    }

    renderClose () {
        const {
            icons,
            onClickClose,
            tooltips
        } = this.props

        return (
            <td>
                <a title={ tooltips.close } onClick={ onClickClose }>
                    <span className={ icons.close } />
                </a>
            </td>
        )
    }

    renderSwitch () {
        const {
            icons,
            onClickSwitch,
            tooltips,
            view
        } = this.props

        const iconClasses = classNames({
            [icons.date] : view === VIEW_TIME,
            [icons.time] : view === VIEW_DATE
        })

        return (
            <td>
                <a title={ tooltips.selectTime } onClick={ onClickSwitch }>
                    <span className={ iconClasses } />
                </a>
            </td>
        )
    }

    render () {
        const {
            inline,
            mode,
            showTodayButton,
            showClear,
            showClose
        } = this.props

        return (
            <table className="table-condensed">
                <tbody>
                    <tr>
                        { showTodayButton && this.renderToday() }
                        { mode === MODE_DATETIME && this.renderSwitch() }
                        { showClear && this.renderClear() }
                        { !inline && showClose && this.renderClose() }
                    </tr>
                </tbody>
            </table>
        )
    }

}

export default DateTimeToolbar
