import type { NextPage } from "next";

export type FrameComponent2Type = {
  className?: string;
};

const FrameComponent2: NextPage<FrameComponent2Type> = ({ className = "" }) => {
  return (
    <div
      className={`w-[1315px] flex flex-row items-start justify-end pt-0 px-[61px] pb-[14.5px] box-border max-w-full text-left text-3xl text-darkslategray-100 font-dm-sans lg:pl-[30px] lg:pr-[30px] lg:box-border ${className}`}
    >
      <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-5 mq725:flex-wrap">
        <div className="flex flex-col items-start justify-start pt-1.5 px-0 pb-0">
          <h3 className="m-0 relative text-inherit leading-[28px] font-bold font-[inherit] inline-block min-w-[125px] z-[1] mq1000:text-lg mq1000:leading-[22px]">
            Sample List
          </h3>
        </div>
        <div className="h-10 w-[406px] flex flex-row items-start justify-start gap-3 max-w-full text-sm">
          <div className="h-[41px] flex-1 rounded-md bg-white border-darkslategray-200 border-[1px] border-solid box-border overflow-hidden flex flex-row items-start justify-start max-w-[calc(100%_-_46px)] z-[1]">
            <div className="h-10 flex-1 flex flex-row items-center justify-start py-0 pl-[18px] pr-[5px] box-border gap-1 max-w-full">
              <div className="flex-1 flex flex-row items-center justify-start py-1 px-0">
                <div className="relative tracking-[0.5px] leading-[24px] inline-block min-w-[48px]">
                  Search
                </div>
              </div>
              <div className="flex flex-row items-center justify-end">
                <div className="flex flex-col items-center justify-center p-[7px]">
                  <div className="w-[34px] h-[34px] rounded-81xl overflow-hidden shrink-0 flex flex-row items-center justify-center">
                    <div className="flex flex-row items-center justify-center p-2">
                      <img className="h-[18px] w-[18px] relative" alt="" />
                    </div>
                  </div>
                </div>
                <div className="h-12 hidden flex-col items-center justify-center">
                  <div className="rounded-81xl overflow-hidden flex flex-row items-center justify-center py-0 px-1">
                    <div className="flex flex-row items-center justify-center p-2">
                      <img className="h-6 w-6 relative" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
            <div className="flex flex-row items-center justify-center relative gap-2.5 z-[1]">
              <div className="h-[34px] w-[34px] relative rounded-[50%] bg-aliceblue-200 border-darkslategray-200 border-[0px] border-solid box-border" />
              <img
                className="h-[18px] w-[18px] absolute !m-[0] top-[9px] left-[8px] rounded-3xs overflow-hidden shrink-0 z-[1]"
                loading="lazy"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent2;
