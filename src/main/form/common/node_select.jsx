import React, { Component } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import PullView from '../../../components/overlay/pull_view'
import comp from '../../edit/comp'
import Base from './base'
import './node_select.scss'

export default class NodeSelectForm extends Component {

  state = {
    show: false
  }

  input(item) {
    const { data = {} } = this.props
    if (this.isDisable(item)) {
      return
    } else {
      this.pullView.close()
    }
    this.props.onEvent({
      event: 'input',
      component: data,
      value: item.key
    })
  }

  getNodeInfo(key, list = window.editFormList) {
    if (list.length === 0 || !key) {
      return {}
    }
    const childs = []
    for (let i = 0, l = list.length; i < l; i++) {
      const item = list[i]
      if (item.key === key) {
        return item
      }
      if (item.child) {
        childs.push(...item.child)
      }
    }
    return this.getNodeInfo(key, childs)
  }

  // 是否禁用
  isDisable(item) {
    const { data = {} } = this.props
    switch (data.type) {
      case 'where':
        // 选择用户控制表单的接单
        return item.name === undefined || item.child
      default:
        return false
    }
  }

  // 递归节点列表
  renderList(list = window.editFormList) {
    return list.map(item => <View key={item.key} className='form-node-select__item'>
      <Text
        className={`form-node-select__item__text${this.isDisable(item) ? ' form-node-select__item__text--disable' : ''}`}
        onClick={this.input.bind(this, item)}
      >{item.text || item.tpl}</Text>
      {
        item.child && this.renderList(item.child)
      }
    </View>)
  }

  render() {
    const { show } = this.state
    const { value } = this.props
    const nodeInfo = this.getNodeInfo(value)
    return <Base {...this.props}>
      <View className='form-node-select' onClick={() => this.setState({ show: true })}>
        <Text className='form-node-select__text'>{nodeInfo.tpl ? `${comp.getCompName(nodeInfo.tpl)}${nodeInfo.text ? ':' + nodeInfo.text : ''}` : '点击选择'}</Text>
      </View>
      {show && <PullView ref={ref => this.pullView = ref} onClose={() => this.setState({ show: false })}>
        <View className='form-node-select__head'>
          <Text className='form-node-select__head__text'>表单选择器</Text>
        </View>
        <ScrollView scrollY className='form-node-select__scroll'>
          {this.renderList()}
        </ScrollView>
      </PullView>}
    </Base>
  }

}
