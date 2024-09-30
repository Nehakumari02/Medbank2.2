import type { NextPage } from "next";
import GroupComponent from "./group-component";

export type OrderStatusType = {
  className?: string;
};

const OrderStatus: NextPage<OrderStatusType> = ({ className = "" }) => {
  return (
    <div
      className={`w-[1188px] flex flex-row items-start justify-start py-0 px-5 box-border max-w-full text-left text-base text-darkslategray-100 font-dm-sans ${className}`}
    >
      <div className="flex-1 flex flex-row items-start justify-start gap-[49px] max-w-full mq725:gap-6 mq1050:flex-wrap">
        <GroupComponent
          statusIcons="/vector.svg"
          pendingOrders="Pending Orders"
        />
        <GroupComponent
          statusIcons="/carboninprogress.svg"
          propOverflow="hidden"
          pendingOrders="Orders In-Progress"
          propDisplay="unset"
          propMinWidth="unset"
        />
        <div className="flex-[0.9722] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)] rounded-3xs bg-white border-stroke border-[1px] border-solid box-border flex flex-col items-start justify-start pt-[29px] px-[34px] pb-7 gap-[17px] min-w-[262px] max-w-full mq450:flex-1">
          <div className="w-[350px] h-44 relative shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)] rounded-3xs bg-white border-stroke border-[1px] border-solid box-border hidden max-w-full" />
          <img
            className="w-9 h-9 relative overflow-hidden shrink-0 z-[2]"
            loading="lazy"
            alt=""
            src="/fluentmdl2completed.svg"
          />
          <div className="w-[151px] flex flex-row items-start justify-start py-0 px-px box-border">
            <div className="flex-1 flex flex-col items-start justify-start gap-2">
              <div className="self-stretch relative leading-[24px] font-medium z-[1]">
                Completed
              </div>
              <b className="relative text-13xl leading-[30px] inline-block min-w-[23px] z-[1] mq450:text-lgi mq450:leading-[18px] mq1000:text-7xl mq1000:leading-[24px]">
                0
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
