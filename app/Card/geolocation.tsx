
import React, { useState, useEffect } from 'react';
import { Platform,  View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import Device from 'expo-device';
import * as Location from 'expo-location';
import { NativeBaseProvider, Box, Spinner, Button } from 'native-base';
import api from '@/auth/Api'; 
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export default function GetLocation() {
  const [la_location, setla_Location] = useState(null);
  const [lo_location, setlo_Location] = useState(null);
  const [accuracy, setaccuracy] = useState(null);
  const [timestamp, settimestamp]= useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setLoading] = useState(false); // Renamed for clarity

  const refreshLocation = async () => {
    setLoading(true); 

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentlocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      });

      settimestamp(currentlocation.timestamp);
      setla_Location(currentlocation.coords.latitude);
      setlo_Location(currentlocation.coords.longitude);
      setaccuracy(currentlocation.coords.accuracy);
      setErrorMsg(null); 

      // Send data after successful location fetch
console.log(accuracy)
      if(accuracy >= 10){
        await sendData();
        router.replace("/Card/alert2")
      }
      
      

    } catch (error) {
      setErrorMsg('Error fetching location: ' + error.message); 
    } finally {
      setLoading(false);
    }
  };
let courseId = "001"
let educatorsID ="1"

function removeSpecialChars(str) {
  return str.replace(/["\[\]]/g, ''); 
}
  const sendData = async () => {
     const storedeValue = await SecureStore.getItemAsync("evalueKey");
    const storedcourse = await SecureStore.getItemAsync("EcourseId");
   const fstoredcourse = removeSpecialChars(storedeValue)
    
      console.log(storedcourse,fstoredcourse,"in final educator page")
      console.log(typeof storedeValue)
    const payload = {
      timestamp: timestamp,
      latitude: la_location,
      longitude: lo_location,
      accuracy: accuracy,
      educatorsID:fstoredcourse,
      courseId:storedcourse
    };


    try {
      const response = await api.post('locations/postlocation', payload);
      console.log(response.data.message);
    } catch (err) {
      setErrorMsg('Error sending coordinates to backend.');
    }
  };
 

  

  return (
    <NativeBaseProvider>
      <Box h='100%' borderWidth='1' borderColor='white' rounded="md" p='1' alignItems='center' py='50%'>
      <Button mb="1">Refresh at least twice to get more accurate data</Button>
        {errorMsg && <Text style={styles.error}>{errorMsg}</Text>} 
        {isLoading && <Spinner />} 
       
        <Button onPress={refreshLocation} disabled={isLoading} >Refresh </Button>

        <View  style={styles.dataContainer}> 
          <Text mt="5">Latitude: {la_location}</Text>
          <Text>Longitude: {lo_location}</Text>
          <Text>Accuracy: {accuracy}</Text>
          <Text mb = "5">Timestamp: {timestamp}</Text>
        </View>
  {/* {accuracy === 20?  <Button onPress={tohome} disabled={isLoading} >Done </Button>:  <Text >Refresh </Text>} */}
       
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
   // ... your styles, including 'error' and 'dataContainer'
});