import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Btn from '../../../components/button'
import Base from './base'
import './button.scss'

export default class ButtonForm extends Component {

  click() {
    const { data = {} } = this.props
    this.props.onEvent({
      event: 'buttn-click',
      names: [],
      button: data
    })
  }

  render() {
    const { data = {} } = this.props
    return <Btn {...data} onClick={this.click.bind(this)} />
  }

}
