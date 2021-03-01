/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './src/app'
import { name as appName } from './app.json'

console.warn('appName', appName)

AppRegistry.registerComponent(appName, () => App)
