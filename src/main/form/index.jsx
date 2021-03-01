import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import ScrollView from '../../components/scrollview'
import TopView from '../../components/overlay/top_view'
import Form from './form'
import data from './testData'
import './index.scss'

export default class FormPage extends Component {

  render() {
    return (
      <TopView style={{ backgroundColor: data.config?.style?.backgroundColor }}>
        <ScrollView>
          <Form {...data} />
        </ScrollView>
      </TopView>
    )
  }
}
