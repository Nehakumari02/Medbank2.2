import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type LoginButtonType = {
  className?: string;
  byLoginIAcceptAllOfMedban?: string;
  login?: string;

  /** Style props */
  propPadding?: CSSProperties["padding"];
};

const LoginButton: NextPage<LoginButtonType> = ({
  className = "",
  propPadding,
  byLoginIAcceptAllOfMedban,
  login,
}) => {
  const loginButtonStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-3 box-border gap-4 max-w-full text-left text-sm text-darkslategray-100 font-dm-sans ${className}`}
      style={loginButtonStyle}
    >
      <div className="self-stretch relative leading-[20px]">
        <span>{byLoginIAcceptAllOfMedban}</span>
        <span className="[text-decoration:underline] text-cadetblue">
          Personal Information
        </span>
        <span>{`, `}</span>
        <span className="[text-decoration:underline] text-cadetblue">
          Cancellation Policy
        </span>
        <span>{`, `}</span>
        <span className="[text-decoration:underline] text-cadetblue">
          Site Policy
        </span>
        <span className="text-transparent !bg-clip-text [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">{` `}</span>
        <span className="text-darkslategray-100">{`and Acknowledge their `}</span>
        <span className="[text-decoration:underline]">
          <span className="text-transparent !bg-clip-text [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            Privacy Policy.
          </span>
          <span className="text-darkslategray-100">{` `}</span>
        </span>
      </div>
      <button className="cursor-pointer [border:none] pt-[13px] pb-3.5 pl-[21px] pr-5 bg-[transparent] self-stretch rounded-md [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] flex flex-row items-start justify-center box-border max-w-full">
        <div className="h-[50px] w-[527px] relative rounded-md [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] hidden max-w-full" />
        <b className="w-[143.6px] relative text-lg inline-block font-dm-sans text-white text-center shrink-0 z-[1]">
          {login}
        </b>
      </button>
    </div>
  );
};

export default LoginButton;
