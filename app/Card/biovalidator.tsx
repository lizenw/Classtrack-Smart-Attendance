
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import api from '@/auth/Api';
import { Spinner } from 'native-base';
import { Box } from 'native-base';
import { NativeBaseProvider } from 'native-base';




export default function Courserender() {

const [courseloader , setcourseloader] = useState([])
const [errorMsg, setErrorMsg] = useState(null);
const [isLoading, setIsLoading] = useState(false); 

const fetchCourse = async () => {
  setIsLoading(true);

  try {
    const response = await api.get("locations/getlocation");
    setcourseloader(response.data);
  } catch (error) {
    setErrorMsg('Failed to fetch location data. Please try again.'); // More robust error message
    console.error('Error fetching location:', error); // Log error for debugging
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  const checkConnection = async () => {
    const isConnected = await NetInfo.isConnected.fetch();
    if (isConnected) {
      fetchCourse();
    } else {
      setError('No internet connection');
    }
  };
  checkConnection();
}, []);

  return (
    <NativeBaseProvider>
    <Box h='100%' borderWidth='1' borderColor='white' rounded="md" p='1' alignItems='center' py='50%'>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      {isLoading && <Spinner />}

      {/* Display location data */}
      {courseloader.map(item => (
        <View key={item.id} style={styles.staffLocationItem}>
          
          <Box h="20" w="20%"  rounded="md" shadow={3} alignItems="center" py='3'    borderWidth= '1' borderColor='white' >
        <Text>hi</Text>

          </Box>
          {/* Display staff courseloader information */}
          <Text>Latitude: {item.latitude}</Text> 
          <Text>Longitude: {item.longitude}</Text> 
          {/* Add more fields here */}
        </View>
      ))}
    </Box>
  </NativeBaseProvider>
  );



}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginBottom: 10,
  },
  staffLocationItem: {
    // Style your staff location item here 
  }
});