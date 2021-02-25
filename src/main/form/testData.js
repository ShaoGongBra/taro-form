export default {
  form: [
    {
      tpl: 'select',
      key: 'control1',
      name: 'control1',
      text: '单选',
      tip: '',
      type: 'radio', // radio 单选 checkbox 多选
      mode: 'show', // show 直接展示显示 select下拉选择
      theme: 'text', // 主题  text文本形式 button按钮形式 card卡片形式 image图片 color颜色
      option: [
        { text: '选项1', value: '1' },
        { text: '选项2', value: '2' },
        { text: '选项3', value: '3' }
      ]
    },
    {
      tpl: 'select',
      key: 'control2',
      name: 'control2',
      text: 'control1 控制',
      tip: '',
      type: 'radio', // radio 单选 checkbox 多选
      mode: 'show', // show 直接展示显示 select下拉选择
      theme: 'text', // 主题  text文本形式 button按钮形式 card卡片形式 image图片 color颜色
      option: [
        { text: '选项1', value: '1' },
        { text: '选项2', value: '2' },
        { text: '选项3', value: '3' }
      ],
      showWhere: {
        key: 'control1', // 通过哪个key控制
        judge: '==', //  == | != | > | < | >= | <=
        /**
         * == | != 时：string| number | array string | number将直接比较 array 将内容逐一比较
         * > | < | >= | <= 时：string | number 使用大小判断不支持数组
         */
        value: '2', // 判断值
      }
    },
    {
      tpl: 'input',
      key: 'show2',
      name: 'show2',
      type: 'text', // 绑定在组件上的弹出键盘类型
      text: 'control1 控制',
      tip: '仅支持中文',
      disabled: false, // 是否禁用
      placeholder: '请输入姓名',
      password: false, // 密码框
      multiline: false, // 多行文本
      maxLength: 140, // 最大文本数
      leftIcon: '', // 左侧图标
      focus: false, // 是否获得焦点 每个页面的所有表单中只能设置一个input获得焦点
      showWhere: {
        key: 'control1', // 通过哪个key控制
        judge: '==', //  == | != | > | < | >= | <=
        value: '1', // 判断值
      },
      verify: {
        reg: 'required|phone-tel|l7_11',
        emptyMsg: '请输入手机号',
        errMsg: '请输入正确的手机号或者电话',
        lengthErrMsg: '长度错误提示'
      }
    },
    {
      tpl: 'input',
      key: 'show3',
      name: 'show3',
      type: 'text', // 绑定在组件上的弹出键盘类型
      text: 'control2 控制',
      tip: '最多140字',
      placeholder: '请输入简介',
      password: false, // 密码框
      multiline: true, // 多行文本
      maxLength: 140, // 最大文本数
      leftIcon: '', // 左侧图标
      focus: false, // 是否获得焦点 每个页面的所有表单中只能设置一个input获得焦点
      showWhere: {
        key: 'control2', // 通过哪个key控制
        judge: '==', //  == | != | > | < | >= | <=
        /**
         * == | != 时：string| number | array string | number将直接比较 array 将内容逐一比较
         * > | < | >= | <= 时：string | number 使用大小判断不支持数组
         */
        value: '3', // 判断值
      }
    },
    {
      tpl: 'tab',
      key: 'tab',
      text: 'tab项',
      theme: false, // 风格
      position: 'right', // 导航位置 top上 right右 bottom下 left左
      defatultTab: 0,
      child: [
        {
          text: '表单1',
          key: 'tab1',
          child: [
            {
              tpl: 'input',
              key: 'tab1-1',
              name: 'tab1',
              type: 'text', // 绑定在组件上的弹出键盘类型
              text: '标题',
              tip: '最多140字',
              placeholder: '请输入简介',
              password: false, // 密码框
              multiline: false, // 多行文本
              maxLength: 300, // 最大文本数
              leftIcon: '', // 左侧图标
              focus: false, // 是否获得焦点 每个页面的所有表单中只能设置一个input获得焦点
            },
          ]
        },
        {
          text: '表单2',
          key: 'tab2',
          child: [
            {
              tpl: 'input',
              key: 'tab2-1',
              name: 'tab2',
              type: 'text', // 绑定在组件上的弹出键盘类型
              text: '简介',
              tip: '最多140字',
              placeholder: '请输入简介',
              password: false, // 密码框
              multiline: true, // 多行文本
              maxLength: 140, // 最大文本数
              leftIcon: '', // 左侧图标
              focus: false, // 是否获得焦点 每个页面的所有表单中只能设置一个input获得焦点
            },
          ]
        }
      ]
    },
    {
      tpl: 'flex',
      key: 'flex',
      text: '栅格布局',
      border: false, // 显示边框
      child: [
        {
          flex: 1,
          key: 'flex1',
          child: [
            {
              tpl: 'input',
              key: 'felx2',
              name: 'felx1',
              type: 'text', // 绑定在组件上的弹出键盘类型
              text: '标题',
              tip: '最多140字',
              placeholder: '请输入简介',
              password: false, // 密码框
              multiline: false, // 多行文本
              maxLength: 300, // 最大文本数
              leftIcon: '', // 左侧图标
              focus: false, // 是否获得焦点 每个页面的所有表单中只能设置一个input获得焦点
            },
          ]
        },
        {
          flex: 2,
          key: 'flex2',
          child: [
            {
              tpl: 'input',
              key: 'felx3',
              name: 'flex2',
              type: 'text', // 绑定在组件上的弹出键盘类型
              text: '简介',
              tip: '最多140字',
              placeholder: '请输入简介',
              password: false, // 密码框
              multiline: true, // 多行文本
              maxLength: 140, // 最大文本数
              leftIcon: '', // 左侧图标
              focus: false, // 是否获得焦点 每个页面的所有表单中只能设置一个input获得焦点
            },
          ]
        }
      ]
    },
    {
      tpl: 'row',
      key: 'row',
      child: [
        {
          tpl: 'input',
          key: 'row1',
          name: 'row1',
          type: 'text', // 绑定在组件上的弹出键盘类型
          text: '横向布局',
          tip: '最多140字',
          width: 280,
          placeholder: '请输入简介',
          password: false, // 密码框
          multiline: false, // 多行文本
          maxLength: 300, // 最大文本数
          leftIcon: '', // 左侧图标
          focus: false, // 是否获得焦点 每个页面的所有表单中只能设置一个input获得焦点
        },
        {
          tpl: 'input',
          key: 'row2',
          name: 'row2',
          type: 'text', // 绑定在组件上的弹出键盘类型
          text: '横向布局1',
          tip: '最多140字',
          width: 250,
          placeholder: '请输入简介',
          password: false, // 密码框
          multiline: true, // 多行文本
          maxLength: 140, // 最大文本数
          leftIcon: '', // 左侧图标
          focus: false, // 是否获得焦点 每个页面的所有表单中只能设置一个input获得焦点
        },
        {
          tpl: 'steep',
          key: 'row3',
          name: 'row3',
          text: '进步器',
          width: 300, // 子表单才有此参数 对应此列宽度
          min: 0, // 最小值
          max: 10, // 最大值
          step: 1, // 步长,
        },
        {
          tpl: 'rate',
          key: 'row4',
          name: 'row4',
          text: '评分',
          width: 260, // 子表单才有此参数 对应此列宽度
          rule: 5, // 计算规则 给出满分将按照满分计算value对应的分数
        },
      ]
    },
    {
      tpl: 'child-array',
      key: 'child-array',
      name: 'child_array',
      text: '子表单',
      child: [
        {
          tpl: 'input',
          key: 'child-array2',
          name: 'input',
          type: 'text', // 绑定在组件上的弹出键盘类型
          text: '标题',
          tip: '最多140字',
          width: 300, // 子表单才有此参数 对应此列宽度
          placeholder: '请输入简介',
          password: false, // 密码框
          multiline: false, // 多行文本
          maxLength: 300, // 最大文本数
          leftIcon: '', // 左侧图标
          focus: false, // 是否获得焦点 每个页面的所有表单中只能设置一个input获得焦点
        },
        {
          tpl: 'input',
          key: 'child-array3',
          name: 'textarea',
          type: 'text', // 绑定在组件上的弹出键盘类型
          text: '简介',
          tip: '最多140字',
          width: 300, // 子表单才有此参数 对应此列宽度
          placeholder: '请输入简介',
          password: false, // 密码框
          multiline: true, // 多行文本
          maxLength: 140, // 最大文本数
          leftIcon: '', // 左侧图标
          focus: false, // 是否获得焦点 每个页面的所有表单中只能设置一个input获得焦点
        },
        {
          tpl: 'switch',
          key: 'child-array31',
          name: 'switch',
          text: '开关',
          tip: '',
          width: 120, // 子表单才有此参数 对应此列宽度
        },
        {
          tpl: 'steep',
          key: 'child-array32',
          name: 'steep',
          text: '进步器',
          width: 300, // 子表单才有此参数 对应此列宽度
          min: 0, // 最小值
          max: 10, // 最大值
          step: 1, // 步长
        },
        {
          tpl: 'rate',
          key: 'child-array34',
          name: 'rate',
          text: '评分',
          width: 260, // 子表单才有此参数 对应此列宽度
          rule: 5, // 计算规则 给出满分将按照满分计算value对应的分数
        },
        {
          tpl: 'select',
          key: 'child-array35',
          name: 'radio',
          text: '单选',
          tip: '',
          width: 360, // 子表单才有此参数 对应此列宽度
          type: 'radio', // radio 单选 checkbox 多选
          mode: 'show', // show 直接展示显示 select下拉选择
          theme: 'text', // 主题  text文本形式 button按钮形式 card卡片形式 image图片 color颜色
          option: [
            { text: '单选', value: 'radio', desc: '这个是详细描述', icon: '', image: '', color: '', disabled: false },
            { text: '多选', value: 'checkbox', desc: 'text文本形式 button按钮形式 card卡片形式 image图片 color颜色', icon: '', image: '', color: '', disabled: false },
            { text: '下拉', value: 'select', desc: '', icon: '', image: '', color: '', disabled: true }
          ]
        },
      ]
    },
    {
      tpl: 'object',
      key: 'object',
      name: 'child_object',
      text: '子表单',
      child: [
        {
          tpl: 'input',
          key: 'object2',
          name: 'input',
          type: 'text', // 绑定在组件上的弹出键盘类型
          text: '标题',
          tip: '最多140字',
          width: 300, // 子表单才有此参数 对应此列宽度
          placeholder: '请输入简介',
          password: false, // 密码框
          multiline: false, // 多行文本
          maxLength: 300, // 最大文本数
          leftIcon: '', // 左侧图标
          focus: false, // 是否获得焦点 每个页面的所有表单中只能设置一个input获得焦点
        },
        {
          tpl: 'input',
          key: 'object3',
          name: 'textarea',
          type: 'text', // 绑定在组件上的弹出键盘类型
          text: '简介',
          tip: '最多140字',
          width: 300, // 子表单才有此参数 对应此列宽度
          placeholder: '请输入简介',
          password: false, // 密码框
          multiline: true, // 多行文本
          maxLength: 140, // 最大文本数
          leftIcon: '', // 左侧图标
          focus: false, // 是否获得焦点 每个页面的所有表单中只能设置一个input获得焦点
        },
        {
          tpl: 'switch',
          key: 'object31',
          name: 'switch',
          text: '开关',
          tip: '',
          width: 120, // 子表单才有此参数 对应此列宽度
        },
        {
          tpl: 'steep',
          key: 'object32',
          name: 'steep',
          text: '进步器',
          width: 300, // 子表单才有此参数 对应此列宽度
          min: 0, // 最小值
          max: 10, // 最大值
          step: 1, // 步长
        },
        {
          tpl: 'rate',
          key: 'object34',
          name: 'rate',
          text: '评分',
          width: 260, // 子表单才有此参数 对应此列宽度
          rule: 5, // 计算规则 给出满分将按照满分计算value对应的分数
        }
      ]
    },
    {
      tpl: 'upload',
      key: '30',
      name: 'upload',
      text: '上传组件',
      type: 'image', // image图片 video视频 media图片和视频 file文件
      extName: [], // 自定义扩展名限制 由数组构成的扩展名，在type类型下做限制
      max: 1, // 最大上传数量
    },
    {
      tpl: 'switch',
      key: '31',
      name: 'switch',
      text: '开关',
      tip: ''
    },
    {
      tpl: 'check',
      key: '311',
      name: 'check',
      text: '验证',
      tip: '',
      title: '请同意用户协议'
    },
    {
      tpl: 'steep',
      key: '32',
      name: 'steep',
      text: '进步器',
      min: 0, // 最小值
      max: 10, // 最大值
      step: 1, // 步长
    },
    {
      tpl: 'slider',
      key: '33',
      name: 'slider',
      text: '滑块',
      min: 0, // 最小值
      max: 10, // 最大值
      step: 1, // 步长
    },
    {
      tpl: 'rate',
      key: '34',
      name: 'rate',
      text: '评分',
      rule: 100, // 计算规则 给出满分将按照满分计算value对应的分数
    },
    {
      tpl: 'date',
      key: '35',
      name: 'date',
      text: '日期选择',
      start: '', // 开始日期
      end: '', // 结束日期
      fields: 'day', // 有效值 year,month,day，表示选择器的粒度
    },
    {
      tpl: 'time',
      key: '36',
      name: 'time',
      text: '时间选择',
      start: '', // 开始时间
      end: '', // 结束时间
    },
    {
      tpl: 'select',
      key: '3',
      name: 'radio',
      text: '单选',
      tip: '',
      type: 'radio', // radio 单选 checkbox 多选
      mode: 'show', // show 直接展示显示 select下拉选择
      theme: 'text', // 主题  text文本形式 button按钮形式 card卡片形式 image图片 color颜色
      option: [
        { text: '单选', value: 'radio', desc: '这个是详细描述', icon: '', image: '', color: '', disabled: false },
        { text: '多选', value: 'checkbox', desc: 'text文本形式 button按钮形式 card卡片形式 image图片 color颜色', icon: '', image: '', color: '', disabled: false },
        { text: '下拉', value: 'select', desc: '', icon: '', image: '', color: '', disabled: true }
      ]
    },
    {
      tpl: 'select',
      key: '4',
      name: 'checkbox',
      text: '多选',
      tip: '',
      type: 'checkbox', // radio 单选 checkbox 多选
      mode: 'show', // show 直接展示显示 select下拉选择
      theme: 'text', // 主题  text文本形式 button按钮形式 card卡片形式 image图片 color颜色
      option: [
        { text: '单选', value: 'radio', desc: '', icon: '', image: '', color: '', disabled: false },
        { text: '多选', value: 'checkbox', desc: '', icon: '', image: '', color: '', disabled: false },
        { text: '下拉', value: 'select', desc: '', icon: '', image: '', color: '', disabled: true }
      ]
    },
    {
      tpl: 'select',
      key: '5',
      name: 'radio_button',
      text: '单选',
      tip: '',
      type: 'radio', // radio 单选 checkbox 多选
      mode: 'show', // show 直接展示显示 select下拉选择
      theme: 'button', // 主题  text文本形式 button按钮形式 card卡片形式 image图片 color颜色
      option: [
        { text: '单选', value: 'radio', desc: '', icon: '', image: '', color: '', disabled: false },
        { text: '多选', value: 'checkbox', desc: '', icon: '', image: '', color: '', disabled: false },
        { text: '下拉', value: 'select', desc: '', icon: '', image: '', color: '', disabled: true }
      ]
    },
    {
      tpl: 'select',
      key: '6',
      name: 'radio_card',
      text: '卡片',
      tip: '',
      type: 'radio', // radio 单选 checkbox 多选
      mode: 'show', // show 直接展示显示 select下拉选择
      theme: 'card', // 主题  text文本形式 button按钮形式 card卡片形式 image图片 color颜色
      option: [
        { text: '单选', value: 'radio', desc: '', icon: '', image: '', color: '', disabled: false },
        { text: '多选', value: 'checkbox', desc: '主题  text文本形式 button按钮形式 card卡片形式 image图片 color颜色', icon: '', image: '', color: '', disabled: false },
        { text: '下拉', value: 'select', desc: '', icon: '', image: '', color: '', disabled: true }
      ]
    },
    {
      tpl: 'select',
      key: '7',
      name: 'radio_image',
      text: '图片类型',
      tip: '',
      type: 'radio', // radio 单选 checkbox 多选
      mode: 'show', // show 直接展示显示 select下拉选择
      theme: 'image', // 主题  text文本形式 button按钮形式 card卡片形式 image图片 color颜色
      option: [
        { text: '单选', value: 'radio', desc: '', icon: '', image: '', color: '', disabled: false },
        { text: '多选', value: 'checkbox', desc: '主题  text文本形式', icon: '', image: '', color: '', disabled: false },
        { text: '下拉', value: 'select', desc: '', icon: '', image: '', color: '', disabled: true }
      ]
    },
    {
      tpl: 'select',
      key: '8',
      name: 'radio_color',
      text: '背景颜色类型选择',
      tip: '',
      type: 'radio', // radio 单选 checkbox 多选
      mode: 'show', // show 直接展示显示 select下拉选择
      theme: 'color', // 主题  text文本形式 button按钮形式 card卡片形式 image图片 color颜色
      option: [
        { text: '红', value: '#000', desc: '', icon: '', image: '', color: '#000', disabled: false },
        { text: '单选', value: '#333', desc: '', icon: '', image: '', color: '#333', disabled: false },
        { text: '多选', value: '#999', desc: '主题  text文本形式', icon: '', image: '', color: '#999', disabled: false },
        { text: '下拉', value: '#eee', desc: '', icon: '', image: '', color: '#eee', disabled: true },
        { text: '白色', value: '#fff', desc: '', icon: '', image: '', color: '#fff', disabled: false },
      ]
    },
    {
      tpl: 'button',
      key: '100',
      name: 'button',
      text: '',
      tip: '',
      type: 'submit', // 按钮标识 submit提交表单
      text: '提交表单',
      color: '#666',
      size: 'l',
      plain: false,
      radiusType: 'fillet'
    }
  ],
  values: {
    control1: '1',
    control2: 1,
    input: '渣渣灰',
    textarea: '这是textarea的内容',
    child_array: [
      { input: '输入框内容', textarea: '多行文本框内容', switch: true, steep: 2, rate: 2, radio: 'radio' }
    ],
    child_object: {
      input: '输入框内容',
      textarea: '多行文本框内容',
      switch: true,
      steep: 2,
      rate: 2,
      radio: 'radio'
    },
    switch: true,
    check: true,
    steep: 2,
    rate: 25,
    date: '2020-11-1',
    time: '15:05',
    radio: 'radio',
    checkbox: ['checkbox', 'select'],
    radio_button: 'radio',
    radio_card: 'radio',
    radio_image: 'radio',
    radio_color: '#999',
    upload: ''
  },
  config: {
    style: {
      backgroundColor: '#fff'
    },
    compStyle: {
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      padding: 10
    },
    compTextStyle: {
      fontSize: 28,
      color: '#333',
      width: 120
    },
    compTipStyle: {
      fontSize: 24,
      color: '#999'
    }
  }
}
