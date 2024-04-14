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
import { Link } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Sign_attendance() {
  function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
  }

  async function authenticateUser() {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) return; // Handle if the device doesn't support biometrics
  
    const supportedAuthTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    // Check if desired biometric type (e.g., fingerprint) is supported
  
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate', // Message shown to the user
      cancelLabel: 'Cancel',
    });
  
    if (result.success) {
      router.navigate("/Card/studentlocations")
    } else {
      // Handle authentication failure (error codes, cancel, etc.)
      router.navigate("/(student)/dashboard")
    }
  }

  return (
    <NativeBaseProvider>

    <Box h ='100%' borderWidth = '1' borderColor='white'  rounded="md" p = '1' alignItems='center' py = '50%'>
   
     <Box h="20" w="50%"  rounded="md" shadow={3} alignItems="center" my='3'  py = '6'  borderWidth= '1' borderColor='white' >
        <Text>Verify Your Bio-Data</Text>

         </Box>
        <TouchableOpacity onPress={authenticateUser}>

      
         <Box h="20" w="20%"  rounded="md" shadow={3} alignItems="center" py='6'    borderWidth= '1' borderColor='black' >
         {/* <Link href= '/Card/studentlocations'> */}
         <Ionicons name="finger-print" size={30} color="white" />
      
        {/* </Link> */}
         </Box>
         </TouchableOpacity>
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
