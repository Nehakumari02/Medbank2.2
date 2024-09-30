import React from 'react'
import SnackBar from '@/components/SnackBar'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server';


const SitePolicy = ({params:{locale}}) => {
    unstable_setRequestLocale(locale);
    const t = useTranslations("Site Policy");

    return (
        <>
            <section className="pl-[38px] pr-[24px] md:pl-[156px] md:pr-[95px] w-full flex flex-col items-center justify-center text-[#333333] px-4">
                <div className= "relative max-w-screen-lg w-full pt-[24px] md:pt-[60px] flex flex-col items-start gap-[24px]">
                    <div className="absolute top-[28px] left-[-29px] md:top-[60px]  md:left-[-54px]">
                        <SnackBar text={"Site Policy"} />
                    </div>
                    <h2 className="text-center leading-[24px] font-DM-Sans text-[16px] sm:text-[32px] font-bold">
                    {t("title")}
                    </h2>
                    <span className='font-normal font-DM-Sans text-[12px] sm:text-[24px] leading-36px'>
                    {t("content")}
                    </span>
                    <div>
                        <div className="font-DM-Sans font-medium text-[24px] leading-36px">
                        {t("section1.title")}
                        </div>
                        <span className='font-normal font-DM-Sans text-[12px] sm:text-[24px] leading-36px'>
                        {t("section1.content")} <br />
                        {t("section1.content1")}<br />
                        {t("section1.content2")}
                        </span>
                    </div>
                    <div>
                        <div className="font-DM-Sans font-medium text-[12px] sm:text-[24px] leading-36px">
                        {t("section2.title")}
                        </div>
                        <span className='font-normal font-DM-Sans text-[12px] sm:text-[24px] leading-36px'>
                        {t("section2.content")} <br />
                        {t("section2.content1")}<br />
                        {t("section2.content2")}
                        </span>
                    </div>
                    <div>
                        <div className="font-DM-Sans font-medium text-[12px] sm:text-[24px] leading-36px">
                        {t("section3.title")}
                        </div>
                        <span className='font-normal font-DM-Sans text-[12px] sm:text-[24px] leading-36px'>
                        {t("section3.content")} <br />
                        {t("section3.content1")}<br />
                        {t("section3.content2")} <br />
                        </span>
                    </div>
                    <span className='font-normal font-DM-Sans text-[12px] sm:text-[24px] leading-36px'>
                    {t("section4.title")}
                    {t("section4.content")} <br />
                    {t("section4.content1")} <br />
                    {t("section4.content2")}
                    </span>
                    <span className='font-normal font-DM-Sans text-[12px] sm:text-[24px] leading-36px'>
                    {t("section5.content")} <br />
                    {t("section5.content1")} <br />
                    {t("section5.content2")} <br />
                    {t("section5.content3")} <br />
                    {t("section5.content4")} <br />
                    {t("section5.content5")} <br />
                    {t("section5.content6")} <br />
                    {t("section5.content7")} <br />
                    {t("section5.content8")} <br />
                    {t("section5.content9")}<br />
                    {t("section5.content10")} <br />
                    {t("section5.content11")} <br />
                    {t("section5.content12")} <br />
                    </span>
                </div>
            </section>
        </>
    )
}

export default SitePolicy

