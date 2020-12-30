import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Icon from '../../../components/icon'
import Base from './base'
import { toast } from '../../../utils'
import { uploadMedia } from '../../../utils/request'
import './upload.scss'

export default class UploadForm extends Component {

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
    const { data = {}, config = {} } = this.props
    if (config.edit) {
      return
    }
    const value = this.getValue()
    if (value.length >= data.max) {
      toast('最多上传' + data.max)
      return
    }
    if (data.type === 'media') {
      uploadMedia(data.max - value.length, data.mediaType).then(res => {
        value.push(...res)
        this.props.onEvent({
          event: 'input',
          component: data,
          value: this.setValue(value)
        })
      })
    }
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
    const icons = {
      'media-image': 'tupian1',
      'media-video': 'shipindefuben',
      'media-all': 'duomeitiwenjian',
      'file-': 'wenjianjia'
    }
    const texts = {
      'media-image': '添加图片',
      'media-video': '添加视频',
      'media-all': '添加图片视频',
      'file-': '添加文件'
    }
    const name = `${data.type}-${data.type === 'media' ? data.mediaType : ''}`
    return <Base {...this.props}>
      <View className='form-upload'>
        {!data.disabled && <View activeOpacity={1} className='form-upload__add' onClick={this.add.bind(this)}>
          <Icon name={icons[name]} size={60} color='#AAAAAA' />
          <Text className='form-upload__add__text'>{texts[name]}</Text>
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
