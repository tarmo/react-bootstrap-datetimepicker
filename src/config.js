class Config {

    DEFAULT_FORMAT = "x"

    BOOTSTRAP_SIZE_SM = "sm"
    BOOTSTRAP_SIZE_LG = "lg"

    MODE_DATE = "date"
    MODE_TIME = "time"
    MODE_DATETIME = "datetime"

    VIEW_MODE_DAYS = "days"
    VIEW_MODE_MONTHS = "months"
    VIEW_MODE_YEARS = "years"

    VIEW_MODE_TIME = "time"
    VIEW_MODE_HOURS = "hours"
    VIEW_MODE_MINUTES = "minutes"
    VIEW_MODE_SECONDS = "seconds"

    INPUT_FORMAT_DATE = "L"
    INPUT_FORMAT_TIME = "LT"
    INPUT_FORMAT_DATETIME = "L LT"

    VIEW_DATE = "date"
    VIEW_TIME = "time"

    PLACEMENT_TOP = "top"
    PLACEMENT_BOTTOM = "bottom"

    static props = {}

    getProp (name) {
        return Config.props[name]
    }

    setProp (name, value) {
        Config.props = Object.assign({}, Config.props, {
            [name] : value
        })
    }

}

export default new Config()


export const BOOTSTRAP_SIZE_SM = "sm"
export const BOOTSTRAP_SIZE_LG = "lg"
export const DEFAULT_DAY_VIEW_HEADER = "MMMM YYYY"
export const DEFAULT_FORMAT = "x"
export const INPUT_FORMAT_DATE = "L"
export const INPUT_FORMAT_TIME = "LT"
export const INPUT_FORMAT_DATETIME = "L LT"
export const MODE_DATE = "date"
export const MODE_TIME = "time"
export const MODE_DATETIME = "datetime"
export const PLACEMENT_AUTO = "auto"
export const PLACEMENT_DEFAULT = "default"
export const PLACEMENT_TOP = "top"
export const PLACEMENT_BOTTOM = "bottom"
export const VIEW_MODE_DAYS = "days"
export const VIEW_MODE_MONTHS = "months"
export const VIEW_MODE_YEARS = "years"
export const VIEW_MODE_DECADES = "decades"
export const VIEW_MODE_TIME = "time"
export const VIEW_MODE_HOURS = "hours"
export const VIEW_MODE_MINUTES = "minutes"
export const VIEW_MODE_SECONDS = "seconds"
export const VIEW_DATE = "date"
export const VIEW_TIME = "time"
