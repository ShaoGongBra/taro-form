import React, { Component } from 'react'
import { View } from '@tarojs/components'
import ScrollView from '../../components/scrollview'
import Form from './form'
import data from './testData'
import './index.scss'

export default class FormPage extends Component {

  render() {
    return (
      <View className='page-root' style={{ backgroundColor: data.config?.style?.backgroundColor }}>
        <ScrollView style={{ flex: 1 }}>
          <Form {...data} />
        </ScrollView>
      </View>
    )
  }
}
