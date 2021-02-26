import React, { Component } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import Base from './base'
import './time.scss'

export default class TimeForm extends Component {

  input(e) {
    const { data } = this.props
    this.props.onEvent({
      event: 'input',
      component: data,
      value: e.detail.value
    })
  }

  render() {
    const { data = {}, value } = this.props
    return <Base {...this.props}>
      <View className='form-time'>
        <Picker mode='time' value={value} disabled={!!data.disabled} onChange={this.input.bind(this)}>
          <Text className='form-time__text'>{value || '请选择时间'}</Text>
        </Picker>
      </View>
    </Base>
  }

}
