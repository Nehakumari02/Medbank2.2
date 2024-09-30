"use client"
import React, { useDebugValue, useEffect, useState } from 'react'
import OrderOverView from '../../../../components/UserDashboard/Dashboard/OrderOverView'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import useFcmToken from '../../../../hooks/useFCMToken'

const Dashboard = () => {
  const userId = usePathname().split("/")[2]
  const { token, notificationPermissionStatus } = useFcmToken(userId)
  console.log(userId)

  // async function requestPermission() {
  //   console.log('Requesting permission...');
  //   try {
  //     const permission = await Notification.requestPermission();
      
  //     if (permission === 'granted') {
  //       console.log('Notification permission granted.');
        
  //       // Get the FCM token
  //       const token = await getToken(messaging,{ vapidKey: "BMeV9lF3EmvjR5oXdqF7tRL1rlwlT-vCOdyg3HXIIHg9AsCtAYaRp-1fhsmTgiuHO1_4K5BtXlsOO3o7v7XLQoc" });
  //       console.log('FCM Token:', token);
  //     } else {
  //       console.error('Notification permission denied.');
  //     }
  //   } catch (error) {
  //     console.error('Error getting permission or token:', error);
  //   }
  // }

  // useEffect(()=>{
  //   requestPermission();
  // },[])


  const [orderOverview,setOrderOverview] = useState({
    pending:0,
    progress:0,
    completed:0
  })

  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchOrdersByUserId = async(userId)=>{
      console.log("fetching data")
      setLoading(true);
      try{
        const response = await fetch('/api/fetchOrders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userId:userId}),
        });
        const data = await response.json();
        console.log("data",data)
        
        let pending = 0
        let progress = 0
        let completed = 0
        if(data.data.length){
          setData(data.data)
          data.data.forEach(item => {
            if (item.requestSheetStatus === 'inUserProgress') {
              pending++;
            } else if (item.requestSheetStatus !== 'inUserProgress' && item.paymentStatus !== 'isCompleted') {
              progress++;
            } else if (item.paymentStatus === 'isCompleted') {
              completed++;
            }
          });
          setOrderOverview({
            pending,progress,completed
          })
        }
        
        
      }catch(error){
        console.log("fetch orders error ",error)
      }finally{
        setLoading(false);
      }
    }
    fetchOrdersByUserId(userId);
  },[])

  return (
    <div className='w-full p-[10px] md:p-[19px]'>
      {/* <useFcmToken userId={userId} /> */}
      <OrderOverView orderOverview={orderOverview} data={data} loading={loading} />
    </div>
  )
}

export default Dashboard