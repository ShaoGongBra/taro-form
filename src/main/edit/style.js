import Create from './form_create'

const quickForm = {
  number(name, text) {
    return Create.init('input', text, name).inputNumber().get()
  },
  select(name, text, option) {
    return Create.init('select', text, name).select(option).get()
  },
  color(name, text) {
    return Create.init('color', text, name).get()
  }
}

const styleConfig = {
  width: {
    attr: () => ({ width: '' }),
    form: () => ([quickForm.number('width', '宽度')])
  },
  height: {
    attr: () => ({ height: '' }),
    form: () => ([quickForm.number('height', '高度')])
  },
  fontSize: {
    attr: () => ({ fontSize: 24 }),
    form: () => ([quickForm.number('fontSize', '字号')])
  },
  padding: {
    attr: () => ({ padding: '', paddingLeft: '', paddingRight: '', paddingTop: '', paddingBottom: '' }),
    form: () => ([
      Create.init('compose').child([
        quickForm.number('padding', '内边距'),
        quickForm.number('paddingLeft', '左内边距'),
        quickForm.number('paddingRight', '右内边距'),
        quickForm.number('paddingTop', '上内边距'),
        quickForm.number('paddingBottom', '下内边距')
      ]).get()
    ])
  },
  margin: {
    attr: () => ({ margin: '', marginLeft: '', marginRight: '', marginTop: '', marginBottom: '' }),
    form: () => ([
      Create.init('compose').child([
        quickForm.number('margin', '外边距'),
        quickForm.number('marginLeft', '左外边距'),
        quickForm.number('marginRight', '右外边距'),
        quickForm.number('marginTop', '上外边距'),
        quickForm.number('marginBottom', '下外边距')
      ]).get()
    ])
  },
  border: {
    attr: () => ({ borderStyle: '', borderWidth: '', borderLeftWidth: '', borderRightWidth: '', borderTopWidth: '', borderBottomWidth: '', borderColor: '', borderLeftColor: '', borderRightColor: '', borderTopColor: '', borderBottomColor: '' }),
    form: () => ([
      quickForm.select('borderStyle', '边框样式', [
        { text: '无边框', value: '' },
        { text: '实线', value: 'solid' },
        { text: '点状', value: 'dotted' },
        { text: '双线', value: 'double' },
        { text: '虚线', value: 'dashed' }
      ]),
      Create.init('compose').child([
        quickForm.number('borderWidth', '边框宽度'),
        quickForm.number('borderLeftWidth', '左边框宽度'),
        quickForm.number('borderRightWidth', '右边框宽度'),
        quickForm.number('borderTopWidth', '上边框宽度'),
        quickForm.number('borderBottomWidth', '下边框宽度'),
      ]).get(),
      Create.init('compose').child([
        quickForm.color('borderColor', '边框颜色'),
        quickForm.color('borderLeftColor', '左边框颜色'),
        quickForm.color('borderRightColor', '右边框颜色'),
        quickForm.color('borderTopColor', '上边框颜色'),
        quickForm.color('borderBottomColor', '下边框颜色')
      ]).get()
    ])
  },
  borderRadius: {
    attr: () => ({ borderRadius: '' }),
    form: () => ([
      quickForm.number('borderRadius', '圆角')
    ])
  },
  backgroundColor: {
    attr: () => ({ backgroundColor: '' }),
    form: () => ([
      quickForm.color('backgroundColor', '背景颜色')
    ])
  },
  color: {
    attr: () => ({ color: '' }),
    form: () => ([
      quickForm.color('color', '颜色')
    ])
  },
  lineHeight: {
    attr: () => ({ lineHeight: 1.5 }),
    form: () => ([
      quickForm.number('lineHeight', '行高')
    ])
  },
  fontWeight: {
    attr: () => ({ fontWeight: 'normal' }),
    form: () => ([
      quickForm.select('fontWeight', '是否加粗', [
        { text: '不加粗', value: 'normal' },
        { text: '加粗', value: 'bold' }
      ])
    ])
  },
  textAlign: {
    attr: () => ({ textAlign: 'left' }),
    form: () => ([
      quickForm.select('textAlign', '文本对齐', [
        { text: '居左', value: 'left' },
        { text: '居中', value: 'center' },
        { text: '居右', value: 'right' }
      ])
    ])
  },
  flexDirection: {
    attr: () => ({ flexDirection: 'row' }),
    form: () => ([
      quickForm.select('flexDirection', '方向', [
        { text: '横向', value: 'row' },
        { text: '竖向', value: 'column' }
      ])
    ])
  },
  flex: {
    attr: () => ({ flex: '' }),
    form: () => ([
      quickForm.number('flex', 'flex比例')
    ])
  },
  flexWrap: {
    attr: () => ({ flexWrap: 'wrap' }),
    form: () => ([
      quickForm.select('flexWrap', '换行', [
        { text: '自动换行', value: 'wrap' },
        { text: '不换行', value: 'nowrap' }
      ])
    ])
  },
  alignItems: {
    attr: () => ({ alignItems: 'stretch' }),
    form: () => ([
      quickForm.select('alignItems', '主轴对齐', [
        { text: '开始', value: 'flex-start' },
        { text: '居中', value: 'center' },
        { text: '结束', value: 'flex-end' },
        { text: '拉伸对齐', value: 'stretch' }
      ])
    ])
  },
  justifyContent: {
    attr: () => ({ justifyContent: 'flex-start' }),
    form: () => ([
      quickForm.select('justifyContent', '辅轴对齐', [
        { text: '开始', value: 'flex-start' },
        { text: '居中', value: 'center' },
        { text: '结束', value: 'flex-end' },
        { text: '两端对齐', value: 'space-between' }
      ])
    ])
  }
}

export default {
  /**
   * 返回样式
   * @param {array} list 样式属性
   */
  getAttr(list) {
    let data = {}
    for (let i = 0, l = list.length; i < l; i++) {
      if (list[i].value && list[i].name) {
        data[list[i].name] = list[i].value
      } else {
        data = { ...data, ...styleConfig[list[i]].attr() }
      }
    }
    return data
  },
  /**
   * 返回用于控制style的表单
   * @param {array} list 样式列表
   */
  getForm(list) {
    const data = []
    for (let i = 0, l = list.length; i < l; i++) {
      data.push(...styleConfig[list[i].name || list[i]].form())
    }
    return data
  }
}

