"use client"
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../public/Images/Home/logo.png";
import {dashboardIcon,dashboardSelectedIcon,newOrderIcon,newOrderSelectedIcon,ordersIcon,ordersSelectedIcon,chatsIcon,chatsSelectedIcon,paymentsIcon,paymentsSelectedIcon,archiveIcon,archiveSelectedIcon,settingsIcon,settingSelectedIcon,logOutIcon} from './Icons'
import { usePathname, useRouter } from "next/navigation";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { useTranslations } from "next-intl";
import { toast } from '@/hooks/use-toast';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Sidebar = ({newMessage}) => {
  const [profilePicture, setProfilePicture] = useState('');
  const router = useRouter();
  const {sidebarVisibility}=useSidebarContext();
  const path = usePathname().split("/")[3];
  const pathToRedirect = usePathname().split("/").slice(2).join("/");
  const language = usePathname().split("/")[1];
  const userIdDB = usePathname().split("/")[2];
  const [disabled, setDisabled] = useState(false);
  const [showNewOrderPopUp,setShowNewOrderPopUp] = useState(false);
  

  const t = useTranslations("UserSideBar");

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
        console.log("fill user details")
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

      // const body = document.querySelector("body");

      // body?.classList.add("page-transition");

      // await sleep(500);
      router.push(`/${language}/${userIdDB}/${data.data._id}/NewOrder`)
      // await sleep(500);

      // body?.classList.remove("page-transition");
      // router.push(`/${language}/${userIdDB}/${data.data._id}/NewOrder`)
    }catch(error){
      console.log(error)
    }finally{
      setDisabled(false);
      setShowNewOrderPopUp(false);
    }
  }

  const menuItems = [
    {
      text: t("dashboard"),
      icon: dashboardIcon,
      selectedIcon: dashboardSelectedIcon,
      path: "Dashboard",
    },
    {
      text: t("newOrder"),
      icon: newOrderIcon,
      selectedIcon: newOrderSelectedIcon,
      path: "NewOrder",
    },
    {
      text: t("orders"),
      icon: ordersIcon,
      selectedIcon: ordersSelectedIcon,
      path: "Orders",
    },
    {
      text: t("chats"),
      icon: chatsIcon,
      selectedIcon: chatsSelectedIcon,
      path: "Chats",
    },
    {
      text: t("payments"),
      icon: paymentsIcon,
      selectedIcon: paymentsSelectedIcon,
      path: "Payments",
    },
    {
      text: t("archive"),
      icon: archiveIcon,
      selectedIcon: archiveSelectedIcon,
      path: "Archive",
    },
  ];

  const selected = true;

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  
  const handleMenuItemClick = async(menuPath)=>{
    if(menuPath==="NewOrder"){
      // handleNewOrder();
      setShowNewOrderPopUp(true);
    }
    else{
    // const body = document.querySelector("body");

    // body?.classList.add("page-transition");

    // await sleep(500);
    router.push(`/${language}/${userIdDB}/${menuPath}`)
    // await sleep(500);

    // body?.classList.remove("page-transition");
      // router.push(`/${language}/${userIdDB}/${menuPath}`)
    }
  }
  return (
    <div className={`${sidebarVisibility?"w-[228px]":"w-[130px]"} h-full flex flex-col py-[35px] px-[25px] items-center gap-[57px] text-[#333333] border-r-[1px] border-[#3333331A]`}>
      <div className="w-[80px] h-[80px]">
      <Image src={Logo} alt="Logo" className="h-[80px] w-[80px]"></Image>
      </div>
      <div className={`h-full flex flex-col items-center justify-between ${sidebarVisibility?"w-[168px]":"w-[43px]"}`}>
        <div className={`flex flex-col ${sidebarVisibility?"items-start":"items-center"} w-full gap-[4px]`}>
          {menuItems.map((item) => (
            <button
              key={item.text}
              disabled={disabled}
              onClick={()=>handleMenuItemClick(item.path)}
              className={`h-[40px] w-full relative flex items-center justify-start gap-[10px] py-[8px] pr-[12px] pl-[12px] ${disabled&&item.path=="NewOrder"?"opacity-75":""} ${path==item.path?"border-l-[1px] border-[#3E8DA7] rounded-[3px] bg-[#E8F3FE]":""}`}
            >
              {path==item.path?item.selectedIcon:item.icon}
              {item.path=="Chats"&&<div
                  className={`absolute top-[8px] left-[14px] dot ${newMessage ? "bg-green-500" : "bg-gray-400"}`}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    marginLeft: "8px"
                  }}
                />}
              <span className={`font-DM-Sans font-normal text-[16px] leading-[24px] ${path==item.path?"text-[#3E8DA7]":""} ${sidebarVisibility?"":"hidden"}`}>{item.text}</span>
            </button>
          ))}
        </div>
        <div className={`flex flex-col ${sidebarVisibility?"items-start":"items-center"} justify-between w-full gap-[16px]`}>
        <button
              onClick={() => router.push(`/${language}/${userIdDB}/Settings`)}
              className={`h-[40px] w-full flex items-center justify-start gap-[10px] py-[8px] pr-[12px] pl-[12px] ${path=="Settings"?"border-l-[1px] border-[#3E8DA7] rounded-[3px] bg-[#E8F3FE]":""}`}
            >
              {path=="Settings"?settingSelectedIcon:settingsIcon}
              <span className={`font-DM-Sans font-normal text-[16px] leading-[24px] ${path=="Settings"?"text-[#3E8DA7]":""} ${sidebarVisibility?"":"hidden"}`}>{t("settings")}</span>
            </button>
            <button
              onClick={() => router.push(`/${language}/${userIdDB}/Logout`)}
              className={`h-[40px] w-full flex items-center justify-start gap-[10px] py-[8px] pr-[12px] pl-[12px]`}
            >
              {logOutIcon}
              <span className={`font-DM-Sans font-normal text-[16px] leading-[24px] ${sidebarVisibility?"":"hidden"}`}>{t("logout")}</span>
            </button>
        </div>
      </div>
      {showNewOrderPopUp &&  <Dialog open={showNewOrderPopUp} onOpenChange={setShowNewOrderPopUp}>
          <DialogContent className="bg-white w-[90%] md:h-[180px]">
              <DialogHeader className="">
                <DialogTitle className='font-DM-Sans font-medium text-[18px] md:text-[24px]'>{language==="en"?"Would you like to place a new order?":"新規オーダーを作成しますか？"}</DialogTitle>
              </DialogHeader>
              <DialogFooter className='flex flex-row gap-[12px] items-end justify-end'>
                <Button className='h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]' onClick={()=>setShowNewOrderPopUp(false)} variant="ghost">{language==="en"?"NO":"いいえ"}</Button>
                <Button className={`${disabled?"opacity-75":""} h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]`} onClick={handleNewOrder} variant="outline">{language==="en"?"YES":"はい"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
      }
    </div>
  );
};

export default Sidebar;