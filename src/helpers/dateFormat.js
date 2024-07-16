const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
}
export default function(dateString) {
    return new Intl.DateTimeFormat('en-US', options).format(Date.parse(dateString))
}