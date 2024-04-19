export default function getDate() {
  var date = new Date()
  date = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  date =
    date.getUTCFullYear() +
    '-' +
    ('00' + (date.getUTCMonth() + 1)).slice(-2) +
    '-' +
    ('00' + date.getUTCDate()).slice(-2) +
    ' ' +
    ('00' + date.getUTCHours()).slice(-2) +
    ':' +
    ('00' + date.getUTCMinutes()).slice(-2) +
    ':' +
    ('00' + date.getUTCSeconds()).slice(-2)

  return date
}
