import { StyleSheet, ActivityIndicator } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Staffloginpage from '@/auth/Staffloginpage';
import { AuthProvider } from '@/auth/Authentication';
import LoginPage from '@/logs/LoginPage';

import { Box, Center, NativeBaseProvider } from 'native-base';
import { HStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect,useState } from 'react';
import api from '@/auth/Api';
import { Card, CardItem, Body, Image } from 'native-base';
import { FlatList } from 'native-base';
import Courseloader from './permissions';
import GeolocationButton from '../Card/ecard';
import NewsFeed from '@/app/Card/courserender'
import Courserender from '@/app/Card/courserender';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Spinner } from 'native-base';
import { TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { ScrollView } from 'native-base';
import { Button } from 'native-base';
interface StudentData {
  id: number;
  FirstName: string;
  SecondName: string;
  StudentCourse: {
    CourseId: string;
    CourseName: string;
    CourseCode: string;
  };
}


export default function Dashboard() {
  function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
  }



  

  const date= new Date()
  var hours=date.getHours()
  var greeting
   if(hours<12){
    greeting="Good morning"
   }
   else if(hours>= 12 && hours<=14){
    greeting="Good afternoon"
   }
   else{
    greeting="Good evening"
   }
   const[pgreeting,setpgreeting]=useState([]);
   const[evalue, setevalue] =useState([])
   
   useEffect(()=>{
          const greetingrequest= async ()=>{
            const iid = await SecureStore.getItemAsync("eByID");
            setiid(iid)
            try{
              const response = await api.get(`educator/educatorsData`, {
                params: {
                    id: iid, 
                }
            });
                 
                  setpgreeting(response.data)
                  setevalue(response.data)
                  
                 
            }catch(err){
              console.log(err)
            }
          }
          greetingrequest()
   },[])
   const[iid , setiid]= useState(0)
   const names =pgreeting.map(pgreeting=>(pgreeting.FirstName))
   const value =evalue.map(egreting=>(egreting.EducatorsId))
   console.log(value)
   console.log(typeof value,"value", value)

   const stringifiedValue = JSON.stringify(value);
   console.log(stringifiedValue)

console.log(typeof stringifiedValue)
  SecureStore.setItemAsync("evalueKey", stringifiedValue);

  
 

   const [courseloader , setcourseloader] = useState([])
   const [students, setStudents] = useState<StudentData[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [cid , setcid] =useState(null)
   const student = students.map(students=>(students.id))
   const studentbyid = student[iid]




   const fetchCourse = async () => {
    setIsLoading(true);
  
    try {
      const iid = await SecureStore.getItemAsync("eByID");
      const response = await api.get(`educator/educatorsData`, {
        params: {
            id: iid, 
        }
    });
      setcourseloader(response.data);
    } catch (error) {
      console.error('Error fetching location:', error); // Log error for debugging
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(()=>{

    fetchCourse()
    
  },[])

  const  handleCoursePress = (courseIdId) => {
    const courseId =courseIdId
    SecureStore.setItemAsync("EcourseId", courseId);
    
   
     
    // Defer navigation using callback:
    setTimeout(() => {
        router.navigate('./permissions')
    }, 0); 
};

const logout = ()=>{
  router.navigate("/(tabs)/two")
  
}

  return (
<NativeBaseProvider>
     <Box>
   
     <HStack space={3} justifyContent="center" borderWidth = '1' borderColor='white'  rounded="md" p = '1'>
   
   
         <Box h="20" w="100%"  borderWidth = '1' borderColor='white' rounded="md" shadow={3} alignItems='center' py='3'>
   
   
        <Text>{greeting} {names}</Text>
        <Button onPress={logout}>Log out</Button>
   
         </Box>
  
       </HStack>;
   
     </Box>

     <Box  borderWidth='1' borderColor='white' rounded="md"   p= '0' m = '0' h ='100%'>

      
   
   
{/* {error && <Text style={styles.error}>{error}</Text>} */}
{isLoading && <Spinner />}
{courseloader.map(item => (
<View key={studentbyid } >
    
    <Box w="100%"    h ='100%' borderWidth = '1' borderColor='white'  rounded="md"  p= '0' m = '0'>
      
    {item.StudentCourse.map((course) => (

  <View key={course.CourseId}>

    <ScrollView>
    <HStack w= '100%'>
      
      <Box h="20" w="94%"  borderWidth = '1' borderColor='white' rounded="md" shadow={3} alignItems='center' px='2.5' py = '5' my = '1' mx= ' 3'>
      <TouchableOpacity   onPress={() => handleCoursePress(course.CourseId)}>
         <Text>
         

         Course Name: {course.CourseName} 
        
         </Text>
         <Text>
         Course id: {course.CourseId} 
         </Text>
         </TouchableOpacity>
      </Box>

     
    </HStack>
    </ScrollView>
    
  </View>
))}
      
      </Box>

   
    

  </View>
))}


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
