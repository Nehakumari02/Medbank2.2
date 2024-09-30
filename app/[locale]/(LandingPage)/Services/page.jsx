import React from 'react'
import PriceTable from '@/components/PriceTable'
import SnackBar from '@/components/SnackBar'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

const Services = ({params:{locale}}) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations("OurServices");
  return (
    <>
      <section className='pl-[38px] pr-[24px] md:pl-[156px]  md:pr-[95px]   w-full text-[#333333] font-DM-Sans flex flex-col items-center justify-center '>

        <div className=' relative  max-w-screen-lg w-full flex flex-col items-start pt-[24px] md:pt-[40px] lg:pt-[60px] '>
        <div className="absolute top-[28px] left-[-29px] md:top-[45px] lg:top-[68px]  md:left-[-54px]">
                <SnackBar text={"Services"} />
              </div>
          <div className='text-[14px] md:text-[18px]'>Our Services</div>
          <div className='flex flex-col gap-[27px] md:gap-[65px] lg:gap-[76px] pt-[6px] md:pt-[20px]'>
            <div className=' flex flex-col gap-[6px] md:gap-[20px]'>
              
              <div className='font-bold text-[16px] md:text-[28px] lg:text-[28px] leading-[24px]'>
                DNA Sequencing
              </div >

              <div className='font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-[36px]'>
              {t("service1")}
              </div>
            </div>
            <div className='flex flex-col gap-[6px] md:gap-[20px]'>
              <div className='font-bold text-[16px] md:text-[28px] lg:text-[28px] leading-[24px]'>
                RNA Sequencing
              </div >

              <div className='font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-[36px]'>
              {t("service2")}
              </div>
            </div>

            <div className='flex flex-col gap-[6px] md:gap-[20px]'>

              <div className='font-bold text-[16px] md:text-[28px] lg:text-[28px] leading-[24px]'>
                Amplicon Sequencing
              </div >

              <div className='font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-[36px]'>
                {t("service3")}
              </div>
            </div>
          </div>

        </div>
        <div className="px-[10px] w-[100vw] md:w-full mx-[-31px] md:mx-0 md:px-0 overflow-x-scroll md:overflow-x-auto mt-[40px] md:mt-[80px]">
          <table className="w-full">
          <thead className="w-[100vw]">
            <tr className="gradient-table-head rounded-tl-[10px] rounded-tr-[10px] h-[60px] md:h-[80px] flex items-center justify-between w-[690px] md:w-auto px-[20px]">
              <th className="flex-1 text-left font-sans font-normal text-nowrap text-[14px] md:text-[24px] leading-[40px]">{t("table2")}</th>
              <th className="flex-1 text-left font-sans font-normal text-nowrap text-[14px] md:text-[24px] leading-[40px]">{t("table1")}</th>
              <th className="flex-1 text-left font-sans font-normal text-nowrap text-[14px] md:text-[24px] leading-[40px]">{t("table3")}</th>
              <th className="flex-1 text-left font-sans font-normal text-nowrap text-[14px] md:text-[24px] leading-[40px]">{t("table4")}</th>
              <th className="flex-1 text-left font-sans font-normal text-nowrap text-[14px] md:text-[24px] leading-[40px]">{t("table5")}</th>
            </tr>
          </thead>
          <tbody className="w-[100vw]">
            <tr className="hidden">
            </tr>
            <tr className="h-[80px] border-b border-dashed border-black font-sans font-medium text-[12px] md:text-[20px] text-[#333333] flex items-center justify-between w-[690px] md:w-auto px-[20px]">
              <td className="flex-1">{t.rich("data1",{
                br: ()=><br/>
              })}</td>
              <td className="flex-1">{t("row11")} </td>
              <td className="flex-1">{t("row12")}</td>
              <td className="flex-1">{t("row13")} </td>
              <td className="flex-1">{t("row14")} </td>
            </tr>
            <tr className="h-[80px] border-b border-dashed border-black font-sans font-medium text-[12px] md:text-[20px] text-[#333333] flex items-center justify-between w-[690px] md:w-auto px-[20px]">
              <td className="flex-1">{t.rich("data2",{
                br: ()=><br/>
              })}</td>
              <td className="flex-1">{t("row21")} </td>
              <td className="flex-1">{t("row22")}</td>
              <td className="flex-1">{t("row23")}</td>
              <td className="flex-1">{t("row24")} </td>
            </tr>
            <tr className="h-[80px] border-b border-dashed border-black font-sans font-medium text-[12px] md:text-[20px] text-[#333333] flex items-center justify-between w-[690px] md:w-auto px-[20px]">
              <td className="flex-1">{t.rich("data3",{
                br: ()=><br/>
              })}</td>
              <td className="flex-1">{t("row31")}</td>
              <td className="flex-1">{t("row32")}</td>
              <td className="flex-1">{t("row33")}</td>
              <td className="flex-1">{t("row34")} </td>
            </tr>
            <tr className="h-[80px] font-sans font-medium text-[12px] md:text-[20px] text-[#333333] flex items-center justify-between w-[690px] md:w-auto px-[20px]">
              <td className="flex-1">{t.rich("data4",{
                br: ()=><br/>
              })}</td>
              <td className="flex-1">{t("row41")}</td>
              <td className="flex-1">{t("row42")}</td>
              <td className="flex-1">{t("row43")}</td>
              <td className="flex-1">{t("row44")}</td>
            </tr>
          </tbody>
          </table>
        {/* <div className='w-full flex items-center justify-center font-DM-Sans font-bold text-[18px] md:text-[24px] lg:text-[40px] mt-[20px] py-[20px]'>Coming Soon...</div> */}
        </div>

      </section>
     
    </>
  )
}

export default Services
