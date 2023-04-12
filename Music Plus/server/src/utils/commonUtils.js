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
 *
 * @param pageSize 10 in default
 * @param pageNum 1 in default
 * @param data , object database (did not await database, otherwise it can not be use)
 * @param callback callback function
 * @returns {Promise<{data: *, length, pageSize, currentPage}>}
 *
 */
export  function Paginator(pageSize=10, pageNum=1, data, callback=null){
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

