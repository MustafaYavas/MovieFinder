

export const convertToDate = (date) => {
    let result;
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth()+1;
    const day = date.getUTCDate();
    const hour = date.getHours();
    const minute = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes()
    result = year + '/' + month + '/' + day +  ' - ' + hour+':'+minute;
    return result;
}