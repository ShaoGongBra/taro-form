import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import event from '../../utils/event'
import { asyncTimeOut } from '../../utils/util'
import './top_view.scss'

let keyValue = 0

class CreateEle extends Component {
  state = {
    elements: []
  }

  async componentDidMount() {
    let { page } = this.props
    if (!page) {
      page = await TopView.currentPageAsync()
    }

    event.add(page + '-addOverlay', this.add)
    event.add(page + '-removeOverlay', this.remove)
    event.add(page + '-removeAllOverlay', this.removeAll)
  }

  componentWillUnmount() {
    let { page } = this.props
    if (!page) {
      page = TopView.currentPage()
    }
    event.remove(page + '-addOverlay', this.add)
    event.remove(page + '-removeOverlay', this.remove)
    event.remove(page + '-removeAllOverlay', this.removeAll);
  }

  add = e => {
    const { elements } = this.state
    elements.push(e)
    this.setState({ elements })
  }

  remove = e => {
    const { elements } = this.state
    for (let i = elements.length - 1; i >= 0; --i) {
      if (elements[i].key === e.key) {
        elements.splice(i, 1)
        break
      }
    }
    this.setState({ elements })
  }

  removeAll = () => {
    this.setState({ elements: [] })
  }

  render() {
    const { elements } = this.state
    return elements.map(item => <View key={'topView' + item.key} className='top-view-overlay'>
      {item.element}
    </View>)
  }
}

export default class TopView extends Component {

  static currentPage() {
    const pages = Taro.getCurrentPages()
    const current = pages[pages.length - 1]
    let path = current.path || current.route
    if (path.startsWith('/')) {
      path = path.substr(1)
    }
    return path
  }

  static currentPageAsync() {
    return asyncTimeOut(50).then(() => {
      return this.currentPage()
    })
  }

  static add(element, page) {
    if (!page) {
      page = this.currentPage()
    }
    const key = ++keyValue
    event.emit(page + '-addOverlay', { key, element })
    return key
  }

  static async addAsync(element, page) {
    if (!page) {
      page = await this.currentPageAsync()
    }
    return this.add(element, page)
  }

  static remove(key, page) {
    if (!page) {
      page = this.currentPage()
    }
    event.emit(page + '-removeOverlay', { key })
  }

  static removeAll(page) {
    if (!page) {
      page = this.currentPage()
    }
    event.emit(page + '-removeAllOverlay', {})
  }

  render() {
    return (
      <View className='page-root'>
        {this.props.children}
        <CreateEle />
      </View>
    );
  }
}
