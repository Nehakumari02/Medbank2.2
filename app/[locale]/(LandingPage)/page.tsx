'use client'
import Offerings from '../../../components/Offerings'
import PriceTable from '../../../components/PriceTable'
import Process from '../../../components/Process'
import RecentAnnouncement from '../../../components/RecentAnnouncement'
import FAQ from '../../../components/FAQ'
import ContactUs from '../../../components/ContactUs'
import HomePageSectionHeader from '../../../components/HomePageSectionHeader'
import CreateAccount from '../../../components/CreateAccount'
import Image from 'next/image'
import HeroImage from '../../../public/Images/Home/heroImage1.jpg'
import AboutUsImage from '../../../public/Images/Home/aboutUsHome.jpg'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'

// type Props={
//   params:{locale:string}
// }

export default function HomePage() {
  // unstable_setRequestLocale(locale); // Set the locale dynamically
  const t = useTranslations("HomePage");
  const language = usePathname().split("/")[1];
  return (
    <div className="font-DM-Sans">
      <section className="flex items-center justify-center w-full h-[235px] md:h-[523px] lg:h-[651px]">
        <div className='w-[30%] h-full'>
          <Image src={HeroImage} alt='HeroImage' className='h-full w-full object-cover'></Image>
        </div>
        <div className='px-[12px] w-[70%] md:px-[50px] lg:px-[110px] h-full flex items-center justify-start'>
          <div className=' w-full flex flex-col gap-[12px] md:gap-[32px]'>
            <div className='flex flex-col items-start gap-[14px] text-[#333333] font-serif font-normal text-[18px] md:text-[42px] lg:text-[57px] leading-[28px] md:leading-[80px] tracking-tracking-minus-0.25'>
              {t("HeroSection1.title1")} <br className='hidden lg:block' />
              {t("HeroSection1.title2")} <br className='hidden lg:block' />
              {t("HeroSection1.title3")}
              <p className="font-normal text-[12px] md:text-[28px] leading-[22px] md:leading-[42px] p-0 m-0">{t("HeroSection1.description1")} <br /> {t("HeroSection1.description2")}</p>
            </div>
            <a href={`/${language}/Services`}>
              <button className="h-[28px] w-[121px] md:h-[40px] md:w-[237px] py-[8px] pl-[6px] pr-[6px] lg:py-[10px] lg:pl-[16px] lg:pr-[24px] flex items-center justify-center gap-[6px] md:gap-[8px] bg-[#FFAA00] rounded-full text-[#003E5C] text-[8px]  leading-[20px] font-normal md:text-[16px] ">{DmIcon} {DmIconSmall} {t("HeroSection1.contactUs")} </button>
            </a>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center w-full h-[200px] md:h-[420px] lg:h-[518px]">
        <div className='w-[30%] h-full'>
          <Image src={t("AboutUs.img1")} alt='AboutUsImage' width={996} height={996} unoptimized className='h-full w-full object-cover'></Image>
        </div>
        <div className='w-[70%] h-full flex items-center justify-start text-[#333333]'>
          <div className='md:h-[310px] w-full flex flex-col gap-[6px] md:gap-[32px]'>
            <HomePageSectionHeader title={"About Us"} subTitle={"About Us"}></HomePageSectionHeader>
            <div className='px-[31px] md:px-[50px] lg:px-[110px]'>
              <span className="font-DM-Sans text-[18px] md:text-[36px] font-medium leading-[24px] md:leading-[42px] gradient-primary bg-clip-text text-transparent">MEDBANK</span>
              <p className="font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[20px] md:leading-[34px]">
                {t("AboutUs.description")}
              </p>
              <a href={`/${language}/about`}>
                <button className="hidden md:flex items-center justify-center gap-[12px] border-none font-sans font-bold text-[18px] leading-[42px] gradient-primary bg-clip-text text-transparent">Read More {ArrowRightSmallIcon}</button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="md:px-[42px] lg:px-[62px] py-[30px] md:py-[100px] w-full text-[#333333]">
        <div className='px-[31px] md:pl-[50px] lg:pl-[90px] w-full flex flex-col items-start gap-[6px] md:gap-[32px]'>
        <HomePageSectionHeader title={"Our Strength"} subTitle={"Our Strength"} />
        <a href={`/${language}/strength`} className="flex items-center font-DM-Sans text-[18px] md:text-[36px] font-medium leading-[24px] md:leading-[42px] gradient-primary bg-clip-text text-transparent">EXPERTIZE {ArrowRightIconSmall} {ArrowRightIcon}</a>
          <p className="font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[20px] md:leading-[34px] mb-0">
            {t("OurStrength.description")}
          </p>
          <div className="flex flex-col gap-[10px] md:gap-[42px] items-center justify-center w-full font-DM-Sans font-normal text-[12px] leading-[22px] md:text-[16px] md:leading-[42px]">
            <div className="flex items-end justify-between w-full h-[70px] md:h-[100px] gap-[10px]">
              <span className='text-center w-[50%] mr-[4px] h-[64px] flex items-center justify-center border-b-[1px] border-[#717171] border-opacity-[50%]'>{t("OurStrength.expertise1")}</span>
              <div className='h-[50px] mb-[10px] md:mb-[0px] md:h-[100px] border-l-[1px] border-[#717171] border-opacity-[50%]'> </div>
              <span className='text-center w-[50%] ml-[4px] h-[64px] flex items-center justify-center border-b-[1px] border-[#717171] border-opacity-[50%]'>{t("OurStrength.expertise2")}</span>
            </div>
            <div className="flex items-end justify-between w-full h-[70px] md:h-[100px] gap-[10px]">
              <span className='text-center w-[50%] mr-[4px] h-[64px] flex items-center justify-center border-b-[1px] border-[#717171] border-opacity-[50%]'>{t("OurStrength.expertise3")}</span>
              <div className='h-[50px] mb-[10px] md:mb-[0px] md:h-[100px] border-l-[1px] border-[#717171] border-opacity-[50%]'></div>
              <span className='text-center w-[50%] ml-[4px] h-[64px] flex items-center justify-center border-b-[1px] border-[#717171] border-opacity-[50%]'>{t("OurStrength.expertise4")}</span>
            </div>
            <div className="flex items-center md:w-[552px] justify-center h-[70px] md:h-[100px]">
              <span className="text-center h-[64px] w-full flex items-center justify-center border-b-[1px] border-[#717171] border-opacity-[50%] px-[20px]">{t("OurStrength.expertise5")}</span>
            </div>
          </div>

        </div>

      </section>
      <Offerings></Offerings>
      <PriceTable />
      <Process></Process>
      <RecentAnnouncement></RecentAnnouncement>
      <FAQ></FAQ>
      <div id="contactus"><ContactUs></ContactUs></div>

      <CreateAccount />
    </div>
  );
}

