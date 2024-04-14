import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Staffloginpage from '@/auth/Staffloginpage';
import { AuthProvider } from '@/auth/Authentication';
import Dashboard from './dashboard';
import LoginPage from '@/logs/LoginPage';
import { useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import { Box } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';



export default function Sign_attendance() {
  function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
  }

  return (
    <NativeBaseProvider>

    <Box h ='100%' borderWidth = '1' borderColor='white'  rounded="md" p = '1' alignItems='center' py = '50%'>

     <Box h="20" w="50%"  rounded="md" shadow={3} alignItems="center" my='3'  py = '6'  borderWidth= '1' borderColor='white' >
        <Text>Verify Your Location</Text>

         </Box>

         <Box h="20" w="20%"  rounded="md" shadow={3} alignItems="center" py='6'    borderWidth= '1' borderColor='black' >
            <Link href= '/Card/locationvalidatorforstudent'>
            <Ionicons name="location" size={30} color="white" />
            
             </Link>
       
      

         </Box>
     </Box>
     
</NativeBaseProvider>
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
