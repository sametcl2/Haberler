import React from 'react';
import { View, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Main from './components/main';
import News from './components/news';
import Search from './components/search';

const App = () => {
  return (
      <View>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </View>
  );
};

const AppNavigator = createAppContainer(
  createMaterialBottomTabNavigator(
    // TODO 
  )
);

export default App;