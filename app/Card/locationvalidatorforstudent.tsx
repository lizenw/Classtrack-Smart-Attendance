

import { Platform, Text, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import api from '@/auth/Api'; 
import { NativeBaseProvider, Box, Spinner, Button } from 'native-base'; 
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function LocationValidatorForStudent() {
  const [staffLocationssts, setStaffLocationsstatus] = useState("Closed"); 
  const [staffLocations, setStaffLocations] = useState([]); 
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const [la_location, setla_Location] = useState(null);
  const [lo_location, setlo_Location] = useState(null);
  const [accuracy, setaccuracy] = useState(null);
  const [timestamp , settimestamp]= useState(null);

  // Distance calculation function
  const calculateDistance = (staffLat, staffLong, userLat, userLong) => {
    const R = 6371; // Earth's radius in km
    const dLat = toRadians(userLat - staffLat); 
    const dLon = toRadians(userLong - staffLong);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * 
      Math.cos(toRadians(staffLat)) * Math.cos(toRadians(userLat)); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 

    return distance * 1000; // Return distance in meters
  };

  // Helper function to convert degrees to radians
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  


  const fetchStaffLocationsstatus = async () => {
    setIsLoading(true);
    const storedcourse = await  SecureStore.getItemAsync("courseId");
    const courseID = storedcourse 
    console.log(courseID, "course id")
  console.log(typeof courseID)
    try {
      const response = await api.get("locations/getlocationstatus", {
        params: {
            courseID:courseID,
        }
    });
      setStaffLocationsstatus(response.data.thestatus);
      console.log(response.data.thestatus)
      console.log(staffLocationssts)
    } catch (error) {
      setErrorMsg('expired');
    } finally {
      setIsLoading(false);
    }
  };


  
  
  const fetchStaffLocations = async () => {
    setIsLoading(true);
    const storedcourse = await  SecureStore.getItemAsync("courseId");
    const courseID = storedcourse 
    console.log(courseID, "course id")
  console.log(typeof courseID)
    try {
      const response = await api.get("locations/getlocation", {
        params: {
            courseID:courseID,
        }
    });
      setStaffLocations(response.data[0]);
      console.log(response.data[0])
    } catch (error) {
      setErrorMsg('Location not yet shared. Consult your educator');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshLocation = async () => {
    setIsLoading(true);

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      });

      setla_Location(location.coords.latitude);
      setlo_Location(location.coords.longitude);
      setaccuracy(location.coords.accuracy);
      settimestamp(location.timestamp); 
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg('Error fetching location: ' + error.message); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffLocationsstatus()
    fetchStaffLocations(); 
    
  }, []);
const [showdish, setshowdish]=useState("")
  const handleStaffLocation = (staffLocation) => {
    if (!la_location || !lo_location) {
      alert('Please refresh your location first.');
      return;
    }

    const distance = calculateDistance(
      staffLocation.latitude,
      staffLocation.longitude,
      la_location,
      lo_location
    );
    if(distance > 10){
      setshowdish("out of range")
    }
  

    console.log(`Distance to staff member: ${distance} meters`);  
    if (distance <= 10 ){
      router.navigate("./finalRenderforstudent")
    }
    else{
      router.navigate("./locationvalidatorforstudent")
    }
  };





  return (
    <NativeBaseProvider>
      <Box h='100%' borderWidth='1' borderColor='white' rounded="md" p='1' alignItems='center' py='50%'>
        {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
        {isLoading && <Spinner />} 
        <Button onPress={refreshLocation} disabled={isLoading} >
          Refresh Location
        </Button>
    <Text >

    ... Location data display (latitude, longitude, etc.) ...
    </Text>
    <Text>
Refresh your location before verification
      
</Text>
<Text>
If your not redirected, keep Refreshing
      
</Text>
      
   
<Button 
        m = '1.5' 
        disabled={staffLocationssts === "Closed"} 
        onPress={() => handleStaffLocation(staffLocations)}
    >
        {staffLocationssts === "Closed" ? "Attendance is closed" : "Opened... verify your location"} 
    </Button>
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