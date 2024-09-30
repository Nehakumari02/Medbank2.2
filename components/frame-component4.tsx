'use client'
import type { NextPage } from "next";
import LoginButton from "./login-button";
import { useState } from 'react';


export type FrameComponent4Type = {
  className?: string;
};

const FrameComponent4: NextPage<FrameComponent4Type> = ({ className = "" }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div
      className={`w-[971px] rounded-3xs bg-darkslategray-500 border-darkslategray-200 border-[1px] border-solid box-border flex flex-col items-start justify-start py-[38px] px-[39px] gap-6 shrink-0 max-w-full text-left text-lg text-black font-dm-sans mq675:pt-[25px] mq675:pb-[25px] mq675:box-border ${className}`}
    >
      <div className="self-stretch h-[47px] flex flex-col items-start justify-start pt-0 px-0 pb-0 box-border gap-4 mq450:h-auto">
        <div className="self-stretch flex flex-row items-end justify-between gap-5 mq450:flex-wrap">
          <div className="flex flex-row items-start justify-start gap-[7px]">
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
              loading="lazy"
              alt=""
              src="/epback.svg"
            />
            <div className="relative tracking-[0.5px] leading-[24px] inline-block min-w-[43px]">
              Back
            </div>
          </div>
          <div className="w-[66px] flex flex-row items-center justify-start gap-[9.5px] text-darkslategray-100">
            <div className="h-[31px] flex-1 relative tracking-[0.5px] leading-[24px] flex items-center min-w-[23px] shrink-0">
              JN
            </div>
            <div className="h-[21px] w-px relative border-darkslategray-100 border-r-[1px] border-solid box-border" />
            <div className="flex-1 border-darkslategray-100 border-b-[2px] border-solid flex flex-col items-center justify-start">
              <div className="h-[31px] relative tracking-[0.5px] leading-[24px] flex items-center shrink-0 min-w-[24px]">
                EN
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-px relative border-darkslategray-200 border-t-[1px] border-solid box-border" />
      </div>
      <img
        className="w-20 h-20 relative object-cover"
        loading="lazy"
        alt=""
        src="/clip-path-group1@2x.png"
      />
      <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[53px] max-w-full text-21xl text-darkslategray-100 mq450:gap-[26px]">
        <div className="flex flex-col items-start justify-start gap-2">
          <h1 className="m-0 relative text-inherit leading-[40px] font-bold font-[inherit] mq450:text-5xl mq450:leading-[24px] mq750:text-13xl mq750:leading-[32px]">
            Welcome Back !
          </h1>
          <div className="relative text-lg leading-[23.2px]">
            Login account to continue!
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start justify-start gap-4 min-w-[343px] max-w-full text-sm mq675:min-w-full">
          <div className="self-stretch flex flex-col items-start justify-start gap-4 max-w-full text-base text-cadetblue">
          <div className="gradient-border flex flex-row items-start justify-start py-[11px] px-4 max-w-full">
  <div className="gradient-border-inner flex flex-row items-start justify-start py-[11px] px-4 max-w-full">
    <div className="h-[50px] w-[527px] relative rounded-md bg-white border-darkslategray-200 border-[1px] border-solid box-border hidden max-w-full" />
    <input
      className="w-[314.6px] outline-none font-dm-sans text-base bg-transparent h-6 relative leading-[24px] text-darkslategray-100 text-left inline-block p-0 z-[1]"
      placeholder="Email"
      type="text"
    />
  </div>
</div>


            <div className="self-stretch rounded-md bg-white border-darkslategray-200 border-[1px] border-solid box-border flex flex-row items-center justify-between py-[11px] px-4 max-w-full focus-within:border-[#3498db]">
              <input
                className="w-[314.6px] outline-none font-dm-sans text-base bg-transparent h-6 leading-[24px] text-darkslategray-100 text-left"
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
              />
              <div className="flex items-center justify-center cursor-pointer" onClick={togglePasswordVisibility}>
                <img
                  className="w-4 h-4 overflow-hidden shrink-0"
                  alt="Toggle Password Visibility"
                  src={showPassword ? "/Vector.png" : "/mdieye.svg"} // Use an "eye-off" icon for when the password is visible
                />
              </div>


            </div>
            <div className="relative">Forgot Password?</div>
          </div>

          <LoginButton
            byLoginIAcceptAllOfMedban="By Login,I accept all of Medbank's terms and conditions , "
            login="Login"
          />
          <div className="self-stretch flex flex-row items-start justify-center py-0 pl-5 pr-[21px] text-center">
            <div className="relative leading-[20px]">
              <span className="whitespace-pre-wrap">{`Don’t have an Account ?  `}</span>
              <span className="text-transparent !bg-clip-text [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                {" "}
                Register
              </span>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default FrameComponent4;
