/**
 * commonUtils.js shored all common utilities
 */







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