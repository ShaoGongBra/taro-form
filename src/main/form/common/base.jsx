import React, { useContext } from 'react'
import { View, Text } from '@tarojs/components'
import { ConfigContext } from '../util'
import './base.scss'

export default ({ data = {}, children }) => {
  // 将组件配置和总配置进行合并
  const config = { ...useContext(ConfigContext), ...(data.config || {}) }
  return <View className='form-base' style={{ ...config.compStyle, ...data.style }}>
    {!config.hideText && !!data.text && <Text style={{ ...config.compTextStyle, ...data.compTextStyle }} className='form-base__text'>{data.text}</Text>}
    <View className='form-base__main'>
      {children}
      {!!data.verifyMsg && <Text className='form-base__verify'>{data.verifyMsg}</Text>}
      {!config.hideTip && !!data.tip && <Text className='form-base__tip' style={{ ...config.compTipStyle, ...data.compTipStyle }}>{data.tip}</Text>}
    </View>
  </View>
}
