import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { View, Text } from '@tarojs/components'
import EditTypes from './editTypes'
import comp from './comp'

import './create_dnd.scss'

export const DragDrog = ({ children, moveForm, editForm, indexs, tpl, compName, form }) => {
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

export const CreateDrop = ({ compName, form, indexs, moveForm, editForm, editInfo }) => {
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

  return <View
    ref={drop}
    className={`create-dnd__edit${over ? ' create-dnd__edit--drop' : ''}`}
    onClick={() => {
      compName === 'page' && editForm([])
    }}
  >
    <Text className='create-dnd__edit__title'>{editInfo.title}</Text>
    {!!editInfo.desc && <Text className='create-dnd__edit__desc'>{over ? '放开添加' : editInfo.desc}</Text>}
  </View>
}
