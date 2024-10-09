"use client"
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {plusIcon} from './Icons'
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Logo from "../../public/Images/Home/logo.png";
import { toast } from '@/hooks/use-toast';
import { Loader2} from 'lucide-react';

const TopNav = () => {
  const path = usePathname().split("/")[3];
  const pathToRedirect = usePathname().split("/").slice(2).join("/");
  const language = usePathname().split("/")[1];
  const router = useRouter();
  const userIdDB = usePathname().split("/")[2];
  const t = useTranslations("TopNavBar");
  const [disabled, setDisabled] = useState(false);
  const [menu,setMenu] = useState(false);

  const updateLanguage = (newLanguage) => {
    const newPath = `/${newLanguage}/${pathToRedirect}`;
    router.push(newPath);
  };
  
  const handleNewOrder=async()=>{
    try{
      setDisabled(true);
      const response = await fetch('/api/newOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId:userIdDB}),
      });
      const data = await response.json();

      if (response.status === 404) {
        const message = language === 'jn' 
          ? "ユーザーが見つかりません。自分のアカウントでログインしてください。" 
          : "User not found. Please logout and login with your own credentials.";
      
        toast({
          variant: 'error',
          title: language === 'jn' ? 'エラー' : 'Error',
          description: message,
        });
        return;
      }
      
      if (response.status === 402) {
        const message = language === 'jn' 
          ? "ユーザー情報が未入力です。まずは詳細を入力してください。" 
          : "User details are incomplete. Please fill in your details first.";
      
        toast({
          variant: 'error',
          title: language === 'jn' ? 'エラー' : 'Error',
          description: message,
        });
        return;
      }
      
      router.push(`/${language}/${userIdDB}/${data.data._id}/NewOrder`)
    }catch(error){
      console.log(error)
    }
    finally{
      setDisabled(false);
    }
  }

  const handleMenu =()=>{
    setMenu(!menu);
  }

  return (
    <>
    <div className='w-full h-[60px] md:h-[104px] bg-white p-[10px] md:p-[32px] text-[#333333] flex items-center justify-between border-b-[1px] border-[#3333331A]'>
      <div>
        {path=="Dashboard"?<span className='hidden md:block font-DM-Sans font-bold text-[28px] leading-[24px] '>{t("welcomeMsg")}</span>:<></>}
        <div className="w-[40px] h-[40px] md:hidden">
          <Image src={Logo} alt="Logo" className="h-[40px] w-[40px]"></Image>
        </div>
      </div>
      <div className='flex items-center gap-[12px] md:gap-[24px]'>
      <div className='flex items-center justify-center gap-[10px] w-[67px]'>
          <button onClick={() => updateLanguage("jn")} >
            <span className={`${language == "jn" ? "border-b-[2px] border-[#003E5C99] text-black" : "text-[#333333]"} font-sans font-normal pb-[4px]`}>JN</span>
          </button>
          <div className='border-r-[2px] h-[20px] border-black'></div>
          <button onClick={() => updateLanguage("en")} >
            <span className={`${language == "en" ? "border-b-[2px] border-[#003E5C99] text-black" : "text-[#333333]"} font-sans font-normal pb-[4px]`}>EN</span>
          </button>
        </div>
        <button disabled={disabled} onClick={handleNewOrder} id='highlight-step-2' className={`h-[40px] w-[133px] rounded-[6px] hidden md:flex items-center justify-center gap-[10px] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[14px] leading-[20px] ${disabled?"opacity-75":""}`}>  {disabled?<Loader2 className="animate-spin" /> : <>{plusIcon} {t("newOrder")}</>}</button>
        <div>
          <button onClick={() => handleMenu()} className='h-full flex items-center justify-center md:hidden pt-[2px]'>{hamburderMenuIcon}</button>
          {menu && <div className='absolute right-0 z-10 top-[40px] w-[168px] bg-white p-[12px] shadow-md'>
          <ul className="flex flex-col items-start gap-[12px]">
          <li>
            <button
              onClick={() => {router.push(`/${language}/${userIdDB}/Settings`);handleMenu()}}
              className={`h-[40px] w-full flex items-center justify-start gap-[10px] py-[8px] pr-[12px] pl-[12px] ${path=="Settings"?"border-black border-b-[2px]":""}`}
            >
              {settingsIcon}
              <span className={`font-DM-Sans font-normal text-[16px] leading-[24px] `}>{t("settings")}</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {router.push(`/${language}/${userIdDB}/Logout`);handleMenu()}}
              className={`h-[40px] w-full flex items-center justify-start gap-[10px] py-[8px] pr-[12px] pl-[12px]  ${path=="Logout"?"border-black border-b-[2px]":""}`}
            >
              {logOutIcon}
              <span className={`font-DM-Sans font-normal text-[16px] leading-[24px]  `}>{t("logout")}</span>
            </button>
          </li>
          </ul>
        </div>}
        </div>
      </div>
    </div>
    <div className='w-full h-[40px] my-[8px] px-[10px] md:hidden flex items-center justify-between'>
      <div>
        {path=="Dashboard"?<span className='font-DM-Sans font-bold text-[18px] leading-[24px] '>{t("welcomeMsg")}</span>:<></>}
      </div>
      <button disabled={disabled} onClick={handleNewOrder} className={`h-[40px] w-[117px] rounded-[6px] flex items-center justify-center gap-[10px] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] leading-[20px] ${disabled?"opacity-75":""}`}>{plusIcon}{t("newOrder")}</button>
    </div>
    </>
  )
}

