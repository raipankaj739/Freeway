import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('freeway', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('freeway', { rootTag });
}
