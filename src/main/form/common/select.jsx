import React, { Component, useMemo, useCallback, useState, useRef } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Icon from '../../../components/icon'
import PullView from '../../../components/overlay/pull_view'
import TopView from '../../../components/overlay/top_view'
import Btn from '../../../components/button'
import Base from './base'
import { getContrastYIQ } from '../../../utils/color'
import './select.scss'

// 判断当前项目是否选中
const isSelect = (item, type, value = '') => {
  if (type === 'radio') {
    if (typeof item.value === 'object') {
      return item.value[0] === value
    }
    return item.value === value
  } else {
    return (typeof value === 'string' ? value.split(',') : value).includes(item.value)
  }
}

const RenderItemIcon = ({ item, type = 'radio', value }) => {

  const icon = type === 'radio'
    ? (isSelect(item, type, value) ? 'fuhao-zhuangtai-chenggong' : 'danxuan-weixuan')
    : (isSelect(item, type, value) ? 'duoxuan-yixuan' : 'duoxuan-weixuan')

  return <Icon name={icon} size={42} style={{ marginRight: Taro.pxTransform(12) }} />
}

const RenderText = ({ item, onInput, type, value }) => {
  return <View className='form-select__item-text' onClick={() => onInput(item)}>
    <RenderItemIcon item={item} type={type} value={value} />
    <View className='form-select__item-text__right'>
      <Text className='form-select__item-text__name'>{item.text}</Text>
      {!!item.desc && <Text className='form-select__item-text__desc'>{item.desc}</Text>}
    </View>
  </View>
}

const RenderButton = ({ item, onInput, type, value }) => {
  return <Btn
    text={item.text}
    size='m'
    disabled={!!item.disabled}
    plain={!isSelect(item, type, value)}
    beforeImage={item.image}
    style={{
      marginRight: Taro.pxTransform(10),
      marginBottom: Taro.pxTransform(10)
    }}
    onClick={() => onInput(item)}
  />
}

const RenderCard = ({ item, onInput, type, value }) => {
  return <View className='form-select__item-card' onClick={() => onInput(item)}>
    <RenderItemIcon item={item} type={type} value={value} />
    {item.image && <Image className='form-select__item-card__image' src={item.image} />}
    <View className='form-select__item-card__right'>
      <Text className='form-select__item-card__name'>{item.text}</Text>
      {!!item.desc && <Text className='form-select__item-card__desc'>{item.desc}</Text>}
    </View>
  </View>
}

const RenderImage = ({ item, onInput, type, value }) => {

  return <View className='form-select__item-image' onClick={() => onInput(item)}>
    <View className='form-select__item-image__btn'>
      <RenderItemIcon item={item} type={type} value={value} />
    </View>
    <Image className='form-select__item-image__image' src={item.image} />
    {!!item.text && <View className='form-select__item-image__bottom'>
      <Text className='form-select__item-image__name'>{item.text}</Text>
      {!!item.desc && <Text className='form-select__item-image__desc'>{item.desc}</Text>}
    </View>}
  </View>
}

const RenderColor = ({ item, onInput, type, value }) => {
  return <View
    className='form-select__item-color'
    style={{ backgroundColor: item.color }}
    onClick={() => onInput(item)}
  >
    {isSelect(item, type, value) && <Icon name='duihao2' color={getContrastYIQ(item.color)} />}
  </View>
}

const RenderOption = ({ onlySelect, data = {}, value, onInput }) => {
  if (!data.option) {
    data.option = []
  }

  const list = onlySelect ? data.option.filter(item => isSelect(item, data.type, value)) : data.option
  const input = (item) => {
    if (data.type === 'radio') {
      onInput({
        event: 'input',
        component: data,
        value: item.value
      })
    } else {
      const valueType = typeof value
      if (valueType === 'string') {
        value = value.split(',')
      }
      value = [...value]
      if (value.includes(item.value)) {
        value.splice(value.indexOf(item.value), 1)
      } else {
        value.push(item.value)
      }
      onInput({
        event: 'input',
        component: data,
        value: valueType === 'string' ? value.join(',') : value
      })
    }
  }

  return <View className={`form-select form-select--row form-select--${data.theme}`}>
    {
      list.map(item => {
        const itemData = { item, type: data.type, value, onInput: input, key: item.value }
        {
          switch (data.theme) {
            case 'text':
              return <RenderText {...itemData} />
            case 'button':
              return <RenderButton {...itemData} />
            case 'card':
              return <RenderCard {...itemData} />
            case 'image':
              return <RenderImage {...itemData} />
            case 'color':
              return <RenderColor {...itemData} />
            default:
              break
          }
        }
      })
    }
  </View>
}

const Picker = ({ data, onInput, onClose, value }) => {

  const pullView = useRef(null)
  const [item, setItem] = useState(null)
  // 弹出框value不更新 使用本地value
  const [localValue, setLocalValue] = useState(value)

  const submit = () => {
    pullView.current.close()
    item && onInput(item)
  }
  return <PullView
    ref={pullView}
    style={{ backgroundColor: '#fff', padding: Taro.pxTransform(20) }}
    onClose={onClose}
  >
    <View className='form-select__pull__head'>
      <Text className='form-select__pull__head__title'>选择</Text>
    </View>
    <ScrollView scrollY className='form-select__pull__scroll'>
      <RenderOption
        data={data}
        value={localValue}
        onInput={e => {
          if (data.type === 'radio') {
            pullView.current.close()
            onInput(e)
          } else {
            setItem(e)
            setLocalValue(e.value)
          }

        }}
      />
    </ScrollView>
    {data.type === 'checkbox' && <Btn text='确定' onClick={submit} />}
  </PullView>
}

export default class SelectForm extends Component {

  input(onlySelect, item) {
    const { config = {} } = this.props
    if (config.edit || onlySelect) {
      return
    }
    this.props.onEvent(item)
  }

  /**
   * 弹窗选择
   */
  picker() {
    const { data = {}, value } = this.props
    this.key = TopView.add(<Picker data={data} value={value} onInput={this.input.bind(this, false)} onClose={() => TopView.remove(this.key)} />)
  }

  render() {
    const { data = { option: [] }, config = {}, value } = this.props
    const isEmpty = data.mode === 'picker' && data.option.filter(item => isSelect(item, data.type, value)).length === 0
    return <Base {...this.props}>
      {
        data.mode === 'picker' ?
          <View
            className='form-select__value'
            onClick={() => {
              if (config.edit) {
                return
              }
              this.picker()
            }}
          >
            <RenderOption {...this.props} onlySelect onInput={this.input.bind(this, true)} />
            {isEmpty && <Text className='form-select__value__select'>点击选择</Text>}
          </View> :
          <RenderOption {...this.props} onInput={this.input.bind(this, false)} />
      }
    </Base>
  }

}
