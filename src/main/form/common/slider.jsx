import React, { Component } from 'react'
import { Slider } from '@tarojs/components'
import Base from './base'
import './slider.scss'

export default class SliderForm extends Component {

  change(e) {
    const { data = {} } = this.props
    this.props.onEvent({
      event: 'input',
      component: data,
      value: e.detail.value
    })
  }

  render() {
    const { data = {} } = this.props
    return <Base {...this.props}>
      <Slider min={data.min} disabled={!!data.disabled} max={data.max} step={data.step} activeColor='#666' backgroundColor='#e2e2e2' onChange={this.change.bind(this)} />
    </Base>
  }

}
