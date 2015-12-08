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
