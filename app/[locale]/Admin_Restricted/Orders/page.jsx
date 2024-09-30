"use client"
import React, { useEffect, useState } from 'react'
import { OrdersDataTable } from '@/components/AdminDashboard/Orders/OrdersDataTable'

const Orders = () => {
  const [data,setData] = useState([]);
  const [totalPages,setTotalPages] = React.useState(1);
  const [currentPage,setCurrentPage] = React.useState(1);
  const [buttons,setButtons] = React.useState([1]);
  const [searchQuery,setSearchQuery] = useState("");
  const [loading,setLoading] = useState(true);
  
  React.useEffect(() => {
    if (totalPages <= 5) {
      // If totalPages is 5 or fewer, show buttons for all pages
      setButtons(() => {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      });
    } else {
      // Handle pagination for more than 5 pages
      if (currentPage < 4) {
        // Show buttons for the start and end pages
        setButtons(() => [1, 2, 3, 4, '...', totalPages]);
      } else if (currentPage > totalPages - 3 && currentPage <= totalPages) {
        // Show buttons for the end of the range
        setButtons(() => [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]);
      } else {
        // Show buttons around the current page with ellipses
        setButtons(() => [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]);
      }
    }
  }, [currentPage, totalPages]);
  

  useEffect(()=>{
    const fetchOrdersByUserId = async()=>{
      setLoading(true);
      try{
        const response = await fetch('/api/admin_fetchOrders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ page:currentPage, limit:10, searchQuery }),
        });
        const data = await response.json();
        if(data.error){
          setCurrentPage(1);
          setData([]);
          setTotalPages(1);
          setButtons([1]);
        }
        console.log("data",data)
        setData(data.data)
        setTotalPages(data.totalPages)
        
      }catch(error){
        console.log("fetch orders error ",error)
      }finally{
        setLoading(false);
      }
    }

    fetchOrdersByUserId();
  },[currentPage,searchQuery])

  return (
    <div className='w-full p-[19px] md:h-[calc(100vh-104px)] overflow-y-scroll'>
      <OrdersDataTable data={data} loading={loading} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} buttons={buttons} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  )
}

export default Orders