import React, { useRef, useMemo, useContext } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { View, Text } from '@tarojs/components'
import InputForm from './common/input'
import SelectForm from './common/select'
import SwitchForm from './common/switch'
import CheckForm from './common/check'
import SteepForm from './common/steep'
import SliderForm from './common/slider'
import RateForm from './common/rate'
import DateForm from './common/date'
import TimeForm from './common/time'
import ColorForm from './common/color'
import IconSelectForm from './common/icon_select'
import UploadForm from './common/upload'
import ObjectForm from './common/object'
import ArrayForm from './common/array'
import ArrayOneForm from './common/array_one'
import ArrayTwoForm from './common/array_two'
import ButtonForm from './common/button'
import KeyForm from './common/key'
import NodeSelectForm from './common/node_select'
import FlexLayout from './layout/flex'
import TabLayout from './layout/tab'
import RowLayout from './layout/row'
import ColumnLayout from './layout/column'
import PanelLayout from './layout/panel'
import ComposeLayout from './layout/compose'
import BackgroundLayout from './layout/background'
import ImageView from './view/image'
import TextView from './view/text'
import IconView from './view/icon'
import SegmentView from './view/segment'
import EditTypes from '../edit/editTypes'
import comp from '../edit/comp'
import { ConfigContext } from './util'
import './create.scss'

const DragDrog = ({ children, moveForm, editForm, indexs, tpl, compName, form }) => {
  const ref = useRef(null)
  // 是否横向布局
  const isRow = (() => {
    if (!ref.current) {
      return 'row'
    }
    const style = document.defaultView.getComputedStyle(ref.current.parentNode, null)
    const direction = style.flexDirection
    const display = style.display
    if (display === 'block') {
      return false
    } else {
      return direction === 'row'
    }
  })()
  const [{ isDragging }, drag] = useDrag({
    item: { type: EditTypes.FORM_MOVE, indexs, ref, tpl },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    begin() {
      editForm(-1)
    }
  })
  const [{ over }, drop] = useDrop({
    accept: [EditTypes.FORM_MOVE, EditTypes.FORM_ADD],
    hover(item, monitor) {
      if (item.type === EditTypes.FORM_ADD) {
        return
      }
      if (!ref.current || !item.ref || !item.ref.current) {
        return
      }
      if (!monitor.isOver({ shallow: true })) {
        return
      }
      if (comp.isChildDisable(compName, item.tpl)) {
        return
      }
      // 跳过相同的位置
      if (item.indexs.join() === indexs.join()) {
        return
      }
      // 禁止将父组件拖动到自己的子组件
      if (item.indexs.length < indexs.length && item.indexs.join() === indexs.slice(0, item.indexs.length).join()) {
        return
      }
      const dragRect = item.ref.current?.getBoundingClientRect()
      const drarPos = monitor.getSourceClientOffset()
      const dropRect = ref.current?.getBoundingClientRect()
      const long = {
        drag: dragRect[isRow ? 'width' : 'height'],
        drop: dropRect[isRow ? 'width' : 'height']
      }
      // 拖动的块比 放开的块小 需要判断是否可以替换
      if (long.drag < long.drop) {
        const start = {
          drag: drarPos[isRow ? 'x' : 'y'],
          drop: dropRect[isRow ? 'left' : 'top']
        }
        const end = {
          drag: start.drag + long.drag,
          drop: start.drop + long.drop
        }
        const width = long.drop - long.drag
        const startWidth = start.drag - start.drop
        const endWidth = end.drop - end.drag
        // 超过三倍 在中间区域
        if (startWidth > width && endWidth > width) {
          return
        }
        // 更接近开始位置 并且当前的块在开始位置 则跳过
        if (startWidth < endWidth && item.indexs.length === indexs.length && item.indexs[item.indexs.length - 1] < indexs[indexs.length - 1]) {
          return
        }
        // 更接近结束位置 并且当前的块在结束位置 则跳过
        if (startWidth >= endWidth && item.indexs.length === indexs.length && item.indexs[item.indexs.length - 1] > indexs[indexs.length - 1]) {
          return
        }
      }
      moveForm(item.indexs, indexs, 'move')
      // 更改索引
      item.indexs = indexs
    },
    drop(item, monitor) {
      if (item.type === EditTypes.FORM_MOVE) {
        return
      }
      if (!monitor.isOver({ shallow: true })) {
        return
      }
      // 禁止放进子组件
      if (comp.isChildDisable(compName, item.tpl)) {
        return
      }
      // 子组件数量判断
      if (!comp.isChildAdd(compName, form.length)) {
        return
      }
      moveForm(item.tpl, indexs)
    },
    collect(monitor) {
      const item = monitor.getItem()
      return {
        over: item
          && item.type === EditTypes.FORM_ADD
          && monitor.isOver({ shallow: true })
          && !comp.isChildDisable(compName, item.tpl)
          && comp.isChildAdd(compName, form.length)
      }
    }
  })

  drag(drop(ref))
  return <View
    ref={ref}
    className={`form-drag-drop${isDragging ? ' form-drag-drop--hover' : ''}${isRow ? ' form-drag-drop--row' : ''}`}
    onClick={e => {
      e.stopPropagation()
      editForm()
    }}
  >
    {over && <View className='form-drag-drop__add'>
      <Text className='form-drag-drop__add__text'>放开添加</Text>
    </View>}
    {children}
  </View>
}

