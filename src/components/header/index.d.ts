import { CSSProperties } from 'react'
import Taro, { Component } from '@tarojs/taro'

type props = Partial<{
  /** 头部标题 */
  title: string,
  /** 左侧返回按钮辅助文字 */
  leftTitle: string,
  /** 
   * 是否隐藏头部底部的线条
   * @default false
   */
  hideLine: boolean,
  /** 
   * 将header设置为绝对定位 
   * @default false
   */
  absolute: boolean,
  /** 
   * absolute设置为true的情况下再使用此属性 用于控制组件的显示和隐藏 
   * @default true
   */
  show: boolean,
  /** 
   * 组件的内联样式, 整个样式会作用到header的最外层View 如果设置背景颜色 标题颜色会自动根据背景颜色自适应 
   * @info backgroundColor 属性仅支持 rgba rgb 16进制颜色
   */
  style: CSSProperties,
  /** 是否替换头部中间部分为自定义组件 */
  isRenderMain: boolean,
  /** 替换头部中间部分为自定义组件 请先设置isRenderMain 否则不生效 */
  renderMain: Component,
  /** 是否替换头部为自定义组件 */
  isRenderHeader: boolean,
  /** 替换头部为自定义组件 请先设置isRenderHeader 否则不生效 */
  renderHeader: Component
  /** 引用 */
  ref?: string | ((node: any) => any)
}>

/**
 * 公共头部组件
 * @example 
 * <Header title='页面标题' />
 * @info style.backgroundColor 属性仅支持 rgba rgb 16进制颜色
 */
export default class Header extends Component<props>{

}