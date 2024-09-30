'use client';
import { useState } from 'react';
import HomePageSectionHeader from './HomePageSectionHeader';
import Media from '../public/Images/Home/article1.png'
import Media1 from '../public/Images/Home/article2.png'
import Media2 from '../public/Images/Home/article3.png'
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation'


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useTranslations } from 'next-intl';

const articles = [
  {
    image: Media,
    title: 'Title',
    date: '24-july-2024 12:45',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum recusandae',
  },
  {
    image: Media1,
    title: 'Title',
    date: '24-july-2024 12:45',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum recusandae',
  },
  {
    image: Media2,
    title: 'Title',
    date: '24-july-2024 12:45',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum recusandae',
  },
  {
    image: Media2,
    title: 'Title',
    date: '24-july-2024 12:45',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum recusandae',
  },
  {
    image: Media2,
    title: 'Title',
    date: '24-july-2024 12:45',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum recusandae',
  }
];

const RecentAnnouncement = () => {
  const t = useTranslations("HomePage.RecentAnnouncement");
  const language = usePathname().split("/")[1];

  return (
    <section className="md:px-[42px] lg:px-[62px] py-[20px] md:py-[100px] w-full text-[#333333] bg-[#7171710D]">
        <HomePageSectionHeader title={"Recent Articles"} subTitle={"Recent Articles"}/>
        <div className='px-[31px] md:pl-[50px] lg:pl-[90px] pt-[6px] md:pt-[20px] w-full flex flex-col items-start gap-[6px] md:gap-[32px]'>
        <span className="flex items-center font-DM-Sans text-[18px] md:text-[36px] font-medium leading-[24px] md:leading-[42px] gradient-primary bg-clip-text text-transparent">Recent Anouncements</span>
        <p className="font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[20px] md:leading-[34px]">
        {t("description")}
        </p>

        <Carousel className="hidden md:block w-full">
          <CarouselContent className="-ml-1">
            {articles.map((article, index) => (
              <CarouselItem key={index} className="md:basis-1/2 xl:basis-1/3">
              <div className='h-[374px] md:h-[480px] w-[228px] md:w-[360px] border-[1px] rounded-lg border-[#71717133]'>
                <Image src={article.image} alt='Media' className='w-full h-[174px] md:h-[276px] rounded-tl-lg rounded-tr-lg'></Image>
                <div className='flex flex-col items-start gap-[24px] p-[16px]'>
                  <div className='flex flex-col items-start'>
                    <span className='font-DM-Sans font-normal text-[16px] leading-[24px] text-[#333333]'>{article.title}</span>
                    <span className='font-DM-Sans font-normal text-[14px] leading-[20px] text-[#717171]'>{article.date}</span>
                  </div>
                  <span className='font-DM-Sans font-normal text-[14px] leading-[20px] text-[#333333]'>{article.description}</span>
                  <div className='w-full flex items-center justify-end'>
                    <a  href={`/${language}/RecentAnnouncement`} className='border-[1px] rounded-full border-[#79747E] w-[131px] h-[40px] py-[10px] px-[24px] flex items-center justify-center'><span className='font-DM-Sans font-normal text-[16px] leading-[24px] gradient-primary bg-clip-text text-transparent'>Read More</span></a>
                  </div>
                </div>
              </div>
            </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    <div className='md:hidden flex gap-[24px] w-[100%] overflow-y-hidden overflow-x-scroll scrollh'>
    {articles.map((article, index) => (
              <div key={index} className='flex-shrink-0 h-[374px] w-[228px] border-[1px] rounded-lg border-[#71717133]'>
                <Image src={article.image}  alt='Media' className='w-full h-[174px] rounded-tl-lg rounded-tr-lg'></Image>
                <div className='flex flex-col items-start gap-[12px] p-[16px]'>
                  <div className='flex flex-col items-start'>
                    <span className='font-DM-Sans font-normal text-[14px] leading-[24px] text-[#333333]'>{article.title}</span>
                    <span className='font-DM-Sans font-normal text-[10px] leading-[20px] text-[#717171]'>{article.date}</span>
                  </div>
                  <span className='font-DM-Sans font-normal text-[12px] leading-[20px] text-[#333333] tracking-tracking-0.25'>{article.description}</span>
                  <div className='w-full flex items-center justify-end'>
                  {/* <a/> */}
                    <a  href={`/${language}/RecentAnnouncement`} className='border-[1px] rounded-full border-[#79747E] w-[104px] h-[40px] py-[8px] px-[20px] flex items-center justify-center'><span className='font-DM-Sans font-normal text-[12px] leading-[24px] gradient-primary bg-clip-text text-transparent'>Read More</span></a>
                  {/* </a> */}
                  </div>
                </div>
              </div>
        ))}
    </div>

    </div>
    </section>
  );
};

export default RecentAnnouncement;
