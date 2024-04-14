import React, { useState } from 'react';
import { NativeBaseProvider, Box,Input,Button,Text } from 'native-base';
import api from '@/auth/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';

import { useContext } from 'react';
import Auth from './Authentication';

const Staffloginpage = () => {
  
  const { setEmail: setEmail, setPassword: setPassword ,login} = useContext(Auth)

  return (
    <NativeBaseProvider>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="24" fontWeight="bold" marginBottom="20" textDecorationColor={'white'} color="white">
        
        </Text>


        <Box width="100%" marginBottom="20">
          <Input placeholder="Email"   onChangeText={setEmail} keyboardType="email-address" width="100%"  marginBottom="4" textDecorationColor={'white'} color="white"/>
          <Input placeholder="Password"  secureTextEntry  onChangeText={setPassword} width="100%" textDecorationColor={'white'} color="white"/>
        </Box>
 
            <Button title ="Login" onPress={login} width="100%">Staff Login</Button>
      </Box>
    </NativeBaseProvider>
  );
};

export default Staffloginpage;
