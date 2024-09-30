'use client'
import React, { useEffect, useState } from 'react'
import {ArchiveDataTable} from '@/components/UserDashboard/Archive/ArchiveDataTable'
import { usePathname } from 'next/navigation'

const Archive = () => {
  const userId = usePathname().split("/")[2]
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchOrdersByUserId = async(userId)=>{
      setLoading(true);
      try{
        const response = await fetch('/api/fetchArchiveOrders', {
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
      <ArchiveDataTable data={data} loading={loading} />
    </div>
  )
}

export default Archive