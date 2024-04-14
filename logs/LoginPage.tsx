import React, { useState , useEffect} from 'react';
import {
  NativeBaseProvider,
  Box,
  Input,
  Button,
  Text,
} from 'native-base';
import api from '@/auth/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import Authentication from '@/auth/Authentication';
import Auth from '@/auth/Authentication'
import { useContext } from 'react';
import { Link } from 'expo-router';
import { Router } from 'expo-router';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
const LoginPage = () => {
 
const { setEmail: setEmail, setPassword: setPassword ,login} = useContext(Auth)
let {errmsg: errmsg } =useContext(Auth)
 
//  useEffect(()=>{
//   SecureStore.deleteItemAsync("studentByID")
//  },[])
  const [accesstoken, setaccesstoken] = useState('');
  const [refreshtoken, setrefreshtoken] = useState('');
   
  

  return (
    <NativeBaseProvider>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="24" fontWeight="bold" marginBottom="20" textDecorationColor={'white'} color="white">
        
        {/* <Link href='/(educators)/e_dashboard'> educator</Link> */}
        <Link href='/(student)/dashboard'> student</Link>
        </Text>
        
        <Box>
                 
        {errmsg}
                 
        </Box>
         

        <Box width="100%" marginBottom="20">
          <Input placeholder="Email"   onChangeText={setEmail} keyboardType="email-address" width="100%"  marginBottom="4" textDecorationColor={'white'} color="white"/>
          <Input placeholder="Password"  secureTextEntry  onChangeText={setPassword} width="100%" textDecorationColor={'white'} color="white"/>
        </Box>
 
            <Button title ="Login" onPress={login} width="100%">Login</Button>
           
      </Box>
      
    </NativeBaseProvider>
  );
};
export default LoginPage;
