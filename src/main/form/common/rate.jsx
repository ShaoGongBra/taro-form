import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Icon from '../../../components/icon'
import Base from './base'
import './rate.scss'

export default class RateForm extends Component {

  static options = {
    // 组件使用全局样式
    addGlobalClass: true,
    // 虚拟组件
    virtualHost: true
  }

  input(value) {
    const { data = {} } = this.props
    const { rule = 5 } = data
    this.props.onEvent({
      event: 'input',
      component: data,
      value: value * (rule / 5)
    })
  }

  render() {
    const { data = {}, value } = this.props
    const { rule = 5 } = data
    const newValue = Math.round(value / (rule / 5))
    const arr = [1, 2, 3, 4, 5]
    return <Base {...this.props}>
      <View className='form-rate'>
        {arr.map(item => <Icon
          key={item}
          size={42}
          name={item <= newValue ? 'pingfen-yipingfen' : 'pingfen'}
          color={item <= newValue ? '#333' : '#666'}
          onClick={this.input.bind(this, item)}
        />)}
      </View>
    </Base>
  }

}
