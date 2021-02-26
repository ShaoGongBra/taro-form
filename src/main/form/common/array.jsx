import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Create from '../create'
import './array.scss'

export default class ArrayForm extends Component {

  // 递归获取子表单
  getChild(list, index = [0]) {
    return list.map(item => {
      const newItem = { ...item }
      if (typeof newItem.name !== 'undefined') {
        newItem.name = index[0]
        index[0]++
      } else if (newItem.child) {
        newItem.child = this.getChild(newItem.child, index)
      }
      return newItem
    })
  }

  render() {
    const { data = {}, config = {}, value } = this.props
    return <View className={`form-array${config.edit ? ' form-array--edit' : ''}`} style={data.style}>
      <Create
        {...this.props}
        form={this.getChild(data.child)}
        values={value}
        compName='array'
        disabled={data.disabled}
        editInfo={config.edit ? {
          title: '数组表单',
          desc: '请将组件拖到这里'
        } : {}}
      />
    </View>
  }

}
