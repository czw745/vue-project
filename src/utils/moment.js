import moment from 'moment'

export function dateTimeFormat (date) {
    if (!date) {
        return ''
    }
    return moment(date).format('YYYY/MM/DD HH:mm')
}

export function dateFormat (date) {
    if (!date) {
        return ''
    }
    return moment(date).format('YYYY/MM/DD')
}
