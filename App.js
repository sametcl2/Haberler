import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Main from './screens/main';
import News from './screens/news';
import Search from './screens/search';
import MyWeb from './screens/webview';

const MainStack = createNativeStackNavigator();
const NewsStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
      <MainStack.Screen 
        name="Web" 
        component={MyWeb} 
        options={({ route }) => ({ 
          title: route.params.title,
          headerTitleStyle: {
            fontFamily:'Martel-ExtraBold',
            fontWeight: "bold",
            fontSize: 22
          }, 
          })}
        />
    </MainStack.Navigator>
  );
}

function NewsStackScreen() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen name="News" component={News} options={{ headerShown: false }}/>
      <NewsStack.Screen 
        name="Web" 
        component={MyWeb} 
        options={({ route }) => ({ 
          title: route.params.title,
          headerTitleStyle: {
            fontFamily:'Martel-ExtraBold',
            fontWeight: "bold",
            fontSize: 22
          }, 
          })}
      />
    </NewsStack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={Search} options={{ headerShown: false }}/>
      <SearchStack.Screen 
        name="Web" 
        component={MyWeb} 
        options={({ route }) => ({ 
          title: route.params.title,
          headerTitleStyle: {
            fontFamily:'Martel-ExtraBold',
            fontWeight: "bold",
            fontSize: 22
          }, 
          })}
      />
    </SearchStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Main') {
              return <Icon name="home" color={color} size={30}/>
            } else if (route.name === 'News') {
              return <Icon name="sliders" color={color} size={30}/>
            } else if (route.name === 'Search') {
              return <Icon name="search" color={color} size={30}/>
            }
          },
          initialRouteName: 'Main',
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#000000',  
          tabBarInactiveTintColor: '#c4c4c4', 
          headerShown: false 
        })}
      >
        <Tab.Screen name="Main" component={MainStackScreen} />
        <Tab.Screen name="News" component={NewsStackScreen} />
        <Tab.Screen name="Search" component={SearchStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}