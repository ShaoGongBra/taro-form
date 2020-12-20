import React, { Component } from 'react'
import { Text, View } from '@tarojs/components'
import Icon from '../../../components/icon'
import Create from '../create'
import './panel.scss'

export default class PanelForm extends Component {

  state = {
    show: true
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.open !== this.oldOpen) {
      this.oldOpen = nextProps.data.open
      this.setState({
        show: this.oldOpen
      })
    }
  }

  oldOpen = true

  static options = {
    // 组件使用全局样式
    addGlobalClass: true,
    // 虚拟组件
    virtualHost: true
  }

  render() {
    const { show } = this.state
    const { data = {}, config = {} } = this.props
    return <View
      className={`form-panel${config.edit ? ' form-panel--edit' : ''}`}
      style={data.style}
    >
      <View className='form-panel__head'>
        <Text className='form-panel__head__title'>{data.title}</Text>
        <Icon
          name={show ? 'shang2' : 'xia4'}
          onClick={e => {
            e.stopPropagation && e.stopPropagation()
            this.setState({ show: !show })
          }}
        />
      </View>
      {show && <Create
        {...this.props}
        form={data.child}
        compName='panel'
        disabled={data.disabled}
        editInfo={config.edit ? {
          title: '面板布局',
          desc: '请将组件拖到这里'
        } : {}}
      />}
    </View>
  }
}
