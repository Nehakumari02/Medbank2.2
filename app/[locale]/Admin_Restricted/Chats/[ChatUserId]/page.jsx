"use client";
import React, { useEffect, useRef, useState } from "react";
import { socket } from "@/socket";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Logo from "@/public/Images/Home/logo.png"
import Messages from "@/components/AdminDashboard/Chats/Messages";

const Chats = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [message, setMessage] = useState(""); // State for the input message
  const [messages, setMessages] = useState([]); // State for storing chat messages
  const emails=["test@gmail.com","test2@gmail.com"]
  const clientUserId = usePathname().split("/")[4]
  const [chatId,setChatId] = useState("");
  const conversationIdRef = useRef(""); // Use ref to persist conversationId
  const userIdDB = "66e055de6ddc7825fbd8a103";

  const generateRandomId = () => {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base-36
    const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
    return `${timestamp}-${randomString}`;
  };

  const router = useRouter();

  useEffect(() => {
    // const chatArray = createChatArray("user1", "user2", 10);
    // setMessages(chatArray);
    // {createChatArray("user1", "user2", 50)}
    // console.log("genertaed chat array",chatArray)

    const fetchMessages = async ()=>{
      try{
        const response = await fetch('/api/fetchMessages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userId:clientUserId}),
        });
        const data = await response.json();
        setChatId(data.conversationId)
        conversationIdRef.current = data.conversationId; // Persist conversationId
        setMessages(data.messages)
        console.log(data)
      }catch(error){
        console.log(error)
      }
    }

    fetchMessages();

    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    // Listen for incoming messages
    socket.on("chat message", (message) => {
      console.log(message)
      if(message.conversationId==conversationIdRef.current){
        setMessages((prevMessages) => {
          if(prevMessages.length)
            return [...prevMessages, message];
          else return [message];
        })
      }
    });

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat message"); // Clean up listener on component unmount
    };
  }, []);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async() => {
    if (message.trim()) {
      try {
        socket.emit("chat message", {
          id: generateRandomId(),
          senderId: userIdDB,
          text: message,
          conversationId: conversationIdRef.current,
          createdAt: new Date().toISOString()
        });

        setMessage(""); // Clear the input field after sending
        const response = await fetch('/api/sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId: userIdDB,
            conversationId: chatId,
            message,
          }),
        });

        const messageSendRes = await response.json();
        if (response.status==200) {
          // Send message to the server via socket after successful POST request
        
        } else {
          console.log("Error sending message:", data.error);
        }
      } catch (error) {
        console.log("Error sending message:", error);
      }
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="w-full h-full p-[13px] text-[#333333]">
      <div className="bg-white w-full h-full flex flex-col md:border-[1px] py-[20px] md:border-[#E2E8F0] md:rounded-md md:shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]">
        <div className="h-[52px] md:h-[66px] flex px-[5px] md:px-[40px] border-b-[1px] border-[#E2E8F0]">
          <div className="w-full flex justify-between">
          <div className='flex items-center h-[46px] gap-[4px] md:gap-[12px] font-DM-Sans font-normal text-[18px] leading-[24px] tracking-tracking-0.5'> 
            <button onClick={handleBackClick} className='flex items-center justify-center gap-[8px]'>
             {backIcon} 
            </button> 
            <div className="flex items-center md:items-start gap-[10px]">
              <Image src={Logo} alt="logo" className="h-[35px] md:h-[46px] w-[35px] md:w-[46px]"></Image>
              <div className="flex flex-col items-start justify-between">
                <span className="font-DM-Sans font-medium text-[14px] md:text-[16px] leading-[24px]">MedBank Team</span>
                <span className="font-DM-Sans font-medium text-[12px] md:text-[14px] leading-[22px] text-[#333333CC]">Online</span>
              </div>
            </div>
          </div>
          <div className="relative h-[40px] hidden md:block">
          <Input
            placeholder="Search"
            className="max-w-sm md:max-w-[360px] md:w-[360px] pr-[30px]"
          />
          <span className="absolute right-[0px] top-[50%] translate-y-[-50%]">{searchIcon}</span>
          </div>
          </div>
        </div>
        <div className="flex-grow flex flex-col px-[5px] md:px-[70px]">
          <div className="flex-grow overflow-auto h-[10px] md:px-4 py-2">
            <Messages messages={messages} userIdDB={userIdDB}/>
          </div>

          <div className="h-[54px] pb-[10px] flex items-center gap-[10px]">
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              value={message}
              onChange={handleChange}
              placeholder="Type your message"
              className="w-full h-[54px] bg-[#EFF4FB] outline-none px-3 rounded-md border-[1px] border-[#E2E8F0]"
            />
            <button onClick={handleSendMessage} className="h-[48px] w-[48px] p-[12.5px] rounded-md bg-[#3E8DA7]">{sendIcon}</button>
          </div>
        </div>
        <div className="h-[46px] pt-[10px] px-[5px] md:px-[70px] border-t-[1px] border-[#E2E8F0] mt-[10px] flex items-center justify-between">
          <div className="flex overflow-x-scroll items-center gap-[25px]">
            <span>Email CC -</span>
            {emails.map((email,index)=>{
              return(
                <span key={index} className="h-[36px] px-[10px] flex items-center gap-[4px] md:gap-[10px] bg-[#EFF4FB] rounded-md">{email}<button>{closeIcon}</button></span>
              )
            })}
          </div>
          <button>{editIcon}</button>
        </div>
      </div>
    </div>
  );
}

