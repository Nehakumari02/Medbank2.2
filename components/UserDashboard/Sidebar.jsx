"use client"
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../public/Images/Home/logo.png";
import { dashboardIcon, dashboardSelectedIcon, newOrderIcon, newOrderSelectedIcon, ordersIcon, ordersSelectedIcon, chatsIcon, chatsSelectedIcon, paymentsIcon, paymentsSelectedIcon, archiveIcon, archiveSelectedIcon, settingsIcon, settingSelectedIcon, logOutIcon } from './Icons'
import { usePathname, useRouter } from "next/navigation";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { useTranslations } from "next-intl";
import { toast } from '@/hooks/use-toast';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Sidebar = ({ newMessage }) => {
  const [profilePicture, setProfilePicture] = useState('');
  const router = useRouter();
  const { sidebarVisibility } = useSidebarContext();
  const path = usePathname().split("/")[3];
  const pathToRedirect = usePathname().split("/").slice(2).join("/");
  const language = usePathname().split("/")[1];
  const userIdDB = usePathname().split("/")[2];
  const [disabled, setDisabled] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for the popup

  const t = useTranslations("UserSideBar");

  const handleNewOrder = async () => {
    try {
      setShowPopup(false)
      setDisabled(true);
      const response = await fetch('/api/newOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userIdDB }),
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
    } catch (error) {
      console.log(error)
    } finally {
      setDisabled(false);
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

  const handleMenuItemClick = async (menuPath) => {
    if (menuPath === "NewOrder") {
      setShowPopup(true);
    }
    else {
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
    <div className={`${sidebarVisibility ? "w-[228px]" : "w-[130px]"} h-full flex flex-col py-[35px] px-[25px] items-center gap-[57px] text-[#333333] border-r-[1px] border-[#3333331A]`}>
      <div className="w-[80px] h-[80px]">
        <Image src={Logo} alt="Logo" className="h-[80px] w-[80px]"></Image>
      </div>
      <div className={`h-full flex flex-col items-center justify-between ${sidebarVisibility ? "w-[168px]" : "w-[43px]"}`}>
        <div className={`flex flex-col ${sidebarVisibility ? "items-start" : "items-center"} w-full gap-[4px]`}>
          {menuItems.map((item) => (
            <button
              key={item.text}
              disabled={disabled}
              onClick={() => handleMenuItemClick(item.path)}
              className={`h-[40px] w-full relative flex items-center justify-start gap-[10px] py-[8px] pr-[12px] pl-[12px] ${disabled && item.path == "NewOrder" ? "opacity-75" : ""} ${path == item.path ? "border-l-[1px] border-[#3E8DA7] rounded-[3px] bg-[#E8F3FE]" : ""}`}
            >
              {path == item.path ? item.selectedIcon : item.icon}
              {item.path == "Chats" && <div
                className={`absolute top-[8px] left-[14px] dot ${newMessage ? "bg-green-500" : "bg-gray-400"}`}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  marginLeft: "8px"
                }}
              />}
              <span className={`font-DM-Sans font-normal text-[16px] leading-[24px] ${path == item.path ? "text-[#3E8DA7]" : ""} ${sidebarVisibility ? "" : "hidden"}`}>{item.text}</span>
            </button>
          ))}
        </div>
        <div className={`flex flex-col ${sidebarVisibility ? "items-start" : "items-center"} justify-between w-full gap-[16px]`}>
          <button
            onClick={() => router.push(`/${language}/${userIdDB}/Settings`)}
            className={`h-[40px] w-full flex items-center justify-start gap-[10px] py-[8px] pr-[12px] pl-[12px] ${path == "Settings" ? "border-l-[1px] border-[#3E8DA7] rounded-[3px] bg-[#E8F3FE]" : ""}`}
          >
            {path == "Settings" ? settingSelectedIcon : settingsIcon}
            <span className={`font-DM-Sans font-normal text-[16px] leading-[24px] ${path == "Settings" ? "text-[#3E8DA7]" : ""} ${sidebarVisibility ? "" : "hidden"}`}>{t("settings")}</span>
          </button>
          <button
            onClick={() => router.push(`/${language}/${userIdDB}/Logout`)}
            className={`h-[40px] w-full flex items-center justify-start gap-[10px] py-[8px] pr-[12px] pl-[12px]`}
          >
            {logOutIcon}
            <span className={`font-DM-Sans font-normal text-[16px] leading-[24px] ${sidebarVisibility ? "" : "hidden"}`}>{t("logout")}</span>
          </button>
        </div>
      </div>
       {/* Popup Markup */}
       {showPopup && (
        <div className='text-[#333333] mb-[14px] flex flex-col justify-between h-full'>

          <div className='fixed top-0 left-0 backdrop-blur-[1px] flex items-center justify-center w-[100vw] h-[100vh] bg-[#00000066]'>
            <div className=' w-[298px] h-[221px] md:h-[278px] md:w-[445px] p-[24px] md:p-[10px] flex flex-col gap-[24px] items-center justify-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
              <div className='flex flex-col gap-[24px]'>
                {/* <span className='font-DM-Sans text-center font-bold md:text-[32px] md:leading-[40px] text-[#333333]'>Confirm New Order</span> */}
                <span className='font-DM-Sans text-center font-normal md:text-[20px] md:leading-[34px] text-[#333333]'>{t("Msg1")}</span>
              </div>
              <div className='flex items-center justify-center gap-[12px]'>
                <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={() => { setShowPopup(false) }}>{t("no")}</button>
                <button disabled={disabled} className={`${disabled ? "opacity-75" : ""} h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]`} onClick={handleNewOrder}>{t("yes")}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;