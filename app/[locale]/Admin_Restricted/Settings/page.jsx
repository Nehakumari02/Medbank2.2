'use client'
import React, { useEffect, useState } from 'react'
import CountryDropDown from "../../../../components/CountryDropdown"
import { useTranslations } from 'next-intl'
import { useModal } from '@/contexts/ModalContext'
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [Username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [faculty, setFaculty] = useState("");
  const [field, setField] = useState("");
  const [others, setOthers] = useState("");
  const [service, setService] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [Perfecture, setPerfecture] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const t = useTranslations("Settings");
  const userId = "66ea96cbb87b8baa2f3a1117";

  const handleSave=async(e)=>{
    e.preventDefault();
    try{
    const response = await fetch('/api/updateUserDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Username,name,school,faculty,field,others,service, phone,email,confirmEmail,Perfecture,postalCode,city}),
    });
    const data = await response.json();
    console.log(data.message)
  }catch(error){
    console.log(error)
    toast({
      variant: "error",
      title: "Error",
      description: "Your details have'nt been updated, Please try again."
    });
  }
  finally{
    toast({
      variant: "success",
      title: "Success",
      description: "Your details have been updated."
    });
  }
  }
  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const data = await fetch('/api/fetchUserDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userId:userId}),
        });
        const UserData = await data.json();
        console.log("user",UserData)
        const user=UserData.user

        setUserName(user.Username || "");
        setName(user.name || "");
        console.log(name)
        setSchool(user.school || "");
        setFaculty(user.faculty || "");
        setField(user.field || "");
        setOthers(user.others || "");
        setService(user.service || "");
        setPhone(user.phone || "");
        setEmail(user.email || "");
        setConfirmEmail(user.email || "");
        setPerfecture(user.Perfecture || "");
        setPostalCode(user.postalCode || "");
        setCity(user.city || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(userId);
  }, []);



  return (
    <div className='w-[356px] h-[386px] md:w-[708px] md:h-[526px] flex flex-col items-center justify-center p-[12px] md:p-[36px] m-auto bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)] md:mt-9'>
      <div className='w-full text-[#333333]  text-[22px] font-DM-Sans leading-[28px] text-#333333 font-bold flex flex-col items-start'>
        {t("settings")}
      </div>
      <div className='text-[#333333] bg-white mx-[9px] my-[12px] md:my-[24px] md:border-[1px] rounded-[10px] flex flex-col w-[322px] h-[270px] md:w-[636px] md:h-[422px]'>
        <div className='flex flex-col md:border-r-[1px]'>
          <div className='md:px-[24px] md:py-[15px] w-full md:border-b-[1px] font-DM-Sans text-[14px] md:text-base font-normal leading-6'>
            {t("personalInfo.personalInfo")}
          </div>
          <div className='flex flex-col'>
            <div className='md:px-[24px] py-[12px] md:py-[29px] w-full flex flex-col gap-[6px] md:gap-[16px]'>
              <div className='md:flex  gap-[21px] '>
                <div className="flex flex-col pb-[12px]">
                  <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                    Full Name
                  </label>
                  <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                    <div className={`w-[322px] md:w-[279px] rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                      <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                        placeholder="David John"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                        type="text"
                        name="name"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                    {t("contactInfo.phone")}
                  </label>
                  <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                    <div className={`w-[322px] md:w-[279px] rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                      <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                        placeholder="+990 3343 7865"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                        type="text"
                        name="phone"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-[322px] md:w-[580px]">
                <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                  {t("contactInfo.email")}
                </label>
                <div className='group h-[35px] md:h-[46px] '>
                  <div className={`rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                    <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                      placeholder="devidjond45@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                      type="text"
                      name="email"
                    />
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-end gap-[10px] md:gap-[12px] pt-[12px] md:pt-11'>
                <button className='h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] '>{t("contactInfo.cancel")}</button>
                <button onClick={handleSave} className='h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]'>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

const plusIcon = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 9.75H9.75V15H8.25V9.75H3V8.25H8.25V3H9.75V8.25H15V9.75Z" fill="white" />
</svg>