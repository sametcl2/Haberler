import React, {Component} from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Main from './components/main';
import News from './components/news';
import Search from './components/search';

class App extends Component{  //  MaterialBottomTabNavigator FUNCTIONAL COMPONENT'DE ÇALIŞMIYOR !!!   
  render() {
      return (
        <AppContainer/>
      );
  }
}

const { height, width } = Dimensions.get('window');

const AppContainer = createAppContainer(
    createBottomTabNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: "Main",
          tabBarColor: "#FFFFFF",
          showLabel: false,
          tabBarIcon:({tintColor}) => <Icon name="home" color={tintColor} size={40}/>,          
        },
      },
      News: {
        screen: News,
        navigationOptions: {
          title: "News",
          showLabel: false,
          tabBarColor: "#FFFFFF",
          tabBarIcon:({tintColor}) => <Icon name="map" color={tintColor} size={40}/>
        }
      },
      Search: {
        screen: Search,
        navigationOptions: {
          title: "Search",
          tabBarColor: "#FFFFFF",
          tabBarIcon:({tintColor}) => <Icon name="search" color={tintColor} size={40}/>

        }
      }
    },
    {
      tabBarOptions: {
        initialRouteName: 'Main',
        showLabel: false, 
        activeTintColor: '#F85C50',  
        inactiveTintColor: '#586589',  
        style: {
            backgroundColor: '#FFFFFF' 
        },
      }
    }
  )
);

export default App;