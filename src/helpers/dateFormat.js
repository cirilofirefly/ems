function dateFormat(dateString, options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
}) {
    return new Intl.DateTimeFormat('en-US', options).format(Date.parse(dateString))
}

export default dateFormat