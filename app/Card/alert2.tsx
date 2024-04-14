import { useState,useEffect} from 'react';
import { Modal, Button, Text, View, NativeBaseProvider } from 'native-base';
import { router } from 'expo-router';

export default function MyComponent() {
  const [showModal, setShowModal] = useState(false);
  const [backendMessage, setBackendMessage] = useState("Attendance Shared, back home....");

  // Simulate fetching the message 
  useEffect(() => { 
    // Replace with your actual backend fetch logic
    setBackendMessage("Attendance Shared, back home...."); 
    setShowModal(true);
  }, []);

  const toHome = () => {
      // Your navigation logic t/(student)/dashboardo go home 
      router.navigate("/(educators)/e_dashboard")
      setShowModal(false); // Close the modal
  };

  return (
    <NativeBaseProvider>
        
<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.Body>
            <Text>{backendMessage}</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={toHome}>Back Home</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </NativeBaseProvider>
   
  );
}