const ContextData = ({ compName, children, config }) => {
  return compName === 'form' ? <ConfigContext.Provider value={comp.attrMerge(config)}>
    {children}
  </ConfigContext.Provider>
    : children
}

export default (props) => {
  const { form = [], disabled, config = {}, values = {}, indexs = [], compName = 'form', onEvent, moveForm, editForm, editInfo = {} } = props
  // 组件事件
  const event = (item, index, data) => {
    // 表单自身禁用或者整个表单禁用 则触发事件
    if (item.disabled || disabled) {
      return
    }
    if (data.keys === undefined) {
      data.keys = []
    }
    if (data.indexs === undefined) {
      data.indexs = []
    }
    if (data.names === undefined) {
      data.names = []
    }
    data.keys.unshift(item.key)
    data.indexs.unshift(index)
    typeof item.name !== 'undefined' && data.names.unshift(item.name)
    onEvent && onEvent(data)
  }

  const [{ over }, drop] = useDrop({
    accept: [EditTypes.FORM_ADD, EditTypes.FORM_MOVE],
    hover(item, monitor) {
      if (item.type === EditTypes.FORM_ADD) {
        return
      }
      if (comp.isChildDisable(compName, item.tpl)) {
        return
      }
      // 判断是不是在当前组件内不移动的在内部移动index-1 从其他地方移动来的index保持不变
      let index = form.length
      if (item.indexs.length - 1 === indexs.length && item.indexs.slice(0, item.indexs.length - 1).join() === indexs.join()) {
        index--
      }
      const newIndexs = [...indexs, index]
      if (item.indexs.join() === newIndexs.join()) {
        return
      }
      // 禁止将父组件拖动到自己的子组件
      if (item.indexs.length < newIndexs.length && item.indexs.join() === newIndexs.slice(0, item.indexs.length).join()) {
        return
      }
      if (!monitor.isOver({ shallow: true })) {
        return
      }
      // 执行更新
      moveForm(item.indexs, newIndexs)
      // 更改索引
      item.indexs = newIndexs
    },
    drop(item) {
      if (item.type === EditTypes.FORM_MOVE) {
        return
      }
      // 禁止放进子组件
      if (comp.isChildDisable(compName, item.tpl)) {
        return
      }
      // 子组件数量判断
      if (!comp.isChildAdd(compName, form.length)) {
        return
      }
      moveForm(item.tpl, [...indexs, form.length])
    },
    collect(monitor) {
      const item = monitor.getItem()
      return {
        over: item
          && item.type === EditTypes.FORM_ADD
          && monitor.isOver()
          && !comp.isChildDisable(compName, item.tpl)
          && comp.isChildAdd(compName, form.length)
      }
    }
  })

  /**
   * 获取表单项
   * @param {*} item
   * @param {*} index
   */
  const getItem = (item, index) => {
    if (item.hidden) {
      return null
    }
    // 合并属性
    item = comp.attrMerge(item)
    const compData = {
      ...props,
      key: item.key,
      data: item,
      indexs: [...indexs, index],
      onEvent: e => event(item, index, e)
    }
    if (typeof item.name !== 'undefined') {
      compData.value = values[item.name]
    }
    switch (item.tpl) {
      case 'input': {
        return <InputForm {...compData} />
      }
      case 'select': {
        return <SelectForm {...compData} />
      }
      case 'switch': {
        return <SwitchForm {...compData} />
      }
      case 'check': {
        return <CheckForm {...compData} />
      }
      case 'steep': {
        return <SteepForm {...compData} />
      }
      case 'slider': {
        return <SliderForm {...compData} />
      }
      case 'rate': {
        return <RateForm {...compData} />
      }
      case 'date': {
        return <DateForm {...compData} />
      }
      case 'time': {
        return <TimeForm {...compData} />
      }
      case 'color': {
        return <ColorForm {...compData} />
      }
      case 'icon-select': {
        return <IconSelectForm {...compData} />
      }
      case 'upload': {
        return <UploadForm {...compData} />
      }
      case 'object': {
        return <ObjectForm {...compData} />
      }
      case 'array': {
        return <ArrayForm {...compData} />
      }
      case 'array-one': {
        return <ArrayOneForm {...compData} />
      }
      case 'array-two': {
        return <ArrayTwoForm {...compData} />
      }
      case 'button': {
        return <ButtonForm {...compData} />
      }
      case 'key': {
        return <KeyForm {...compData} />
      }
      case 'node-select': {
        return <NodeSelectForm {...compData} />
      }
      case 'flex': {
        return <FlexLayout {...compData} />
      }
      case 'row': {
        return <RowLayout {...compData} />
      }
      case 'column': {
        return <ColumnLayout {...compData} />
      }
      case 'panel': {
        return <PanelLayout {...compData} />
      }
      case 'compose': {
        return <ComposeLayout {...compData} />
      }
      case 'background': {
        return <BackgroundLayout {...compData} />
      }
      case 'tab': {
        return <TabLayout {...compData} />
      }
      case 'image': {
        return <ImageView {...compData} />
      }
      case 'text': {
        return <TextView {...compData} />
      }
      case 'icon': {
        return <IconView {...compData} />
      }
      case 'segment': {
        return <SegmentView {...compData} />
      }
      default: {
        return null
      }
    }
  }
  return (
    <ContextData compName={compName} config={config}>
      {
        form.map((item, index) => config.edit ?
          <DragDrog
            key={item.key}
            tpl={item.tpl}
            index={index}
            indexs={[...indexs, index]}
            compName={compName}
            form={form}
            moveForm={moveForm}
            editForm={e => editForm(e !== undefined ? e : [...indexs, index])}
          >
            {getItem(item, index)}
          </DragDrog> :
          getItem(item, index)
        )
      }
      {!!editInfo.title && <View
        ref={drop}
        className={`form-create__edit${over ? ' form-create__edit--drop' : ''}`}
        onClick={() => {
          compName === 'page' && editForm([])
        }}
      >
        <Text className='form-create__edit__title'>{editInfo.title}</Text>
        {!!editInfo.desc && <Text className='form-create__edit__desc'>{over ? '放开添加' : editInfo.desc}</Text>}
      </View>}
    </ContextData>
  )
}
