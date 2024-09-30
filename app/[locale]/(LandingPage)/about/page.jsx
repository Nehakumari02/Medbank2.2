import Image from 'next/image';
import About1 from '../../../../public/Images/Home/About1.png'
import About2 from '../../../../public/Images/Home/About2.png'
import About3 from '../../../../public/Images/Home/about3.jpg'
import About4 from '../../../../public/Images/Home/about4.jpg'
import About5 from '../../../../public/Images/Home/heroImage1.jpg'
import SnackBar from '@/components/SnackBar';
import HomePageSectionHeader2 from '@/components/HomePageSectionHeader2';

import HomePageSectionHeader from '@/components/HomePageSectionHeader';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server'

export default function AboutPage({params:{locale}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("AboutUs");
  return (
    <>
      <section className="pl-[38px] pr-[24px] md:pl-[156px]  lg:pl-[236px]   md:pr-[95px] w-full flex flex-col items-center justify-center text-[#333333] gap-[24px] md:gap-[70px]  lg:gap-[100px] ">
        <div className="relative max-w-screen-lg w-full lg:w-[1057px] flex flex-col items-start gap-[6px] md:gap-[10px] lg:gap-[24px] pt-[20px] md:pt-[40px] lg:pt-[60px] ">
          <div className="absolute top-[28px] left-[-29px] md:top-[45px] lg:top-[68px]  md:left-[-54px]">
            <SnackBar text={"About Us"} />
          </div>
          <div className=' flex flex-col gap-[6px] md:gap-[20px]'>

            <h2 className="w-full lg:w-[110px] leading-6 font-DM-Sans text-[14px] md:text-[18px] font-medium">About Us</h2>
            <div className="w-full lg:w-[864px] text-[16px] md:text-[28px] lg:text-[28px] font-bold leading-8 lg:leading-10">
            {t("heroTitle")}
            </div>
          </div>
          <div className="font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px]  leading-[20px] md:leading-[34px]">
          {t("description")}
          </div>
          <span className='font-DM-Sans font-medium text-[16px] md:text-[24px] pt-[24px]'>
          {t("principles.title")}
          </span>
          <div>
            <ol className='font-DM-Sans font-medium text-[12px] md:text-[18px] lg:text-[20px] leading-8 '>
              <li>1. {t("principles.p1")} <span className='font-normal'>{t("principles.d1")}</span></li>
              <li>2. {t("principles.p2")} <span className='font-normal'>{t("principles.d2")}</span></li>
              <li>3. {t("principles.p3")} <span className='font-normal'>{t("principles.d3")}</span></li>
              <li>4. {t("principles.p4")} <span className='font-normal'>{t("principles.d4")}</span></li>
              <li>5. {t("principles.p5")} <span className='font-normal'>{t("principles.d5")}</span></li>
            </ol>
          </div>
        </div>




        <div className='flex flex-col md:flex-row md:justify-start w-full lg:w-[1057px] gap-[12px] md:gap-[23px] '>
          <div className=''>
            <Image src={About1} alt='strength1' layout='responsive' className=' h-full object-contain rounded-lg  max-h-[336px] ' />
          </div>
          <div className=''>
            <Image src={About2} alt='strength2' layout='responsive' className=' h-full object-contain rounded-lg  max-h-[336px] ' />
          </div>
        </div>


        <div className="w-full lg:w-[1057px]   flex flex-col items-start  gap-[24px]">
         

            <div className="w-full lg:w-[864px] text-[16px] md:text-[28px] lg:text-[28px] font-bold leading-8 lg:leading-10">
            {t("goal")}
            </div>
          
          <div className="font-DM-Sans font-normal text-[12px] md:text-[18px] lg:text-[20px]">
          {t("goalDescription")}
          </div>

        </div>
      </section>




      <div className="flex md:flex-row flex-col-reverse pt-[24px] gap-[24px] md:gap-0 lg:pt-[100px]">

        <div className="px-[31px] md:px-0 grid grid-cols-1 gap-6 mb-8 md:pr-[68px]  md:w-[40%]">
          <Image src={About3} alt="Lab Image" className="rounded md:h-[515px] object-cover aspect-square md:aspect-auto" />
          <Image src={About4} alt="Building Image" className="rounded  md:h-[515px] object-cover aspect-square md:aspect-auto" />
        </div>
        <div className='pt-[30px] md:pt-[60px]'>
          <HomePageSectionHeader title={"Details"} subTitle={"Company Details"} />
          <div className='pl-[62px] pt-[12px] md:pt-[24px]'>
            <div className="text-2xl md:text-[32px] font-DM-Sans font-medium  gradient-primary bg-clip-text text-transparent">COMPANY DETAILS</div>
            
            <div className='text-xs md:text-[20px] flex flex-col gap-[6px] md:gap-[8px] pt-[6px] md:pt-[24px]'>
              <p className='font-normal p-0 m-0'><span className='font-medium'>{t("details_name")}</span> Medbank Pte. Ltd.</p>
              <p className='font-normal p-0 m-0'><span className='font-medium'>{t("details_established")}</span> 15 OCT 2021</p>
              <p className='font-normal p-0 m-0'><span className='font-medium'>{t("details_representative_employee")}</span> Yuki Okada (Doctor)</p>
            </div>

            <div className='pt-[24px] flex flex-col gap-[24px] md:gap-[48px] '>
              <div className="text-xs md:text-[28px] font-medium">Address</div>

              <div className="text-xs md:text-[20px] font-normal leading-[24px]">
                <p className='font-medium p-0 m-0'> Main Office:</p>
                <p className='p-0 m-0'>8 Burn Rd, #04-04 Trivex</p>
                <p className='p-0 m-0'>Singapore 369977</p>
              </div>
              <hr></hr>
              <div className="text-xs sm:text-[20px] leading-[24px]">
                <p className='font-medium p-0 m-0'>Laboratory in Singapore:</p>
                <p className='p-0 m-0'>11 Mandalay Road #16-01</p>
                <p className='p-0 m-0'>Singapore 308232</p>
              </div>
              <hr />
              <div className="text-xs sm:text-[20px] leading-[24px]">
                <p className='font-medium p-0 m-0'>Laboratory in Japan:</p>
                <p className='p-0 m-0'>〒540-0002</p>
                <p className='p-0 m-0'>{t("lab")}</p>
              </div>
              <hr />


            </div>

          </div>
        </div>
      </div>

      <section className='pl-[38px] pr-[24px] md:pl-[156px]  lg:pl-[236px]   md:pr-[95px] w-full flex flex-col items-center justify-center text-[#333333]'>

        <div className="relative max-w-screen-lg w-full lg:w-[1057px] flex flex-col items-start gap-[32px] pt-[40px] md:pt-[60px] ">
          <div className='font-DM-Sans text-[18px] md:text-[28px] font-bold'>
            Our Project
          </div>
          <div className='font-DM-Sans font-normal text-[12px] md:text-[20px]'>
            {t("project1")}<br></br>
            {t("project2")}<br></br>
            {t("project3")}
          </div>
        </div>
      </section>

      <section className="md:flex items-center justify-center w-full md:h-[672px] pt-[40px] md:pt-[100px]">
        <div className='md:w-[70%] h-full flex items-center justify-start text-[#333333]'>
          <div className='w-full md:pl-[42px] lg:pl-[62px] pr-[20px] flex flex-col gap-[6px] md:gap-[32px]'>
            <HomePageSectionHeader title={"Analysis"} subTitle={"Inspection and analysis"}></HomePageSectionHeader>
            <div className='px-[31px] md:pl-[50px] lg:pl-[110px] flex flex-col items-start justify-start gap-[6px] md:gap-[24px]'>
              <span className="flex items-center font-DM-Sans text-[18px] md:text-[32px] font-medium leading-[24px] md:leading-[42px] gradient-primary bg-clip-text text-transparent">Inspection And Analysis</span>
              <span className="font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[20px] md:leading-[34px]">
              {t("analysisDescription")}
              </span>

            </div>
          </div>
        </div>
        <div className='md:w-[30%] md:h-full  flex items-center justify-center py-[20px] md:py-[0px]'>
          <Image src={About5} alt='About5' className='h-[188px] w-[307px] object-cover md:h-full md:w-full rounded-md md:rounded-none'></Image>
        </div>
      </section>


      <section className='pl-[38px] pr-[24px] md:pl-[156px] md:pr-[95px]  pt-[12px] md:pt-[100px] w-full flex flex-col justify-center items-center font-DM-Sans'>
        <div className='max-w-[1056px] w-full flex flex-col items-start'>
          <div className='text-[#333333]  pl-[9px] md:pl-[25px]'>

            <div className='font-DM-Sans font-bold text-[16px] md:text-[28px] leading-[24px] md:leading-[40px]'>
              Our Machines
            </div>
            <div className='font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pt-[6px] md:pt-[24px]'>
            {t("machineDescription")}
            </div>
          </div>

          <div className='text-[#333333] pt-[32px] '>
            <div className='flex flex-col pb-[6px] text-[18px] md:text-[28px]'>
              <HomePageSectionHeader2
                title="1"
                subTitle="AVITI"
              />
            </div>
            <div className='max-w-full font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[60px]'>
            {t("m1")}
            </div>
          </div>

          <div className='text-[#333333] pt-[24px] '>
            <div className='flex flex-col pb-[6px] text-[18px] md:text-[24px]'>
              <HomePageSectionHeader2
                title="2"
                subTitle="2 Illumina MiSeq"
              />
            </div>
            <div className='max-w-full font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[60px]'>
            {t("m2")}
            </div>
          </div>

          <div className='text-[#333333] pt-[24px] '>
            <div className='flex flex-col pb-[6px] text-[18px] md:text-[24px]'>
              <HomePageSectionHeader2
                title="3"
                subTitle="Illumina NovaSeq X Plus"
              />
            </div>
            <div className='max-w-full font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[34px] pl-[60px]'>
            {t("m3")}
            </div>
          </div>
        </div>
      </section>


    </>
  );
}

