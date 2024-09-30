import type { NextPage } from "next";

export type FrameComponentType = {
  className?: string;
};

const FrameComponent: NextPage<FrameComponentType> = ({ className = "" }) => {
  return (
    <div
      className={`h-[1024px] w-[130px] bg-white border-darkslategray-400 border-r-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-col items-center justify-between py-[35px] px-6 min-h-[1024px] text-left text-base text-dark-text-color-2 font-roboto mq450:hidden mq450:pt-[23px] mq450:pb-[23px] mq450:box-border mq725:pt-5 mq725:pb-5 mq725:box-border ${className}`}
    >
      <img className="w-20 h-20 relative object-cover" loading="lazy" alt="" />
      <div className="self-stretch flex-1 flex flex-col items-center justify-between py-0 px-[19px]">
        <div className="self-stretch flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-col items-start justify-start gap-1">
            <div className="self-stretch h-[34px] relative">
              <div className="absolute top-[calc(50%_-_17px)] left-[0px] w-full h-full">
                <div className="absolute top-[calc(50%_-_17px)] left-[0px] rounded-10xs bg-aliceblue-100 border-cadetblue border-l-[1px] border-solid box-border w-full flex flex-row items-center justify-center py-2 pl-[13px] pr-2.5 gap-2.5 h-full">
                  <div className="w-[19px] flex flex-row items-center justify-start">
                    <img
                      className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="/gridalt.svg"
                    />
                  </div>
                  <img
                    className="h-5 w-5 relative overflow-hidden shrink-0 object-contain hidden"
                    alt=""
                  />
                </div>
              </div>
              <div className="absolute h-[370.59%] w-[38.6%] top-[152.94%] right-[41.86%] bottom-[-423.53%] left-[19.53%] hidden flex-col items-start justify-start gap-2.5">
                <div className="relative leading-[24px] font-medium text-white">
                  eCommerce
                </div>
                <div className="relative leading-[24px] font-medium">
                  Analytics
                </div>
                <div className="relative leading-[24px] font-medium">
                  Marketing
                </div>
                <div className="relative leading-[24px] font-medium">CRM</div>
              </div>
            </div>
            <div className="w-[43px] rounded-10xs bg-white flex flex-row items-center justify-center py-2 px-3 box-border">
              <img
                className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/carbonorderdetails.svg"
              />
            </div>
            <div className="w-[43px] rounded-10xs bg-white flex flex-row items-center justify-center py-2 px-3 box-border">
              <img
                className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/fluentpayment32regular.svg"
              />
            </div>
            <div className="w-[43px] rounded-10xs bg-white flex flex-row items-center justify-center py-2 px-3 box-border">
              <img
                className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/materialsymbolslightarchiveoutline.svg"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start gap-4">
          <img
            className="w-[18px] h-[18px] relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
          />
          <img
            className="w-[18px] h-[18px] relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
