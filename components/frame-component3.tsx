import type { NextPage } from "next";

export type FrameComponent3Type = {
  className?: string;
};

const FrameComponent3: NextPage<FrameComponent3Type> = ({ className = "" }) => {
  return (
    <header
      className={`self-stretch h-max-[104px] bg-white border-darkslategray-400 border-b-[1px] border-solid flex flex-row items-start justify-between pt-[37px] px-8 pb-[37px]  text-darkslategray-100 font-DM-Sans ${className}`}
    >
      <div className="">
        <h1 className="  text-2xl leading-[24px] font-bold ">
          Welcome User!
        </h1>
      </div>
      {/* <div className="h-5 w-36 relative hidden text-sm text-tailgrids-text-color font-roboto">
        <img
          className="absolute h-full w-[13.89%] top-[0%] right-[86.11%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/dashboard/search-2.svg"
        />
        <div className="absolute top-[0%] left-[27.78%] leading-[20px] font-medium whitespace-nowrap">
          Type to search...
        </div>
      </div>
      <div className="w-14 rounded-13xl bg-stroke overflow-hidden shrink-0 hidden flex-row items-center justify-start p-[3px] box-border">
        <img
          className="h-6 w-6 relative rounded-3xl overflow-hidden shrink-0"
          alt=""
          src="/dashboard/button.svg"
        />
      </div> */}
      <div className="flex flex-row items-start justify-start gap-12 text-lg">
        <div className="w-[66px] flex flex-col items-start justify-start pt-[4.5px] px-0 pb-0 box-border mq450:w-0">
          <div className="self-stretch flex flex-row items-start justify-start gap-[9px] mq450:hidden">
            <a className="[text-decoration:none] h-[31px] flex-1 relative tracking-[0.5px] leading-[24px] text-[inherit] flex items-center min-w-[23px] whitespace-nowrap">
              JN
            </a>
            <div className="h-[25.5px] flex flex-col items-start justify-start pt-[5.5px] px-0 pb-0 box-border">
              <div className="w-px h-[21px] relative border-darkslategray-100 border-r-[1px] border-solid box-border" />
            </div>
            <div className="flex-1 border-darkslategray-100 border-b-[2px] border-solid flex flex-row items-start justify-start">
              <a className="[text-decoration:none] h-[31px] relative tracking-[0.5px] leading-[24px] text-[inherit] flex items-center min-w-[24px] whitespace-nowrap">
                EN
              </a>
            </div>
          </div>
        </div>
        <button className="cursor-pointer [border:none] py-[10px] px-[17px] bg-[transparent] rounded-md [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] flex flex-row items-start justify-start gap-[10px]">
          <div className="flex flex-col items-start justify-start pt-px px-0 pb-0">
            <img
              className="max-w-[18px] max-h-[18px] "
              alt=""
              src="/dashboard/icon.svg"
            />
          </div>
          <a className="[text-decoration:none]  text-sm leading-[20px] font-medium font-dm-sans text-white text-left inline-block">
            New Order
          </a>
        </button>
      </div>
    </header>
  );
};

export default FrameComponent3;
