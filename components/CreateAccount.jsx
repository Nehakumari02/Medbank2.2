import React from 'react'
import HomePageSectionHeader from './HomePageSectionHeader';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CreateAccount = () => {
  const language = usePathname().split("/")[1];
  const t= useTranslations("HomePage.CreateAccount");
  return (
    <div className="hidden md:block md:px-[42px] lg:px-[62px] pt-[100px]">
        <section className="w-full text-[#333333]">
            <HomePageSectionHeader title={"Create Account"} subTitle={"Create Account"}/>
            <div className='md:pl-[50px] lg:pl-[90px] pt-[20px] w-full flex flex-col items-start gap-[32px]'>
            <span className="flex items-center justify-center gap-[12px] font-sans text-[36px] font-medium leading-[42px] gradient-primary bg-clip-text text-transparent">FOR GETTING YOUR SAMPLE SEQUENCED</span>
            <p className="font-sans font-normal text-[20px] leading-[34px]">
              {t("description")}
            </p>
            <div className='flex gap-[12px]'>
            <Link href={`/${language}/Login`} className="h-[40px] p-[1px] rounded-[6px] flex items-center justify-center gradient-primary border-[#60B7CF]"><div className='bg-white w-full h-full px-[32px] py-[12px] rounded-[5px] flex items-center justify-center'><span className='gradient-primary bg-clip-text text-transparent'>Sign In</span></div></Link>
            <Link href={`/${language}/Signup`} className="h-[40px] px-[32px] py-[12px] rounded-[6px] flex items-center justify-center gradient-primary text-white">Sign Up</Link>
            </div>

            <div className="w-full flex items-center justify-center">

            </div>
            </div>
            </section>
    </div>
  )
}

export default CreateAccount
