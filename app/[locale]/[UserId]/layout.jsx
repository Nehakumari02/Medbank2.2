"use client";
import LoadingScreen from "@/components/Common/LoadingScreen";
// import { useAutomationContext } from "@/components/CreateAutomations/automationContext";
// import TemplateContainer from "@/components/CreateAutomations/templateContainer";/
import { useSidebarContext } from "@/contexts/SidebarContext";
import { useState } from "react";
import { ModalProvider } from "@/contexts/ModalContext";
import Modal from "@/components/Common/Modal";
// import { useBanner } from "@/contexts/BannerContext";
import Sidebar from "../../../components/UserDashboard/Sidebar";
import TopNav from "../../../components/UserDashboard/TopNav";
import MobileBottomNav from "../../../components/UserDashboard/MobileBottomNav"
import { OrderProvider } from "@/contexts/OrderContext";

export default function Layout({ children, params }) {
    const [isLoading, setIsLoading] = useState(false);
    const [hasPermission, setHasPermission] = useState(true);
    const { sidebarVisibility, setSidebarVisibility, setUsersVisibility } =
        useSidebarContext();
    // const { banner } = useBanner();
    const banner = {
        visible: false
    }
    const handleDrawerToggle = () => {
        setSidebarVisibility(true);
    };
    const handleContainerToggle = () => {
        setUsersVisibility(false);
        setSidebarVisibility(false);
    };
    // const { templateOpen, templateData } = useAutomationContext();

    return (
        <OrderProvider>
            <ModalProvider>
                <div className="relative"  id='highlight-step-1'>
                    <div className="absolute right-0 top-0 h-[100vh] w-[100vw]">
                        <Modal />
                    </div>
                    <div>
                        <div className="relative">
                            <div>
                                <div
                                    className={`${banner.visible ? "" : "hidden"} relative flex h-[5vh] items-center justify-center bg-[#FFEBEB] hover:bg-[#ffdede]`}
                                >
                                    <span className="mr-4 flex items-center justify-center gap-2 font-sf-pro-display text-[16px] font-semibold text-[#B52426]">
                                        {banner.text}
                                    </span>
                                </div>
                                <div
                                    className={`md:flex ${hasPermission ? (banner.visible ? "h-[95vh]" : "h-screen") : banner.visible ? "h-[90vh]" : "h-[95vh]"}`}
                                >
                                    <div
                                        className={`hidden md:block ${sidebarVisibility ? "w-[228px]" : "w-[130px]"} ${hasPermission ? (banner.visible ? "h-[95vh]" : "h-screen") : banner.visible ? "h-[90vh]" : "h-[95vh]"}`}
                                        onMouseEnter={handleDrawerToggle}
                                    >
                                        <Sidebar
                                            instagram_id={params.instagram_id}
                                            setIsLoading={setIsLoading}
                                            setHasPermission={setHasPermission}
                                        />
                                    </div>
                                    <div
                                        // className={`w-full overflow-y-scroll ${hasPermission ? (banner.visible ? "h-[95vh]" : "h-screen") : banner.visible ? "h-[90vh]" : "h-[95vh]"}`}
                                        className="w-full h-screen overflow-y-scroll"
                                        onMouseEnter={handleContainerToggle}
                                    >
                                        <div className="">
                                            <TopNav />
                                        </div>
                                        {isLoading ? <LoadingScreen /> : <div className="h-[calc(100dvh-166px)] md:h-[calc(100vh-104px)] md:bg-[#F7F9FB] overflow-y-scroll"> {children}</div>}
                                        <div className="md:hidden">
                                            <MobileBottomNav/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div
                                className={`absolute left-0 top-0 ${templateOpen ? "" : "hidden"}`}
                            >
                                <TemplateContainer
                                    templateData={templateData}
                                    visibility={templateOpen}
                                />
                            </div> */}
                        </div>
                    </div>
                </div>
            </ModalProvider>
        </OrderProvider>
    );
}

// const nextArrow = (
//     <svg
//         width="24"
//         height="24"
//         viewBox="0 0 25 24"
//         fill="#B52426"
//         xmlns="http://www.w3.org/2000/svg"
//     >
//         <path
//             d="M13.1008 12L9.20078 8.1C9.01745 7.91667 8.92578 7.68334 8.92578 7.4C8.92578 7.11667 9.01745 6.88334 9.20078 6.7C9.38411 6.51667 9.61745 6.425 9.90078 6.425C10.1841 6.425 10.4174 6.51667 10.6008 6.7L15.2008 11.3C15.3008 11.4 15.3716 11.5083 15.4133 11.625C15.4549 11.7417 15.4758 11.8667 15.4758 12C15.4758 12.1333 15.4549 12.2583 15.4133 12.375C15.3716 12.4917 15.3008 12.6 15.2008 12.7L10.6008 17.3C10.4174 17.4833 10.1841 17.575 9.90078 17.575C9.61745 17.575 9.38411 17.4833 9.20078 17.3C9.01745 17.1167 8.92578 16.8833 8.92578 16.6C8.92578 16.3167 9.01745 16.0833 9.20078 15.9L13.1008 12Z"
//             fill="#B52426"
//         />
//     </svg>
// );
