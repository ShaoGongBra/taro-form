import React, { Component } from 'react'
import { View, Input } from '@tarojs/components'
import Base from './base'
import ColorPull from './color_pull'
import { isColorString } from '../../../utils/color'
import './color.scss'

export default class ColorForm extends Component {

  input(e) {
    const { value } = e.detail
    const { data = {} } = this.props
    // 验证颜色值的合法性
    if (isColorString(value)) {
      this.props.onEvent({
        event: 'input',
        component: data,
        value: e.detail.value
      })
    }
  }

  render() {
    const { data = {}, config = {}, value } = this.props
    return <Base {...this.props}>
      <View className='form-color'>
        <View
          className='form-color__color'
          style={{ backgroundColor: value || '#fff' }}
          onClick={() => {
            if (config.edit || data.disabled) {
              return
            }
            this.colorPull.select().then(res => {
              this.props.onEvent({
                event: 'input',
                component: data,
                value: res
              })
            })
          }}
        />
        <Input className='form-color__input' value={value} placeholder='颜色值' onInput={this.input.bind(this)} />
      </View>
      <ColorPull ref={ref => this.colorPull = ref} />
    </Base>
  }

}
