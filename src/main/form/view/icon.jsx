import React, { Component } from 'react'
import Icon from '../../../components/icon'
import './text.scss'

export default class IconView extends Component {

  render() {
    const { data = {} } = this.props
    return <Icon {...data} />
  }
}
