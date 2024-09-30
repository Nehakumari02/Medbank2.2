import React from 'react'
import SnackBar from '@/components/SnackBar'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

const CancellationPolicy = ({params:{locale}}) => {
    unstable_setRequestLocale(locale);
    const t = useTranslations("Cancellation Policy");
    return (
        <>
            <section className="pl-[38px] pr-[24px] md:pl-[156px] md:pr-[95px] w-full flex flex-col items-center justify-center text-[#333333] px-4">
                <div className="relative max-w-screen-lg w-full pt-[30px] md:pt-[60px] flex flex-col items-start gap-[24px]">
                    <div className="absolute top-[34px] left-[-29px]  md:top-[60px] md:left-[-70px]">
                        <SnackBar text={"Cancellation Policy"} />
                    </div>
                    <h2 className="w-full leading-[24px] font-DM-Sans text-[16px] md:text-[32px] font-medium text-start">
                      {t("title")}
                    </h2>
                    <div>
                        <div className="font-DM-Sans font-medium text-[16px] md:text-[24px] leading-[36px]">
                        {t("section1.title")}
                        </div>
                        <span className='font-normal font-DM-Sans text-[16px] md:text-[24px] leading-[36px]'>
                            {t("section1.content")}.<br />
                            {t("section1.content1")}<br />
                            {t("section1.content2")}<br />
                            {t("section1.content3")}
                        </span>
                    </div>

                    <div className='text-[16px] md:text-[24px]'>
                        <div className="font-DM-Sans font-medium leading-[36px]">
                        {t("section2.title")}
                        </div>
                        <span className='font-normal font-DM-Sans leading-[36px]'>
                        {t("section2.content")}
                        </span>
                    </div>

                    <div className='text-[16px] md:text-[24px]'>
                        <div className="font-DM-Sans font-medium leading-[36px]">
                        {t("section3.title")}
                        </div>
                        <span className='font-normal font-DM-Sans leading-[36px]'>
                        {t("section2.content")}
                        </span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CancellationPolicy


