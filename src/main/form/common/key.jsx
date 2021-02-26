import React, { Component } from 'react'
import { Text } from '@tarojs/components'
import { getKey } from '../../../utils/string'
import Base from './base'
import './key.scss'

export default class KeyForm extends Component {

  componentDidMount() {
    const { data } = this.props
    const { value } = this.props
    if (!value) {
      this.props.onEvent({
        event: 'input',
        component: data,
        value: getKey()
      })
    }
  }

  render() {
    const { value = '' } = this.props
    return <Base {...this.props}>
      <Text className='form-key'>{value}</Text>
    </Base>
  }

}
