

import React, { Component } from 'react'
import { View } from '@tarojs/components'
import PullView from '../../../components/overlay/pull_view'
import './color_pull.scss'

export default class ColorPullForm extends Component {

  state = {
    colors: ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'],
    show: false
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
    return new Promise((resolve, reject) => {
      this.callback = [resolve, reject]
    })
  }

  submit(color) {
    this.callback[0](color)
    this.pullView.close()
  }

  close() {
    this.setState({ show: false })
    this.callback[1]()
  }

  render() {
    const { colors, show } = this.state
    const { } = this.props
    return show && <PullView ref={ref => this.pullView = ref} onClose={this.close.bind(this)}>
      <View className='form-color-pull'>
        {colors.map(item => <View
          className='form-color-pull__item'
          key={item}
          style={{ backgroundColor: item }}
          onClick={this.submit.bind(this, item)}
        />)}
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
      </View>
    </PullView>
  }

}
