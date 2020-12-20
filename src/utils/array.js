/**
 * 检查一个值是否在给定的数组中 不在这返回指定的默认value
 * @param {any} value 
 * @param {array} array 
 * @param {any} defaultValue 
 */
const verifyValueInArray = (value, array, defaultValue = array[0]) => {
  if (!value) return defaultValue
  if (array.indexOf(value) !== -1) return value
  return defaultValue
}

/**
 * 从数组中查找值是否在数组中
 * @param {string} value 
 * @param {array} array 
 * @param {string} key 表明要查找在数组是个三维数组 这个表示这个在对象中的键名
 */
const getInArrayIndex = (value, array, key) => {
  if (key !== undefined) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return i
      }
    }
    return -1
  } else {
    return array.indexOf(value)
  }
}

export {
  verifyValueInArray,
  getInArrayIndex
}