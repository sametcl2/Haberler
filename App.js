import React, {Component} from 'react';
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

const AppContainer = createAppContainer(
    createBottomTabNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: "Main",
          tabBarColor: "#000000",
          showLabel: false,
          tabBarIcon:({tintColor}) => <Icon name="home" color={tintColor} size={40}/>,          
        },
      },
      News: {
        screen: News,
        navigationOptions: {
          title: "News",
          showLabel: false,
          tabBarColor: "#000000",
          tabBarIcon:({tintColor}) => <Icon name="sliders" color={tintColor} size={40}/>
        }
      },
      Search: {
        screen: Search,
        navigationOptions: {
          title: "Search",
          tabBarColor: "#000000",
          tabBarIcon:({tintColor}) => <Icon name="search" color={tintColor} size={40}/>

        }
      }
    },
    {
      tabBarOptions: {
        initialRouteName: 'Main',
        showLabel: false, 
        activeTintColor: '#000000',  
        inactiveTintColor: '#586589',  
        style: {
            backgroundColor: '#FFFFFF' 
        },
      }
    }
  )
);

export default App;