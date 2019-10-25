import React, {Component} from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
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

const { height, width } = Dimensions.get('window');

const AppContainer = createAppContainer(
  createMaterialBottomTabNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: "Main",
          tabBarColor: "#FFFFFF",
          showLabel: false,
          tabBarIcon: <Icon name="home" style={{color: '#F85C50'}} size={36}/>
        }
      },
      News: {
        screen: News,
        navigationOptions: {
          title: "News",
          showLabel: false,
          tabBarColor: "#FFFFFF",
          tabBarIcon:  <Icon name="map" style={{color: '#F85C50'}} size={36}/>
        }
      },
      Search: {
        screen: Search,
        navigationOptions: {
          title: "Search",
          tabBarColor: "#FFFFFF",
          tabBarIcon: <Icon name="search" style={{color: '#F85C50'}} size={36}/>
          
        }
      }
    },
    {
      initialRouteName: 'Main',
      shifting: true,
    }
  )
);

export default App;