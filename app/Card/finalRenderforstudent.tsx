import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Staffloginpage from '@/auth/Staffloginpage';
import { AuthProvider } from '@/auth/Authentication';
import Dashboard from './dashboard';
import LoginPage from '@/logs/LoginPage';
import { useState , useEffect } from 'react';
import { Box, Center, NativeBaseProvider,Input,Button } from 'native-base';
import { HStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/auth/Api';
import * as SecureStore from 'expo-secure-store';
import { Modal} from 'native-base';
import { router } from 'expo-router';




export default function Finalpage() {
 

const [studentName, setStudentName] = useState('');
const [studentID, setStudentID] = useState('');
  const [courseName, setCourseName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

 
  useEffect(()=>{
    async function retrieveData() {
      const storedNames = await SecureStore.getItemAsync("namesKey");
      const storedValue = await SecureStore.getItemAsync("valueKey");
      const storedcourse = await SecureStore.getItemAsync("courseId");
      setStudentName(storedNames)
      setStudentID(storedValue)
      setCourseName(storedcourse)
     
    }
    
    retrieveData(); 
   },[])
   function removeSpecialChars(str) {
    return str.replace(/["\[\]]/g, ''); 
  }

  const fstudentID = removeSpecialChars(studentID)
  const fstudentName = removeSpecialChars(studentName)



  const restart = ()=>{
    return(
  router.navigate("/(student)/dashboard"))
  }



  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await api.post('statistics/poststudentstatistics', {
        studentName:fstudentName,
        studentId:fstudentID,
        courseId:courseName
        
      });
      if (response.status === 200){
    //  await SecureStore.deleteItemAsync("namesKey")
    //  await SecureStore.deleteItemAsync("valueKey")
    //  await SecureStore.deleteItemAsync("courseId")
    //  setCourseName("")
    //  setStudentID("")
    //  setStudentName("")

      console.log("Success:", response.data);
    const  msg = response.data.message
     router.replace("/Card/alert")
      }
      // Handle successful submission (e.g., reset form, show message)
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError('An error occurred while submitting the form.');
    } finally {
      setSubmitting(false);
    }
   

   

   



   
  };
  return (
<NativeBaseProvider>
      <Box p="2"  h ='100%' borderWidth = '1' borderColor='white' alignItems='center' py = '35'  rounded="md">
        <Box borderWidth = '1' borderColor='white' alignItems='center' p = "1" rounded="md">

       
        <Text>
            Validate your details before submitting..
            
        </Text>
        <Text>
            If your data don't match with provided, restart.
        </Text>
        <Button mt="4" onPress={restart} >
          Restart
        </Button>
        </Box>

        <Box borderWidth = '1' borderColor='white' alignItems='center' p = "1" rounded="md" mt = "2">

       
        <Text>
            Student Name.
        </Text>
        <Input 
          my = '5'
          alignItems='center'
          textAlign="center"
          textDecorationColor="white"
          value={fstudentName}
        
        />
         <Text>
            Student ID
        </Text>
         <Input 
          my = '5'
          alignItems='center'
          textAlign="center"
          textDecorationColor="white"
          value={fstudentID}
          
        />
         <Text>
            Course ID
        </Text>
        <Input
          mt="4" // Add margin top
          alignItems='center'
          textAlign="center"
          textDecorationColor="white"
          value={courseName}
          
        />
        <Button mt="4" onPress={handleSubmit} isLoading={submitting}>
          Submit
        </Button>
        {submitError && (
          <Text mt="2" color="red.500">
            {submitError}
          </Text>
        )}

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
