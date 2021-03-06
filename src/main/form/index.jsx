import React, { Component } from 'react'
import ScrollView from '../../components/scrollview'
import TopView from '../../components/overlay/top_view'
import Header from '../../components/header'
import Form from './form'
import data from './testData'
import './index.scss'

export default class FormPage extends Component {

  render() {
    return (
      <TopView style={{ backgroundColor: data.config?.style?.backgroundColor }}>
        <Header title='表单预览' />
        <ScrollView>
          <Form {...data} />
        </ScrollView>
      </TopView>
    )
  }
}
