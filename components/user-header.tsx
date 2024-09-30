import type { NextPage } from "next";

export type UserHeaderType = {
  className?: string;
};

const UserHeader: NextPage<UserHeaderType> = ({ className = "" }) => {
  return (
    <header
      className={`self-stretch bg-white border-darkslategray-400 border-b-[1px] border-solid flex flex-row items-center justify-between pt-8 px-8 pb-[30px] top-[0] z-[99] sticky gap-5 text-left text-9xl text-darkslategray-100 font-dm-sans ${className}`}
    >
      <a className="[text-decoration:none] h-[30px] relative leading-[24px] font-bold text-[inherit] inline-block whitespace-nowrap">
        Welcome User!
      </a>
      <div className="flex flex-row items-center justify-center gap-6 text-lg">
        <div className="w-[90px] flex flex-row items-center justify-start">
          <div className="flex-1 flex flex-row items-center justify-between gap-5">
            <div className="w-[66px] flex flex-row items-center justify-start gap-[9.5px] mq450:hidden">
              <a className="[text-decoration:none] h-[31px] flex-1 relative tracking-[0.5px] leading-[24px] text-[inherit] flex items-center min-w-[23px] whitespace-nowrap shrink-0">
                JN
              </a>
              <div className="h-[21px] w-px relative border-darkslategray-100 border-r-[1px] border-solid box-border" />
              <div className="flex-1 border-darkslategray-100 border-b-[2px] border-solid flex flex-col items-center justify-start">
                <a className="[text-decoration:none] h-[31px] relative tracking-[0.5px] leading-[24px] text-[inherit] flex items-center shrink-0 min-w-[24px] whitespace-nowrap">
                  EN
                </a>
              </div>
            </div>
            <div className="h-0 w-0 relative text-sm text-tailgrids-text-color font-roboto">
              <div className="absolute w-36 h-5 hidden">
                <img
                  className="absolute h-full w-[13.89%] top-[0%] right-[86.11%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
                  alt=""
                  src="/search-2.svg"
                />
                <div className="absolute top-[0%] left-[27.78%] leading-[20px] font-medium whitespace-nowrap">
                  Type to search...
                </div>
              </div>
              <div className="absolute w-0 h-0 text-right text-tailgrids-black-color">
                <div className="absolute w-[76px] h-[46px] hidden">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%]">
                    <img
                      className="absolute h-full w-[60.53%] top-[0%] right-[39.47%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                      alt=""
                      src="/group-1000003672@2x.png"
                    />
                    <img
                      className="absolute h-[43.48%] w-[26.32%] top-[28.26%] right-[0%] bottom-[28.26%] left-[73.68%] max-w-full overflow-hidden max-h-full"
                      alt=""
                      src="/chevrondown-2-1.svg"
                    />
                  </div>
                  <div className="absolute h-[76.09%] w-[121.05%] top-[13.04%] right-[119.74%] bottom-[10.87%] left-[-140.79%] hidden">
                    <div className="absolute top-[0%] left-[0%] leading-[20px] font-medium whitespace-nowrap">
                      Thomas Anree
                    </div>
                    <div className="absolute top-[60%] left-[29.35%] text-xs leading-[14px] font-medium text-tailgrids-text-color whitespace-nowrap">
                      Ux Designer
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[2px] left-[-84px] rounded-13xl bg-stroke w-14 overflow-hidden hidden flex-row items-center justify-start p-[3px] box-border">
                <img
                  className="h-6 w-6 relative rounded-3xl overflow-hidden shrink-0"
                  alt=""
                  src="/button.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <button className="cursor-pointer [border:none] py-2.5 px-[17px] bg-[transparent] rounded-md [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] flex flex-row items-center justify-center gap-2.5 whitespace-nowrap">
          <img className="h-[18px] w-[18px] relative" alt="" src="/icon.svg" />
          <a className="[text-decoration:none] relative text-sm leading-[20px] font-medium font-dm-sans text-white text-left inline-block min-w-[71px]">
            New Order
          </a>
        </button>
      </div>
    </header>
  );
};

export default UserHeader;
