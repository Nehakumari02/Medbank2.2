"use client"

import Image from 'next/image';
import Link from 'next/link';
import Logo from '../public/Images/Home/logo.png'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react';
import { useTranslations } from 'next-intl';


const Header = () => {
  const path = usePathname().split("/")[2];
  const pathToRedirect = usePathname().split("/").slice(2).join("/");
  const language = usePathname().split("/")[1];
  const router = useRouter();
  const [menu,setMenu] = useState(false);

  const t = useTranslations("Header");

  const updateLanguage = (newLanguage) => {
    // Create new URL with updated language
    const newPath = `/${newLanguage}/${pathToRedirect}`;
    
    // Redirect to the new URL
    router.push(newPath);
  };

  const handleMenu =()=>{
    setMenu(!menu);
  }
  return(
  <header className="h-[60px] md:h-[146px] bg-white shadow-md p-[32px] flex justify-between items-center gap-[10px] border-b-[0.5px]">
    <div className="flex items-center justify-center md:gap-[10px] lg:gap-[36px]">
    <Image src={Logo} alt='MedBankLogo' className='h-[40px] w-[38px] md:h-[78px] md:w-[82px]'>
    </Image>
    <nav className='hidden md:block'>
      <ul className="flex flex-wrap items-center justify-start gap-[12px] lg:gap-[38px] leading-[24px] pb-[2px] font-DM-Sans tracking-tracking-0.5 font-normal md:text-[14px] lg:text-[18px]">
        <li>
          <Link href={`/${language}/`} className={`${path===undefined?"border-b-[2px] border-[#003E5C99] font-medium":""}`}>{t("home")}</Link>
        </li>
        <li>
          <Link href={`/${language}/about`} className={`${path==="about"?"border-b-[2px] border-[#003E5C99] font-medium":""}`}>{t("about")}</Link>
        </li>
        <li>
          <Link href={`/${language}/Services`} className={`${path==="Services"?"border-b-[2px] border-[#003E5C99] font-medium":""}`}>{t("services")}</Link>
        </li>
        <li>
          <Link href={`/${language}/SampleShipping`} className={`${path==="SampleShipping"?"border-b-[2px] border-[#003E5C99] font-medium":""}`}>{t("sampleShipping")}</Link>
        </li>
        <li>
          <Link href={`/${language}/strength`} className={`${path==="strength"?"border-b-[2px] border-[#003E5C99] font-medium":""}`}>{t("strength")}</Link>
        </li>
        <li>
          <Link href={`/${language}/Orderflow`} className={`${path==="Orderflow"?"border-b-[2px] border-[#003E5C99] font-medium":""}`}>{t("orderFlow")}</Link>
        </li>
        <li>
          <Link href={`/${language}#contactus`} className={`${path==="contact"?"border-b-[2px] border-[#003E5C99] font-medium":""}`}>{t("contact")}</Link>
        </li>
      </ul>
    </nav>
    </div>
    <div className='font-DM-Sans relative flex items-center justify-center gap-[16px] text-[14px] lg:text-[18px] tracking-tracking-0.5'>
      {/* <div className='flex items-center justify-center gap-[10px] w-[67px]'>
        <button onClick={()=>setLanguage("JN")} > <span className={`${language=="JN"?"border-b-[2px] border-[#003E5C99] text-black":"text-[#333333]"} font-sans font-normal pb-[4px]`}>JN</span></button>
        <div className='border-r-[2px] h-[20px] border-black'></div>
        <button onClick={()=>setLanguage("EN")} > <span className={`${language=="EN"?"border-b-[2px] border-[#003E5C99] text-black":"text-[#333333]"} font-sans font-normal pb-[4px]`}>EN</span></button>
      </div> */}
      <div className='font-DM-Sans relative flex items-center justify-center gap-[16px] text-[14px] lg:text-[18px] tracking-tracking-0.5'>
        <div className='flex items-center justify-center gap-[10px] w-[67px]'>
          <button onClick={() => updateLanguage("jn")} >
            <span className={`${language == "jn" ? "border-b-[2px] border-[#003E5C99] text-black" : "text-[#333333]"} font-sans font-normal pb-[4px]`}>JN</span>
          </button>
          <div className='border-r-[2px] h-[20px] border-black'></div>
          <button onClick={() => updateLanguage("en")} >
            <span className={`${language == "en" ? "border-b-[2px] border-[#003E5C99] text-black" : "text-[#333333]"} font-sans font-normal pb-[4px]`}>EN</span>
          </button>
        </div>
          <Link href={`/${language}/Login`} className="hidden h-[40px] w-[108px] p-[1px] rounded-[6px] md:flex items-center justify-center gradient-primary border-[#60B7CF]">
          <div className='bg-white w-full h-full rounded-[5px] flex items-center justify-center'>
            <span className='gradient-primary bg-clip-text text-transparent'>Sign In</span>
          </div>
        </Link> 
        <Link href={`/${language}/Signup`} className="hidden h-[40px] w-[117px] rounded-[6px] md:flex items-center justify-center gradient-primary text-white">Sign Up</Link>
        <button onClick={() => handleMenu()} className='flex items-center justify-center md:hidden'>{hamBurgerIcon}</button>
        {menu && <div className='absolute right-0 z-10 top-[40px] w-[138px] bg-white p-[12px] shadow-md'>
          <ul className="flex flex-col items-start gap-[12px]">
            <li>
              <Link onClick={() => setMenu(false)} href={`/${language}/`} className={`${path === undefined ? "border-b-[2px] border-[#003E5C99] font-medium" : ""} px-[2px] leading-[24px] pb-[2px] font-sans font-normal text-[14px]`}>{t("home")}</Link>
            </li>
            <li>
              <Link onClick={() => setMenu(false)} href={`/${language}/about`} className={`${path === "about" ? "border-b-[2px] border-[#003E5C99] font-medium" : ""} px-[2px] leading-[24px] pb-[2px] font-sans font-normal text-[14px]`}>{t("about")}</Link>
            </li>
            <li>
              <Link onClick={() => setMenu(false)} href={`/${language}/Services`} className={`${path === "services" ? "border-b-[2px] border-[#003E5C99] font-medium" : ""} px-[2px] leading-[24px] pb-[2px] font-sans font-normal text-[14px]`}>{t("services")}</Link>
            </li>
            <li>
              <Link onClick={() => setMenu(false)} href={`/${language}/SampleShipping`} className={`${path === "sample-shipping" ? "border-b-[2px] border-[#003E5C99] font-medium" : ""} px-[2px] leading-[24px] pb-[2px] font-sans font-normal text-[14px]`}>{t("sampleShipping")}</Link>
            </li>
            <li>
              <Link onClick={() => setMenu(false)} href={`/${language}/strength`} className={`${path === "strength" ? "border-b-[2px] border-[#003E5C99] font-medium" : ""} px-[2px] leading-[24px] pb-[2px] font-sans font-normal text-[14px]`}>{t("strength")}</Link>
            </li>
            <li>
              <Link onClick={() => setMenu(false)} href={`/${language}/Orderflow`} className={`${path === "orderflow" ? "border-b-[2px] border-[#003E5C99] font-medium" : ""} px-[2px] leading-[24px] pb-[2px] font-sans font-normal text-[14px]`}>{t("orderFlow")}</Link>
            </li>
            <li>
              <Link onClick={() => setMenu(false)} href={`/${language}#contactus`} className={`${path === "contact" ? "border-b-[2px] border-[#003E5C99] font-medium" : ""} px-[2px] leading-[24px] pb-[2px] font-sans font-normal text-[14px]`}>{t("contact")}</Link>
            </li>
             <li>
              <Link onClick={() => setMenu(false)} href={`/${language}/Signup`} className={`${path === "signup" ? "border-b-[2px] border-[#003E5C99] font-medium" : ""} px-[2px] leading-[24px] pb-[2px] font-sans font-normal text-[14px]`}>Sign Up</Link>
            </li>
            <li>
              <Link onClick={() => setMenu(false)} href={`/${language}/Login`} className={`${path === "login" ? "border-b-[2px] border-[#003E5C99] font-medium" : ""} px-[2px] leading-[24px] pb-[2px] font-sans font-normal text-[14px]`}>Sign In</Link>
            </li>
          </ul>
        </div>}
      </div>

      </div>
    </header>
  );
}

export default Header;

const hamBurgerIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.75 6H20.25M3.75 12H20.25M3.75 18H20.25" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
