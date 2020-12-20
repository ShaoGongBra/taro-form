import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Icon from '../../../components/icon'
import PullView from '../../../components/overlay/pull_view'
import Btn from '../../../components/button'
import Base from './base'
import { getContrastYIQ } from '../../../utils/color'
import './select.scss'

export default class SelectForm extends Component {

  state = {
    show: false
  }

  static options = {
    // 组件使用全局样式
    addGlobalClass: true,
    // 虚拟组件
    virtualHost: true
  }

  input(item, isSelect) {
    let { data = {}, config = {}, value } = this.props
    if (config.edit || isSelect) {
      return
    }
    if (data.type === 'radio') {
      this.props.onEvent({
        event: 'input',
        component: data,
        value: item.value
      })
    } else {
      const valueType = typeof value
      if (valueType === 'string') {
        value = value.split(',')
      }
      if (value.includes(item.value)) {
        value.splice(value.indexOf(item.value), 1)
      } else {
        value.push(item.value)
      }
      this.props.onEvent({
        event: 'input',
        component: data,
        value: valueType === 'string' ? value.join(',') : value
      })
    }
    // 弹出单选 选择关闭选框
    if (data.type === 'radio' && data.mode === 'picker') {
      this.pullView.close()
    }
  }

  // 判断当前项目是否选中
  isSelect(item) {
    const { data = {}, value = '' } = this.props
    if (data.type === 'radio') {
      if (typeof item.value === 'object') {
        return item.value[0] === value
      }
      return item.value === value
    } else {
      return (typeof value === 'string' ? value.split(',') : value).includes(item.value)
    }
  }

  renderItemIcon(item) {
    const { data = {} } = this.props
    const icon = data.type === 'radio'
      ? (this.isSelect(item) ? 'fuhao-zhuangtai-chenggong' : 'danxuan-weixuan')
      : (this.isSelect(item) ? 'duoxuan-yixuan' : 'duoxuan-weixuan')
    return <Icon name={icon} size={42} style={{ marginRight: Taro.pxTransform(12) }} />
  }

  renderText(item, isSelect) {
    return <View className='form-select__item-text' onClick={this.input.bind(this, item, isSelect)}>
      {this.renderItemIcon(item)}
      <View className='form-select__item-text__right'>
        <Text className='form-select__item-text__name'>{item.text}</Text>
        {!!item.desc && <Text className='form-select__item-text__desc'>{item.desc}</Text>}
      </View>
    </View>
  }

  renderButton(item, isSelect) {
    return <Btn
      text={item.text}
      size='m'
      disabled={!!item.disabled}
      plain={!this.isSelect(item)}
      beforeImage={item.image}
      style={{
        marginRight: Taro.pxTransform(10),
        marginBottom: Taro.pxTransform(10)
      }}
      onClick={this.input.bind(this, item, isSelect)}
    />
  }

  renderCard(item, isSelect) {
    return <View className='form-select__item-card' onClick={this.input.bind(this, item, isSelect)}>
      {this.renderItemIcon(item)}
      {item.image && <Image className='form-select__item-card__image' src={item.image} />}
      <View className='form-select__item-card__right'>
        <Text className='form-select__item-card__name'>{item.text}</Text>
        {!!item.desc && <Text className='form-select__item-card__desc'>{item.desc}</Text>}
      </View>
    </View>
  }

  renderImage(item, isSelect) {
    return <View className='form-select__item-image' onClick={this.input.bind(this, item, isSelect)}>
      <View className='form-select__item-image__btn'>{this.renderItemIcon(item)}</View>
      <Image className='form-select__item-image__image' src={item.image} />
      {!!item.text && <View className='form-select__item-image__bottom'>
        <Text className='form-select__item-image__name'>{item.text}</Text>
        {!!item.desc && <Text className='form-select__item-image__desc'>{item.desc}</Text>}
      </View>}
    </View>
  }

  renderColor(item, isSelect) {
    return <View
      className='form-select__item-color'
      style={{ backgroundColor: item.color }}
      onClick={this.input.bind(this, item, isSelect)}
    >
      {this.isSelect(item) && <Icon name='duihao2' color={getContrastYIQ(item.color)} />}
    </View>
  }

  /**
   *
   * @param {boolean} isSelect 是否仅渲染选中项
   */
  renderOption(isSelect = false) {
    const { data = { option: [] } } = this.props
    const list = isSelect ? data.option.filter(item => this.isSelect(item)) : data.option
    return <View className={`form-select form-select--row form-select--${data.theme}`}>
      {
        list.map(item => <View key={item.value}>
          {data.theme === 'text' && this.renderText(item, isSelect)}
          {data.theme === 'button' && this.renderButton(item, isSelect)}
          {data.theme === 'card' && this.renderCard(item, isSelect)}
          {data.theme === 'image' && this.renderImage(item, isSelect)}
          {data.theme === 'color' && this.renderColor(item, isSelect)}
        </View>)
      }
    </View>
  }

  render() {
    const { show } = this.state
    const { data = { option: [] }, config = {} } = this.props
    const isEmpty = data.option.filter(item => this.isSelect(item)).length === 0
    return <Base {...this.props}>
      {
        data.mode === 'picker'
          ? <>
            <View
              className='form-select__value'
              onClick={() => {
                if (config.edit) {
                  return
                }
                this.setState({ show: true })
              }}
            >
              {this.renderOption(true)}
              {isEmpty && <Text className='form-select__value__select'>点击选择</Text>}
            </View>
            {show && <PullView
              ref={ref => this.pullView = ref}
              style={{ backgroundColor: '#fff', padding: Taro.pxTransform(20) }}
              onClose={() => this.setState({ show: false })}
            >
              <View className='form-select__pull__head'>
                <Text className='form-select__pull__head__title'>选择</Text>
              </View>
              <ScrollView scrollY className='form-select__pull__scroll'>
                {this.renderOption()}
              </ScrollView>
              {data.type === 'checkbox' && <Btn text='确定' onClick={() => this.pullView.close()} />}
            </PullView>}
          </>
          : this.renderOption()
      }
    </Base>
  }

}
