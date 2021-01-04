import Taro from '@tarojs/taro'
import { getKey } from '../../utils/string'
import Create from './form_create'
import style from './style'

/**
 * 创建表单的名称索引 防止重复
 */
let nameIndex = 1

/**
 * 获取公共属性
 */
const getPublicAttr = function () {
  const data = {
    key: getKey(),
  }
  for (let i = 0; i < this.publicAttr.length; i++) {
    const item = this.publicAttr[i]
    if (typeof item === 'function') {
      const res = item()
      data[res[0]] = res[1]
      continue
    }
    if (typeof item === 'object') {
      if (item[0] === 'style' || item[0].endsWith('Style')) {
        data[item[0]] = style.getAttr(item[1])
      }
      continue
    }
    switch (item) {
      case 'name':
        data.name = `${this.tpl}_${nameIndex}`
        nameIndex++
        break
      case 'text':
        data.text = this.text
        break
      case 'tip':
        data.tip = ''
        break
      case 'disabled':
        data.disabled = false
        break
      case 'child':
        data.child = []
        break
      case 'verify':
        data.verify = {
          required: false,
          reg: [],
          lenType: '',
          len: 0,
          lenMin: 0,
          lenMax: 0,
          emptyMsg: '',
          errMsg: '',
          lengthErrMsg: ''
        }
        break
      case 'showWhere':
        data.showWhere = {
          key: '', // 通过哪个key控制
          judge: '==', //  == | != | > | < | >= | <=
          value: [''], // 判断值
        }
        break
      default:
        break
    }
  }
  return data
}

/**
 * 获取公共属性的表单
 */
const getPublicAttrForm = function () {
  if (this.publicAttr.length === 0) {
    return []
  }
  const data = [
    Create.init('panel').panel('公共属性', true).child([]).get()
  ]
  for (let i = 0, l = this.publicAttr.length; i < l; i++) {
    const item = this.publicAttr[i]
    if (typeof item === 'object') {
      if (item[0] === 'style' || item[0].endsWith('Style')) {
        const names = { style: '样式', textStyle: '文本样式', compStyle: '组件样式', compTextStyle: '组件字段名样式', compTipStyle: '组件提示样式' }
        data.push(Create.init('panel').panel(names[item[0]] || '样式', false).child([
          Create.init('object', '', item[0]).child(style.getForm(item[1])).get()
        ]).get())
      }
      continue
    }
    switch (item) {
      case 'name':
        data[0].child.push(Create.init('input', '数据库名', 'name').get())
        break
      case 'text':
        data[0].child.push(Create.init('input', '字段名', 'text').get())
        break
      case 'tip':
        data[0].child.push(Create.init('input', '提示信息', 'tip').get())
        break
      case 'disabled':
        data[0].child.push(Create.init('switch', '是否禁用', 'disabled').valueBoolean().get())
        break
      case 'verify':
        const verifyKeys = [getKey(), getKey(), getKey()]
        data.push(Create.init('panel').panel('字段验证', false).child([
          Create.init('object', '', 'verify').child([
            Create.init('switch', '开启验证', 'open', verifyKeys[0]).get(),
            Create.init('column').where(verifyKeys[0], '==', true).child([
              Create.init('switch', '是否必填', 'required', verifyKeys[1]).get(),
              Create.init('input', '为空提示', 'emptyMsg').where(verifyKeys[1], '==', true).get(),
              Create.init('select', '验证规则', 'reg').select([
                { text: '手机号', value: 'phone' },
                { text: '邮箱', value: 'email' },
                { text: '金钱', value: 'money' },
                { text: '身份证', value: 'idcard' },
                { text: '密码', value: 'password' },
                { text: 'url', value: 'url' },
                { text: '数字', value: 'number' }
              ], 'checkbox').tip('多选表示符合其中任意一个则验证通过').get(),
              Create.init('input', '错误提示', 'errMsg').get(),
              Create.init('select', '长度验证', 'lenType', verifyKeys[2]).select([
                { text: '不验证', value: '' },
                { text: '等于', value: '==' },
                { text: '大于等于', value: '>=' },
                { text: '小于等于', value: '<=' },
                { text: '介于', value: 'between' }
              ]).get(),
              Create.init('input', '等于', 'len').where(verifyKeys[2], '==', '==').inputNumber().get(),
              Create.init('input', '大于等于', 'lenMin').where(verifyKeys[2], '==', ['>=', 'between']).inputNumber().get(),
              Create.init('input', '小于等于', 'lenMax').where(verifyKeys[2], '==', ['<=', 'between']).inputNumber().get(),
              Create.init('input', '长度提示', 'lengthErrMsg').where(verifyKeys[2], '!=', '').get(),
            ]).get()
          ]).get()
        ]).get())
        break
      case 'showWhere':
        data.push(Create.init('panel').panel('显示条件', false).child([
          Create.init('object', '', 'showWhere').child([
            Create.init('node-select', '控制表单', 'key').tip('要通过哪个表单控制此组件显示').option({ type: 'where' }).get(),
            Create.init('select', '判断规则', 'judge').select([
              { text: '等于', value: '==' },
              { text: '不等于', value: '!=' },
              { text: '大于', value: '>' },
              { text: '小于', value: '<' },
              { text: '大于等于', value: '>=' },
              { text: '小于等于', value: '<=' }
            ]).get(),
            Create.init('array-one', '判断值', 'value').tip('当规则为等于或者不等于时可以设置多个值，否则只有第一个值有效').child([
              Create.init('input', '', 0).inputNumber().get(),
            ]).get()
          ]).get()
        ]).get())
        break

      default:
        break
    }
  }
  if (data[0].child.length === 0) {
    data.splice(0, 1)
  }
  return data
}

