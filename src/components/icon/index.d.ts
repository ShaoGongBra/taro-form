import { CSSProperties } from 'react'
import { Component } from '@tarojs/taro'
import { ITouchEvent } from '@tarojs/components/types/common'

type props = Partial<{
  /** 字体 */
  font: string,
  /** 名称 */
  name: string,
  /** 图标颜色 */
  color: string,
  /** 图标尺寸 */
  size: number,
  /** 图标样式 传入color和fontSize会覆盖 color和size属性 */
  style: CSSProperties,
  /** 点击事件 */
  onClick?: (event: ITouchEvent) => any,
  /** 引用 */
  ref?: string | ((node: any) => any)
}>

/**
 * 调用系统图标 三端统一
 * @example <Icon name='info' color='#666' size={40} />
 * @info 请勿给这个组件设置className 那样不会生效 请改用style
 */
export default class IconComp extends Component<props>{

}