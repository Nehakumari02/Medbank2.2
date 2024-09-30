import React from 'react'
import Image from 'next/image'
import signinImage from '../../../../public/Images/Home/signin.png'

const signin = () => {
  return (
    <div className='w-[100%] flex justify-center items-center pt-[50px]'>
    <div className='flex justify-center max-h-[497px] max-w-[497px]'>
        <Image src={signinImage}></Image>
      
    </div>
    </div>
  )
}

export default signin