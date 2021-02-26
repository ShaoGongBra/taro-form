import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Icon from '../../../components/icon'
import Create from '../create'
import Base from './base'
import { getKey } from '../../../utils/string'
import { getFormDefaultValue } from '../util'
import './array_one.scss'

export default class ArrayOneForm extends Component {

  event(e) {
    const { data } = this.props
    const [item] = data.child
    // 重置key为默认的key
    e.keys[0] = item.key
    this.props.onEvent(e)
  }

  // 添加行
  addRow() {
    const { data = {}, value = [] } = this.props
    if (data.child.length === 0) {
      return
    }
    const [item] = data.child
    value.push(getFormDefaultValue(data.child)[item.name])
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

  // 重组child
  getChild(child, value, edit) {
    const list = []
    const [item] = child
    if (!item) {
      return [list, value]
    }
    const newValue = edit ? [getFormDefaultValue(child)[item.name]] : value
    for (let i = 0, l = newValue.length; i < l; i++) {
      list.push({
        ...child[0],
        config: { ...(child[0].config || {}), hideText: true, hideTip: true },
        name: i,
        key: getKey()
      })
    }
    return [list, newValue]
  }

  render() {
    const { data = {}, config = {}, value = [] } = this.props
    const [child, values] = this.getChild(data.child, value, config.edit)
    return <Base {...this.props}>
      {
        !config.edit
          ? <View style={data.style}>
            <View className='form-array-one__form'>
              <View className='form-array-one__create'>
                <Create
                  {...this.props}
                  form={child}
                  values={value}
                  compName='array-one'
                  onEvent={this.event.bind(this)}
                />
              </View>
              <View className='form-array-one__actions'>
                {
                  value.map((item, index) => <View key={'item' + index} className='form-array-one__actions__item'>
                    <Icon name='guanbi2' onClick={this.delRow.bind(this, index)} />
                  </View>)
                }
              </View>
            </View>
            <View className='form-array-one__add' onClick={this.addRow.bind(this)}>
              <Icon name='jiahao' />
              <Text className='form-array-one__add__text'>添加行</Text>
            </View>
          </View>
          : <View className='form-array-one__edit' style={data.style}>
            <Create
              {...this.props}
              form={data.child}
              values={values}
              editInfo={{
                title: '一维数组',
                desc: '请将组件拖到这里'
              }}
              disabled={data.disabled}
              compName='array-one'
            />
          </View>
      }
    </Base>
  }

}
