import React, { Component } from 'react'
import { View, Input, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Icon from '../../../components/icon'
import Base from './base'
import './input.scss'

export default class InputForm extends Component {

  static options = {
    // 组件使用全局样式
    addGlobalClass: true,
    // 虚拟组件
    virtualHost: true
  }

  input(e) {
    const { data = {} } = this.props
    this.props.onEvent({
      event: 'input',
      component: data,
      value: e.detail.value
    })
  }

  blur() {
    const { data = {} } = this.props
    this.props.onEvent({
      event: 'input-blur',
      component: data
    })
  }

  render() {
    const { data = {}, value = '' } = this.props
    return <Base {...this.props}>
      <View className='form-input'>
        {!!data.leftIcon && data.leftIcon.length > 0 && <Icon name={data.leftIcon} size={36} style={{ marginRight: Taro.pxTransform(10) }} />}
        {
          data.multiline ?
            <Textarea
              className='form-input__textarea'
              placeholder={data.placeholder || ''}
              maxLength={data.maxLength || 140}
              disabled={!!data.disabled}
              focus={!!data.focus}
              value={value}
              onInput={this.input.bind(this)}
              onBlur={this.blur.bind(this)}
            /> :
            <Input
              className='form-input__input'
              type={data.type || 'text'}
              placeholder={data.placeholder === undefined ? data.text : data.placeholder}
              password={!!data.password}
              maxLength={data.maxLength || 140}
              disabled={!!data.disabled}
              focus={!!data.focus}
              value={value}
              onInput={this.input.bind(this)}
              onBlur={this.blur.bind(this)}
            />
        }
      </View>
    </Base>
  }

}
