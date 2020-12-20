import { toast } from './util'

/**
 * 验证规则合集
 * phone 手机号
 * tel 座机号
 * email 邮件
 * money 金钱验证 不包含￥$符号
 * idcard 身份证
 */
const localRegs = {
  phone: /^1\d{10}$/,
  tel: /^([0-9]{3,4}-)?[0-9]{7,8}$/,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  money: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
  idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  password: /^[0-9A-Za-z`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*]*$/,
  url: /[a-zA-z]+:\/\/[^\s]*/,
  number: /^-?[1-9]\d*$/
}

/**
 * 内容验证
 * @param {string} value 要验证的值
 * @param {object} verify 验证规则
 *
 * required 必填, phone 手机号码, tel 电话号码, email 邮件, money 钱, idcard 身份证
 * 第一个不是required的话 为空不验证
 * 更多验证方式可以通过regsExt参数指定
 *
 * 长度验证
 * l5 长度为5
 * l5_ 长度大于等于5
 * l_6 长度小于等于6
 * l1_5 长度1-5
 *
 * and验证用|隔开 or验证用-隔开 and优先于or
 * {
 *  reg: 'required|phone-tel|l5_8',
 *  name: '字段名',
 *  emptyMsg: '为空提示',
 *  errMsg: '验证错误提示',
 *  lengthErrMsg: '长度错误提示'
 * }
 * @param {object} regsExt 扩展验证
 * @param {boolean} hideToast 是否隐藏验证提示
 *
 * @return {boolean|string} 是否验证通过 当传入hideToast时验证不通过会返回错误描述，所以验证请验证 === true表示为通过验证
 */
const verifyValue = (value, verify, regsExt = {}, hideToast = false) => {
  const verifyRegs = { ...localRegs, ...regsExt }
  let regs = []
  // 兼容后台编辑的验证方式
  if (typeof verify.reg === 'object') {
    // 必填验证
    if (verify.required) {
      regs.push('required')
    }
    // 正则验证
    if (verify.reg.length > 0) {
      regs.push(verify.reg.join('_'))
    }
    // 长度验证
    if (verify.lenType !== '') {
      switch (verify.lenType) {
        case '==':
          regs.push('l' + verify.len)
          break
        case '>=':
          regs.push(`l${verify.lenMin}_`)
          break
        case '<=':
          regs.push(`l_${verify.lenMin}`)
          break
        case 'between':
          regs.push(`l${verify.lenMin}_${verify.lenMin}`)
          break
        default:
          break
      }
    }
  } else {
    regs = verify.reg.split("|")
  }
  for (let i = 0, l1 = regs.length; i < l1; i++) {
    const regOr = regs[i].split('-')
    // 是否验证通过
    let flag = false
    let errType = 'required'
    let lenErrText = ''
    for (let j = 0, l2 = regOr.length; j < l2; j++) {
      if (flag) break
      const reg = regOr[j]
      if (reg === 'required') {
        flag = !!value
        continue
      }
      if (verifyRegs[reg]) {
        // 为空不验证
        if (!value) {
          flag = true
          continue
        }
        flag = verifyRegs[reg].test(value)
        errType = 'error'
        continue
      }
      if (/^l(\d{1,}$|\d{1,}_$|\d{1,}_\d{1,}$|_\d{1,}$)/.test(reg)) {
        // 为空不验证
        if (!value) {
          flag = true
          continue
        }
        // 长度验证
        let underLen = reg.indexOf('_')
        let start
        let end
        if (underLen === -1) {
          // 等于
          start = Number(reg.substr(1))
          flag = value.length === start
          lenErrText = '长度需等于' + start
        } else if (underLen === 1) {
          // 小于等于
          end = Number(reg.substr(2))
          flag = value.length <= end
          lenErrText = '长度需小于等于' + end
        } else {
          start = Number(reg.substr(1, underLen - 1))
          end = reg.substr(underLen + 1) ? Number(reg.substr(underLen + 1)) : 0
          if (!end) {
            // 大于等于
            flag = value.length >= start
            lenErrText = '长度需大于等于' + start
          } else {
            // 介于
            flag = value.length >= start && value.length <= end
            lenErrText = '长度需介于' + start + ' ~ ' + end
          }
        }
        errType = 'length'
        continue
      }
      // 找不到任何验证方式 则通过验证
      flag = true
    }
    let errMsg = ''
    if (errType === 'required') {
      errMsg = verify.emptyMsg || '请输入' + verify.name
    } else if (errType === 'error') {
      errMsg = verify.errMsg || '请输入正确的' + verify.name
    } else if (errType === 'length') {
      errMsg = verify.lengthErrMsg || verify.name + lenErrText
    }
    if (!flag && !hideToast) {
      toast(errMsg)
    }
    if (!flag) {
      return errMsg
    }
  }
  return true
}


/**
 * 批量内容验证
 * @param {object} values 要验证的值合集
 * @param {object} verifys 验证规则合集
 * @param {object} regsExt 扩展验证
 * @param {boolean} hideToast 是否隐藏验证提示
 * @param {boolean} getKey 是否返回验证失败的字段名 这样则会把原来的false更换为字段名 所以验证通过要用全等===true
 *
 * @return {boolean} 是否验证通过
 */
const batchVerify = (values, verifys, regsExt = {}, hideToast = false, getKey = false) => {
  for (const key in verifys) {
    if (verifys.hasOwnProperty(key) && values[key] !== undefined && verifyValue(values[key], verifys[key], regsExt, hideToast) !== true) {
      return getKey ? key : false
    }
  }
  return true
}

export default verifyValue

export {
  batchVerify
}
