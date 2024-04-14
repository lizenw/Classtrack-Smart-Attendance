import { StyleSheet ,ActivityIndicator} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Staffloginpage from '@/auth/Staffloginpage';
import { AuthProvider } from '@/auth/Authentication';
import LoginPage from '@/logs/LoginPage';


import { Box, Button, Center, NativeBaseProvider } from 'native-base';
import { HStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect,useState } from 'react';
import api from '@/auth/Api';
import { Card, CardItem, Body, Image } from 'native-base';
import { FlatList } from 'native-base';
import Courserender from '../Card/courserender';
import NetInfo from '@react-native-community/netinfo';
import { Spinner } from 'native-base';
import Auth from '@/auth/Authentication';
import { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useWindowDimensions } from 'react-native';
import { Progress } from 'native-base';
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
async function name() {
  const sid = await SecureStore.getItemAsync("studentByID");
  console.log(typeof sid)
console.log("getting id in dashboard",sid)

return(sid)
}
 

const ID = name()
console.log("id",ID)


const iid = ID
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
   const[svalue, setvalue] =useState([])
   
   useEffect(()=>{
          const greetingrequest= async ()=>{
            const iid = await SecureStore.getItemAsync("studentByID");
            try{
             
              const response = await api.get(`student/studentData`, {
                params: {
                    id: iid, 
                }
            });
               
                  setpgreeting(response.data)
                  setvalue(response.data)
                  setStudents(response.data)
                  
                 
                 
                 
            }catch(err){
              console.log(err)
            }
          }
          greetingrequest()
   },[])

   const names =pgreeting.map(pgreeting=>(pgreeting.FirstName))
   const value =svalue.map(pgreting=>(pgreting.StudentId)) 

   const stringifiedNames = JSON.stringify(names);
   const stringifiedValue = JSON.stringify(value);

    SecureStore.setItemAsync("namesKey", stringifiedNames); 
    SecureStore.setItemAsync("valueKey", stringifiedValue);
 

async function retrieveData() {
  const storedNames = await SecureStore.getItemAsync("namesKey");
  const storedValue = await SecureStore.getItemAsync("valueKey");
}

retrieveData(); 


   const [courseloader , setcourseloader] = useState([])
   const [students, setStudents] = useState<StudentData[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
 
   

 
  const student = students.map(students=>(students.id))
  const studentbyid = student[iid]

   
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
    const stringifiedCourse = JSON.stringify(courseId);
    console.log(typeof stringifiedCourse)
     SecureStore.setItemAsync("courseId", courseId);
   
    setTimeout(() => {
        router.navigate('./sing_attendance')
    }, 0); 
};




const [backendValue, setBackendValue] = useState(0);
const [progress, setProgress] = useState('0%'); 
const [progressColor, setProgressColor] = useState('red');

const { width } = useWindowDimensions(); 
const boxWidth = width * 0.25; 

const[stc , setstc]=useState('')
const[storev , setstorv]=useState("")
const[reso , setreso]=useState([])
useEffect( ()=>{
  const storedValue =  SecureStore.getItemAsync("valueKey");
  console.log(storedValue)
  setstorv(storev)
  const loadstudentstatistics= async ()=>{
    function removeSpecialChars(str) {
      return str.replace(/["\[\]]/g, ''); 
    }
  
    const fstudentID = removeSpecialChars(storev)
    console.log(fstudentID)
    try{
     
      const response = await api.get(`statistics/getstudentstatistics`, {
        params: {
          studentId: iid, 
        }
    });
       
          setstc(response.data)

          setBackendValue(response.data.data)
          const numberofsing = response.data.data
          console.log("result", response.data.result)
          setreso(response.data.result)
                   SecureStore.setItemAsync("courseno", numberofsing)
         
    }catch(err){
      console.log(err)
    }
  }
  loadstudentstatistics()




},[])

useEffect(() => {
  const calculatedProgress = (backendValue / 12) * 100 + '%';  
  setProgress(calculatedProgress);  

  setProgressColor(backendValue >= 9 ? 'green' : 'red'); 
}, [backendValue]); 


const [courseStatus, setCourseStatus] = useState({});







const logout = ()=>{
  router.navigate("/(tabs)/")

  
}

console.log(backendValue)

  return (
<NativeBaseProvider>
     <Box >
   
     <HStack space={3} justifyContent="center" borderWidth = '1' borderColor='white'  rounded="md" p = '1' >
   
   
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
            
          
          <HStack w= '100%'>
            
            <Box h='20' w="65%"  borderWidth = '1' borderColor='white' rounded="md" shadow={3} alignItems='center' px='2.5' py = '5' my = '1' mx= ' 3'>
            <TouchableOpacity   onPress={() => handleCoursePress(course.CourseId)}>
               <Text>
               

               Course Name: {course.CourseName} 
              
               </Text>
               <Text>
               
               Course id: { cousrid =course.CourseId} 
              
              
               </Text>
               
              
               </TouchableOpacity>
              
            </Box>
            
            <Box h="20" w={boxWidth} borderWidth='1' borderColor='white' rounded="md" shadow={3} alignItems='center' py='7' my='1'>
                 {/* <View style={styles.baseBar} /> 
                <View style={[styles.progressBar, { width: progress, backgroundColor: progressColor }]} /> */}
             
               {/* status: {courseStatus[course.CourseId] || 'Loading...'} */}
                
           </Box>
          </HStack>
       
          
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
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  container: {
    borderWidth: 1, 
    borderColor: 'white', 
    borderRadius: 8, // Assuming rounded corners
    position: 'relative' // For percentage positioning
  },
  baseBar: {
    ...StyleSheet.absoluteFillObject, // Overlay the entire Box 
    backgroundColor: 'black',
    borderRadius: 8, 
  },
  progressBar: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8, 
  },
  percentageText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    color: 'white'
  }
});