const DmIcon = <svg className='hidden md:block' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_1803_1757)">
    <path d="M15.3209 0.0478115L0.264889 7.61581C0.190222 7.65848 0.128889 7.71448 0.0808889 7.78381C0.0328889 7.85315 0.00622222 7.93048 0.000888889 8.01581C-0.00444444 8.10115 0.0142222 8.18115 0.0568889 8.25581C0.0995556 8.33048 0.158222 8.38915 0.232889 8.43181L3.75289 10.6078V15.5358C3.75289 15.6425 3.78222 15.7358 3.84089 15.8158C3.89956 15.8958 3.97689 15.9518 4.07289 15.9838C4.16889 16.0158 4.26756 16.0158 4.36889 15.9838C4.47022 15.9518 4.54756 15.8931 4.60089 15.8078L7.01689 12.6078L12.4249 15.9358C12.5636 16.0211 12.7102 16.0291 12.8649 15.9598C13.0196 15.8905 13.1076 15.7758 13.1289 15.6158L15.9929 0.543812C16.0142 0.458478 16.0062 0.373145 15.9689 0.287811C15.9316 0.202478 15.8782 0.133145 15.8089 0.079812C15.7396 0.0264788 15.6596 -0.0028553 15.5689 -0.00818825C15.4782 -0.0135212 15.3956 0.00514412 15.3209 0.0478115ZM4.20089 9.77581L1.43289 8.07981L12.4729 2.52781L4.20089 9.77581ZM4.69689 14.1278V10.5918L12.4569 3.79181L4.69689 14.1278ZM12.3289 14.7838L7.57689 11.8558L14.6969 2.36781L12.3289 14.7838Z" fill="#003E5C" />
  </g>
  <defs>
    <clipPath id="clip0_1803_1757">
      <rect width="16" height="16" fill="white" transform="matrix(1 0 0 -1 0 16)" />
    </clipPath>
  </defs>
</svg>

const DmIconSmall = <svg className='md:hidden' width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_276_1061)">
    <path d="M10.0756 0.0298824L0.665556 4.75988C0.618889 4.78655 0.580556 4.82155 0.550556 4.86488C0.520556 4.90822 0.503889 4.95655 0.500556 5.00988C0.497222 5.06322 0.508889 5.11322 0.535556 5.15988C0.562222 5.20655 0.598889 5.24322 0.645556 5.26988L2.84556 6.62988V9.70988C2.84556 9.77655 2.86389 9.83488 2.90056 9.88488C2.93722 9.93488 2.98556 9.96988 3.04556 9.98988C3.10556 10.0099 3.16722 10.0099 3.23056 9.98988C3.29389 9.96988 3.34222 9.93322 3.37556 9.87988L4.88556 7.87988L8.26556 9.95988C8.35222 10.0132 8.44389 10.0182 8.54056 9.97488C8.63722 9.93155 8.69222 9.85988 8.70555 9.75988L10.4956 0.339882C10.5089 0.286549 10.5039 0.233215 10.4806 0.179882C10.4572 0.126549 10.4239 0.0832157 10.3806 0.0498819C10.3372 0.0165491 10.2872 -0.00178432 10.2306 -0.00511837C10.1739 -0.00845146 10.1222 0.00321579 10.0756 0.0298824ZM3.12556 6.10988L1.39556 5.04988L8.29556 1.57988L3.12556 6.10988ZM3.43556 8.82988V6.61988L8.28556 2.36988L3.43556 8.82988ZM8.20556 9.23988L5.23556 7.40988L9.68556 1.47988L8.20556 9.23988Z" fill="#003E5C" />
  </g>
  <defs>
    <clipPath id="clip0_276_1061">
      <rect width="10" height="10" fill="white" transform="matrix(1 0 0 -1 0.5 10)" />
    </clipPath>
  </defs>
</svg>


const ArrowRightIcon = <svg className='hidden md:block' width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.33 18.794C12.541 19.0047 12.8269 19.123 13.125 19.123C13.4231 19.123 13.7091 19.0047 13.92 18.794L20.295 12.419C20.5057 12.2081 20.624 11.9222 20.624 11.624C20.624 11.3259 20.5057 11.04 20.295 10.829L13.92 4.45404C13.7068 4.25507 13.4246 4.14668 13.1331 4.15172C12.8415 4.15676 12.5632 4.27483 12.357 4.48104C12.1508 4.68726 12.0327 4.96549 12.0277 5.25708C12.0227 5.54867 12.131 5.83082 12.33 6.04404L16.785 10.499H5.62501C5.32664 10.499 5.0405 10.6176 4.82952 10.8285C4.61854 11.0395 4.50001 11.3257 4.50001 11.624C4.50001 11.9224 4.61854 12.2086 4.82952 12.4195C5.0405 12.6305 5.32664 12.749 5.62501 12.749H16.785L12.33 17.204C12.1193 17.415 12.001 17.7009 12.001 17.999C12.001 18.2972 12.1193 18.5831 12.33 18.794Z" fill="url(#paint0_linear_277_1151)" />
  <defs>
    <linearGradient id="paint0_linear_277_1151" x1="20.624" y1="11.6373" x2="4.50001" y2="11.6373" gradientUnits="userSpaceOnUse">
      <stop offset="0.1" stopColor="#60B7CF" />
      <stop offset="0.745" stopColor="#3E8DA7" />
      <stop offset="1" stopColor="#003E5C" stopOpacity="0.6" />
    </linearGradient>
  </defs>
</svg>

const ArrowRightSmallIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.33 18.794C12.541 19.0047 12.8269 19.123 13.125 19.123C13.4231 19.123 13.7091 19.0047 13.92 18.794L20.295 12.419C20.5057 12.2081 20.624 11.9222 20.624 11.624C20.624 11.3259 20.5057 11.04 20.295 10.829L13.92 4.45404C13.7068 4.25507 13.4246 4.14668 13.1331 4.15172C12.8415 4.15676 12.5632 4.27483 12.357 4.48104C12.1508 4.68726 12.0327 4.96549 12.0277 5.25708C12.0227 5.54867 12.131 5.83082 12.33 6.04404L16.785 10.499H5.62501C5.32664 10.499 5.0405 10.6176 4.82952 10.8285C4.61854 11.0395 4.50001 11.3257 4.50001 11.624C4.50001 11.9224 4.61854 12.2086 4.82952 12.4195C5.0405 12.6305 5.32664 12.749 5.62501 12.749H16.785L12.33 17.204C12.1193 17.415 12.001 17.7009 12.001 17.999C12.001 18.2972 12.1193 18.5831 12.33 18.794Z" fill="url(#paint0_linear_277_1151)" />
  <defs>
    <linearGradient id="paint0_linear_277_1151" x1="20.624" y1="11.6373" x2="4.50001" y2="11.6373" gradientUnits="userSpaceOnUse">
      <stop offset="0.1" stopColor="#60B7CF" />
      <stop offset="0.745" stopColor="#3E8DA7" />
      <stop offset="1" stopColor="#003E5C" stopOpacity="0.6" />
    </linearGradient>
  </defs>
</svg>

const ArrowRightIconSmall = <svg className='md:hidden' width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.275 16.1623C10.4508 16.3379 10.689 16.4365 10.9375 16.4365C11.1859 16.4365 11.4242 16.3379 11.6 16.1623L16.9125 10.8498C17.088 10.6741 17.1866 10.4358 17.1866 10.1873C17.1866 9.93891 17.088 9.70063 16.9125 9.52485L11.6 4.21235C11.4223 4.04655 11.1872 3.95622 10.9442 3.96042C10.7012 3.96461 10.4693 4.06301 10.2975 4.23485C10.1256 4.4067 10.0272 4.63856 10.023 4.88155C10.0188 5.12454 10.1092 5.35967 10.275 5.53735L13.9875 9.24985H4.68747C4.43883 9.24985 4.20037 9.34862 4.02456 9.52444C3.84874 9.70025 3.74997 9.93871 3.74997 10.1873C3.74997 10.436 3.84874 10.6744 4.02456 10.8503C4.20037 11.0261 4.43883 11.1248 4.68747 11.1248H13.9875L10.275 14.8373C10.0994 15.0131 10.0008 15.2514 10.0008 15.4998C10.0008 15.7483 10.0994 15.9866 10.275 16.1623Z" fill="url(#paint0_linear_1192_6975)" />
  <defs>
    <linearGradient id="paint0_linear_1192_6975" x1="17.1866" y1="10.1984" x2="3.74997" y2="10.1984" gradientUnits="userSpaceOnUse">
      <stop offset="0.1" stopColor="#60B7CF" />
      <stop offset="0.745" stopColor="#3E8DA7" />
      <stop offset="1" stopColor="#003E5C" stopOpacity="0.6" />
    </linearGradient>
  </defs>
</svg>
