"use client"
import Image from "next/image";
import React, { useState } from "react";
import {dashboardIcon,dashboardSelectedIcon,newOrderIcon,newOrderSelectedIcon,ordersIcon,ordersSelectedIcon,chatsIcon,chatsSelectedIcon,paymentsIcon,paymentsSelectedIcon,archiveIcon,archiveSelectedIcon,settingsIcon,settingSelectedIcon,logOutIcon} from './Icons'
import { usePathname, useRouter } from "next/navigation";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { useTranslations } from "next-intl";

const MobileBottomNav = ({hasNewMessages,newMessagesCount}) => {
  const [profilePicture, setProfilePicture] = useState('');
  const router = useRouter();
  const path = usePathname().split("/")[3];
  const pathToRedirect = usePathname().split("/").slice(2).join("/");
  const language = usePathname().split("/")[1];

  const t = useTranslations("UserSideBar");

  const menuItems = [
    {
      text: t("dashboard"),
      icon: dashboardIcon,
      selectedIcon: dashboardSelectedIcon,
      path: "Dashboard",
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
  return (
    <div className={`w-full flex px-[6px] py-[8px] items-center text-[#333333] border-r-[1px] border-[#3333331A]`}>
      
      <div className={`h-full w-full flex items-center justify-between`}>
        <div className={`flex items-center justify-between w-full `}>
          {menuItems.map((item) => (
            <button
              key={item.text}
              onClick={() => router.push(`/${language}/Admin_Restricted/${item.path}`)}
              className={`h-[40px] relative flex flex-col items-center justify-between`}
            >
              {path==item.path?item.selectedIcon:item.icon}
              {item.path=="Chats"&&<div
                  className={`absolute top-[0px] left-[10px] flex items-center justify-center text-xs text-white font-bold ${
                    hasNewMessages ? "bg-green-500" : "bg-gray-400"
                  }`}
                  style={{
                    width: hasNewMessages ? "20px" : "10px",
                    height: hasNewMessages ? "20px" : "10px",
                    borderRadius: "50%",
                    marginLeft: "8px",
                  }}
                >
                  {hasNewMessages && newMessagesCount > 0 ? newMessagesCount : ""}
                </div>}
              <span className={`font-DM-Sans font-normal text-[12px] leading-[16px] ${path==item.path?"text-[#3E8DA7]":""}`}>{item.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileBottomNav;