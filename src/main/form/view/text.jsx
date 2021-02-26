import React, { Component } from 'react'
import { Text } from '@tarojs/components'
import './text.scss'

export default class TextView extends Component {

  render() {
    const { data = {} } = this.props
    return <Text style={data.style}>{data.text}</Text>
  }
}
