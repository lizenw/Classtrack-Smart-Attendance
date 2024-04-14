// import * as PDF from 'react-native-pdf';
// import * as FileSystem from 'expo-file-system'; 
// import { Button, NativeBaseProvider } from 'native-base'; 
// import { useState } from 'react'; // Example UI integration

// // ... Other imports ...

// export default function Exampass() {
//     const [isLoading, setIsLoading] = useState(false);
// async function fetchExamDataFromBackend() {
//   const examData = {
//     studentName: "John Doe",
//     courses: [
//       { courseName: "Mathematics", courseCode: "MATH101", attendanceValue: 95 },
//       { courseName: "Physics", courseCode: "PHYS202", attendanceValue: 80 },
//     ]
//   };
//   const logoImageUri = 'https://www.example.com/logo.png';  // Replace with your image URL
//   return { examData, logoImageUri };
// }

// // PDF Generation Function 
// async function generateExamPass() {
//   const { examData, logoImageUri } = await fetchExamDataFromBackend(); 

//   const pdfDoc = await PDF.create({
//     content: [
//       { image: logoImageUri, width: 150, height: 50, alignment: 'center' },
//       { text: 'Student Name: ' + examData.studentName, style: { fontSize: 16 } },
//       { 
//         type: 'table', 
//         data: formatCoursesData(examData.courses), 
//         headerRows: 1, // For table header
//         widths: [150, 100, 100], // Adjust column widths as needed
//         headerLabels: ['Course Name', 'Course Code', 'Attendance'],
//         style: { marginVertical: 10 } 
//       },
//     ],
//   });

//   const pdfUri = await PDF.writeToFile(pdfDoc, 'exam_pass.pdf');
//   await downloadPDF(pdfUri);
// }

// function formatCoursesData(courses) {
//   return courses.map(course => ([
//     course.courseName, 
//     course.courseCode, 
//     course.attendanceValue 
//   ]));
// }

// async function downloadPDF(pdfUri) {
//   // ... (same as before) ...
// }

// // UI Component Example
 

//   return (
//     <NativeBaseProvider>

   
//       <Button onPress={() => { setIsLoading(true); generateExamPass().finally(() => setIsLoading(false)) }}>
//         {isLoading ? 'Generating...' : 'Generate Exam Pass'}
//       </Button> 
//       </NativeBaseProvider>
//   );
// }
import { View, Text } from 'react-native'
import React from 'react'
import { NativeBaseProvider } from 'native-base'

export default function examcard() {
  return (
   <NativeBaseProvider>
    hello
   </NativeBaseProvider>
  )
}