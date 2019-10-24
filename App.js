import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Main from './components/main';
import News from './components/news';
import Search from './components/search';

class App extends Component{  //  MaterialBottomTabNavigator FUNCTIONAL COMPONENT'DE ÇALIŞMIYOR !!! 
  static navigationOptions = {  // NAVİGATİON'DA HEADER GİZLEMEK İÇİN.
    header: null
  }
  
  render() {
      return (
        <AppContainer/>
      );
  }
}

const AppContainer = createAppContainer(
  createMaterialBottomTabNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: "Main",
          tabBarColor: "#FFFFFF",
          tabBarIcon: <Icon name="ios-home" style={{color: '#F85C50'}} size={36}/>
        }
      },
      News: {
        screen: News,
        navigationOptions: {
          title: "News",
          tabBarColor: "#D1D3D4",
          tabBarIcon:  <Icon name="ios-paper" style={{color: '#F85C50'}} size={36}/>
        }
      },
      Search: {
        screen: Search,
        navigationOptions: {
          title: "Search",
          tabBarColor: "#FFFFFF",
          tabBarIcon: <Icon name="ios-search" style={{color: '#F85C50'}} size={36}/>
        }
      }
    },
    {
      initialRouteName: 'Main',
      shifting: true,
      showLabel: false, 
    }
  )
);

export default App;