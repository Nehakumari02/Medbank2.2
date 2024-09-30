import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type GroupComponentType = {
  className?: string;
  statusIcons?: string;
  pendingOrders?: string;


  propOverflow?: CSSProperties["overflow"];
  propDisplay?: CSSProperties["display"];
  propMinWidth?: CSSProperties["minWidth"];
};

const GroupComponent: NextPage<GroupComponentType> = ({
  className = "",
  statusIcons,
  propOverflow,
  pendingOrders,
  propDisplay,
  propMinWidth,
}) => {
  const statusIconsStyle: CSSProperties = useMemo(() => {
    return {
      overflow: propOverflow,
    };
  }, [propOverflow]);

  const pendingOrdersStyle: CSSProperties = useMemo(() => {
    return {
      display: propDisplay,
      minWidth: propMinWidth,
    };
  }, [propDisplay, propMinWidth]);

  return (
    <div
      className={`flex-1 shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)] rounded-3xs bg-white border-stroke border-[1px] border-solid box-border flex flex-col items-start justify-start pt-[29px] px-[30px] pb-7 gap-[17px] min-w-[262px] max-w-full text-left text-base text-darkslategray-100 font-dm-sans ${className}`}
    >
      <div className="w-[350px] h-44 relative shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)] rounded-3xs bg-white border-stroke border-[1px] border-solid box-border hidden max-w-full" />
      <img
        className="w-9 h-9 relative z-[1]"
        loading="lazy"
        alt=""
        src={statusIcons}
        style={statusIconsStyle}
      />
      <div className="flex flex-col items-start justify-start gap-2">
        <div
          className="relative leading-[24px] font-medium inline-block min-w-[117px] z-[1]"
          style={pendingOrdersStyle}
        >
          {pendingOrders}
        </div>
        <b className="relative text-13xl leading-[30px] inline-block min-w-[23px] z-[1] mq450:text-lgi mq450:leading-[18px] mq1000:text-7xl mq1000:leading-[24px]">
          0
        </b>
      </div>
    </div>
  );
};

export default GroupComponent;
