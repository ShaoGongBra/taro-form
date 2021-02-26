import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Icon from '../../../components/icon'
import Base from './base'
import IconSelectPull from './icon_select_pull'
import './icon_select.scss'

export default class IconSelectForm extends Component {

  render() {
    const { data = {}, config = {}, value } = this.props
    return <Base {...this.props}>
      <View className='form-icon-select'
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
      >
        <View className='form-icon-select__icon' style={{ backgroundColor: value || '#fff' }}>
          <Icon name={value} />
        </View>
        <Text className='form-icon-select__value'>{value || '点击选择图标'}</Text>
      </View>
      <IconSelectPull ref={ref => this.colorPull = ref} />
    </Base>
  }

}
