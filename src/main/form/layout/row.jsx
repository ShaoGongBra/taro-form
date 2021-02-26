import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Create from '../create'
import './row.scss'

export default class RowForm extends Component {

  render() {
    const { data = {}, config = {} } = this.props
    return <View
      className={`form-row${config.edit ? ' form-row--edit' : ''}`}
      style={data.style}
    >
      <Create
        {...this.props}
        form={data.child}
        compName='row'
        disabled={data.disabled}
        editInfo={config.edit ? {
          title: '横向布局',
          desc: '请将组件拖到这里'
        } : {}}
      />
    </View>
  }
}
