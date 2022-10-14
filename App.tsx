import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/components/Login'
import StoreList from './src/components/StoreList'
import SingleStore from './src/components/SingleStore';

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="List of Stores" component={StoreList} />
        <Stack.Screen name="SingleStore" component={SingleStore} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

