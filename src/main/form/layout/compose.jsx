import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Icon from '../../../components/icon'
import Create from '../create'
import './compose.scss'

export default class ComposeForm extends Component {

  state = {
    show: false
  }

  render() {
    const { show } = this.state
    const { data = { child: [] }, config = {} } = this.props
    const child = show || config.edit ? data.child : data.child.slice(0, 1)
    return <View
      className={`form-compose${config.edit ? ' form-compose--edit' : ''}`}
      style={data.style}
    >
      <View className='form-compose__btn'>
        <Icon name={show ? 'xia4' : 'you3'} onClick={() => this.setState({ show: !show })} />
      </View>
      <View className='form-compose__form'>
        <Create
          {...this.props}
          form={child}
          compName='compose'
          disabled={data.disabled}
          editInfo={config.edit ? {
            title: '组合',
            desc: '请将组件拖到这里'
          } : {}}
        />
      </View>
    </View>
  }
}
