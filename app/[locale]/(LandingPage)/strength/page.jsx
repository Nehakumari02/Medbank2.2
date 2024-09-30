import Image from 'next/image';
import strength1 from '../../../../public/Images/Home/strength1.jpg'
import strength2 from '../../../../public/Images/Home/strength2.jpg'
import strength3 from '../../../../public/Images/Home/strength3.png'
import strength4 from '../../../../public/Images/Home/strength4.png'
import strength5 from '../../../../public/Images/Home/strength5.png'
import strength6 from '../../../../public/Images/Home/strength6.png'
import strength7 from '../../../../public/Images/Home/strength7.png'
import strength8 from '../../../../public/Images/Home/strength8.png'
import strength9 from '../../../../public/Images/Home/strength9.png'
import strength10 from '../../../../public/Images/Home/strength10.png'
import SnackBar from '@/components/SnackBar';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function StrengthPage({params:{locale}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("OurStrength");
  return (
    <>
      <section className="pl-[38px] pr-[24px] md:pl-[156px]  lg:pl-[236px]   md:pr-[95px] w-full flex flex-col items-center justify-center md:justify-start text-[#333333] gap-[24px] md:gap-[70px]  lg:gap-[100px] ">
        <div className="relative max-w-screen-lg w-full lg:w-[1057px] flex flex-col items-start gap-[6px] md:gap-[10px] lg:gap-[24px] pt-[20px] md:pt-[40px] lg:pt-[60px] ">
          <div className="absolute top-[28px] left-[-29px] md:top-[45px] lg:top-[68px]  md:left-[-54px]">
            <SnackBar text={"Our Strength"} />
          </div>
          <div className=' flex flex-col gap-[6px] md:gap-[20px]'>

            <h2 className="w-full lg:w-[110px] leading-6 font-DM-Sans text-[14px] md:text-[18px] font-medium">Our Strength</h2>
            <div className="w-full lg:w-[864px] text-[16px] md:text-[28px] lg:text-[28px] font-bold leading-8 lg:leading-10">
              {t("strength1.title")}
            </div>
          </div>
          <div className="font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px] ">
            {t("strength1.description")}
          </div>
          <span className='font-DM-Sans font-medium text-[16px] md:text-[28px] '>
            Benefits
          </span>
          <div>
            <ol className='font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-8 '>
              <li>1. {t("strength1.benefit.b1")} </li>
              <li>2. {t("strength1.benefit.b2")} </li>
              <li>3. {t("strength1.benefit.b3")} </li>
            </ol>
          </div>
        </div>
        <div className='flex flex-col items-start md:items-center md:flex-row md:justify-start w-full lg:w-[1057px] gap-[12px] md:gap-[23px] '>
          <div className=''>
            <Image src={strength7} alt='strength1' layout='responsive' className=' h-full object-contain rounded-lg  max-h-[336px] ' />
          </div>
          <div className=''>
            <Image src={strength8} alt='strength2' layout='responsive' className=' h-full object-contain rounded-lg  max-h-[336px] ' />
          </div>
        </div>
        <div className="w-full lg:w-[1057px]   flex flex-col items-start gap-[6px] md:gap-[10px] lg:gap-[24px]">
          <div className='flex flex-col gap-[20px] md:gap-[6px]'>
            <h2 className="w-full lg:w-[110px] leading-6 font-DM-Sans text-[14px] md:text-[18px] font-medium">Our Strength</h2>
            <div className="w-full lg:w-[864px] text-[16px] md:text-[28px] lg:text-[28px] font-bold leading-8 lg:leading-10">
            {t("strength2.title")}
            </div>
          </div>
          <div className="font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px]">
          {t("strength2.description")}
          </div>
          <span className='font-DM-Sans font-medium text-[16px] md:text-[28px]'>
            Benefits
          </span>
          <div>
            <ol className='font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-8'>
              <li>1. {t("strength2.benefit.b1")} </li>
              <li>2. {t("strength2.benefit.b2")} </li>
              <li>3. {t("strength2.benefit.b3")} </li>
            </ol>
          </div>
        </div>
        <div className='flex flex-col items-start md:items-center md:flex-row md:justify-start w-full lg:w-[1057px] gap-[12px] md:gap-[23px] '>
          <div className=''>
            <Image src={strength1} alt='strength1' layout='responsive' className=' h-full object-contain rounded-lg  max-h-[336px] ' />
          </div>
          <div className=''>
            <Image src={strength2} alt='strength2' layout='responsive' className=' h-full object-contain rounded-lg  max-h-[336px] ' />
          </div>
        </div>
        <div className="w-full lg:w-[1057px]   flex flex-col items-start gap-[6px] md:gap-[10px] lg:gap-[24px]">
          <div className='flex flex-col gap-[20px] md:gap-[6px]'>
            <h2 className="w-full lg:w-[110px] leading-6 font-DM-Sans text-[14px] md:text-[18px] font-medium">Our Strength</h2>
            <div className="w-full lg:w-[864px] text-[16px] md:text-[28px] lg:text-[28px] font-bold leading-8 lg:leading-10">
            {t("strength3.title")}
            </div>
          </div>
          <div className="font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px]">
          {t("strength3.description")}
          </div>
          <span className='font-DM-Sans font-medium text-[16px] md:text-[28px]'>
            Benefits
          </span>
          <div>
            <ol className='font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-8'>
              <li>1. {t("strength3.benefit.b1")} </li>
              <li>2. {t("strength3.benefit.b2")} </li>
              <li>3. {t("strength3.benefit.b3")} </li>
            </ol>
          </div>
        </div>
        <div className='flex flex-col items-start md:items-center md:flex-row md:justify-start w-full lg:w-[1057px] gap-[12px] md:gap-[23px] '>
          <div className=''>
            <Image src={strength3} alt='strength1' layout='responsive' className=' h-full object-contain rounded-lg  max-h-[336px] ' />
          </div>
          <div className=''>
            <Image src={strength4} alt='strength2' layout='responsive' className=' h-full object-contain rounded-lg  max-h-[336px] ' />
          </div>
        </div>
        <div className="w-full lg:w-[1057px]   flex flex-col items-start gap-[6px] md:gap-[10px] lg:gap-[24px]">
          <div className='flex flex-col gap-[20px] md:gap-[6px]'>
            <h2 className="w-full lg:w-[110px] leading-6 font-DM-Sans text-[14px] md:text-[18px] font-medium">Our Strength</h2>
            <div className="w-full lg:w-[864px] text-[16px] md:text-[28px] lg:text-[28px] font-bold leading-8 lg:leading-10">
            {t("strength4.title")}
            </div>
          </div>
          <div className="font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px]">
          {t("strength4.description")}
          </div>
          <span className='font-DM-Sans font-medium text-[16px] md:text-[28px]'>
            Benefits
          </span>
          <div>
            <ol className='font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-8'>
              <li>1. {t("strength4.benefit.b1")} </li>
              <li>2. {t("strength4.benefit.b2")} </li>
              <li>3. {t("strength4.benefit.b3")} </li>
            </ol>
          </div>
        </div>
        <div className='flex flex-col items-start md:items-center md:flex-row md:justify-start w-full lg:w-[1057px] gap-[12px] md:gap-[23px] '>
          <div className=''>
            <Image src={strength5} alt='strength1' layout='responsive' className=' h-full object-contain rounded-lg  max-h-[336px] ' />
          </div>
          <div className=''>
            <Image src={strength6} alt='strength2' layout='responsive' className=' h-full object-contain rounded-lg  max-h-[336px] ' />
          </div>
        </div>
        <div className="w-full lg:w-[1057px]   flex flex-col items-start gap-[6px] md:gap-[10px] lg:gap-[24px]">
          <div className='flex flex-col gap-[20px] md:gap-[6px]'>
            <h2 className="w-full lg:w-[110px] leading-6 font-DM-Sans text-[14px] md:text-[18px] font-medium">Our Strength</h2>
            <div className="w-full lg:w-[864px] text-[16px] md:text-[28px] lg:text-[28px] font-bold leading-8 lg:leading-10">
            {t("strength5.title")}
            </div>
          </div>
          <div className="font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px]">
          {t("strength5.description")}
          </div>
          <span className='font-DM-Sans font-medium text-[16px] md:text-[28px]'>
            Benefits
          </span>
          <div>
            <ol className='font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-8'>
              <li>1. {t("strength5.benefit.b1")} </li>
              <li>2. {t("strength5.benefit.b2")} </li>
              <li>3. {t("strength5.benefit.b3")} </li>
            </ol>
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-start md:items-center md:justify-start w-full lg:w-[1057px] gap-[12px] md:gap-[23px] '>
          <div className=''>
            <Image src={strength9} alt='strength1' layout='responsive' className=' h-full object-contain rounded-lg  max-h-[336px] ' />
          </div>
          <div className=''>
            <Image src={strength10} alt='strength2' layout='responsive' className=' h-full object-contain rounded-lg  max-h-[336px] ' />
          </div>
        </div>
      </section>
    </>
  );
}
