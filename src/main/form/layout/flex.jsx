import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Create from '../create'
import './flex.scss'

export default class FlexForm extends Component {

  event(index, e) {
    const { data = {} } = this.props
    e.keys.unshift(data.key)
    e.indexs.unshift(index)
    this.props.onEvent(e)
  }

  render() {
    const { data = { child: [] }, config = {}, indexs } = this.props
    return <View className={`form-flex${config.edit ? ' form-flex--edit' : ''}`} style={data.style}>
      {data.child.map((item, index) => <View
        key={'item' + index}
        className={`form-flex__item${config.edit ? ' form-flex__item--edit' : ''}`}
        style={{
          flex: item.flex
        }}
      >
        <Create
          {...this.props}
          form={item.child}
          compName='flex'
          indexs={[...indexs, index]}
          editInfo={config.edit ? {
            title: '栅格布局',
            desc: '请将组件拖到这里'
          } : {}}
          disabled={data.disabled}
          onEvent={this.event.bind(this, index)}
        />
      </View>)}
    </View>
  }

}
