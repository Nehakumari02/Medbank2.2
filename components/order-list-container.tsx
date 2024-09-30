import type { NextPage } from "next";

export type OrderListContainerType = {
  className?: string;
};

const OrderListContainer: NextPage<OrderListContainerType> = ({
  className = "",
}) => {
  return (
    <div
      className={`self-stretch flex flex-row items-start justify-start py-0 px-5 box-border max-w-full text-left text-3xl text-darkslategray-100 font-dm-sans ${className}`}
    >
      <div className="flex-1 shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)] rounded-3xs bg-white border-darkslategray-400 border-[0px] border-solid box-border flex flex-col items-start justify-start pt-5 pb-0 pl-px pr-0 min-h-[572px] max-w-full">
        <img
          className="self-stretch relative rounded-3xs max-w-full overflow-hidden max-h-full hidden z-[1]"
          alt=""
          src="/rectangle-4975.svg"
        />
        <div className="self-stretch flex flex-col items-end justify-start pt-0 px-0 pb-[432px] box-border gap-5 max-w-full mq725:pb-[281px] mq725:box-border">
          <div className="w-[1239px] flex flex-row items-start justify-end py-0 px-5 box-border max-w-full">
            <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-5 mq725:flex-wrap">
              <div className="flex flex-col items-start justify-start pt-3 px-0 pb-0">
                <h3 className="m-0 relative text-inherit leading-[28px] font-bold font-[inherit] inline-block min-w-[112px] z-[1] mq450:text-lg mq450:leading-[22px]">
                  Order List
                </h3>
              </div>
              <div className="h-10 w-[406px] flex flex-row items-start justify-start gap-3 max-w-full">
                <div className="h-[41px] flex-1 rounded-md bg-white border-darkslategray-200 border-[1px] border-solid box-border overflow-hidden flex flex-row items-start justify-start max-w-[calc(100%_-_46px)] z-[1]">
                  <div className="h-10 flex-1 flex flex-row items-center justify-start py-0 pl-[18px] pr-[5px] box-border gap-1 max-w-full">
                    <input
                      className="w-[calc(100%_-_41px)] [border:none] [outline:none] bg-[transparent] h-8 flex-1 flex flex-row items-center justify-start py-1 px-0 box-border font-dm-sans text-sm text-darkslategray-100 min-w-[172px]"
                      placeholder="Search"
                      type="text"
                    />
                    <div className="flex flex-row items-center justify-end">
                      <div className="flex flex-col items-center justify-center p-[7px]">
                        <div className="w-[34px] h-[34px] rounded-81xl overflow-hidden shrink-0 flex flex-row items-center justify-center">
                          <div className="flex flex-row items-center justify-center p-2">
                            <img
                              className="h-[18px] w-[18px] relative"
                              alt=""
                              src="/icon-1.svg"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="h-12 hidden flex-col items-center justify-center">
                        <div className="rounded-81xl overflow-hidden flex flex-row items-center justify-center py-0 px-1">
                          <div className="flex flex-row items-center justify-center p-2">
                            <img
                              className="h-6 w-6 relative"
                              alt=""
                              src="/icon-2.svg"
                            />
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
                      src="/iconoirfilter.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            className="self-stretch relative max-w-full overflow-hidden max-h-full object-contain mt-[-1px] z-[1]"
            loading="lazy"
            alt=""
          />
        </div>
        <div className="self-stretch h-[480px] relative mt-[-422px] text-center text-sm">
          <div className="absolute top-[12px] left-[0px] leading-[24px] font-medium inline-block w-[91px] z-[1]">
            Order ID
          </div>
          <div className="absolute top-[0px] left-[91px] leading-[24px] font-medium inline-block w-[90px] z-[1]">
            <p className="m-0">{`Order `}</p>
            <p className="m-0">Title</p>
          </div>
          <div className="absolute top-[0px] left-[181px] leading-[24px] font-medium inline-block w-[91px] z-[1]">
            <p className="m-0">Request</p>
            <p className="m-0">Sheet</p>
          </div>
          <div className="absolute top-[0px] left-[272px] leading-[24px] font-medium inline-block w-[90px] z-[1]">
            <p className="m-0">Cost</p>
            <p className="m-0">Estimate</p>
          </div>
          <div className="absolute top-[0px] left-[362px] leading-[24px] font-medium inline-block w-[91px] z-[1]">
            <p className="m-0">Formal</p>
            <p className="m-0">Request</p>
          </div>
          <div className="absolute top-[0px] left-[453px] leading-[24px] font-medium inline-block w-[90px] z-[1]">
            <p className="m-0">Sample</p>
            <p className="m-0">Shipping</p>
          </div>
          <div className="absolute top-[0px] left-[543px] leading-[24px] font-medium inline-block w-[91px] z-[1]">
            <p className="m-0">Quality</p>
            <p className="m-0">Check</p>
          </div>
          <div className="absolute top-[0px] left-[634px] leading-[24px] font-medium inline-block w-[91px] z-[1]">
            <p className="m-0">Library</p>
            <p className="m-0">Prep.</p>
          </div>
          <div className="absolute top-[0px] left-[725px] leading-[24px] font-medium inline-block w-[90px] z-[1]">
            <p className="m-0">Analysis</p>
            <p className="m-0">Progress</p>
          </div>
          <div className="absolute top-[0px] left-[815px] leading-[24px] font-medium inline-block w-[91px] z-[2]">
            <p className="m-0">Analysis</p>
            <p className="m-0">Done</p>
          </div>
          <div className="absolute top-[0px] left-[906px] leading-[24px] font-medium inline-block w-[90px] z-[3]">
            <p className="m-0">{`Raw `}</p>
            <p className="m-0">Data</p>
          </div>
          <div className="absolute top-[12px] left-[1087px] leading-[24px] font-medium inline-block w-[90px] z-[5]">
            Invoice
          </div>
          <div className="absolute top-[0px] left-[1177px] leading-[24px] font-medium inline-block w-[91px] z-[6]">
            <p className="m-0">Payment</p>
            <p className="m-0">{`& Recepit`}</p>
          </div>
          <div className="absolute top-[56px] left-[0px] border-darkslategray-300 border-r-[0.5px] border-solid box-border w-[0.5px] h-[408.5px] z-[2]" />
          <div className="absolute top-[56px] left-[91px] border-darkslategray-300 border-r-[0.5px] border-solid box-border w-[0.5px] h-[424.5px] z-[2]" />
          <div className="absolute top-[56px] left-[181px] border-darkslategray-300 border-r-[0.5px] border-solid box-border w-[0.5px] h-[424.5px] z-[2]" />
          <div className="absolute top-[56px] left-[272px] border-darkslategray-300 border-r-[0.5px] border-solid box-border w-[0.5px] h-[424.5px] z-[2]" />
          <div className="absolute top-[56px] left-[362px] border-darkslategray-300 border-r-[0.5px] border-solid box-border w-[0.5px] h-[424.5px] z-[2]" />
          <div className="absolute top-[56px] left-[453px] border-darkslategray-300 border-r-[0.5px] border-solid box-border w-[0.5px] h-[424.5px] z-[2]" />
          <div className="absolute top-[56px] left-[543px] border-darkslategray-300 border-r-[0.5px] border-solid box-border w-[0.5px] h-[424.5px] z-[2]" />
          <div className="absolute top-[56px] left-[634px] border-darkslategray-300 border-r-[0.5px] border-solid box-border w-[0.5px] h-[424.5px] z-[2]" />
          <div className="absolute top-[56px] left-[725px] border-darkslategray-300 border-r-[0.5px] border-solid box-border w-[0.5px] h-[424.5px] z-[2]" />
          <div className="absolute top-[56px] left-[815px] border-darkslategray-300 border-r-[0.5px] border-solid box-border w-[0.5px] h-[424.5px] z-[2]" />
          <div className="absolute top-[56px] left-[906px] border-darkslategray-300 border-r-[0.5px] border-solid box-border w-[0.5px] h-[424.5px] z-[2]" />
          <div className="absolute h-full top-[0px] bottom-[0px] left-[996px] w-[91.5px]">
            <div className="absolute top-[56px] left-[0px] border-darkslategray-300 border-r-[0.5px] border-solid box-border w-[0.5px] h-[424.5px] z-[2]" />
            <div className="absolute top-[0px] left-[0px] leading-[24px] font-medium inline-block w-[91px] z-[4]">
              <p className="m-0">Analysis</p>
              <p className="m-0">Specification</p>
            </div>
            <div className="absolute top-[56px] left-[91px] border-darkslategray-300 border-r-[0.5px] border-solid box-border w-[0.5px] h-[424.5px] z-[2]" />
          </div>
          <div className="absolute top-[56px] left-[1177px] border-darkslategray-300 border-r-[0.5px] border-solid box-border w-[0.5px] h-[424.5px] z-[2]" />
          <div className="absolute top-[56px] left-[1268px] border-darkslategray-300 border-r-[0.5px] border-solid box-border w-[0.5px] h-[408.5px] z-[2]" />
        </div>
        <img
          className="self-stretch relative max-w-full overflow-hidden max-h-full object-contain z-[1] mt-[-422px]"
          loading="lazy"
          alt=""
        />
      </div>
    </div>
  );
};

export default OrderListContainer;
