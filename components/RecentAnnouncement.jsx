'use client';
import { useState } from 'react';
import HomePageSectionHeader from './HomePageSectionHeader';
import Media from '../public/Images/Home/article1.png'
import Media1 from '../public/Images/Home/article2.png'
import Media2 from '../public/Images/Home/article3.png'
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation'
import './recentAnnouncement.css'


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
    // <div className="banner w-[100%] h-[250px] md:h-[300px] lg:h-[400px] bg-gradient-to-r from-[#0a2239] via-[#1b263b] to-[#345c84] flex items-center justify-center text-white relative opacity-0 animate-fadeIn">
    //   <div className="banner-text max-w-[100%] lg:max-w-[600px] text-center opacity-0 animate-slideIn delay-500 translate-y-[20px]">
    //       <h1 className='text-[1.5em] md:text-[1.8em] lg:text-[2.5em] mb-[20px] leading-[1.2] text-white text-shadow'>AVITIに関する最新情報をブログにてお届けしています</h1>
    //       <p className='text-[0.9em] md:text-[1em] lg:text-[1.2em] my-[10px] text-shadow text-[#d4af37]'>Check out our blog for the latest information about AVITI!</p>
    //       {/* <!-- ボタンのリンクを指定されたURLに設定 --> */}
    //       <a href="https://aviti.medbank.sg" className="button inline-block mt-[20px] py-[6px] md:py-[8px] lg:py-[10px] px-[12px] md:px-[16px] lg:px-[20px] bg-[#f39c12] text-white rounded-[5px] font-bold button-custom-transition hover:bg-[#e67e22] hover:scale-110 text-[0.8em] md:text-[0.9em]">Check Our Blog</a>
    //   </div>
    // </div>
    <div className="banner">
        <div className="banner-text">
            <h1>AVITIに関する最新情報をブログにてお届けしています</h1>
            <p>Check out our blog for the latest information about AVITI!</p>
            <a href="https://aviti.medbank.sg" className="button">Check Our Blog</a>
        </div>
    </div>
  );
};

export default RecentAnnouncement;
