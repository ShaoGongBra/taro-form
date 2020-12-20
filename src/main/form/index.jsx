import React, { Component } from 'react'
import { View } from '@tarojs/components'
import FormComponent from './index_component'
import './index.scss'

export default class FormPage extends Component {

  state = {
    title: '',
    formId: ''
  }

  componentWillMount() {
    const { params } = this.$router
    this.setState({
      title: params.pageTitle || '',
      formId: params.formId || ''
    })
  }

  config = {
    navigationBarTitleText: '表单',
    disableScroll: true
  }

  render() {
    const { title, formId } = this.state
    return (
      <View className='page-root'>
        <FormComponent pageId={formId} title={title} />
      </View>
    )
  }
}
