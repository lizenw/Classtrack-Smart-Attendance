import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Staffloginpage from '@/auth/Staffloginpage';
import { AuthProvider } from '@/auth/Authentication';
import Dashboard from './dashboard';
import LoginPage from '@/logs/LoginPage';
import { useEffect, useState } from 'react';
import { Box, Center, NativeBaseProvider } from 'native-base';
import { HStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import api from '@/auth/Api';
import { Spinner } from 'native-base';
import { Progress } from 'native-base';
import { Button } from 'native-base';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
export default function Profile() {
  function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
  }

  const[ID ,setID]=useState("")
 useEffect( ()=>{
  const ID =  SecureStore.getItemAsync("studentID");
  console.log("ID in dashboard",ID)
  setID(ID)
 },[])

const iid =ID

  const [courseloader , setcourseloader] = useState([])
   const [students, setStudents] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const[getcard , setgetcard]=useState(90)

 useEffect(()=>{

 
  const fetchCourse = async () => {
    setIsLoading(true);
    const iid = await SecureStore.getItemAsync("studentByID");
    try {
      
      const response = await api.get(`student/studentData`, {
        params: {
          id: iid, 
        }
    });
      setcourseloader(response.data);
  
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching location:', error); // Log error for debugging
    } finally {
      setIsLoading(false);
    }
  };



  fetchCourse()
},[])
  const student = students.map(students=>(students.id))
  const studentbyid = student[iid]
  const[reso , setreso ]=useState([])
  const[exm , setexm]=useState([])
  


  useEffect(()=>{


 
  const vak = async () => {
    const iid = await SecureStore.getItemAsync("studentByID");
    console.log("statistics id ", iid)
    console.log(typeof iid)
    const response = await api.get(`statistics/getstudentstatistics`, {
      params: {
        studentId: iid, 
      }
  });
  setreso(response.data.result)
  setgetcard(response.data.edecider)
  console.log("validator",getcard)
  const fc = response.data.exam
  setexm(response.data.exam)
  

  }
vak()
},[])


 



     

 
const toexampass = ()=>{
  console.log("to exam pass")
  // router.navigate("/(student)/dashboard")
  router.replace("/Card/ecard")
  
}
  return (
 <NativeBaseProvider>
  <Box>

  <HStack space={3} justifyContent="center" borderWidth = '1' borderColor='white'  rounded="md" p = '1'>


      <Box h="20" w="20"  rounded="full" shadow={3} alignItems="center" py='7'>
      <TabBarIcon name="user" color= 'white'  />
      </Box>


      <Box h="20" w="40"  borderWidth = '1' borderColor='white' rounded="md" shadow={3} alignItems='center' py='3'>


     <Text> Hi!  goodlizen    <TabBarIcon name="smile-o" color= 'white'  /></Text>
     

      </Box>



      <Box h="20" w="20"  rounded="full" shadow={3} alignItems="center" py='3'>
        <Box h='5' w='5' rounded='full' justifyContent='center' alignItems= 'center' bg = 'white'>
          2
        </Box>
      <TabBarIcon name="bell-o" color= 'white'  />
     
      </Box>
    </HStack>;

  </Box>
  

  <Button onPress={toexampass}
             disabled={getcard < 75}>
       <Text>
          {getcard >= 75 ? 'Download exam card' : 'Complete all courses to download exam card'}
       </Text>
     </Button>

          
<HStack w= '100%'>
  
  <Box h="100%" w="95%"  borderWidth = '1' borderColor='white' rounded="md" shadow={3} alignItems='center' px='2.5' py = '5' my = '1' mx= ' 3'>
 
 
  {isLoading && <Spinner />}
      {courseloader.map(item => (
      <View key={studentbyid } >
          
          <Box w="100%"    h ='100%' borderWidth = '1' borderColor='white'  rounded="md"  p= '0' m = '0'>
            
          {item.StudentCourse.map((course) => (
      
        <View key={course.CourseId}>

          
          <HStack w= '100%'>
            
            <Box  w="85%"  borderWidth = '1' borderColor='white' rounded="md" shadow={3} alignItems='center' mx = '0' my = '4' mx= ' 3'>
            
               <Text>
               
               
              {course.CourseName} 
         
              
               </Text>
               <Text>coursevalue = {
                 ((reso.find(item => item.courseId === course.CourseId)?.count || 0) / 14) * 100
                }%</Text> 
            </Box>
            
          </HStack>
         
          <Progress  bg="white" value={ ((reso.find(item => item.courseId === course.CourseId)?.count || 0) / 14) * 100} mx="4" />
          
        </View>
      ))}
            
            </Box>

         
          
      
        </View>
      ))}
 </Box>
</HStack>








  
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
