import React from 'react'
import { dateToStr } from '../../utils'

/**
 * 获取表单的默认值
 * @param {array} form 表单
 * @return {object} 表单值
 */
const getFormDefaultValue = (form, value = {}) => {
  for (let i = 0, l = form.length; i < l; i++) {
    const item = form[i]
    if (item.name !== undefined && value[item.name] !== undefined) {
      continue
    }
    switch (item.tpl) {
      case 'input':
        value[item.name] = ''
        break
      case 'date':
        value[item.name] = dateToStr('yyyy-MM-dd')
        break
      case 'time':
        value[item.name] = dateToStr('HH:mm')
        break
      case 'switch':
        value[item.name] = false
        break
      case 'steep':
        value[item.name] = item.min
        break
      case 'rate':
        value[item.name] = item.rule
        break
      case 'select':
        if (item.type === 'radio') {
          value[item.name] = item.option[0].value
        } else {
          value[item.name] = []
        }
        break
      case 'flex':
      case 'row':
      case 'tab':
        value = {
          ...value, ...getFormDefaultValue(item.child, value)
        }
        break
      case 'object':
        value[item.name] = getFormDefaultValue(item.child, value[item.name])
        break
      case 'child-array':
        if (value[item.name] === undefined) {
          value[item.name] = []
        }
        break
      case undefined:
        if (item.child) {
          value = {
            ...value, ...getFormDefaultValue(item.child, value)
          }
        }
        break
    }
  }
  return value
}

/**
 * 递归设置value
 * @param {array} keys key数组
 * @param {object|array} data 被设置的对象
 * @param {any} value 要设置的值
 * @param {string} child 在递归时要调用的子集字段
 * @param {boolean} splice 使用使用splice插入数据 仅支持数组
 */
const recursionSetValue = (keys, data, value, childKey, splice = false) => {
  keys = [...keys]
  if (keys.length === 1) {
    if (splice) {
      data.splice(keys[0], 0, value)
    } else {
      data[keys[0]] = value
    }
  } else {
    if (childKey && data[keys[0]][childKey] === undefined) {
      data[keys[0]][childKey] = []
    }
    recursionSetValue(keys.slice(1), childKey ? data[keys[0]][childKey] : data[keys[0]], value, childKey, splice)
  }
}

/**
 * 递归获取value
 * @param {array} keys key数组
 * @param {object|array} data 被获取的对象
 * @param {string} childKey 在递归时要调用的子集字段
 * @param {boolean} splice 是否将此值删除 仅支持数组
 */
const recursionGetValue = (keys, data, childKey, splice = false) => {
  if (keys.length === 1) {
    return splice ? data.splice(keys[0], 1)[0] : data[keys[0]]
  } else {
    return recursionGetValue(keys.slice(1), childKey === undefined ? data[keys[0]] : data[keys[0]][childKey], childKey, splice)
  }
}

/**
 * 传入两个值 和判断条件 判断是否正确
 * @param {any} value 要判断的值
 * @param {any} beValue 被判断的值
 * @param {string} judge 判断条件 == | != | > | < | >= | <=
 * == | != 时：string| number | array, string | number将直接比较, array 将内容逐一比较 如果两边都是array只要其中有任何一个值相等,就通过验证（交集）
 * > | < | >= | <= 时：string | number 使用大小判断不支持数组，使用数组可能会得到不准确的结果
 * 所有的验证都是使用的非严格验证 如字符串和数组 '2' == 2 true, true == ''  true, true == '0' false
 * @return {boolean} 是否符合条件
 */
const chechWhere = (value, beValue, judge = '==') => {
  const types = [typeof value, typeof beValue]
  const getValue = () => {
    return typeof beValue === 'object' ? beValue[0] : beValue
  }
  switch (judge) {
    case '>':
      return value > getValue()
    case '<':
      return value < getValue()
    case '>=':
      return value >= getValue()
    case '<=':
      return value <= getValue()
    case '==':
    case '!=':
      let show = false
      if (types[0] !== 'object' && types[1] !== 'object') {
        show = value == beValue
      } else if (types[0] !== 'object') {
        show = beValue.some ? beValue.some(item => item == value) : false
      } else if (types[1] !== 'object') {
        show = value.some ? value.some(item => item == beValue) : false
      } else {
        if (!value.some || !beValue.some) {
          show = false
        } else {
          show = value.some(item => beValue.some(child => child == item))
        }
      }
      return judge === '==' ? show : !show
    default:
      return false
  }
}

/**
 * 页面配置全局变量
 */
const ConfigContext = React.createContext({})

export {
  getFormDefaultValue,
  recursionSetValue,
  recursionGetValue,
  chechWhere,
  ConfigContext
}
