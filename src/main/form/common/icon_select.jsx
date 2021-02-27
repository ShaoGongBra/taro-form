import React, { Component, useState, useRef, useMemo } from 'react'
import { View, Text, ScrollView, Input } from '@tarojs/components'
import Icon from '../../../components/icon'
import TopView from '../../../components/overlay/top_view'
import PullView from '../../../components/overlay/pull_view'
import Base from './base'
import icon1 from '../../../static/fonts/icon'
import './icon_select.scss'

const fonts = [{ font: 'icon', icons: icon1 }]

const Select = ({ onSelect, onClose }) => {

  const [hover, setHover] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [show, setShow] = useState(false)

  !show && setTimeout(() => {
    !show && setShow(true)
  }, 200)

  const icons = useMemo(() => {
    return show && keyword
      ? Object.keys(fonts[hover].icons).filter(item => item.indexOf(keyword) >= 0)
      : show
        ? Object.keys(fonts[hover].icons)
        : []
  }, [show, keyword, hover])

  return <PullView onClose={onClose} style={{ backgroundColor: '#fff' }}>
    {fonts.length > 1 && <ScrollView scrollX className='form-icon-select-pull__cate'>
      {fonts.map((item, index) => <View
        className={`form-icon-select-pull__cate__item${hover === index ? ' form-icon-select-pull__cate__item--hover' : ''}`}
        key={item.font}
        onClick={() => setHover(index)}
      >
        <Text className='form-icon-select-pull__cate__item__text'>{item.font}</Text>
      </View>)}
    </ScrollView>}
    <View className='form-icon-select-pull__search'>
      <Input className='form-icon-select-pull__search__input' placeholder='搜索图标' value={keyword} onInput={e => setKeyword(e.target.value)} />
    </View>
    <ScrollView scrollY className='form-icon-select-pull__scroll'>
      {show && <View className='form-icon-select-pull__icons'>
        {
          icons.map(item => <View
            key={item}
            className='form-icon-select-pull__icons__item'
            onClick={() => onSelect([fonts[hover].font, item])}
          >
            <Icon font={fonts[hover].font} name={item} size={36} />
            <Text className='form-icon-select-pull__icons__item__name'>{item}</Text>
          </View>)
        }
        <View className='form-icon-select-pull__icons__item--empty' />
        <View className='form-icon-select-pull__icons__item--empty' />
        <View className='form-icon-select-pull__icons__item--empty' />
        <View className='form-icon-select-pull__icons__item--empty' />
        <View className='form-icon-select-pull__icons__item--empty' />
        <View className='form-icon-select-pull__icons__item--empty' />
        <View className='form-icon-select-pull__icons__item--empty' />
        <View className='form-icon-select-pull__icons__item--empty' />
      </View>}
    </ScrollView>
  </PullView>
}

export default class IconSelectForm extends Component {

  select() {
    this.key = TopView.add(<Select onSelect={this.submit.bind(this)} onClose={this.close.bind(this)} />)
    return new Promise((resolve, reject) => {
      this.callback = [resolve, reject]
    })
  }

  submit(value) {
    TopView.remove(this.key)
    this.callback[0](value)
  }

  close() {
    TopView.remove(this.key)
    this.callback[1]()
  }

  render() {
    const { data = {}, config = {}, value } = this.props
    return <Base {...this.props}>
      <View className='form-icon-select'
        onClick={() => {
          if (config.edit || data.disabled) {
            return
          }
          this.select().then(res => {
            this.props.onEvent({
              event: 'input',
              component: data,
              value: res
            })
          }).catch(() => { })
        }}
      >
        <View className='form-icon-select__icon' style={{ backgroundColor: value || '#fff' }}>
          <Icon name={value} />
        </View>
        <Text className='form-icon-select__value'>{value || '点击选择图标'}</Text>
      </View>
    </Base>
  }

}
