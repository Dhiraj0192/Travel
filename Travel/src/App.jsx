import Navbar from "./components/Navbar"

import { useEffect } from "react"
import io from 'socket.io-client';
 
const socket = io('http://localhost:3000')

const App = () => {
  useEffect(()=>{
    if (Notification.permission === 'default' || Notification.permission === 'denied'){
      Notification.requestPermission().then((permission)=>{
        if (permission === 'granted') {
          console.log('Notification permission granted');
          
        } else {
          console.log('Notification permission denied');
        }
      });
    }

    socket.on('pushNotification',(data)=>{
      console.log('Received Notification', data);
      if (Notification.permission === 'granted') {
        new Notification('Approved Notifiaction',{
          body: body.message,
          icon: 'https://via.placeholder.com/50'
        });
      }

      
      
    });
    return ()=>{
      socket.off('pushNotification')
    }
  })
  return (
    <div className=''>
      {/* navbar */}
      <Navbar />
    </div>
  )
}

export default App