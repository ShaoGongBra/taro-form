import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Create from '../create'
import './column.scss'

export default class ColumnForm extends Component {

  static options = {
    // 组件使用全局样式
    addGlobalClass: true,
    // 虚拟组件
    virtualHost: true
  }

  render() {
    const { data = {}, config = {} } = this.props
    return <View
      className={`form-column${config.edit ? ' form-column--edit' : ''}`}
      style={data.style}
    >
      <Create
        {...this.props}
        form={data.child}
        compName='column'
        disabled={data.disabled}
        editInfo={config.edit ? {
          title: '竖向布局',
          desc: '请将组件拖到这里'
        } : {}}
      />
    </View>
  }
}