const config = {
  // 组件分类
  cate: [
    { text: '基础', name: 'base' },
    { text: '布局', name: 'layout' },
    { text: '展示', name: 'view' },
    { text: '高级', name: 'high' }
  ],
  // 组件列表
  list: {
    form: {
      text: '表单配置',
      cate: 'form',
      publicAttr: [
        'disabled',
        ['style', ['backgroundColor']],
        ['compStyle', ['flexDirection', 'alignItems', 'justifyContent', { name: 'padding', value: 10 }]],
        ['compTextStyle', ['fontSize', 'color', { name: 'width', value: 120 }, 'textAlign']],
        ['compTipStyle', ['fontSize', 'color']]
      ],
      attr() {
        return {
          ...getPublicAttr.call(this),
          width: 750
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('input', '页面宽', 'width', '页面宽度').tip('1、仅在编辑时有效\n2、输入数字表示相对页面宽度，适用于移动端（750代表100%宽度）\n3、可以输入100%表示全部宽度').get()
        ]
      }
    },
    input: {
      tpl: 'input',
      text: '输入框',
      cate: 'base',
      publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
      // 支持的公共属性
      attr() {
        return {
          ...getPublicAttr.call(this),
          type: 'text', // 绑定在组件上的弹出键盘类型
          placeholder: '请输入',
          password: false, // 密码框
          multiline: false, // 多行文本
          maxLength: 140, // 最大文本数
          leftIcon: [], // 左侧图标
          focus: false, // 是否获得焦点 每个页面的所有表单中只能设置一个input获得焦点s
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('switch', '多行文本', 'multiline').get(),
            Create.init('select', '键盘类型', 'type').select([{ text: '文本', value: 'text' }, { text: '数字', value: 'number' }]).get(),
            Create.init('input', '为空提示', 'placeholder').tip('为空字段提示信息').get(),
            Create.init('row').child([
              Create.init('switch', '密码框', 'password').get(),
              Create.init('switch', '自动聚焦', 'focus').get(),
              Create.init('input', '最大文本数', 'maxLength').inputNumber().get(),
              Create.init('icon-select', '左侧图标', 'leftIcon').get()
            ]).get()
          ]).get()
        ]
      }
    },
    select: {
      tpl: 'select',
      text: '选择框',
      cate: 'base',
      publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
      attr() {
        return {
          ...getPublicAttr.call(this),
          type: 'radio', // radio 单选 checkbox 多选
          mode: 'show', // show 直接展示显示 select下拉选择
          theme: 'text', // 主题  text文本形式 button按钮形式 card卡片形式 image图片 color颜色
          option: [
            { text: '选项1', value: '1' },
            { text: '选项2', value: '2' },
            { text: '选项3', value: '3' }
          ]
        }
      },
      form() {
        const key = getKey()
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('select', '选择类型', 'type').select([{ text: '单选', value: 'radio' }, { text: '多选', value: 'checkbox' }]).get(),
            Create.init('select', '是否弹出', 'mode').select([{ text: '直接展示', value: 'show' }, { text: '弹出展示', value: 'picker' }]).get(),
            Create.init('select', '样式', 'theme', key).select([
              { text: '文本形式', value: 'text', image: '' },
              { text: '按钮形式', value: 'button', image: '' },
              { text: '卡片形式', value: 'card', image: '' },
              { text: '图片', value: 'image', image: '' },
              { text: '颜色', value: 'color', image: '' }
            ], 'radio', 'show', 'text').get(),
            Create.init('array-two', '选项', 'option').config({ row: false }).child([
              Create.init('input', '文本', 'text').style({ width: 200 }).where(key, '!=', 'color').get(),
              Create.init('input', '值', 'value').style({ width: 150 }).get(),
              Create.init('upload', '图片', 'image').style({ width: 200 }).where(key, '==', ['card', 'image', 'button']).get(),
              Create.init('input', '描述', 'desc').style({ width: 200 }).where(key, '==', ['card', 'text', 'image']).get(),
              Create.init('color', '颜色', 'color').style({ width: 200 }).where(key, '==', 'color').get()
            ]).get()
          ]).get()
        ]
      }
    },
    switch: {
      tpl: 'switch',
      text: '开关',
      cate: 'base',
      publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
      attr() {
        return getPublicAttr.call(this)
      },
      form() {
        return getPublicAttrForm.call(this)
      }
    },
    check: {
      tpl: 'check',
      text: '验证',
      cate: 'base',
      publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
      attr() {
        return {
          ...getPublicAttr.call(this),
          title: '请同意验证'
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('input', '选框提示', 'title').get()
          ]).get()
        ]
      }
    },
    steep: {
      tpl: 'steep',
      text: '进步器',
      cate: 'base',
      publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
      attr() {
        return {
          ...getPublicAttr.call(this),
          min: 0, // 最小值
          max: 10, // 最大值
          step: 1, // 步长
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('input', '最小值', 'min').inputNumber().get(),
            Create.init('input', '最大值', 'max').inputNumber().get(),
            Create.init('input', '步长', 'step').inputNumber().tip('步长可以是整数也可以是小数').get(),
          ]).get()
        ]
      }
    },
    slider: {
      tpl: 'slider',
      text: '滑块',
      cate: 'base',
      publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
      attr() {
        return {
          ...getPublicAttr.call(this),
          min: 0, // 最小值
          max: 10, // 最大值
          step: 1, // 步长
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('input', '最小值', 'min').inputNumber().get(),
            Create.init('input', '最大值', 'max').inputNumber().get(),
            Create.init('input', '步长', 'step').inputNumber().tip('步长可以是整数也可以是小数').get(),
          ]).get()
        ]
      }
    },
    rate: {
      tpl: 'rate',
      text: '评分',
      cate: 'base',
      publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
      attr() {
        return {
          ...getPublicAttr.call(this),
          rule: 100, // 计算规则 给出满分将按照满分计算value对应的分数
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('input', '计算规则', 'rule').tip('给出满分将按照满分计算value对应的分数').inputNumber().get()
          ]).get()
        ]
      }
    },
    date: {
      tpl: 'date',
      text: '日期选择',
      cate: 'base',
      publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
      attr() {
        return {
          ...getPublicAttr.call(this),
          start: '', // 开始日期
          end: '', // 结束日期
          fields: 'day', // 有效值 year,month,day，表示选择器的粒度
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('date', '开始日期', 'start').get(),
            Create.init('date', '结束日期', 'end').get(),
            Create.init('select', '粒度', 'fields').select([
              { text: '年选择', value: 'year' },
              { text: '年月选择', value: 'month' },
              { text: '年月日选择', value: 'day' }
            ]).get(),
          ]).get()
        ]
      }
    },
    time: {
      tpl: 'time',
      text: '时间选择',
      cate: 'base',
      publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
      attr() {
        return {
          ...getPublicAttr.call(this),
          start: '', // 开始时间
          end: '', // 结束时间
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('time', '开始时间', 'start').get(),
            Create.init('time', '结束时间', 'end').get()
          ]).get()
        ]
      }
    },
    color: {
      tpl: 'color',
      text: '颜色选择',
      cate: 'base',
      publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
      attr() {
        return getPublicAttr.call(this)
      },
      form() {
        return [
          ...getPublicAttrForm.call(this)
        ]
      }
    },
    'icon-select': {
      tpl: 'icon-select',
      text: '图标选择',
      cate: 'base',
      publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
      attr() {
        return getPublicAttr.call(this)
      },
      form() {
        return [
          ...getPublicAttrForm.call(this)
        ]
      }
    },
    upload: {
      tpl: 'upload',
      text: '上传',
      cate: 'base',
      publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
      attr() {
        return {
          ...getPublicAttr.call(this),
          max: 1, // 最大文件数
          type: 'media', // 上传类型 media媒体 file文件
          mediaType: 'image', // image 图片 video 视频
          exts: [], // 支持的文件扩展名 当选择文件时有效
        }
      },
      form() {
        const key = getKey()
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('input', '最大文件数', 'max').inputNumber().get(),
            // Create.init('select', '上传类型', 'type', key).select([
            //   { text: '影音', value: 'media' },
            //   { text: '普通文件', value: 'file' }
            // ]).get(),
            Create.init('select', '上传类型', 'mediaType').select([
              { text: '图片', value: 'image' },
              { text: '视频', value: 'video' },
              { text: '图片和视频', value: 'all' }
            ]).get(),
            // Create.init('array-one', '扩展名', 'exts').where(key, '==', 'file').child([
            //   Create.init('input', '扩展名', '0').get(),
            // ]).get(),
          ]).get()
        ]
      }
    },
    row: {
      tpl: 'row',
      text: '横向布局',
      cate: 'layout',
      publicAttr: ['disabled', 'showWhere', 'child', [
        'style',
        ['flexWrap', 'alignItems', 'justifyContent', 'backgroundColor', 'padding', 'border', 'borderRadius']
      ]],
      attr() {
        return getPublicAttr.call(this)
      },
      form() {
        return getPublicAttrForm.call(this)
      },
      child: {
        publicAttr: [[
          'style',
          ['flex', 'width']
        ]],
        attr() {
          return getPublicAttr.call(this)
        },
        form() {
          return getPublicAttrForm.call(this)
        }
      }
    },
    column: {
      tpl: 'column',
      text: '竖向布局',
      cate: 'layout',
      publicAttr: ['disabled', 'showWhere', 'child', [
        'style',
        ['alignItems', 'backgroundColor', 'padding', 'border', 'borderRadius']
      ]],
      attr() {
        return getPublicAttr.call(this)
      },
      form() {
        return getPublicAttrForm.call(this)
      }
    },
    tab: {
      tpl: 'tab',
      text: 'tab布局',
      cate: 'layout',
      publicAttr: ['disabled', 'showWhere', () => {
        return ['child', [
          {
            text: 'tab-1',
            key: getKey(),
            child: []
          }
        ]]
      }],
      attr() {
        return {
          ...getPublicAttr.call(this),
          theme: false, // 风格
          position: 'top', // 导航位置 top上 right右 bottom下 left左
          defatultTab: 0,
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('array-two', '', 'child').config({ row: false }).child([
              Create.init('input', 'tab名称', 'text').childWidth(200).get(),
              Create.init('key', 'key', 'key').childWidth(300).get(),
            ]).get(),
            Create.init('select', 'tab位置', 'position').select([
              { text: '上', value: 'top' },
              { text: '下', value: 'bottom' },
              { text: '左', value: 'left' },
              { text: '右', value: 'right' }
            ]).get(),
          ]).get()
        ]
      }
    },
    flex: {
      tpl: 'flex',
      text: '栅格布局',
      cate: 'layout',
      publicAttr: ['disabled', 'showWhere', () => {
        return ['child', [
          {
            flex: 1,
            key: getKey(),
            child: []
          }
        ]]
      }],
      attr() {
        return {
          ...getPublicAttr.call(this)
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('array-two', '', 'child').config({ row: false }).child([
              Create.init('input', '比例', 'flex').inputNumber().childWidth(200).get(),
              Create.init('key', 'key', 'key').childWidth(300).get(),
            ]).get()
          ]).get()
        ]
      }
    },
    panel: {
      tpl: 'panel',
      text: '面板布局',
      cate: 'layout',
      publicAttr: ['disabled', 'showWhere', 'child'],
      attr() {
        return {
          ...getPublicAttr.call(this),
          title: '面板',
          open: true
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('input', '面板名称', 'title').get(),
            Create.init('select', '开启面板', 'open').select([
              { text: '开启', value: true },
              { text: '关闭', value: false }
            ]).get()
          ]).get()
        ]
      }
    },
    compose: {
      tpl: 'compose',
      text: '组合',
      cate: 'layout',
      publicAttr: ['disabled', 'showWhere', 'child'],
      attr() {
        return getPublicAttr.call(this)
      },
      form() {
        return getPublicAttrForm.call(this)
      }
    },
    background: {
      tpl: 'background',
      text: '背景',
      cate: 'layout',
      publicAttr: ['disabled', 'showWhere', 'child', [
        'style',
        ['alignItems', 'backgroundColor', 'padding', 'border', 'borderRadius']
      ]],
      attr() {
        return {
          ...getPublicAttr.call(this),
          src: ''
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('upload', '背景图', 'src').get(),
        ]
      }
    },
    object: {
      tpl: 'object',
      text: '对象表单',
      cate: 'high',
      publicAttr: ['name', 'text', 'tip', 'disabled', 'showWhere', 'child'],
      attr() {
        return getPublicAttr.call(this)
      },
      form() {
        return [
          ...getPublicAttrForm.call(this)
        ]
      }
    },
    array: {
      tpl: 'array',
      text: '数组表单',
      cate: 'high',
      publicAttr: ['name', 'text', 'tip', 'disabled', 'showWhere', 'child'],
      attr() {
        return getPublicAttr.call(this)
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('column').style({
            padding: 20
          }).child([
            Create.init('text').option({
              text: '组件说明',
              style: {
                fontSize: Taro.pxTransform(28),
                fontWeight: 'bold'
              }
            }).get(),
            Create.init('text').option({
              text: '1、数组表单内添加的表单组件设置name属性无效，会被重置\n2、数组表单内可以添加高级表单',
              style: {
                fontSize: Taro.pxTransform(24),
                lineHeight: 1.5
              }
            }).get()
          ]).get()
        ]
      }
    },
    'array-one': {
      tpl: 'array-one',
      text: '一维数组',
      cate: 'high',
      publicAttr: ['name', 'text', 'tip', 'disabled', 'showWhere', () => ['child', [], { max: 1 }]],
      attr() {
        return getPublicAttr.call(this)
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('column').style({
            padding: 20
          }).child([
            Create.init('text').option({
              text: '组件说明',
              style: {
                fontSize: Taro.pxTransform(28),
                fontWeight: 'bold'
              }
            }).get(),
            Create.init('text').option({
              text: '1、一维数组内添加的表单组件设置name属性无效，会被重置\n2、一维数组内仅可添加基础表单\n3、一维数组内仅可添加一个表单',
              style: {
                fontSize: Taro.pxTransform(24),
                lineHeight: 1.5
              }
            }).get()
          ]).get()
        ]
      },
      child: {
        disable: {
          // 组件
          // comp: [],
          // 组件判断是否是包含这些组件还是不包含这些组件
          // compContain: true,
          // 组件分类
          cate: ['base', 'high'],
          // 组件分类判断是否是包含这些分类还是不包含这些分类
          cateContain: true
        },
      }
    },
    'array-two': {
      tpl: 'array-two',
      text: '二维数组',
      cate: 'high',
      publicAttr: ['name', 'text', 'tip', 'disabled', 'showWhere', 'child'],
      attr() {
        return getPublicAttr.call(this)
      },
      form() {
        return getPublicAttrForm.call(this)
      },
      child: {
        disable: {
          // 组件
          // comp: [],
          // 组件判断是否是包含这些组件还是不包含这些组件
          // compContain: true,
          // 组件分类
          cate: ['base'],
          // 组件分类判断是否是包含这些分类还是不包含这些分类
          cateContain: true
        },
        disabledComp: ['flex', 'row', 'tab', 'array-two', 'object'],
        publicAttr: [],
        attr() {
          return {
            style: {
              width: 250
            }
          }
        },
        form() {
          return [
            ...getPublicAttrForm.call(this),
            Create.init('object', '', 'style').child([
              Create.init('input', '宽度', 'width').inputNumber().get()
            ]).get()
          ]
        }
      },
    },
    button: {
      tpl: 'button',
      text: '按钮',
      cate: 'base',
      publicAttr: ['disabled', 'showWhere'],
      attr() {
        return {
          ...getPublicAttr.call(this),
          text: '按钮',
          color: '#333',
          plain: false,
          size: 'm',
          radiusType: 'fillet'
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('input', '按钮文字', 'text').get(),
            Create.init('color', '按钮颜色', 'color').get(),
            Create.init('switch', '是否镂空', 'plain').get(),
            Create.init('select', '按钮尺寸', 'size').select([
              { text: '小', value: 's' },
              { text: '中', value: 'm' },
              { text: '大', value: 'l' },
              { text: '加大', value: 'xl' },
              { text: '加加大', value: 'xxl' },
              { text: '加加加大', value: 'xxxl' }
            ]).get(),
            Create.init('select', '圆角类型', 'radiusType').select([
              { text: '圆角', value: 'fillet' },
              { text: '直角', value: 'right-angle' },
              { text: '较小的圆角', value: 'fillet-min' }
            ]).get(),
          ]).get()
        ]
      }
    },
    image: {
      tpl: 'image',
      text: '图片',
      cate: 'view',
      publicAttr: ['showWhere', ['style', ['width', 'height', 'borderRadius', 'backgroundColor']]],
      attr() {
        return {
          ...getPublicAttr.call(this),
          src: '',
          mode: 'scaleToFill'
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('upload', '图片', 'src').get(),
            Create.init('select', '裁剪', 'mode').select([
              { text: '缩放', value: 'scaleToFill', desc: '不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素' },
              { text: '缩放显示长边', value: 'aspectFit', desc: '保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。' },
              { text: '缩放显示短边', value: 'aspectFill', desc: '保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。' },
              { text: '自动高度', value: 'widthFix', desc: '宽度不变，高度自动变化，保持原图宽高比不变' },
              { text: '自动宽度', value: 'heightFix', desc: '高度不变，宽度自动变化，保持原图宽高比不变' }
            ], 'radio', 'show', 'card').get()
          ]).get()
        ]
      }
    },
    text: {
      tpl: 'text',
      text: '文本',
      cate: 'view',
      publicAttr: ['showWhere', ['style', ['fontSize', 'lineHeight', 'color', 'fontWeight', 'textAlign', 'padding', 'backgroundColor']]],
      attr() {
        return {
          ...getPublicAttr.call(this),
          text: '文本内容'
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('input', '文本内容', 'text').option({ multiline: true }).get()
          ]).get()
        ]
      }
    },
    icon: {
      tpl: 'icon',
      text: '图标',
      cate: 'view',
      publicAttr: ['showWhere', ['style', ['fontWeight', 'padding', 'backgroundColor']]],
      attr() {
        return {
          ...getPublicAttr.call(this),
          name: ['icon', 'bangzhu1'],
          size: 32,
          color: '#333'
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('icon-select', '图标', 'name').get(),
            Create.init('input', '字号', 'size').inputNumber().get(),
            Create.init('color', '颜色', 'color').get()
          ]).get()
        ]
      }
    },
    segment: {
      tpl: 'segment',
      text: '分割线',
      cate: 'view',
      publicAttr: ['showWhere', ['style', [{ name: 'padding', value: { paddingTop: 10, paddingBottom: 10 } }, 'backgroundColor']], ['textStyle', ['fontSize', 'color']]],
      attr() {
        return {
          ...getPublicAttr.call(this),
          borderStyle: 'solid',
          borderTopWidth: 1,
          borderColor: '#333',
          textAlign: 'center',
          text: '分割线',
        }
      },
      form() {
        return [
          ...getPublicAttrForm.call(this),
          Create.init('panel').panel(this.text + '属性').child([
            Create.init('input', '文本', 'text').get(),
            Create.init('select', '文本位置', 'textAlign').select([
              { text: '居左', value: 'left' },
              { text: '居中', value: 'center' },
              { text: '居右', value: 'right' }
            ]).get(),
            Create.init('select', '线条样式', 'borderStyle').select([
              { text: '实线', value: 'solid' },
              { text: '点状', value: 'dotted' },
              { text: '虚线', value: 'dashed' },
              { text: '双线', value: 'double' }
            ]).get(),
            Create.init('color', '线条颜色', 'borderColor').get(),
            Create.init('input', '线条高度', 'borderTopWidth').inputNumber().get()
          ]).get()
        ]
      }
    }
  }
}

export default config
