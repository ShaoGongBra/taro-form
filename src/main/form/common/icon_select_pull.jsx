

import React, { Component } from 'react'
import { View, Text, ScrollView, Input } from '@tarojs/components'
import PullView from '../../../components/overlay/pull_view'
import Icon from '../../../components/icon'
import icon1 from '../../../static/fonts/icon'
import './icon_select_pull.scss'

const fonts = [{ font: 'icon', icons: icon1 }]

export default class IconSelectPullForm extends Component {

  state = {
    hover: 0,
    show: false,
    keyword: '',
    iconShow: false
  }

  static options = {
    // 组件使用全局样式
    addGlobalClass: true,
    // 虚拟组件
    virtualHost: true
  }

  callback
  select() {
    this.setState({ show: true })
    setTimeout(() => {
      this.setState({ iconShow: true })
    }, 200)
    return new Promise((resolve, reject) => {
      this.callback = [resolve, reject]
    })
  }

  switch(hover) {
    this.setState({ hover })
  }

  search(e) {
    const { value } = e.target
    this.setState({ keyword: value })
  }

  submit(value) {
    const { hover } = this.state
    this.callback[0]([fonts[hover].font, value])
    this.pullView.close()
  }

  close() {
    this.setState({ show: false, iconShow: false })
    this.callback[1]()
  }

  render() {
    const { hover, iconShow, keyword, show } = this.state
    const icons = iconShow ? Object.keys(fonts[hover].icons).filter(item => item.indexOf(keyword) >= 0) : []
    return show && <PullView ref={ref => this.pullView = ref} onClose={this.close.bind(this)} style={{ backgroundColor: '#fff' }}>
      {fonts.length > 1 && <ScrollView scrollX className='form-icon-select-pull__cate'>
        {fonts.map((item, index) => <View
          className={`form-icon-select-pull__cate__item${hover === index ? ' form-icon-select-pull__cate__item--hover' : ''}`}
          key={item.font}
          onClick={this.switch.bind(this, index)}
        >
          <Text className='form-icon-select-pull__cate__item__text'>{item.font}</Text>
        </View>)}
      </ScrollView>}
      <View className='form-icon-select-pull__search'>
        <Input className='form-icon-select-pull__search__input' placeholder='搜索图标' value={keyword} onInput={this.search.bind(this)} />
      </View>
      <ScrollView scrollY className='form-icon-select-pull__scroll'>
        {iconShow && <View className='form-icon-select-pull__icons'>
          {
            icons.map(item => <View key={item} className='form-icon-select-pull__icons__item' onClick={this.submit.bind(this, item)}>
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

}
