import Image from "next/image";
import HomePageSectionHeader from "./HomePageSectionHeader";
import OfferingsImage from '../public/Images/Home/servicesImage.jpg'
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from 'next/navigation'

const Offerings = () => {
  const t = useTranslations("HomePage.OurServices");
  const language = usePathname().split("/")[1];
  return(
    <section className="md:flex items-center justify-center w-full md:h-[672px]">
    <div className='md:w-[70%] h-full flex items-center justify-start text-[#333333]'>
      <div className='w-full md:pl-[42px] lg:pl-[62px] pr-[20px] flex flex-col gap-[6px] md:gap-[32px]'>
        <HomePageSectionHeader title={"Our services"} subTitle={"Our Services"}></HomePageSectionHeader>
        <div className='px-[31px] md:pl-[50px] lg:pl-[110px] flex flex-col items-start justify-start gap-[6px] md:gap-[24px]'>
        <a href={`/${language}/Services`}>
        <button className="flex items-center font-DM-Sans text-[18px] md:text-[36px] font-medium leading-[24px] md:leading-[42px] gradient-primary bg-clip-text text-transparent">OFFERINGS {ArrowRightIconSmall} {ArrowRightIcon}</button>
        </a>
        <span className="font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[20px] md:leading-[34px]">
          {t("description")}
        </span>
        <div className="py-[20px] md:py-[0px] w-full flex flex-wrap items-center justify-center md:justify-between gap-[10px] font-DM-Sans font-normal text-[12px] leading-[22px] md:text-[20px] md:leading-[42px] ">
          <span className="flex items-center justify-center">{t("service1")}</span>
          <div className='h-[40px] md:h-[42px] border-l-[1px] border-[#717171] border-opacity-[50%]'></div>
          <span className="flex items-center justify-center">{t("service2")}</span>
          <div className='hidden md:block h-[42px] border-l-[1px] border-[#717171] border-opacity-[50%]'></div>
          <span className="w-full md:w-auto flex items-center justify-center">{t("service3")}</span>
        </div>
      </div>
      </div>
    </div>
    <div className='md:w-[30%] md:h-full px-[31px] md:px-[0px] flex items-center justify-center'>
        <Image src={OfferingsImage} alt='OfferingsImage' className='h-[188px] w-[307px] object-cover md:h-full md:w-full rounded-md md:rounded-none'></Image>
    </div>
  </section>
  )};

  export default Offerings;

  const ArrowRightIcon = <svg className='hidden md:block' width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.33 18.794C12.541 19.0047 12.8269 19.123 13.125 19.123C13.4231 19.123 13.7091 19.0047 13.92 18.794L20.295 12.419C20.5057 12.2081 20.624 11.9222 20.624 11.624C20.624 11.3259 20.5057 11.04 20.295 10.829L13.92 4.45404C13.7068 4.25507 13.4246 4.14668 13.1331 4.15172C12.8415 4.15676 12.5632 4.27483 12.357 4.48104C12.1508 4.68726 12.0327 4.96549 12.0277 5.25708C12.0227 5.54867 12.131 5.83082 12.33 6.04404L16.785 10.499H5.62501C5.32664 10.499 5.0405 10.6176 4.82952 10.8285C4.61854 11.0395 4.50001 11.3257 4.50001 11.624C4.50001 11.9224 4.61854 12.2086 4.82952 12.4195C5.0405 12.6305 5.32664 12.749 5.62501 12.749H16.785L12.33 17.204C12.1193 17.415 12.001 17.7009 12.001 17.999C12.001 18.2972 12.1193 18.5831 12.33 18.794Z" fill="url(#paint0_linear_277_1151)"/>
  <defs>
  <linearGradient id="paint0_linear_277_1151" x1="20.624" y1="11.6373" x2="4.50001" y2="11.6373" gradientUnits="userSpaceOnUse">
  <stop offset="0.1" stopColor="#60B7CF"/>
  <stop offset="0.745" stopColor="#3E8DA7"/>
  <stop offset="1" stopColor="#003E5C" stopOpacity="0.6"/>
  </linearGradient>
  </defs>
  </svg>

  const ArrowRightIconSmall = <svg className='md:hidden' width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.275 16.1623C10.4508 16.3379 10.689 16.4365 10.9375 16.4365C11.1859 16.4365 11.4242 16.3379 11.6 16.1623L16.9125 10.8498C17.088 10.6741 17.1866 10.4358 17.1866 10.1873C17.1866 9.93891 17.088 9.70063 16.9125 9.52485L11.6 4.21235C11.4223 4.04655 11.1872 3.95622 10.9442 3.96042C10.7012 3.96461 10.4693 4.06301 10.2975 4.23485C10.1256 4.4067 10.0272 4.63856 10.023 4.88155C10.0188 5.12454 10.1092 5.35967 10.275 5.53735L13.9875 9.24985H4.68747C4.43883 9.24985 4.20037 9.34862 4.02456 9.52444C3.84874 9.70025 3.74997 9.93871 3.74997 10.1873C3.74997 10.436 3.84874 10.6744 4.02456 10.8503C4.20037 11.0261 4.43883 11.1248 4.68747 11.1248H13.9875L10.275 14.8373C10.0994 15.0131 10.0008 15.2514 10.0008 15.4998C10.0008 15.7483 10.0994 15.9866 10.275 16.1623Z" fill="url(#paint0_linear_1192_6975)"/>
  <defs>
  <linearGradient id="paint0_linear_1192_6975" x1="17.1866" y1="10.1984" x2="3.74997" y2="10.1984" gradientUnits="userSpaceOnUse">
  <stop offset="0.1" stopColor="#60B7CF"/>
  <stop offset="0.745" stopColor="#3E8DA7"/>
  <stop offset="1" stopColor="#003E5C" stopOpacity="0.6"/>
  </linearGradient>
  </defs>
  </svg>
