"use client"
import React from 'react'
import { useTranslations } from 'next-intl'
import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();
  const language = usePathname().split("/")[1];
  const t = useTranslations("Logout");

  const handleLogout = async()=>{
    await signOut({redirect:false});
    router.push(`/${language}/Admin_Login`);
  }

  return (
    <div className='flex items-center justify-center mt-[150px]' >
        <div className='bg-white w-[298px] lg:w-[658px] h-[197px] lg:h-[287px] flex flex-col items-center justify-center gap-[18px] border-[1px] border-[#E2E8F0] rounded-[10px] p-[30px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
            
            <div className='flex flex-col items-center justify-start'>
              <span className='font-DM-Sans font-bold text-[22px] lg:text-[32px] text-[#3A3B3C] leading-[40px] '>{t("title")}</span>
              <span className='font-DM-Sans font-normal text-[#3A3B3C] text-[14px] lg:text-[20px] leading-[34px] pt-[6px] lg:pt-[24px]'>{t("cancelConfirm")}</span>
              <div className='flex items-center justify-end gap-[10px] lg:gap-[12px] pt-[24px]'>
              <button  className='h-[40px] lg:h-[48px] w-[96px] lg:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] lg:text-[16px] text-center leading-[24px] '>{t("cancel")}</button>
              <button onClick={handleLogout} className='h-[40px] lg:h-[48px] w-[96px] lg:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] lg:text-[16px] text-center leading-[24px] '>{t("confirm")}</button>
            </div>
            </div>
          </div>
      
    </div>
  )
}

export default Logout
