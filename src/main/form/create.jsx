import React from 'react'
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

import { DragDrog, CreateDrop } from '../edit/create_dnd'
import comp from '../edit/comp'
import { ConfigContext } from './util'

import './create.scss'

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
        form.map((item, index) => process.env.TARO_ENV === 'h5' && config.edit ?
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
      {process.env.TARO_ENV === 'h5' && !!editInfo.title && <CreateDrop editInfo={editInfo} compName={compName} editForm={editForm} moveForm={moveForm} indexs={indexs} form={form} />}
    </ContextData>
  )
}
