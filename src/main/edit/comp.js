import Taro from '@tarojs/taro'
import formConfig from './form_config'
import Create from './form_create'
import { isNumber } from '../../utils/string'

export default {
  // 获取测试表单
  testForm() {
    return Object.keys(formConfig.list).map(key => this.getComp(key))
  },

  // 获取组件列表
  getComps() {
    const list = []
    for (const key in formConfig.list) {
      if (formConfig.list.hasOwnProperty(key)) {
        list.push({
          text: formConfig.list[key].text,
          cate: formConfig.list[key].cate,
          tpl: key
        })
      }
    }
    return list
  },
  // 获取组件分类
  getCates() {
    return formConfig.cate
  },

  // 获取组件名称
  getCompName(tpl) {
    return formConfig.list[tpl].text
  },

  /**
   * 获取组件属性
   * @param {string} tpl 当前组件
   * @param {string} parentTpl 父组件
   */
  getCompAttr(tpl, parentTpl) {
    let data = {
      parentAttr: null
    }
    if (tpl) {
      const item = formConfig.list[tpl]
      data = { ...data, ...item.attr(), tpl }
    }
    if (parentTpl) {
      const item = formConfig.list[parentTpl]
      if (item?.child?.attr) {
        data.parentAttr = item.child.attr()
      }
    }
    return data
  },

  /**
   * 组件属性转换
   * 转换style属性
   * @param {object} attr 属性
   */
  attrTransform(attr) {
    // 这些字段表示是样式
    const styleNames = ['style', 'compStyle', 'compTextStyle', 'compTipStyle']
    const numberStyles = ['width', 'height', 'top', 'left', 'right', 'bottom', 'padding', 'paddingLeft', 'paddingTop', 'paddingBottom', 'paddingRight', 'margin', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'fontSize', 'borderWidth', 'borderTopWidth', 'borderRightWidth', , 'borderBottomWidth', , 'borderLeftWidth', 'borderRadius']
    for (let i = 0; i < styleNames.length; i++) {
      const name = styleNames[i]
      if (attr[name]) {
        const style = attr[name] = { ...attr[name] }
        for (const key in style) {
          // 属性为空 则删除这个属性
          if (style[key] === '' || style[key] === undefined) {
            delete style[key]
            continue
          }
          // 是否是数字类型样式 需要经过转换
          if (numberStyles.includes(key)) {
            if (isNumber(style[key])) {
              style[key] = Taro.pxTransform(style[key])
            }
            continue
          }
        }
      }
    }
    return attr
  },

  /**
   * 合并组件属性和父组件指定子组件的属性 返回一个新的对象
   * 处理后的值将处理style 使用于多个平台样式
   * @param {object} attr 组件属性
   * @param {object} attrTow 组件属性2
   */
  attrMerge(attr, attrTow = attr.parentAttr) {
    if (typeof attrTow === 'object') {
      const data = { ...attr, parentAttr: null }
      for (const key in attrTow) {
        if (data[key] === undefined || data[key].toString() !== '[object Object]') {
          data[key] = attrTow[key]
        } else {
          // 合并对象
          data[key] = this.attrMerge(data[key], attrTow[key])
        }
      }
      return this.attrTransform(data)
    } else {
      return this.attrTransform(attr)
    }
  },

  /**
   * 判断childTpl组件能不能放在tpl组件的child
   * @param {string} tpl 当前组件
   * @param {string} childTpl 子组件
   */
  isChildDisable(tpl, childTpl) {
    const item = formConfig.list[tpl]
    if (!item || !item.child || !item.child.disable) {
      return false
    }
    const child = formConfig.list[childTpl]
    const { disable } = item.child
    disable.compContain
    // 组件是否可用
    const comp = disable.comp ? disable.comp.includes(childTpl) : true
    // 分类是否可用
    const cate = disable.cate ? disable.cate.includes(child.cate) : true
    // 两个都是包含关系 只要其中任何一个符合就成立
    if (disable.compContain && disable.cateContain) {
      return !(comp || cate)
    }
    return !(comp && cate)
  },

  /**
   * 判断当前表单能不能继续添子表单 用于限制子表单最大数量
   * @param {string} tpl
   * @param {number} length 当前表单长度
   */
  isChildAdd(tpl, length) {
    const attr = formConfig.list[tpl].publicAttr
    // 只有函数才能配置最大数量
    if (attr.includes('child')) {
      return true
    }
    for (let i = 0; i < attr.length; i++) {
      if (typeof attr[i] === 'function' && attr[i]()[0] === 'child') {
        const child = attr[i]()
        if (!child[2] || child[2].max === undefined || length < child[2].max) {
          return true
        }
        return false
      }
    }
    return true
  },

  /**
   * 获取当前编辑组件的表单
   * @param {string} tpl 编辑的模板
   * @param {string} parentTpl 父级的模板
   */
  getEditForm(tpl, parentTpl) {
    const item = formConfig.list[tpl]
    const form = item.form ? item.form() : []
    // 判断子是否在一下有子属性的表单里面 添加这个属性
    if (parentTpl) {
      const parent = formConfig.list[parentTpl]
      if (parent.child?.form) {
        form.push(Create.init('panel').panel('嵌套表单属性').child([
          Create.init('object', '', 'parentAttr').child(parent.child.form()).get()
        ]).get())
      }
    }
    return { form, text: item.text }
  }
}
