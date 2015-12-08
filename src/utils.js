import moment from "moment"

export function getMoment (value, format, locale) {
    if (typeof value === "number") {
        return moment(new Date(value))
    } else if (typeof value === "string") {
        return moment(value, format, locale || moment.locale(), true)
    }

    return moment(value)
}
