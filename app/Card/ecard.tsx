import React, { useState, useEffect } from 'react';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system'; 
import { shareAsync } from 'expo-sharing';
import { Button, NativeBaseProvider } from 'native-base'; 
import api from '@/auth/Api';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
// ... other imports if needed  

export default function Courserender() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [studentName, setStudentName] = useState(''); 
  // Placeholder 
const[examData, setesamdata]=useState([])
  const fetchExamDataFromBackend = async () => {
    try {
      const iid = await SecureStore.getItemAsync("studentByID");
      const response = await api.get(`statistics/getstudentstatistics`, {
        params: {
          studentId: iid, 
        }
    });
    console.log(response.data.exam)
    
      if (response.status != 200) {
        throw new Error('Network response was not ok');
      }
      setesamdata(response.data.exam)
       setStudentName(response.data.studentID)
       console.log(response.data.studentID)
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Propagate error
    }
  };

  useEffect(()=>{
 fetchExamDataFromBackend()
 console.log(typeof examData)
  },[])

  const [studeName, setStudeName] = useState('');

 useEffect(()=>{
    async function retrieveData() {
      const storedNames = await SecureStore.getItemAsync("namesKey");
      setStudeName(storedNames)
     
    }
    
    retrieveData(); 
   },[])
   function removeSpecialChars(str) {
    return str.replace(/["\[\]]/g, ''); 
  }

  const fstudentName = removeSpecialChars(studeName)

  const generateHTML = async (examData) => {
    console.log("exam data in html",examData)
    const htmlTemplate = ` 
    <!DOCTYPE html>
    <html>
    <head>
      <title>Exam Card</title>
      <style>
        table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
        th, td { border: 1px solid black; padding: 5px; }
      </style>
    </head>
    <body>
      <div style="text-align: center;">
        <img src="https://www.example.com/logo.png" width="150" height="50">
        <h1>Exam Card</h1>
        <p>Student Name: ${fstudentName}</p> </div>
  
      <table>
        <thead>
          <tr>
            <th>Course ID</th> 
            <th>Attendend (classes)</th> 
            <th>Percentage</th> 
          </tr>
        </thead>
        <tbody>
          ${examData.map(
            item => `
              <tr>
                <td>${item.courseId}</td>
                <td>${item.count} out of 14</td>
                <td>${item.percentage}%</td>
              </tr>
            `
         ).join('')}
        </tbody>
      </table>
    </body>
    </html>
    `;
  
    return htmlTemplate;
  };

  const createAndDownloadPDF = async (htmlContent) => {
    setIsLoading(true); 
    try {
      const pdfUri = await Print.printToFileAsync({ html: htmlContent });
      // await downloadPdf(pdfUri);  
      await shareAsync(pdfUri.uri)
      router.navigate("/(student)/dashboard")
    } catch (error) {
      if (error.message.includes('Error creating PDF')) { // Adjust the message if needed
        console.error("Error creating PDF:", error);
        // Handle PDF creation error (e.g., display error message to user)
      } else {
        console.error("Error downloading PDF:", error);
        // Handle download error
      }
      throw error; 
    } finally {
      setIsLoading(false); 
    }
  };



  const generateExamPass = async () => {
    setIsLoading(true); 
    try {
      console.log("exam data in html function",examData)
      const htmlContent = await generateHTML(examData); 
      await createAndDownloadPDF(htmlContent);
    } catch (error) {
      console.error("Error generating exam pass:", error);
      // Handle generateExamPass errors
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <NativeBaseProvider>
      <Button onPress={generateExamPass} isLoading={isLoading}> 
        {isLoading ? 'Generating...' : 'Generate Exam Pass'}
      </Button> 
    </NativeBaseProvider>
  );
}