import moment from "moment"

export function getMoment (value, format, locale) {
    if (typeof value === "number") {
        return moment(new Date(value))
    } else if (typeof value === "string") {
        return moment(value, format, locale || moment.locale(), true)
    }

    return moment(value)
}

export function inRangeDates (date, unit, min = null, max = null) {
    let inRange = true

    if (min) {
        inRange = moment(date).endOf(unit).isAfter(moment(min).startOf(unit))
    }

    if (max && inRange) {
        inRange = moment(date).startOf(unit).isBefore(moment(max).endOf(unit))
    }

    return inRange
}

export function inRangeMonts () {

}

export function inRangeYears () {

}

export function inRangeDecades () {

}
