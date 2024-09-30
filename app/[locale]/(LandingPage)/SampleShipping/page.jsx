import React from 'react'
import HomePageSectionHeader2 from '../../../../components/HomePageSectionHeader2'
import SampleShipping1 from '../../../../public/Images/Home/SampleShipping1.png'
import SampleShipping2 from '../../../../public/Images/Home/SampleShipping2.png'
import SampleShipping3 from '../../../../public/Images/Home/SampleShipping3.png'
import Image from 'next/image'
import SnackBar from '@/components/SnackBar'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

const SampleShipping = ({params:{locale}}) => {
    unstable_setRequestLocale(locale);
    const t = useTranslations("SampleShipping");
    return (
        <section className='pl-[38px] pr-[24px] md:pl-[156px] md:pr-[95px] w-full flex flex-col justify-center items-center '>
            <div className='w-full max-w-[1056px] flex flex-col items-start gap:[32px] md:gap-[100px] '>
                <div>
                    <div className='relative text-[#333333] pt-[15px] md:pt-[40p] lg:pt-[60px] px-4 md:px-6 lg:px-8 flex flex-col gap-[6px] md:gap-[20px]'>
                        <div className="absolute top-[24px] left-[-29px] md:top-[28px] lg:top-[60px] md:left-[-44px]">
                            <SnackBar text={"Sample Shipping"} />
                        </div>
                        <div className='w-50px font-DM-Sans font-medium text-[14px] md:text-[18px] leading-[24px] pb-[14px]'>
                            step 1
                        </div>
                        <div className='font-DM-Sans font-bold text-[16px] md:text-[28px] lg:text-[30px] leading-[24px]'>
                            {t("step1.title")}
                        </div>
                    </div>
                    <div className='text-[#333333] pt-[12px] md:pt-[24px] lg:pt-[30px] px-4 md:px-6 lg:px-8'>
                        <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px] '>
                            <HomePageSectionHeader2 title={"1"} subTitle={t("step1.subStep1")}></HomePageSectionHeader2>
                        </div>
                        <div className='w-full font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-[34px] pl-[35px] '>
                            {t.rich('step1.description1', {
                                span: (chunks) => <span className='font-medium'>{chunks}</span>,
                                br: () => <br />
                            })}
                        </div>
                    </div>




                    <div className='text-[#333333] pt-[12px] md:pt-[24px] lg:pt-[30px] px-4 md:px-6 lg:px-8'>
                        <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                            <HomePageSectionHeader2 title={"2"} subTitle={t("step1.subStep2")}></HomePageSectionHeader2>
                        </div>
                        <div className='w-full font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-[34px] pl-[35px] '>
                            {t.rich('step1.description2', {
                                span: (chunks) => <span className='font-medium'>{chunks}</span>,
                                br: () => <br />
                            })}
                        </div>
                    </div>

                    <div className='text-[#333333] pt-[12px] md:pt-[24px] lg:pt-[30px] px-4 md:px-6 lg:px-8'>
                        <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px] '>
                            <HomePageSectionHeader2 title={"3"} subTitle={t("step1.subStep3")}></HomePageSectionHeader2>
                        </div>
                        <div className='w-full font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-[34px] pl-[35px] '>

                            {t.rich('step1.description3', {
                                span: (chunks) => <span className='font-medium'>{chunks}</span>,
                                br: () => <br />
                            })}
                        </div>
                    </div>
                    <br />
                    <div className='w-full px-4 md:px-6 lg:px-8 md:pt-[30px]'>
                        <Image  src={t("step1.img1")} width={996} height={996} unoptimized  layout="responsive" alt="Sample Shipping 1" />
                    </div>
                </div>
                <div>

                    <div className='text-[#333333]  px-4 md:px-6 lg:px-8 flex flex-col gap-[6px] md:gap-[20px] pt-[15px]'>
                        <div className='w-50px font-DM-Sans font-medium text-[14px] md:text-[18px] leading-[24px] pb-[14px]'>
                            step 2
                        </div>
                        <div className='font-DM-Sans font-bold text-[16px] md:text-[28px] lg:text-[30px] leading-[24px]'>
                            {t("step2.title")}
                        </div>
                    </div>
                    <div className='text-[#333333] pt-[12px] md:pt-[24px] lg:pt-[30px] px-4 md:px-6 lg:px-8'>
                        <div className='flex flex-col pb-[6px] md:pb-[6px] text-[18px] md:text-[26px] '>
                            <HomePageSectionHeader2 title={"1"} subTitle={t("step2.subStep1")}></HomePageSectionHeader2>
                        </div>
                        <div className='w-full font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-[34px] pl-[35px] '>
                            {t.rich('step2.description1', {
                                span: (chunks) => <span className='font-medium'>{chunks}</span>,
                                br: () => <br />
                            })}
                        </div>
                    </div>

                    <div className='text-[#333333] pt-[12px] md:pt-[24px] lg:pt-[30px] px-4 md:px-6 lg:px-8'>
                        <div className='flex flex-col pb-[6px] md:pb-[6px] text-[18px] md:text-[26px]'>
                            <HomePageSectionHeader2 title={"2"} subTitle={t("step2.subStep2")}></HomePageSectionHeader2>
                        </div>
                        <div className='w-full font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-[34px] pl-[35px] '>
                            {t.rich('step2.description2', {
                                span: (chunks) => <span className='font-medium'>{chunks}</span>,
                                br: () => <br />
                            })}
                        </div>
                    </div>

                    <div className='text-[#333333] pt-[12px] md:pt-[24px] lg:pt-[30px] px-4 md:px-6 lg:px-8'>
                        <div className='flex flex-col pb-[6px] text-[18px] md:text-[26px]'>
                            <HomePageSectionHeader2 title={"3"} subTitle={t("step2.subStep3")}></HomePageSectionHeader2>
                        </div>
                        <div className='w-full font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-[34px] pl-[35px] '>
                            {t.rich('step2.description3', {
                                span: (chunks) => <span className='font-medium'>{chunks}</span>,
                                br: () => <br />
                            })}
                        </div>
                    </div>
                    <br />
                    <div className='w-full px-4 md:px-6 lg:px-8 md:pt-[30px]'>
                        <Image  src={t("step2.img2")}  width={996} height={996} unoptimized layout="responsive" alt="Sample Shipping 2" />
                    </div>
                </div>

                <div>

                    <div className='text-[#333333]  px-4 md:px-6 lg:px-8 flex flex-col gap-[6px] md:gap-[20px] pt-[15px]'>
                        <div className='w-50px font-DM-Sans font-medium text-[14px] md:text-[18px] leading-[24px] pb-[14px]'>
                            step 3
                        </div>
                        <div className='font-DM-Sans font-bold text-[16px] md:text-[28px] lg:text-[30px] leading-[24px]'>
                            {t("step3.title")}
                        </div>
                    </div>
                    <div className='text-[#333333] pt-[12px] md:pt-[24px] lg:pt-[30px] px-4 md:px-6 lg:px-8'>
                        <div className='flex flex-col pb-[6px] text-[18px] md:text-[26px]'>
                            <HomePageSectionHeader2 title={"1"} subTitle={t("step3.subStep1")}></HomePageSectionHeader2>
                        </div>
                        <div className='w-full font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-[34px] pl-[35px] '>
                            {t.rich('step3.description1.subDes1', {
                                span: (chunks) => <span className='font-medium'>{chunks}</span>,
                                br: () => <br />
                            })}
                            {t.rich('step3.description1.subDes2', {
                                span: (chunks) => <span className='font-medium'>{chunks}</span>,
                                br: () => <br />
                            })}
                            {t.rich('step3.description1.subDes3', {
                                span: (chunks) => <span className='font-medium'>{chunks}</span>,
                                br: () => <br />
                            })}
                            {t.rich('step3.description1.subDes4', {
                                span: (chunks) => <span className='font-medium'>{chunks}</span>,
                                br: () => <br />
                            })}
                        </div>
                    </div>

                    <div className='text-[#333333] pt-[12px] md:pt-[24px] lg:pt-[30px] px-4 md:px-6 lg:px-8'>
                        <div className='flex flex-col pb-[6px] text-[18px] md:text-[26px] '>
                            <HomePageSectionHeader2 title={"2"} subTitle={t("step3.subStep2")}></HomePageSectionHeader2>
                        </div>
                        <div className='w-full font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-[34px] pl-[35px] '>
                            {t.rich('step3.description2', {
                                span: (chunks) => <span className='font-medium'>{chunks}</span>,
                                br: () => <br />
                            })}
                        </div>
                    </div>

                    <div className='text-[#333333] pt-[12px] md:pt-[24px] lg:pt-[30px] px-4 md:px-6 lg:px-8'>
                        <div className='flex flex-col pb-[6px] text-[18px] md:text-[26px] '>
                            <HomePageSectionHeader2 title={"3"} subTitle={t("step3.subStep3")}></HomePageSectionHeader2>
                        </div>
                        <div className='w-full font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-[34px] pl-[35px] '>
                            {t.rich('step3.description3', {
                                span: (chunks) => <span className='font-medium'>{chunks}</span>,
                                br: () => <br />
                            })}
                        </div>
                    </div>
                    <br />
                    <div className='w-full px-4 md:px-6 lg:px-8 md:pt-[30px]'>
                        <Image  src={t("step3.img3")} width={996} height={996} unoptimized  layout="responsive" alt="Sample Shipping 3" />
                    </div>
                    

                </div>

                <div>

                    <div className='w-full px-4 md:px-6 lg:px-8 flex flex-col gap-[12px] md:gap-[30px] lg:gap-[70px] pt-[20px] md:pt-30px] '>
                        <div className='flex flex-col gap-[6px] md:gap-[24px] lg:gap-[30px]'>
                            <div className='font-bold text-[16px] md:text-[26px] lg:text-[26px] leading-[24px]'>
                                {t("shippingAddr")}
                            </div>
                           

                             <div className='font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px]  '>
                                {t.rich('addr', {
                                    span: (chunks) => <span className='font-medium'>{chunks}</span>,
                                    br: () => <br />
                                })}
                            </div> 
                        </div>
                        <div className='flex flex-col gap-[6px] md:gap-[24px] lg:gap-[30px]'>
                            <div className='font-bold text-[16px] md:text-[26px] lg:text-[26px] leading-[24px]'>
                                {t("tempRange")}
                            </div>
                            <div className='font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px]  '>
                                {t("tempRangeDes")}
                            </div>
                        </div>
                        <div className='flex flex-col gap-[6px] md:gap-[24px] lg:gap-[30px]'>
                            <div className='font-bold text-[16px] md:text-[26px] lg:text-[26px] leading-[24px]'>
                                {t("shippingCost")}
                            </div>
                            <div className='font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px]  '>
                                {t("shippingCostDes")}
                            </div>
                        </div>

                        <div className='flex flex-col gap-[6px] md:gap-[24px] lg:gap-[30px]'>
                            <div className='font-bold text-[16px] md:text-[26px] lg:text-[26px] leading-[24px]'>
                                {t("contactInfo")}
                            </div>
                            <div className='font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px]  '>
                                {t("contactInfoDes")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SampleShipping



