import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Create from '../create'
import './object.scss'

export default class ObjectForm extends Component {

  static options = {
    // 组件使用全局样式
    addGlobalClass: true,
    // 虚拟组件
    virtualHost: true
  }

  render() {
    const { data = {}, config = {}, value } = this.props
    return <View className={`form-object${config.edit ? ' form-object--edit' : ''}`}>
      <Create
        {...this.props}
        form={data.child}
        values={value}
        compName='object'
        disabled={data.disabled}
        editInfo={config.edit ? {
          title: '对象表单',
          desc: '请将组件拖到这里'
        } : {}}
      />
    </View>
  }

}
