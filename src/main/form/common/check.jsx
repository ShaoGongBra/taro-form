import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Icon from '../../../components/icon'
import Base from './base'
import './check.scss'

export default class CheckForm extends Component {

  input() {
    const { data, value } = this.props
    this.props.onEvent({
      event: 'input',
      component: data,
      value: !(!!value && value !== '0')
    })
  }

  render() {
    const { data = {}, value } = this.props
    return <Base {...this.props}>
      <View className='form-check' onClick={this.input.bind(this)}>
        <View className='form-check__click'>
          {!!value && value !== '0' && <Icon name='duihao2' size={38} />}
        </View>
        {!!data.title && <Text className='form-check__tip'>{data.title}</Text>}
      </View>
    </Base>
  }

}
