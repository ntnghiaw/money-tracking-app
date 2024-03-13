import React, {useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Router from './routers/Router';


const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (

    <Router/>
  );
}

export default App;