export default Chats;

const backIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.25 11.25H20.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75H5.25C5.05109 12.75 4.86032 12.671 4.71967 12.5303C4.57902 12.3897 4.5 12.1989 4.5 12C4.5 11.8011 4.57902 11.6103 4.71967 11.4697C4.86032 11.329 5.05109 11.25 5.25 11.25Z" fill="#333333" />
  <path d="M5.56184 12.0009L11.7823 18.2199C11.9232 18.3608 12.0023 18.5518 12.0023 18.7509C12.0023 18.9501 11.9232 19.1411 11.7823 19.2819C11.6415 19.4228 11.4505 19.5019 11.2513 19.5019C11.0522 19.5019 10.8612 19.4228 10.7203 19.2819L3.97034 12.5319C3.9005 12.4623 3.84508 12.3795 3.80727 12.2884C3.76946 12.1973 3.75 12.0996 3.75 12.0009C3.75 11.9023 3.76946 11.8046 3.80727 11.7135C3.84508 11.6224 3.9005 11.5396 3.97034 11.4699L10.7203 4.71995C10.8612 4.57912 11.0522 4.5 11.2513 4.5C11.4505 4.5 11.6415 4.57912 11.7823 4.71995C11.9232 4.86078 12.0023 5.05178 12.0023 5.25095C12.0023 5.45011 11.9232 5.64112 11.7823 5.78195L5.56184 12.0009Z" fill="#333333" />
</svg>

const searchIcon = <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_462_4366)">
<path fillRule="evenodd" clipRule="evenodd" d="M19.5993 17.9525L23.8968 22.25L22.7793 23.3675L18.4818 19.07C17.6793 19.6475 16.7118 20 15.6543 20C12.9618 20 10.7793 17.8175 10.7793 15.125C10.7793 12.4325 12.9618 10.25 15.6543 10.25C18.3468 10.25 20.5293 12.4325 20.5293 15.125C20.5293 16.1825 20.1768 17.15 19.5993 17.9525ZM15.6543 11.75C13.7868 11.75 12.2793 13.2575 12.2793 15.125C12.2793 16.9925 13.7868 18.5 15.6543 18.5C17.5218 18.5 19.0293 16.9925 19.0293 15.125C19.0293 13.2575 17.5218 11.75 15.6543 11.75Z" fill="#333333"/>
</g>
<defs>
<clipPath id="clip0_462_4366">
<rect x="0.529297" width="34" height="34" rx="17" fill="white"/>
</clipPath>
</defs>
</svg>

