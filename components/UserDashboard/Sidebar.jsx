"use client"
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../public/Images/Home/logo.png";
import {dashboardIcon,dashboardSelectedIcon,newOrderIcon,newOrderSelectedIcon,ordersIcon,ordersSelectedIcon,chatsIcon,chatsSelectedIcon,paymentsIcon,paymentsSelectedIcon,archiveIcon,archiveSelectedIcon,settingsIcon,settingSelectedIcon,logOutIcon} from './Icons'
import { usePathname, useRouter } from "next/navigation";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const router = useRouter();
  const {sidebarVisibility}=useSidebarContext();
  const path = usePathname().split("/")[3];
  const pathToRedirect = usePathname().split("/").slice(2).join("/");
  const language = usePathname().split("/")[1];
  const userIdDB = usePathname().split("/")[2];

  const t = useTranslations("UserSideBar");

  const handleNewOrder=async()=>{
    try{
      const response = await fetch('/api/newOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId:userIdDB}),
      });
      const data = await response.json();
      console.log(data.data,data.message)
      router.push(`/${language}/${userIdDB}/${data.data._id}/NewOrder`)
    }catch(error){
      console.log(error)
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
  
  const handleMenuItemClick =(menuPath)=>{
    if(menuPath==="NewOrder"){
      handleNewOrder();
    }
    else{
      router.push(`/${language}/${userIdDB}/${menuPath}`)
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
              onClick={()=>handleMenuItemClick(item.path)}
              className={`h-[40px] w-full flex items-center justify-start gap-[10px] py-[8px] pr-[12px] pl-[12px] ${path==item.path?"border-l-[1px] border-[#3E8DA7] rounded-[3px] bg-[#E8F3FE]":""}`}
            >
              {path==item.path?item.selectedIcon:item.icon}
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
    </div>
  );
};

export default Sidebar;