import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Create from '../create'
import './tab.scss'

export default class TabForm extends Component {

  state = {
    hover: 0
  }

  switch(hover, e) {
    e.stopPropagation && e.stopPropagation()
    this.setState({ hover })
  }

  event(e) {
    const { hover } = this.state
    const { data = {} } = this.props
    e.keys.unshift(data.key)
    e.indexs.unshift(hover)
    this.props.onEvent(e)
  }

  renderTab(data) {
    const { hover } = this.state
    return <View className={`form-tab__nav${['top', 'bottom'].includes(data.position) ? ' form-tab__nav--row' : ''}`}>
      {data.child.map((item, index) => <View
        className={`form-tab__nav__item${hover === index ? ' form-tab__nav__item--hover' : ''}`}
        key={item.text + index}
        onClick={this.switch.bind(this, index)}
      >
        <Text className='form-tab__nav__item__txt'>{item.text}</Text>
      </View>)}
    </View>
  }

  render() {
    const { data = { child: [] }, config = {}, indexs } = this.props
    const { hover } = this.state
    const form = data.child[hover] ? data.child[hover].child : []
    const tabStart = ['left', 'top'].includes(data.position)
    const row = ['left', 'right'].includes(data.position)
    return <View className={`form-tab${row ? ' form-tab--row' : ''}`} style={data.style}>
      {tabStart && this.renderTab(data)}
      <View className={`form-tab__child${config.edit ? ' form-tab__child--edit' : ''}`}>
        <Create
          {...this.props}
          form={form}
          compName='tab'
          indexs={[...indexs, hover]}
          disabled={data.disabled}
          editInfo={config.edit ? {
            title: data.child[hover].text,
            desc: '请将组件拖到这里'
          } : {}}
          onEvent={this.event.bind(this)}
        />
      </View>
      {!tabStart && this.renderTab(data)}
    </View>
  }

}
