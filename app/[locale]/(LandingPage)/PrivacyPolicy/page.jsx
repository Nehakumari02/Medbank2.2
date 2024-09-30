import React from 'react'
import HomePageSectionHeader2 from '../../../../components/HomePageSectionHeader2'
import SnackBar from '@/components/SnackBar'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'


const PrivacyPolicyPage = ({params:{locale}}) => {
    unstable_setRequestLocale(locale);
    const t = useTranslations("Privacy Policy");
    return (
        <section className='pl-[38px] pr-[24px] md:pl-[156px] md:pr-[95px] w-full flex flex-col justify-center items-center font-DM-Sans'>
            <div className='max-w-[1056px] w-full flex flex-col items-start'>
                <div className='relative text-[#333333] pt-[18px] md:pt-[60px] pl-[9px] md:pl-[25px]'>
                    <div className="absolute top-[24px] left-[-29px] md:top-[60px] md:left-[-44px]">
                        <SnackBar text={"Privacy Policy"} />
                    </div>
                    <div className='font-DM-Sans font-bold text-[16px] md:text-[32px] leading-[24px] md:leading-[40px]'>
                    {t("title")}
                    </div>
                    <div className='font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pt-[6px] md:pt-[35px]'>
                    {t("content")}
                        
                    </div>
                </div>

                <div className='text-[#333333] pt-[24px] md:pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2
                            title="1"
                            subTitle={t("section1.title")}
                        />
                    </div>
                    <div className='max-w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t("section1.content")} <br />
                    {t("section1.content1")} <br />
                    {t("section1.content2")} <br />
                    </div>
                </div>

                <div className='text-[#333333] pt-[24px] md:pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2
                            title="2"
                            subTitle={t("section2.title")}
                        />
                    </div>
                    <div className='max-w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t("section2.content")} <br />
                    {t("section2.content1")} <br />
                    {t("section2.content2")}
                    </div>
                </div>

                <div className='text-[#333333] pt-[24px] md:pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2
                            title="3"
                            subTitle={t("section3.title")}
                        />
                    </div>
                    <div className='max-w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t("section3.content")}
                    </div>
                </div>

                <div className='text-[#333333] pt-[24px] md:pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2
                            title="4"
                            subTitle={t("section4.title")}
                        />
                    </div>
                    <div className='max-w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t("section4.content")}
                    </div>
                </div>

                <div className='text-[#333333] pt-[24px] md:pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2
                            title="5"
                            subTitle={t("section5.title")}
                        />
                    </div>
                    <div className='max-w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px]  '>
                    {t("section5.content")}
                    </div>
                </div>

                <div className='text-[#333333] pt-[24px] md:pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2
                            title="6"
                            subTitle={t("section6.title")}
                        />
                    </div>
                    <div className='max-w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t("section6.content")}
                    </div>
                </div>

                <div className='text-[#333333] pt-[24px] md:pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2
                            title="7"
                            subTitle={t("section7.title")}
                        />
                    </div>
                    <div className='max-w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t("section7.content")}
                    </div>
                </div>

                <div className='text-[#333333] pt-[24px] md:pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2
                            title="8"
                            subTitle={t("section8.title")}
                        />
                    </div>
                    <div className='max-w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t("section8.content")}
                    </div>
                </div>

                <div className='text-[#333333] pt-[24px] md:pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2
                            title="9"
                            subTitle={t("section9.title")}
                        />
                    </div>
                    <div className='max-w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t("section9.content")}
                    </div>
                </div>

                <div className='text-[#333333] pt-[24px] md:pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2
                            title="10"
                            subTitle={t("section10.title")}
                        />
                    </div>
                    <div className='max-w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t("section10.content")}
                    </div>



                </div>
                <div className='text-[#333333] pt-[24px] md:pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2
                            title="11"
                            subTitle={t("section11.title")}
                        />
                    </div>
                    <div className='max-w-full font-sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t("section11.content")}<br />
                    {t("section11.content1")} <br />
                    {t("section11.content2")} <br />
                    {t("section11.content3")}<br />
                    {t("section11.content4")}<br />
                    {t("section11.content5")} <br /><br />

                    {t("section11.content6")} <br></br>
                    {t("section11.content7")} <br />
                    {t("section11.content8")} <br />
                    {t("section11.content9")} <br /><br />

                    {t("section11.content10")} <br />
                    {t("section11.content11")} <br />
                    {t("section11.content12")} <br /><br />

                    {t("section11.content13")}<br />
                    {t("section11.content14")} <br />
                    {t("section11.content15")}<br /><br />

                    {t("section11.content16")} <br />
                    {t("section11.content17")}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PrivacyPolicyPage
