import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataProvider } from './DataContext'; 
import LoginScreen from './Loginpage';
import RegisterScreen from './Registerpage';
import Home from './Homepage';
import Farmer from './Farmer';
import Consumer from './Consumer';
import Payment from './Payment';
import Bill from './bill';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <DataProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Farmer" component={Farmer} />
        <Stack.Screen name="Consumer" component={Consumer} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Bill" component={Bill}/>
      </Stack.Navigator>
      </DataProvider>
    </NavigationContainer>
  );
}
