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
          tabBarIcon: ({titleColor}) => <Icon name="ios-home" color={titleColor} size={34}/>
        }
      },
      News: {
        screen: News,
        navigationOptions: {
          title: "News",
          tabBarColor: "#D1D3D4",
          tabBarIcon: ({titleColor}) => <Icon name="ios-paper" color={titleColor} size={34}/>
        }
      },
      Search: {
        screen: Search,
        navigationOptions: {
          title: "Search",
          tabBarColor: "#FFFFFF",
          tabBarIcon: ({titleColor}) => <Icon name="ios-search" color={titleColor} size={34}/>
        }
      }
    },
    {
      initialRouteName: 'Main',
      activeColor: '#F8F8F8',  
      inactiveColor: '#586589',  
      shifting: true,
      showLabel: false, 
    }
  )
);

export default App;