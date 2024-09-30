'use client'
import React, { useEffect, useState } from 'react'
import { PaymentsDataTable } from '@/components/UserDashboard/Payments/PaymentsDataTable'
import { usePathname } from 'next/navigation'

const Payments = () => {
  // const data = [
  //   {
  //     id: "m5gr84i9",
  //     title:"DNA Test",
  //     invoice:"20,000 JPY",
  //     payment:false,
  //   },
  //   {
  //     id: "m5gr84i9",
  //     title:"RNA Test",
  //     invoice:"5,000 JPY",
  //     payment:true,
  //   },
  //   {
  //     id: "m5gr84i9",
  //     title:"DNA",
  //     invoice:"2,000 JPY",
  //     payment:false,
  //   },
  //   {
  //     id: "m5gr84i9",
  //     title:"DNA Sequencing",
  //     invoice:"10,000 JPY",
  //     payment:"inProgress",
  //   },
  //   {
  //     id: "m5gr84i9",
  //     title:"Genome Sequencing",
  //     invoice:"40,000 JPY",
  //     payment:false,
  //   },
  // ]

  const userId = usePathname().split("/")[2]
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchOrdersByUserId = async(userId)=>{
      setLoading(true);
      try{
        const response = await fetch('/api/fetchPaymentList', {
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
      <PaymentsDataTable data={data} loading={loading} />
    </div>
  )
}

export default Payments