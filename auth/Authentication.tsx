import React, { createContext, useState,useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import api from './Api';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JWT from 'expo-jwt';
import { router, useNavigation } from 'expo-router';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
interface AuthContextData {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: () => void;
  errmsg: string,
  login: () => Promise<void>;
  mf:()=> void;
  user_id:number;
  token: string
  id:number
}



 const Auth = createContext<AuthContextData>({} as AuthContextData); // Initialize with defaults

export const  AuthProvider: React.FC = ({ children }) => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigation = useNavigation()
const [errmsg ,seterrmsg]=useState('hi')
const[ id , setid] = useState(null)
const userData ={
  email:email,
  password:password
}



  const [token, setToken] = useState<string | null>(null);

  const login = async () => {
  
    
    try {
      const response = await api.post('/login/', { email, password });
   console.log(response.status)
      if (response.status === 200) {
        const key = "django-insecure-vr&xebal-hl606&whjm8ul@lyf=p92+=h=(6)xndt%%x6_jn9_"
        const token = response.data.access
        console.log(token)
        console.log("decode")
        const decoded_access = JWT.decode(token,key)
console.log(decoded_access)
        const role = decoded_access.role
        console.log(role)
       
 alert("redirecting")
        
   if(role === "manager"){
    const ID =decoded_access.UserId
    console.log(typeof ID)
    const fID = JSON.stringify(ID);
    await SecureStore.setItemAsync("eByID", fID); 
    console.log(typeof fID)
    console.log("final student ID",fID)
    console.log("ID has been set")
    router.navigate("/(educators)/e_dashboard")
    
   }
   else if(role === 'user'){
    const ID =decoded_access.UserId
    console.log(typeof ID)
    const fID = JSON.stringify(ID);
    await SecureStore.setItemAsync("studentByID", fID); 
    console.log(typeof fID)
    console.log("final student ID",fID)
    console.log("ID has been set")
    router.navigate("/(student)/dashboard ")
   }
   else{
    
    alert("not fount")
   }
        
    
        setEmail(" ")
        setPassword(" ")
        // Use navigation.navigate('Profile') here when navigation is set up 
      } else {
        alert('Error', response.detail);
      }
    } catch (err) {
    
console.log("error saviny asyncstorsge")
    }
  };


  let mf=()=>{
    return(
    alert("hello home")
    )
}

  const data = {
    token,
    setToken,
  setPassword,
  setEmail,
    login,
    mf,
     id,
  };

  return (
    <Auth.Provider value={data}>
      {children}
    </Auth.Provider>
  );
};





export default Auth;