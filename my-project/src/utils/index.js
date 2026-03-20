import dayjs from "dayjs"

export function formateDate(date){
    return dayjs(date).format('MMMM D, YYYY')
}

export function formateTime(time){
    return dayjs(`2026-01-01 ${time}`).format('h:mm a')
}

export function getDaysDifference(targetDateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const target = new Date(targetDateStr);
  target.setHours(0, 0, 0, 0);

  
  const diffInMs = target.getTime() - today.getTime();
  
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  
  return diffInDays;
}