export default TopNav

const hamburderMenuIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.75 6H20.25M3.75 12H20.25M3.75 18H20.25" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

export const settingsIcon = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.9249 9.49407C14.8047 9.3572 14.7384 9.18125 14.7384 8.99907C14.7384 8.81689 14.8047 8.64093 14.9249 8.50407L15.8849 7.42407C15.9907 7.30607 16.0564 7.15759 16.0726 6.99995C16.0887 6.8423 16.0546 6.68358 15.9749 6.54657L14.4749 3.95157C14.3961 3.81471 14.2761 3.70622 14.132 3.64158C13.9879 3.57694 13.8271 3.55944 13.6724 3.59157L12.2624 3.87657C12.083 3.91364 11.8962 3.88376 11.7373 3.79257C11.5784 3.70138 11.4584 3.55518 11.3999 3.38157L10.9424 2.00907C10.8921 1.8601 10.7962 1.73072 10.6684 1.6392C10.5405 1.54768 10.3872 1.49866 10.2299 1.49907H7.22992C7.06637 1.49053 6.90452 1.53576 6.7691 1.62785C6.63367 1.71994 6.53211 1.85383 6.47992 2.00907L6.05992 3.38157C6.00142 3.55518 5.8814 3.70138 5.72251 3.79257C5.56361 3.88376 5.37683 3.91364 5.19742 3.87657L3.74992 3.59157C3.60334 3.57085 3.4539 3.59398 3.32043 3.65805C3.18697 3.72211 3.07545 3.82424 2.99992 3.95157L1.49992 6.54657C1.41829 6.68205 1.38159 6.83988 1.39506 6.99748C1.40853 7.15509 1.47148 7.3044 1.57492 7.42407L2.52742 8.50407C2.64766 8.64093 2.71397 8.81689 2.71397 8.99907C2.71397 9.18125 2.64766 9.3572 2.52742 9.49407L1.57492 10.5741C1.47148 10.6937 1.40853 10.843 1.39506 11.0006C1.38159 11.1583 1.41829 11.3161 1.49992 11.4516L2.99992 14.0466C3.07875 14.1834 3.19876 14.2919 3.34286 14.3566C3.48696 14.4212 3.64779 14.4387 3.80242 14.4066L5.21242 14.1216C5.39183 14.0845 5.57861 14.1144 5.73751 14.2056C5.8964 14.2968 6.01642 14.443 6.07492 14.6166L6.53242 15.9891C6.58461 16.1443 6.68617 16.2782 6.8216 16.3703C6.95702 16.4624 7.11887 16.5076 7.28242 16.4991H10.2824C10.4397 16.4995 10.593 16.4505 10.7209 16.3589C10.8487 16.2674 10.9446 16.138 10.9949 15.9891L11.4524 14.6166C11.5109 14.443 11.6309 14.2968 11.7898 14.2056C11.9487 14.1144 12.1355 14.0845 12.3149 14.1216L13.7249 14.4066C13.8796 14.4387 14.0404 14.4212 14.1845 14.3566C14.3286 14.2919 14.4486 14.1834 14.5274 14.0466L16.0274 11.4516C16.1071 11.3146 16.1412 11.1558 16.1251 10.9982C16.1089 10.8405 16.0432 10.6921 15.9374 10.5741L14.9249 9.49407ZM13.8074 10.4991L14.4074 11.1741L13.4474 12.8391L12.5624 12.6591C12.0223 12.5486 11.4604 12.6404 10.9834 12.9169C10.5064 13.1934 10.1475 13.6354 9.97492 14.1591L9.68992 14.9991H7.76992L7.49992 14.1441C7.32731 13.6204 6.96846 13.1784 6.49148 12.9019C6.01449 12.6254 5.45259 12.5337 4.91242 12.6441L4.02742 12.8241L3.05242 11.1666L3.65242 10.4916C4.02139 10.0791 4.22537 9.54502 4.22537 8.99157C4.22537 8.43812 4.02139 7.90408 3.65242 7.49157L3.05242 6.81657L4.01242 5.16657L4.89742 5.34657C5.43759 5.45698 5.99949 5.36523 6.47647 5.08872C6.95346 4.8122 7.31231 4.37019 7.48492 3.84657L7.76992 2.99907H9.68992L9.97492 3.85407C10.1475 4.37769 10.5064 4.8197 10.9834 5.09622C11.4604 5.37273 12.0223 5.46448 12.5624 5.35407L13.4474 5.17407L14.4074 6.83907L13.8074 7.51407C13.4426 7.92564 13.2411 8.45658 13.2411 9.00657C13.2411 9.55656 13.4426 10.0875 13.8074 10.4991ZM8.72992 5.99907C8.13658 5.99907 7.55656 6.17501 7.06321 6.50466C6.56986 6.8343 6.18535 7.30284 5.95828 7.85102C5.73122 8.39919 5.67181 9.0024 5.78757 9.58434C5.90332 10.1663 6.18904 10.7008 6.6086 11.1204C7.02816 11.5399 7.56271 11.8257 8.14465 11.9414C8.72659 12.0572 9.32979 11.9978 9.87797 11.7707C10.4261 11.5436 10.8947 11.1591 11.2243 10.6658C11.554 10.1724 11.7299 9.59241 11.7299 8.99907C11.7299 8.20342 11.4139 7.44036 10.8512 6.87775C10.2886 6.31514 9.52557 5.99907 8.72992 5.99907ZM8.72992 10.4991C8.43325 10.4991 8.14324 10.4111 7.89657 10.2463C7.64989 10.0814 7.45763 9.84718 7.3441 9.57309C7.23057 9.299 7.20087 8.9974 7.25874 8.70643C7.31662 8.41546 7.45948 8.14819 7.66926 7.93841C7.87904 7.72863 8.14632 7.58577 8.43729 7.52789C8.72826 7.47001 9.02986 7.49972 9.30395 7.61325C9.57804 7.72678 9.8123 7.91904 9.97713 8.16571C10.1419 8.41239 10.2299 8.70239 10.2299 8.99907C10.2299 9.39689 10.0719 9.77842 9.79058 10.0597C9.50928 10.341 9.12775 10.4991 8.72992 10.4991Z" fill="#333333"/>
</svg>

