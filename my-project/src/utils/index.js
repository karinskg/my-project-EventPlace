import dayjs from "dayjs"

export function formateDate(date){
    return dayjs(date).format('MMM D, YYYY')
}

export function formateTime(time){
    return dayjs(`2026-01-01 ${time}`).format('h:mm a')
}