import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Create from '../create'
import './background.scss'

export default class BackgroundForm extends Component {

  static options = {
    // 组件使用全局样式
    addGlobalClass: true,
    // 虚拟组件
    virtualHost: true
  }

  render() {
    const { data = {}, config = {} } = this.props
    return <View
      className={`form-background${config.edit ? ' form-background--edit' : ''}`}
      style={data.style}
    >
      {!!data.src && <Image src={data.src} className='form-background__bg' />}
      <Create
        {...this.props}
        form={data.child}
        compName='background'
        disabled={data.disabled}
        editInfo={config.edit ? {
          title: '背景',
          desc: '请将组件拖到这里'
        } : {}}
      />
    </View>
  }
}
