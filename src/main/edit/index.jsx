import React, { useState, useCallback, useEffect, useRef } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import Icon from '../../components/icon'
import PullView from '../../components/overlay/pull_view'
import Create from '../form/create'
import Form from '../form/form'
import EditTypes from './editTypes'
import comp from './comp'
import { recursionSetValue, recursionGetValue } from '../../utils/object'
import testData from '../form/testData'
import './index.scss'

const Code = ({ children, lang = 'json' }) => {
  return <SyntaxHighlighter
    language={lang}
  >
    {children.replace(/^\s+|\s+$/g, '')}
  </SyntaxHighlighter>
}

const Module = ({ item, editForm }) => {

  const [, drag] = useDrag({
    item: { type: EditTypes.FORM_ADD, tpl: item.tpl },
    begin() {
      editForm(-1)
    }
  })

  return <View ref={drag} className='item'>
    <Text className='text'>{item.text}</Text>
  </View>
}

/**
 * 标记组件是否正在更新 正在更新则不更新新的数据，方式数据错乱
 */
let listUpdate = false

const Edit = () => {

  const [cates] = useState(comp.getCates())
  const [cateHover, selectCate] = useState(0)

  const [module] = useState(comp.getComps())

  const [list, setList] = useState([])
  // 将编辑列表存储为全局变量用于节点选择
  window.editFormList = list
  // 选中的表单
  const [hover, setHover] = useState(-1)
  // 选中的表单
  const [hoverName, setHoverName] = useState(-1)
  const [config] = useState({ ...comp.getCompAttr('form'), edit: true })
  const [values] = useState(testData.values)
  const [form, setForm] = useState([])
  const [formValue, setFormValue] = useState({})

  const [preview, setPreview] = useState(false)
  const [previewPhone] = useState([
    { name: '手机', icon: 'shiwu-shouji', width: 480 },
    { name: '平板', icon: 'shouji', width: 750 },
    { name: '电脑', icon: 'dianshi', width: 1280 }
  ])
  const [previewPhoneHover, setPreviewPhoneHover] = useState(0)
  const [showJson, setShowJson] = useState(false)

  const pullView = useRef(null)

  useEffect(() => {
    listUpdate = false
  }, [list])

  /**
   * 放开到删除
   */
  const [{ deleteShow, deleteOver }, dropDelete] = useDrop({
    accept: EditTypes.FORM_MOVE,
    drop(item) {
      recursionGetValue(item.indexs, list, 'child', true)
      setList([...list])
    },
    collect: monitor => ({
      deleteShow: monitor.canDrop(),
      deleteOver: monitor.isOver()
    })
  })

  /**
   * 组件排序
   */
  const moveList = useCallback((dragIndex, hoverIndex) => {
    let parent = {}
    // 移动组件之后重新确定他的父组件 并把嵌套在父组件的子组件该有的属性赋值改子组件
    if (hoverIndex.length > 1) {
      // 存在父组件
      parent = recursionGetValue(hoverIndex.slice(0, hoverIndex.length - 1), list, 'child')
    }

    if (typeof dragIndex === 'string') {
      // 新增组件 dragIndex表示组件名称
      recursionSetValue(hoverIndex, list, comp.getCompAttr(dragIndex, parent.tpl), 'child', true)
      setList([...list])
    } else {
      // 移动组件
      if (listUpdate || dragIndex.join() === hoverIndex.join()) {
        return
      }
      // 标记正在更新 防止重复更新导致数据出错
      listUpdate = true
      // 标记要移动的index位置 防止位置出错
      const dragLen = dragIndex.length
      if (dragLen < hoverIndex.length && hoverIndex[dragLen - 1] > dragIndex[dragLen - 1]) {
        hoverIndex[dragLen - 1]--
      }
      const item = recursionGetValue(dragIndex, list, 'child', true)
      recursionSetValue(hoverIndex, list, { ...item, ...comp.getCompAttr('', parent.tpl) }, 'child', true)
      setList([...list])
    }

  }, [list])


  const formRef = useRef(null)
  /**
   * 开始编辑表单 当indexs为-1时表示退出表单编辑
   */
  const editForm = useCallback(indexs => {
    if (indexs !== -1) {
      const item = indexs.length === 0 ? config : recursionGetValue(indexs, list, 'child')
      // 获取上级
      let parentTpl = ''
      if (indexs.length > 1) {
        parentTpl = recursionGetValue(indexs.slice(0, indexs.length - 1), list, 'child').tpl
      }
      const data = comp.getEditForm(item.tpl, parentTpl)
      setForm(data.form)
      setHoverName(data.text)
      setFormValue(item)
    }
    setHover(indexs)
  }, [list, config])

  /**
   * 等界面更新完成后取重新生成表单
   */
  useEffect(() => {
    if (!formRef.current) {
      return
    }
    formRef.current.getForm()
  }, [form, formValue])

  /**
   * 表单输入事件
   */
  const formInput = useCallback(data => {
    switch (data.event) {
      case 'input':
        const item = hover.length === 0 ? config : recursionGetValue(hover, list, 'child')
        // 表单输入事件
        recursionSetValue(data.names, item, data.value)
        setList([...list])
        break
    }
  }, [list, hover, config])

  const stopPropagation = e => e.stopPropagation()
  return <View className='page-root edit' onClick={() => editForm(-1)}>
    <View className='menu'>
      {
        cates.map((cate, index) => <View
          className={`cate${cateHover === index ? ' hover' : ''}`}
          key={cate.name}
          onClick={() => selectCate(cateHover === index ? -1 : index)}
        >
          <Text className='cate-name'>{cate.text}</Text>
          {cateHover === index && <View className='cate-child'>
            {
              module.filter(child => child.cate === cate.name).map(child => <Module key={child.tpl} item={child} editForm={editForm} />)
            }
          </View>}
        </View>)
      }
      <View className='line' />
      <View
        className={`cate${hover.length === 0 ? ' hover' : ''}`}
        onClick={e => {
          e.stopPropagation()
          editForm([])
        }}
      >
        <Text className='cate-name'>设置</Text>
      </View>
      <View className='line' />
      <View
        className='cate'
        onClick={() => setPreview(true)}
      >
        <Text className='cate-name'>预览</Text>
      </View>
      <View
        className='cate'
        onClick={() => setShowJson(true)}
      >
        <Text className='cate-name'>JSON</Text>
      </View>
    </View>
    <View
      className='phone'
      onClick={stopPropagation}
      style={comp.attrTransform({ style: { ...config.style, width: config.width } }).style}
    >
      <ScrollView className='scroll' scrollY>
        <Create
          form={list}
          config={config}
          values={values}
          moveForm={moveList}
          editForm={editForm}
          editInfo={{
            title: '表单构建',
            desc: '请将组件拖到这里'
          }}
        />
      </ScrollView>
    </View>
    <View className={`form${hover !== -1 ? ' form-show' : ''}`} onClick={stopPropagation}>
      <View className='head'>
        <Text className='title'>{hoverName}</Text>
        <Icon name='guanbi2' size={36} color='#202020' onClick={() => editForm(-1)} />
      </View>
      <View className='content'>
        <Form
          ref={formRef}
          form={form}
          values={formValue}
          config={{
            compStyle: { flexDirection: 'row', alignItems: 'center', padding: 10 },
            compTextStyle: { fontSize: 24, textAlign: 'right', width: 120 }
          }}
          onEvent={formInput}
        />
      </View>
    </View>
    {preview && <PullView side='top' ref={pullView} onClose={() => setPreview(false)}>
      <View className='preview'>
        <View className='head'>
          {
            previewPhone.map((item, index) => <View
              key={item.name}
              className={`item${index === previewPhoneHover ? ' hover' : ''}`}
              onClick={() => setPreviewPhoneHover(index)}
            >
              <Icon name={item.icon} size={36} color='#333' />
            </View>)
          }
        </View>
        <View
          className='mobile'
          style={comp.attrTransform({
            style: {
              ...config.style,
              width: previewPhone[previewPhoneHover].width
            }
          }).style}
        >
          <ScrollView className='scroll' scrollY>
            <Form form={list} values={{}} config={{ ...config, edit: false }} />
          </ScrollView>
        </View>
      </View>
    </PullView>}
    {showJson && <PullView side='top' onClose={() => setShowJson(false)}>
      <View className='json'>
        <ScrollView scrollY scrollX className='main'>
          <Code>
            {JSON.stringify(list, null, 2)}
          </Code>
        </ScrollView>
      </View>
    </PullView>}
    <View className={`delete${deleteShow ? ' delete-show' : ''}${deleteOver ? ' delete-over' : ''}`} ref={dropDelete}>
      <View className='info'>
        <Icon name='shanchu3' size={52} color={deleteOver ? '#e2e2e2' : '#202020'} style={{ transition: 'color 0.1s' }} />
        <Text className='text'>{deleteOver ? '放开删除' : '拖到这里删除'}</Text>
      </View>
    </View>
  </View>
}

export default () => {
  return <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: false }}>
    <Edit />
  </DndProvider>
}
