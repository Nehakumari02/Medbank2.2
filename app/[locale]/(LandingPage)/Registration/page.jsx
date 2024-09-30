import React from 'react'
import Registrationimage from '../../../../public/Images/Home/signin.png'
import Image from 'next/image'

const   Registration = () => {
  return (
    <div className='w-[100%] flex justify-center items-center pt-[50px]'>
    <div className='flex justify-center max-h-[497px] max-w-[497px]'>
        <Image src={Registrationimage}></Image>
      
    </div>
    </div>

  )
}

export default Registration