export const logOutIcon = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.7125 0.505859H9.53433C8.80308 0.505859 8.18433 1.12461 8.18433 1.85586V3.79648C8.18433 4.13398 8.46558 4.41523 8.80308 4.41523C9.14058 4.41523 9.44995 4.13398 9.44995 3.79648V1.82773C9.44995 1.77148 9.47808 1.74336 9.53433 1.74336H12.7125C13.3875 1.74336 13.9218 2.27773 13.9218 2.95273V15.0184C13.9218 15.6934 13.3875 16.2277 12.7125 16.2277H9.53433C9.47808 16.2277 9.44995 16.1996 9.44995 16.1434V14.2027C9.44995 13.8652 9.1687 13.584 8.80308 13.584C8.43745 13.584 8.18433 13.8652 8.18433 14.2027V16.1434C8.18433 16.8746 8.80308 17.4934 9.53433 17.4934H12.7125C14.0906 17.4934 15.1875 16.3684 15.1875 15.0184V2.98086C15.1875 1.60273 14.0625 0.505859 12.7125 0.505859Z" fill="#333333"/>
<path d="M10.4343 8.54883L7.62183 5.68008C7.3687 5.42695 6.97495 5.42695 6.72183 5.68008C6.4687 5.9332 6.4687 6.32695 6.72183 6.58008L8.46558 8.35195H3.45933C3.12183 8.35195 2.84058 8.6332 2.84058 8.9707C2.84058 9.3082 3.12183 9.58945 3.45933 9.58945H8.4937L6.72183 11.3895C6.4687 11.6426 6.4687 12.0363 6.72183 12.2895C6.83433 12.402 7.00308 12.4582 7.17183 12.4582C7.34058 12.4582 7.50933 12.402 7.62183 12.2613L10.4343 9.39258C10.6875 9.1957 10.6875 8.80195 10.4343 8.54883Z" fill="#333333"/>
</svg>
