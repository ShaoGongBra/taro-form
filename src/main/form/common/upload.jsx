import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Icon from '../../../components/icon'
import Base from './base'
import { toast } from '../../../utils'
import './upload.scss'

export default class UploadForm extends Component {

  componentDidMount() {

  }

  getValue() {
    let { value = [] } = this.props
    if (typeof value === 'string') {
      value = !value ? [] : value.split(',')
    }
    return value
  }

  setValue(data) {
    const { value = [] } = this.props
    if (typeof value === 'string') {
      return data.join(',')
    }
    return data
  }

  add() {
    const { data = {} } = this.props
    const value = this.getValue()
    if (value.length >= data.max) {
      toast('最多上传' + data.max + '张')
      return
    }
    // uploadMedia(data.max - value.length).then(res => {
    //   value.push(...res)
    //   this.props.onEvent({
    //     event: 'input',
    //     component: data,
    //     value: this.setValue(value)
    //   })
    // })
  }

  del(index) {
    const { data } = this.props
    const value = this.getValue()
    value.splice(index, 1)
    this.props.onEvent({
      event: 'input',
      component: data,
      value: this.setValue(value)
    })
  }

  render() {
    const { data = {} } = this.props
    const value = this.getValue()
    return <Base {...this.props}>
      <View className='form-upload'>
        {!data.disabled && <View activeOpacity={1} className='form-upload__add' onClick={this.add.bind(this)}>
          <Icon name='tupian1' size={60} color='#AAAAAA' />
          <Text className='form-upload__add__text'>添加图片</Text>
        </View>}
        {
          value.map((item, index) => <View key={item} className='form-upload__item'>
            <Image className='form-upload__item__image' src={item} />
            {!data.disabled && <Icon style={{ position: 'absolute', top: Taro.pxTransform(-10), right: Taro.pxTransform(-10) }} name='guanbi' size={40} color='#AAAAAA' onClick={this.del.bind(this, index)} />}
          </View>)
        }
      </View>
    </Base>
  }
}
