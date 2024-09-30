"use client"

import React, { useState } from 'react'
import Logo from '../../../public/Images/Home/logo.png'
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {signIn, useSession} from 'next-auth/react';
import { toast } from '@/hooks/use-toast';

const SignInPage = () => {
  const pathToRedirect = usePathname().split("/").slice(2).join("/");
  const language = usePathname().split("/")[1];
  const router = useRouter();
  const t = useTranslations("SignIn");
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const {data:session} = useSession();
  // console.log(session)

  const handleChange = (e) => {
    setEmail(e.target.value);
    // handleVerifyEmail(e);
  }

  const handleBackClick = () => {
    router.back();
  };

  const handleVerifyEmail = (e) => {
    const email = e.target.value;
    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;

    const isValidEmail = emailPattern.test(email);
    setEmailError(!isValidEmail);

    if (email === "")
      setEmailError(false);
  }

  const updateLanguage = (newLanguage) => {
    const newPath = `/${newLanguage}/${pathToRedirect}`;
    router.push(newPath);
  };

  const handleLogin =  async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials",{
        email,password,redirect:false
      })

      console.log(res)
      if(res.error){
        toast({
          variant:'error',
          title:'Error',
          description:"Password incorrect"
        })
        return;
      }
      if(res.ok){
        toast({
          variant:"success",
          title:"Success",
          description:"login Successfull..."
        })
        router.push(`/${language}/${session.user.id}/Dashboard`)
      }
    } catch (error) {
      toast({
        variant:'error',
        title:'Error',
        description:'Something went wrong please try again'
      })
    }

    // const response = await fetch('/api/signin', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({email,password}),
    // });
    // const data = await response.json();
    // console.log(data.message)
    // if(response.status==200){
    //   router.push(`/${language}/42397/Dashboard`)
    // }
    
  }

  return (
    <div className='h-screen w-full p-[12px] flex items-center justify-center text-[#333333]'>
      <div className='m-[12px] max-w-[971px] w-full flex flex-col justify-between gap-[18px] md:gap-[24px] border-[1px] p-[12px] md:p-[40px] border-[#333333] border-opacity-25 rounded-xl'>
        <div className='w-full pb-[10px] flex items-center justify-between border-b-[1px] border-opacity-25 border-[#333333]'>
          <div className='flex items-start justify-center gap-[8px] font-DM-Sans font-normal text-[18px] leading-[24px] tracking-tracking-0.5'> <button onClick={handleBackClick} className='flex items-center justify-center gap-[8px]'> {backIcon} {t("back")}</button> </div>
          <div className='flex items-center justify-center gap-[10px] w-[67px]'>
            <button onClick={() => updateLanguage("jn")} >
              <span className={`${language == "jn" ? "border-b-[2px] border-[#003E5C99] text-black" : "text-[#333333]"} font-sans font-normal pb-[4px]`}>JN</span>
            </button>
            <div className='border-r-[2px] h-[20px] border-black'></div>
            <button onClick={() => updateLanguage("en")} >
              <span className={`${language == "en" ? "border-b-[2px] border-[#003E5C99] text-black" : "text-[#333333]"} font-sans font-normal pb-[4px]`}>EN</span>
            </button>
          </div>
        </div>
        <div className='w-full h-full flex justify-between md:flex-row flex-col gap-[18px] md:gap-0'>
          <div className='font-DM-Sans w-full md:w-[309px] text-[#333333] flex flex-col items-center md:items-start gap-[12px] md:gap-[24px]'>
            <Image src={Logo} alt='Logo' className='h-[80px] w-[80px]'></Image>
            <div className='flex flex-col items-start gap-[8px]'>
              <span className='font-bold text-center md:text-left w-full text-[20px] md:text-[40px] leading-[26px] md:leading-[40px]'>{t("title")}</span>
              <span className='font-normal text-center md:text-left w-full text-[14px] md:text-[18px] leading-[18px] md:leading-[24px]'>{t("subTitle")}</span>
            </div>
          </div>
          <div className='flex md:items-end w-full md:w-[527px] md:mt-[104px]'>
            <div className='w-full flex flex-col gap-[12px]'>
              <div className='w-full flex flex-col gap-[10px] md:gap-[20px]'>
                <div className="group w-full h-[38px] md:h-[50px] flex items-center justify-center flex-col">
                  <div className={`w-full rounded-[7px] ${emailError ? "bg-red-600" : "bg-gray-200"} ${emailError ? "group-focus-within:bg-red-600" : "group-focus-within:gradient-primary"}`} >
                    <input className="w-full p-[10px] md:p-[12px] outline-none rounded-[7px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                      placeholder={t('email')}
                      value={email}
                      onChange={handleChange}
                      onBlur={handleVerifyEmail}
                      type="email"
                      name="email"
                      style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                    />
                  </div>
                </div>
                <div className="group w-full h-[38px] md:h-[50px] flex items-center justify-center flex-col">
                  <div className={`w-full relative rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                    <input className="w-full p-[10px] md:p-[12px] outline-none rounded-[7px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                      placeholder={t('password')}
                      value={password}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleLogin()
                        }
                      }}
                      type={passwordVisibility ? "text" : "password"}
                      name="password"
                      onChange={(e) => { setPassword(e.target.value) }}
                      style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                    />
                    <button className='absolute top-[11px] md:top-[18px] right-[12px]' onClick={() => setPasswordVisibility(!passwordVisibility)}>{passwordVisibility ? hiddenPasswordIcon : showPasswrodIcon}</button>
                  </div>
                </div>
              </div>

              <p className='w-full m-0'><Link href={`/${language}/ForgotPassword`} className='font-DM-Sans font-normal text-[10px] md:text-[16px] leading-[20px] text-[#3E8DA7]'>{t('forgotPassword')}</Link></p>

              <div className='flex flex-col gap-[6px] md:gap-[16px]'>
                <p className='m-0 font-DM-Sans font-normal text-[8px] md:text-[14px] leading-[20px]'>
                  {t.rich('acknowledgement', {
                    personalInfo: (chunks) => <Link className='text-[#3E8DA7] underline underline-offset-2' href={`/${language}/Personal-Information`}>{chunks}</Link>,
                    cancellationPolicy: (chunks) => <Link className='text-[#3E8DA7] underline underline-offset-2' href={`/${language}/CancellationPolicy`}>{chunks}</Link>,
                    sitePolicy: (chunks) => <Link className='text-[#3E8DA7] underline underline-offset-2' href={`/${language}/SitePolicy`}>{chunks}</Link>,
                    privacyPolicy: (chunks) => <Link className='text-[#3E8DA7] underline underline-offset-2' href={`/${language}/PrivacyPolicy`}>{chunks}</Link>,
                  })}
                </p>
                <button type="submit" onClick={handleLogin} className='h-[38px] md:h-[50px] rounded-[6px] md:flex items-center justify-center [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-bold text-[18px] leading-[24px] '>{t('login')}</button>
              </div>

              <p className='m-0 text-center font-DM-Sans font-normal text-[12px] md:text-[14px] leading-[20px] pt-[18px] md:pt-[28px]'>
                {t.rich("signInText", {
                  Link: (chunks) => <Link className='text-[#3E8DA7]' href={`/${language}/Signup`}>{chunks}</Link>
                })}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignInPage


const backIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.25 11.25H20.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75H5.25C5.05109 12.75 4.86032 12.671 4.71967 12.5303C4.57902 12.3897 4.5 12.1989 4.5 12C4.5 11.8011 4.57902 11.6103 4.71967 11.4697C4.86032 11.329 5.05109 11.25 5.25 11.25Z" fill="#333333" />
  <path d="M5.56184 12.0009L11.7823 18.2199C11.9232 18.3608 12.0023 18.5518 12.0023 18.7509C12.0023 18.9501 11.9232 19.1411 11.7823 19.2819C11.6415 19.4228 11.4505 19.5019 11.2513 19.5019C11.0522 19.5019 10.8612 19.4228 10.7203 19.2819L3.97034 12.5319C3.9005 12.4623 3.84508 12.3795 3.80727 12.2884C3.76946 12.1973 3.75 12.0996 3.75 12.0009C3.75 11.9023 3.76946 11.8046 3.80727 11.7135C3.84508 11.6224 3.9005 11.5396 3.97034 11.4699L10.7203 4.71995C10.8612 4.57912 11.0522 4.5 11.2513 4.5C11.4505 4.5 11.6415 4.57912 11.7823 4.71995C11.9232 4.86078 12.0023 5.05178 12.0023 5.25095C12.0023 5.45011 11.9232 5.64112 11.7823 5.78195L5.56184 12.0009Z" fill="#333333" />
</svg>

const hiddenPasswordIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.0013 6C7.47087 6 6.96216 6.21071 6.58709 6.58579C6.21201 6.96086 6.0013 7.46957 6.0013 8C6.0013 8.53043 6.21201 9.03914 6.58709 9.41421C6.96216 9.78929 7.47087 10 8.0013 10C8.53173 10 9.04044 9.78929 9.41551 9.41421C9.79059 9.03914 10.0013 8.53043 10.0013 8C10.0013 7.46957 9.79059 6.96086 9.41551 6.58579C9.04044 6.21071 8.53173 6 8.0013 6ZM8.0013 11.3333C7.11725 11.3333 6.2694 10.9821 5.64428 10.357C5.01916 9.7319 4.66797 8.88406 4.66797 8C4.66797 7.11595 5.01916 6.2681 5.64428 5.64298C6.2694 5.01786 7.11725 4.66667 8.0013 4.66667C8.88536 4.66667 9.7332 5.01786 10.3583 5.64298C10.9834 6.2681 11.3346 7.11595 11.3346 8C11.3346 8.88406 10.9834 9.7319 10.3583 10.357C9.7332 10.9821 8.88536 11.3333 8.0013 11.3333ZM8.0013 3C4.66797 3 1.8213 5.07333 0.667969 8C1.8213 10.9267 4.66797 13 8.0013 13C11.3346 13 14.1813 10.9267 15.3346 8C14.1813 5.07333 11.3346 3 8.0013 3Z" fill="#D9D9D9" />
</svg>

const showPasswrodIcon = <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.55527 8.257L1.74927 13.0617C1.68777 13.1253 1.61421 13.1761 1.53287 13.2111C1.45154 13.246 1.36406 13.2644 1.27554 13.2652C1.18702 13.2659 1.09923 13.2491 1.0173 13.2155C0.935371 13.182 0.860936 13.1325 0.798341 13.0699C0.735746 13.0073 0.686244 12.9329 0.652723 12.851C0.619202 12.769 0.602335 12.6812 0.603104 12.5927C0.603873 12.5042 0.622264 12.4167 0.657203 12.3354C0.692143 12.2541 0.742931 12.1805 0.806604 12.119L5.68927 7.23633C5.65126 7.02466 5.66502 6.80693 5.72936 6.60173C5.79371 6.39652 5.90674 6.20993 6.0588 6.05786C6.21087 5.90579 6.39747 5.79277 6.60267 5.72842C6.80788 5.66407 7.0256 5.65032 7.23727 5.68833L12.1219 0.804329C12.2477 0.68289 12.4161 0.615694 12.5909 0.617213C12.7657 0.618732 12.9329 0.688844 13.0565 0.81245C13.1801 0.936055 13.2502 1.10326 13.2517 1.27806C13.2532 1.45286 13.186 1.62126 13.0646 1.747L8.25927 6.55366C8.34413 6.79138 8.35978 7.04829 8.30439 7.29455C8.249 7.5408 8.12484 7.76628 7.94637 7.94476C7.76789 8.12324 7.54241 8.24739 7.29616 8.30278C7.0499 8.35817 6.79298 8.34186 6.55527 8.257ZM11.5819 4.17233C12.8359 4.895 13.6693 5.89366 13.6693 7.00033C13.6693 9.20966 10.3639 10.9957 7.0026 11.0003C6.31858 11.0003 5.63644 10.9288 4.96727 10.787L6.20794 9.54699C6.67247 9.69216 7.16787 9.70742 7.64046 9.59114C8.11304 9.47486 8.5448 9.23146 8.88894 8.88733C9.23307 8.54319 9.47647 8.11143 9.59275 7.63885C9.70903 7.16626 9.69377 6.67086 9.5486 6.20633L11.5819 4.17233ZM8.8086 3.175L7.58594 4.39766C7.14727 4.29919 6.69083 4.31322 6.25904 4.43845C5.82725 4.56369 5.43414 4.79605 5.11623 5.11396C4.79833 5.43186 4.56596 5.82498 4.44073 6.25677C4.3155 6.68855 4.30146 7.145 4.39994 7.58366L2.2486 9.73366C1.09194 9.019 0.335938 8.05699 0.335938 7.00033C0.335938 4.791 3.6586 2.989 7.0026 3.00033C7.61194 3.00233 8.2206 3.063 8.8086 3.175Z" fill="#A8A6A6" />
</svg>
