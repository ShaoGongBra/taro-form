import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Icon from '../../../components/icon'
import Base from './base'
import './steep.scss'

export default class SteepForm extends Component {

  change(type) {
    const { data = {}, value = 0 } = this.props
    const { min = 0, max = 9, step = 1 } = data
    const newValue = Number(value) + (type === '+' ? step : -step)
    if (newValue >= Number(min) && newValue <= Number(max)) {
      this.props.onEvent({
        event: 'input',
        component: data,
        value: newValue
      })
    }
  }

  render() {
    const { data = {}, value = 0 } = this.props
    const { min = 0, max = 9 } = data
    return <Base {...this.props}>
      <View className='form-steep'>
        <View className='form-steep__btn' onClick={this.change.bind(this, '-')}>
          <Icon name='jianhao' size={32} color={Number(value) <= Number(min) ? '#999' : '#333'} />
        </View>
        <View className='form-steep__num'>
          <Text className='form-steep__num__text'>{value}</Text>
        </View>
        <View className='form-steep__btn' onClick={this.change.bind(this, '+')}>
          <Icon name='jiahao' size={32} color={Number(value) >= Number(max) ? '#999' : '#333'} />
        </View>
      </View>
    </Base>
  }

}