const attachmentIcon = <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_462_4333)">
<path fillRule="evenodd" clipRule="evenodd" d="M16.6826 2.97266C15.8864 2.97266 15.1228 3.28896 14.5597 3.85199L5.36974 13.042C4.43143 13.9803 3.9043 15.2529 3.9043 16.5799C3.9043 17.9069 4.43143 19.1795 5.36974 20.1178C6.30805 21.0561 7.58067 21.5832 8.90763 21.5832C10.2346 21.5832 11.5072 21.0561 12.4455 20.1178L21.6355 10.9278C22.026 10.5373 22.6592 10.5373 23.0497 10.9278C23.4403 11.3183 23.4403 11.9515 23.0497 12.342L13.8597 21.532C12.5464 22.8454 10.765 23.5832 8.90763 23.5832C7.05023 23.5832 5.26891 22.8454 3.95553 21.532C2.64215 20.2186 1.9043 18.4373 1.9043 16.5799C1.9043 14.7225 2.64215 12.9412 3.95553 11.6278L13.1455 2.43777C14.0836 1.49967 15.356 0.972656 16.6826 0.972656C18.0093 0.972656 19.2816 1.49967 20.2197 2.43777C21.1578 3.37587 21.6849 4.64821 21.6849 5.97488C21.6849 7.30155 21.1578 8.57389 20.2197 9.51199L11.0197 18.702C10.4569 19.2648 9.69358 19.581 8.89763 19.581C8.10169 19.581 7.33834 19.2648 6.77553 18.702C6.21271 18.1392 5.89652 17.3758 5.89652 16.5799C5.89652 15.7839 6.21271 15.0206 6.77553 14.4578L15.2659 5.97736C15.6567 5.58706 16.2899 5.58744 16.6802 5.97819C17.0704 6.36895 17.0701 7.00211 16.6793 7.39241L8.18974 15.872C8.00225 16.0597 7.89652 16.3146 7.89652 16.5799C7.89652 16.8454 8.00199 17.1 8.18974 17.2878C8.37748 17.4755 8.63212 17.581 8.89763 17.581C9.16314 17.581 9.41778 17.4755 9.60553 17.2878L18.8055 8.09778C19.3683 7.53479 19.6849 6.77094 19.6849 5.97488C19.6849 5.17864 19.3685 4.41501 18.8055 3.85199C18.2425 3.28896 17.4789 2.97266 16.6826 2.97266Z" fill="#333333"/>
</g>
<defs>
<clipPath id="clip0_462_4333">
<rect width="24" height="24" fill="white" transform="translate(0.902344 0.585938)"/>
</clipPath>
</defs>
</svg>

const sendIcon = <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.9023 2.29297L11.9023 13.293" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M22.9023 2.29297L15.9023 22.293L11.9023 13.293L2.90234 9.29297L22.9023 2.29297Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

const editIcon = <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_462_4326)">
<path d="M8 26.1538H32V28H8V26.1538ZM28.0571 10.4615C28.7429 9.72308 28.7429 8.61538 28.0571 7.87692L24.9714 4.55385C24.2857 3.81538 23.2571 3.81538 22.5714 4.55385L9.71429 18.4V24.3077H15.2L28.0571 10.4615ZM23.7714 5.84615L26.8571 9.16923L24.2857 11.9385L21.2 8.61538L23.7714 5.84615ZM11.4286 22.4615V19.1385L20 9.90769L23.0857 13.2308L14.5143 22.4615H11.4286Z" fill="#333333"/>
</g>
<defs>
<clipPath id="clip0_462_4326">
<rect width="32" height="32" fill="white"/>
</clipPath>
</defs>
</svg>

const closeIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.066 8.99502C16.1377 8.92587 16.1948 8.84314 16.2342 8.75165C16.2735 8.66017 16.2943 8.56176 16.2952 8.46218C16.2961 8.3626 16.2772 8.26383 16.2395 8.17164C16.2018 8.07945 16.1462 7.99568 16.0758 7.92523C16.0054 7.85478 15.9217 7.79905 15.8295 7.7613C15.7374 7.72354 15.6386 7.70452 15.5391 7.70534C15.4395 7.70616 15.341 7.7268 15.2495 7.76606C15.158 7.80532 15.0752 7.86242 15.006 7.93402L12 10.939L8.995 7.93402C8.92634 7.86033 8.84354 7.80123 8.75154 7.76024C8.65954 7.71925 8.56022 7.69721 8.45952 7.69543C8.35882 7.69365 8.25879 7.71218 8.1654 7.7499C8.07201 7.78762 7.98718 7.84376 7.91596 7.91498C7.84474 7.9862 7.7886 8.07103 7.75087 8.16442C7.71315 8.25781 7.69463 8.35784 7.69641 8.45854C7.69818 8.55925 7.72022 8.65856 7.76122 8.75056C7.80221 8.84256 7.86131 8.92536 7.935 8.99402L10.938 12L7.933 15.005C7.80052 15.1472 7.72839 15.3352 7.73182 15.5295C7.73525 15.7238 7.81396 15.9092 7.95138 16.0466C8.08879 16.1841 8.27417 16.2628 8.46847 16.2662C8.66278 16.2696 8.85082 16.1975 8.993 16.065L12 13.06L15.005 16.066C15.1472 16.1985 15.3352 16.2706 15.5295 16.2672C15.7238 16.2638 15.9092 16.1851 16.0466 16.0476C16.184 15.9102 16.2627 15.7248 16.2662 15.5305C16.2696 15.3362 16.1975 15.1482 16.065 15.006L13.062 12L16.066 8.99502Z" fill="#333333"/>
</svg>