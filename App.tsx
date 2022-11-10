import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/components/Login'
import StoreList from './src/components/StoreList'
import SingleStore from './src/components/SingleStore';
import CreateAStore from './src/components/CreateAStore';
import CreateAccount from './src/components/CreateAccount';
import Homepage from './src/components/Homepage';
import { LogBox } from 'react-native';

const Stack = createNativeStackNavigator()
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core'])

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Create Account" component={CreateAccount} />
        <Stack.Screen name="List of Stores" component={StoreList} />
        <Stack.Screen name="SingleStore" component={SingleStore} />
        <Stack.Screen name="Create a Store" component={CreateAStore} />
        <Stack.Screen name="Homepage" component={Homepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


