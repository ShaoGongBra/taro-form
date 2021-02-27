import React, { Component } from 'react'
import { View, Input } from '@tarojs/components'
import PullView from '../../../components/overlay/pull_view'
import TopView from '../../../components/overlay/top_view'
import Base from './base'
import { isColorString } from '../../../utils/color'
import './color.scss'

export default class ColorForm extends Component {

  state = {
    colors: ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E']
  }

  select() {
    const { colors } = this.state
    this.key = TopView.add(<PullView ref={ref => this.pullView = ref} onClose={this.close.bind(this)}>
      <View className='form-color-pull'>
        {colors.map(item => <View
          className='form-color-pull__item'
          key={item}
          style={{ backgroundColor: item }}
          onClick={this.submit.bind(this, item)}
        />)}
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
        <View className='form-color-pull__item--empty' />
      </View>
    </PullView>)
    return new Promise((resolve, reject) => {
      this.callback = [resolve, reject]
    })

  }

  submit(color) {
    this.callback[0](color)
    this.pullView.close()
  }

  close() {
    TopView.remove(this.key)
    this.callback[1]()
  }

  input(e) {
    const { value } = e.detail
    const { data = {} } = this.props
    // 验证颜色值的合法性
    if (isColorString(value)) {
      this.props.onEvent({
        event: 'input',
        component: data,
        value: e.detail.value
      })
    }
  }

  render() {
    const { data = {}, config = {}, value } = this.props
    return <Base {...this.props}>
      <View className='form-color'>
        <View
          className='form-color__color'
          style={{ backgroundColor: value || '#fff' }}
          onClick={() => {
            if (config.edit || data.disabled) {
              return
            }
            this.select().then(res => {
              this.props.onEvent({
                event: 'input',
                component: data,
                value: res
              })
            }).catch(() => { })
          }}
        />
        <Input className='form-color__input' value={value} placeholder='颜色值' onInput={this.input.bind(this)} />
      </View>
    </Base>
  }

}
