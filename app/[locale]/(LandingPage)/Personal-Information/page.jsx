import React from 'react'
import HomePageSectionHeader2 from '../../../../components/HomePageSectionHeader2'
import SnackBar from '@/components/SnackBar'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

const PersonalInformation= ({params:{locale}}) => {
    unstable_setRequestLocale(locale);
    const t = useTranslations("PersonalInformation");
    return (
        <section className='pl-[38px] pr-[24px] md:pl-[156px] md:pr-[95px] w-full flex flex-col justify-center items-center font-DM-Sans'>
            <div className='max-w-[1056px] w-full flex flex-col items-start'>
                <div className='relative text-[#333333] pt-[30px] md:pt-[60px] pl-[25px]'>
                    <div className="absolute top-[34px] left-[-29px] md:top-[60px] md:left-[-44px]">
                        <SnackBar text={"Personal Information"} />
                    </div>
                    <div className='font-DM-Sans font-bold text-[16px] md:text-[28px]  lg:text-[32px] leading-[36px]'>
                        {t("header")}
                    </div>
                    <div className='font-normal text-[12px] md:text-[24px] leading-[34px] pt-[20px] md:pt-[32px]'>
                    {t("description")}
                    </div>
                </div>
                <div className='text-[#333333] pt-[20px] md:pt-[32px]'>
                    <div className='flex flex-col text-[18px] md:text-[28px] pb-[6px]'>
                        <HomePageSectionHeader2 title={"1"} subTitle={t("section1.title")} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t.rich('section1.description', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br/>
                            })}
                    </div>
                </div>

                <div className='text-[#333333] pt-[32px] md:pt-[40px]'>
                    <div className='flex flex-col text-[18px] md:text-[28px] pb-[6px]'>
                        <HomePageSectionHeader2 title={"2"} subTitle={t("section2.title")}/>
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t.rich('section2.description', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br/>
                            })}
                    </div>
                </div>

                <div className='text-[#333333] pt-[32px] md:pt-[40px]'>
                    <div className='flex flex-col text-[18px] md:text-[28px] pb-[6px]'>
                        <HomePageSectionHeader2 title={"3"} subTitle={t("section3.title")} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t.rich('section3.description', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br/>
                            })}
                    </div>
                </div>

                <div className='text-[#333333] pt-[32px] md:pt-[40px]'>
                    <div className='flex flex-col text-[18px] md:text-[28px] pb-[6px]'>
                        <HomePageSectionHeader2 title={"4"} subTitle={t("section4.title")} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t.rich('section4.description', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br/>
                            })}
                    </div>
                </div>

                <div className='text-[#333333] pt-[32px] md:pt-[40px]'>
                    <div className='flex flex-col text-[18px] md:text-[28px] pb-[6px]'>
                        <HomePageSectionHeader2 title={"5"} subTitle={t("section5.title")} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t.rich('section5.description', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br/>
                            })}
                    </div>
                </div>

                <div className='text-[#333333] pt-[32px] md:pt-[40px]'>
                    <div className='flex flex-col text-[18px] md:text-[28px] pb-[6px]'>
                        <HomePageSectionHeader2 title={"6"} subTitle={t("section6.title")} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t.rich('section6.description', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br/>
                            })}
                    </div>
                </div>

                <div className='text-[#333333] pt-[32px] md:pt-[40px]'>
                    <div className='flex flex-col text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2 title={"7"} subTitle={t("section7.title")}/>
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[24px] leading-[34px] pl-[35px] '>
                    {t.rich('section7.description', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br/>
                            })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PersonalInformation
