import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BusinessList from './components/BusinessList/BusinessList';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider,QueryClient } from 'react-query';
import BusinessDetail from './components/BusinessDetail/BusinessDetail';
import NavigationBar from './components/NavigationBar/NavigationBar';
import BusinessAdd from './components/BusinessAdd/BusinessAdd';
import PersonAdd from './components/Person/PersonAdd';
import PersonEdit from './components/Person/PersonEdit';


const API_KEY = '2G44tWGzjQ6uBdKNux9xu56BexLz7XAB96aCVQG5';

axios.defaults.baseURL = 'https://us4b9c5vv0.execute-api.us-east-1.amazonaws.com/prod';
axios.defaults.headers.common['x-api-key'] = API_KEY;

let Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <StatusBar backgroundColor={'#555555'} />
      <Stack.Navigator 
      initialRouteName="Businesses"
      screenOptions={
        {
          header: (props)=> <NavigationBar {...props}/>
        }
      }
      >
        <Stack.Screen name="Businesses" component={BusinessList} />
        <Stack.Screen name="Business Detail" component={BusinessDetail} />
        <Stack.Screen name="Add Business" component={BusinessAdd} />
        <Stack.Screen name="Add Person" component={PersonAdd} />
        <Stack.Screen name="Edit Person" component={PersonEdit} />
      </Stack.Navigator>
    </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appbar: {
    left: 0,
    right: 0,
  }
});
