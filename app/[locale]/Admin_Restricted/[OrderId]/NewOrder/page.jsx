"use client"
import React, { useEffect } from 'react'
import NewOrderBox from '@/components/AdminDashboard/NewOrder/NewOrderBox'
import { OrderProvider } from '@/contexts/OrderContext'
import { setEngine } from 'crypto'
import { useSession } from 'next-auth/react'

const NewOrder = () => {
    return ( <OrderProvider>
        <div className = 'w-full h-full p-[10px] md:p-[19px]' >
        <NewOrderBox />
        </div> 
        </OrderProvider>
    )
}

export default NewOrder