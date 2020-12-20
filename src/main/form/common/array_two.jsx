import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import Icon from '../../../components/icon'
import Create from '../create'
import Base from './base'
import { getFormDefaultValue } from '../util'
import './array_two.scss'

export default class ChildArrayForm extends Component {

  static options = {
    // 组件使用全局样式
    addGlobalClass: true,
    // 虚拟组件
    virtualHost: true
  }

  event(index, e) {
    e.names.unshift(index)
    e.keys.unshift(index)
    e.indexs.unshift(index)
    this.props.onEvent(e)
  }

  // 添加行
  addRow() {
    const { data = {}, value = [] } = this.props
    value.push(getFormDefaultValue(data.child))
    this.props.onEvent({
      event: 'input',
      component: data,
      value
    })
  }

  // 删除行
  delRow(index) {
    const { data, value = [] } = this.props
    value.splice(index, 1)
    this.props.onEvent({
      event: 'input',
      component: data,
      value
    })
  }

  getChild(child) {
    return child.filter(item => !item.hidden).map(item => {
      item.config = {
        ...(item.config || {}),
        hideText: true,
        hideTip: true
      }
      return item
    })
  }

  render() {
    const { data = {}, config = {}, value = [] } = this.props
    const { child = [] } = data
    const showChild = this.getChild(child)
    const actionWidth = 100
    const newValue = config.edit ? [{}] : value
    return <Base {...this.props}>
      <ScrollView className='form-array-two' scrollX>
        {
          !config.edit
            ? <View className='form-array-two__table'>
              <View className='form-array-two__head'>
                {showChild.map(item => <View
                  key={item.key}
                  className='form-array-two__head__item'
                  style={{ width: Taro.pxTransform(item.parentAttr?.style?.width) }}
                >
                  <Text className='form-array-two__head__item__txt'>{item.text}</Text>
                  <Text className='form-array-two__head__item__tip'>{item.tip}</Text>
                </View>)}
                <View
                  className='form-array-two__head__item'
                  style={{ width: Taro.pxTransform(actionWidth) }}
                >
                  <Icon name='jiahao' onClick={this.addRow.bind(this)} />
                </View>
              </View>
              {
                newValue.map((item, index) => <View key={'item' + index} className='form-array-two__main'>
                  <Create
                    {...this.props}
                    form={showChild}
                    values={item}
                    compName='array-two'
                    onEvent={this.event.bind(this, index)}
                  />
                  <View className='form-array-two__main__action' style={{ width: Taro.pxTransform(actionWidth) }}>
                    <Icon name='guanbi2' onClick={this.delRow.bind(this, index)} />
                  </View>
                </View>)
              }
            </View>
            : <View className='form-array-two__edit'>
              <View className='form-array-two__head'>
                {showChild.map(item => <View
                  key={item.key}
                  className='form-array-two__head__item'
                  style={{ width: Taro.pxTransform(item.parentAttr?.style?.width) }}
                >
                  <Text className='form-array-two__head__item__txt'>{item.text}</Text>
                  <Text className='form-array-two__head__item__tip'>{item.tip}</Text>
                </View>)}
              </View>
              <View className='form-array-two__edit__main'>
                <Create
                  {...this.props}
                  form={showChild}
                  values={[{}]}
                  editInfo={{
                    title: '二维数组',
                    desc: '请将组件拖到这里'
                  }}
                  disabled={data.disabled}
                  compName='array-two'
                  onEvent={this.event.bind(this, 0)}
                />
              </View>
            </View>
        }
      </ScrollView>
    </Base>
  }

}
