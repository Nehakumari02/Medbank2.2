"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { OrdersDataTable } from '@/components/UserDashboard/Orders/OrdersDataTable'

const Orders = () => {
  const userId = usePathname().split("/")[2]
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchOrdersByUserId = async(userId)=>{
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
        console.log(data)
        // console.log("data",data)
        setData(data.data)
        
      }catch(error){
        console.log("fetch orders error ",error)
      }finally{
        setLoading(false);
      }
    }
    fetchOrdersByUserId(userId);
  },[])

  return (
    <div className='w-full p-[19px] md:h-[calc(100vh-104px)] overflow-y-scroll'>
      <OrdersDataTable data={data} loading={loading} />
    </div>
  )
}

export default Orders