import React from 'react'
import HomePageSectionHeader2 from '../../../../components/HomePageSectionHeader2'
import Orderflow2 from '../../../../public/Images/Home/Orderflow2.png'
import Orderflow3 from '../../../../public/Images/Home/Orderflow3.png'
import Orderflow4 from '../../../../public/Images/Home/Orderflow4.png'
import Orderflow5 from '../../../../public/Images/Home/Orderflow5.png'
import Orderflow6 from '../../../../public/Images/Home/Orderflow6.png'
import Orderflow7 from '../../../../public/Images/Home/Orderflow7.png'
import Orderflow8 from '../../../../public/Images/Home/Orderflow8.png'
import Orderflow9 from '../../../../public/Images/Home/Orderflow9.png'
import Orderflow10 from '../../../../public/Images/Home/Orderflow10.png'
import Orderflow11 from '../../../../public/Images/Home/Orderflow11.png'
import Orderflow12 from '../../../../public/Images/Home/Orderflow12.png'
import Orderflow13 from '../../../../public/Images/Home/Orderflow13.png'
import Orderflow1 from '../../../../public/Images/Home/Orderflow1.png'
import Image from 'next/image'
import Link from 'next/link'
import SnackBar from '../../../../components/SnackBar'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

const OrderFlow = ({params:{locale}}) => {
    unstable_setRequestLocale(locale);
    const t = useTranslations("OrderFlow");
    return (
        <section className='pl-[38px] pr-[24px] md:pl-[156px] md:pr-[95px] w-full flex flex-col justify-center items-center'>
            <div className='max-w-[1056px] w-full flex flex-col items-start'>
                <div className='text-[#333333] pt-[24px] md:pt-[60px]'>
                    <div className='font-DM-Sans font-medium text-[14px] md:text-[18px] leading-[24px]'>
                        steps
                    </div>
                </div>

                <div className='relative text-[#333333] pt-[10px] md:pt-[40px]'>
                    <div className="absolute top-[-18px] left-[-29px] md:top-[-18px] md:left-[-44px]">
                        <SnackBar text={"Order Flow"} />
                    </div>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2 title={"1"} subTitle={t('step1')} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px]'>
                        {t.rich('des1', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br />
                        })}
                        <div className='pt-[6px] md:pt-[12px]'>
                        <Link href="/Signup" className="h-[40px] w-[117px] rounded-[6px] flex items-center justify-center gradient-primary text-white">{t("button")}</Link>
                        </div>
                    </div>
                    <br />
                    
                    <div className='pt-[40px]'>
                        <Image src={t("img1")}  alt="Order Flow" layout='intrinsic' width={996} height={996} unoptimized/>
                    </div>
                </div>

                <div className='text-[#333333] pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2 title={"2"} subTitle={t('step2')} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px] '>
                        {t.rich('des2', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br />
                        })}
                    </div>
                    <br />
                    <div className='pt-[40px]'>
                        <Image src={t("img2")}  alt="Order Flow" layout='intrinsic' width={996} height={996} unoptimized/>
                    </div>
                </div>

                <div className='text-[#333333] pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2 title={"3"} subTitle={t('step3')} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px] '>
                        {t.rich('des3', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br />
                        })}
                    </div>
                    <br />
                    <div className='pt-[40px]'>
                        <Image src={t("img3")}  alt="Order Flow" layout='intrinsic' width={996} height={996} unoptimized/>
                    </div>
                </div>

                <div className='text-[#333333] pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2 title={"4"} subTitle={t('step4')} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px] '>
                        {t.rich('des4', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br />
                        })}
                    </div>
                    <br />
                    <div className='pt-[40px]'>
                        <Image src={t("img4")}  alt="Order Flow" layout='intrinsic' width={996} height={996} unoptimized/>
                    </div>
                </div>

                <div className='text-[#333333] pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2 title={"5"} subTitle={t('step5')} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px] '>
                        {t.rich('des5', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br />
                        })}
                    </div>
                    <br />
                    <div className='pt-[40px]'>
                        <Image src={t("img5")}  alt="Order Flow" layout='intrinsic' width={996} height={996} unoptimized/>
                    </div>
                </div>

                <div className='text-[#333333] pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2 title={"6"} subTitle={t('step6')} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px] '>
                        {t.rich('des6', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br />
                        })}
                    </div>
                    <br />
                    <div className='pt-[40px]'>
                        <Image src={t("img6")}  alt="Order Flow" layout='intrinsic' width={996} height={996} unoptimized/>
                    </div>
                </div>

                <div className='text-[#333333] pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2 title={"7"} subTitle={t('step7')} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px] '>
                        {t.rich('des7', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br />
                        })}
                    </div>
                    <br />
                    <div className='pt-[40px]'>
                        <Image src={t("img7")}  alt="Order Flow" layout='intrinsic' width={996} height={996} unoptimized/>
                    </div>
                </div>

                <div className='text-[#333333] pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2 title={"8"} subTitle={t('step8')} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px] '>
                        {t.rich('des8', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br />
                        })}
                    </div>
                    <br />
                    <div className='pt-[40px]'>
                        <Image src={t("img8")}  alt="Order Flow" layout='intrinsic' width={996} height={996} unoptimized/>
                    </div>
                </div>

                <div className='text-[#333333] pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2 title={"9"} subTitle={t('step9')} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px] '>
                        {t.rich('des9', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br />
                        })}
                    </div>
                    <br />
                    <div className='pt-[40px]'>
                        <Image src={t("img9")}  alt="Order Flow" layout='intrinsic' width={996} height={996} unoptimized/>
                    </div>
                </div>

                <div className='text-[#333333] pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2 title={"10"} subTitle={t('step10')} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px] '>
                        {t.rich('des10', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br />
                        })}
                    </div>
                    <br />
                    <div className='pt-[40px]'>
                        <Image src={t("img10")}  alt="Order Flow" layout='intrinsic' width={996} height={996} unoptimized/>
                    </div>
                </div>

                <div className='text-[#333333] pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2 title={"11"} subTitle={t('step11')} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px] '>
                        {t.rich('des11', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br />
                        })}
                    </div>
                    <br />
                    <div className='pt-[40px]'>
                        <Image src={t("img11")}  alt="Order Flow" layout='intrinsic' width={996} height={996} unoptimized/>
                    </div>
                </div>

                <div className='text-[#333333] pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2 title={"12"} subTitle={t('step12')} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px] '>
                        {t.rich('des12', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br />
                        })}
                    </div>
                    <br />
                    <div className='pt-[40px]'>
                        <Image src={t("img12")}  alt="Order Flow" layout='intrinsic' width={996} height={996} unoptimized/>
                    </div>
                </div>

                <div className='text-[#333333] pt-[40px]'>
                    <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
                        <HomePageSectionHeader2 title={"13"} subTitle={t('step13')} />
                    </div>
                    <div className='max-w-[996.45px] w-full font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[35px] '>
                        {t.rich('des13', {
                            Link: (chunks) => <Link href="" className='text-[#3E8DA7] underline'>{chunks}</Link>,
                            br: () => <br />
                        })}
                    </div>
                    <br />
                    <div className='pt-[40px]'>
                        <Image src={t("img13")}  alt="Order Flow" layout='intrinsic' width={996} height={996} unoptimized/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrderFlow
