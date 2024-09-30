"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/Images/Home/logo.png";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
  const t = useTranslations("Footer");
  const language = usePathname().split("/")[1];

  return (
    <footer className="px-[10px] lg:px-[62px] pb-[10px] lg:pb-[40px] pt-[24px] md:pt-[60px] ">
      {/* Map Section */}
      {/* <div className="w-full">
        <iframe
          className='rounded-[12px]'
          id='map_canvas'
          width="100%" 
          height="300" 
          loading='lazy'
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=MEDBANK%20PTE.%20LTD.+(MedBank)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
        </iframe>
      </div> */}
      <div>
	{language==="en"?
        <iframe
          className='rounded-[12px]'
          id='map_canvas'
          width="100%" 
          height="300" 
          loading='lazy'
          src="https://maps.google.com/maps?width=100%25&amp;height=200&amp;hl=en&amp;q=MEDBANK%20PTE.%20LTD.+()&amp;t=&amp;z=11&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>:
	<iframe
          className='rounded-[12px]'
          id='map_canvas'
          width="100%" 
          height="300" 
          loading='lazy'
          src="https://maps.google.com/maps?width=100%25&amp;height=200&amp;hl=ja&amp;q=MEDBANK%20PTE.%20LTD.+()&amp;t=&amp;z=11&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>}
      </div>
      {/* <div className="">
            <iframe 
            className='rounded-[12px]'
            id='map_canvas'
            width="100%" 
            height="300" 
            loading='lazy'
            src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=nagano+(MedBank)&amp;t=&amp;z=9&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
            
        </div> */}

      {/* Footer Section */}

      <div className="flex gap-[10px] md:gap-[23px] pt-[23px] font-DM-Sans tracking-tracking-0.5 font-normal text-[8px] md:text-[16px]">
        <div className="w-[40%] gradient-primary rounded-[12px] p-[1px] md:w-[30%] md:h-[260px] lg:h-[287px] ">
          <div className="bg-white rounded-[11px] w-full h-full flex flex-col gap-[20px] md:gap-[48px] items-center justify-center">
            <Image
              src={logo}
              alt="logo"
              className="h-[50px] w-[50px] md:h-[100px] md:w-[100px]"
            ></Image>
            <Link
              href={`/${language}#contactus`}
              className="h-[28px] md:h-[40px] w-[100px] md:w-[152px] lg:w-[237px] px-[6px] py-[8px] md:py-[10px] md:pl-[16px] md:pr-[24px] flex items-center justify-center gap-[6px] md:gap-[8px] bg-[#FFAA00] rounded-full text-[#003E5C]"
            >
              {DmIcon} Contact Us
            </Link>
          </div>
        </div>
        <div className="w-[60%] gradient-primary rounded-[12px] p-[1px] md:w-[70%] lg:h-[287px]">
          <div className="bg-white rounded-[11px] w-full h-full px-[24px] py-[12px] md:px-[36px] md:py-[36px] lg:px-[85px] lg:py-[52px] flex items-start justify-around font-DM-Sans font-medium text-[#333333] text-[10px] md:text-[18px] leading-[19px]">
            <div className="w-[45%] flex flex-col items-start justify-start gap-[6px] md:gap-[14px]">
              <Link className="" href={`/${language}/about`}>
                {t("aboutUs")}
              </Link>
              <Link className="" href={`/${language}/Services`}>
                {t("service")}
              </Link>
              <Link className="" href={`/${language}/SampleShipping`}>
                {t("sampleShipping")}
              </Link>
              <Link className="" href={`/${language}/strength`}>
                {t("strength")}
              </Link>
              <Link className="" href={`/${language}/Orderflow`}>
                {t("orderFlow")}
              </Link>
            </div>
            <div className="w-[45%] flex flex-col items-start justify-start gap-[6px] md:gap-[14px]">
              <Link className="" href={`/${language}/PrivacyPolicy`}>
                {t("privacyPolicy")}
              </Link>
              <Link className="" href={`/${language}/Personal-Information`}>
                {t("personalInfo")}
              </Link>
              <Link className="" href={`/${language}/CancellationPolicy`}>
                {t("cancellationPolicy")}
              </Link>
              <Link className="" href={`/${language}/SitePolicy`}>
                {t("sitePolicy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const DmIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1803_1757)">
      <path
        d="M15.3209 0.0478115L0.264889 7.61581C0.190222 7.65848 0.128889 7.71448 0.0808889 7.78381C0.0328889 7.85315 0.00622222 7.93048 0.000888889 8.01581C-0.00444444 8.10115 0.0142222 8.18115 0.0568889 8.25581C0.0995556 8.33048 0.158222 8.38915 0.232889 8.43181L3.75289 10.6078V15.5358C3.75289 15.6425 3.78222 15.7358 3.84089 15.8158C3.89956 15.8958 3.97689 15.9518 4.07289 15.9838C4.16889 16.0158 4.26756 16.0158 4.36889 15.9838C4.47022 15.9518 4.54756 15.8931 4.60089 15.8078L7.01689 12.6078L12.4249 15.9358C12.5636 16.0211 12.7102 16.0291 12.8649 15.9598C13.0196 15.8905 13.1076 15.7758 13.1289 15.6158L15.9929 0.543812C16.0142 0.458478 16.0062 0.373145 15.9689 0.287811C15.9316 0.202478 15.8782 0.133145 15.8089 0.079812C15.7396 0.0264788 15.6596 -0.0028553 15.5689 -0.00818825C15.4782 -0.0135212 15.3956 0.00514412 15.3209 0.0478115ZM4.20089 9.77581L1.43289 8.07981L12.4729 2.52781L4.20089 9.77581ZM4.69689 14.1278V10.5918L12.4569 3.79181L4.69689 14.1278ZM12.3289 14.7838L7.57689 11.8558L14.6969 2.36781L12.3289 14.7838Z"
        fill="#003E5C"
      />
    </g>
    <defs>
      <clipPath id="clip0_1803_1757">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="matrix(1 0 0 -1 0 16)"
        />
      </clipPath>
    </defs>
  </svg>
);
