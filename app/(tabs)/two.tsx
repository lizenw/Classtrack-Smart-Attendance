import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Staffloginpage from '@/auth/Staffloginpage';
import { AuthProvider } from '@/auth/Authentication';
import Dashboard from '../(student)/dashboard';
import LoginPage from '@/logs/LoginPage';
import { useState } from 'react';
import { Link } from '@react-navigation/native'



export default function TabTwoScreen() {
 const[dashboard, setdashboard] = useState(<LoginPage/>)

  return (
    <View style={styles.container}>
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
   
    <AuthProvider>
        <LoginPage/> 
    </AuthProvider>

  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
