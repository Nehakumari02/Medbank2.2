"use client"
import React, { useEffect } from 'react'
import NewOrderBox from '@/components/UserDashboard/NewOrder/NewOrderBox'
// import { OrderProvider } from '@/contexts/OrderContext'

const NewOrder = () => {
    return ( 
        // <OrderProvider>
        <div className = 'w-full h-full p-[10px] md:p-[19px]' >
        <NewOrderBox />
        </div> 
        // </OrderProvider>
    )
}

export default NewOrder