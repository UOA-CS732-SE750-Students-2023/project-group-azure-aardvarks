/**
 * encapsulated returnMsg.
 * All return should follow this formatted return message
 * @param status number  eg 0, 1
 * @param code  number eg 200, 500
 * @param msg  message eg: xxx error or [{xxx:xxx}]
 * @returns {{msg, code, status}}
 */
export function returnMsg(status, code, msg){
    return{
      "status":status,
      "code":code,
      "data":msg
    }
}


/**
 * @param pageSize 10 in default
 * @param pageNum 1 in default
 * @param data , object database (did not await database, otherwise it can not be use)
 * @param callback callback function
 * @returns {Promise<{data: *, length, pageSize, currentPage}>}
 */
export async function PaginatorAsync(pageSize=10, pageNum=1, data, callback=null){
    const slicedData = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    if (callback){
        await callback(slicedData)
    }
    return {
        "pageSize":pageSize,
        "currentPage":pageNum,
        "length":data.length,
        "data":slicedData
    }
}

/**
 * @param pageSize 10 in default
 * @param pageNum 1 in default
 * @param data , object database (did not await database, otherwise it can not be use)
 * @param callback callback function
 * @returns {Promise<{data: *, length, pageSize, currentPage}>}
 */
export function Paginator(pageSize=10, pageNum=1, data, callback=null){
    const slicedData = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    if (callback){
        callback(slicedData)
    }
    return {
        "pageSize":pageSize,
        "currentPage":pageNum,
        "length":data.length,
        "data":slicedData
    }
}

/**
 * date formatted
 * @param date
 * @returns {string }   eg "2023-04-17 23:06:40"
 */
// export function formatDateTime(date) {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     const seconds = String(date.getSeconds()).padStart(2, '0');
//
//     return `${year}-${month}-${day} ${hours}:${minutes}`;
// }
//
// function pad(num) {
//     return num.toString().padStart(2, '0');
// }

export function formatDateTime(date) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const [
        { value: month },,
        { value: day },,
        { value: year },,
        { value: hour },,
        { value: minute },,
        { value: second },,
    ] = formatter.formatToParts(date);

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}