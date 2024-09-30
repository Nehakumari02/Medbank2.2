'use client'

import React from 'react';
import Image from 'next/image';
import Announcement1 from '../../../../public/Images/Home/Announcement1.png';
import Announcement2 from '../../../../public/Images/Home/Announcement2.png';
import Announcement3 from '../../../../public/Images/Home/Announcement3.png';
import article1 from '../../../../public/Images/Home/article1.png';
import article2 from '../../../../public/Images/Home/article2.png';
import article3 from '../../../../public/Images/Home/article3.png';
import ArticleCard from '../../../../components/ArticleCard';
import SnackBar from '@/components/SnackBar';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const articles = [
  {
    image: article1,
    title: 'Title',
    date: '24-july-2024 12:45',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
  },
  {
    image: article2,
    title: 'Title',
    date: '24-july-2024 12:45',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
  },
  {
    image: article3,
    title: 'Title',
    date: '24-july-2024 12:45',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
  },
  {
    image: article2,
    title: 'Title',
    date: '24-july-2024 12:45',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
  },
  {
    image: article3,
    title: 'Title',
    date: '24-july-2024 12:45',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
  },
];

const Page = () => {
  return (
    <>
      <section className='pl-[38px] pr-[24px] md:pl-[156px]  md:pr-[95px]  w-full text-[#333333] font-DM-Sans flex flex-col items-center justify-center '>
        <div className='relative max-w-screen-lg w-full flex flex-col items-start pt-[20px] md:pt-[40px] lg:pt-[60px]'>
          <div className="absolute top-[28px] left-[-29px] md:top-[45px] lg:top-[68px]  md:left-[-54px]">
            <SnackBar text={"Recent Announcement"} />
          </div>
          <div className='text-[12px] md:text-[18px]'>Date : 12 JUNE 2024</div>
          <div className='font-bold text-[16px] md:text-[28px] lg:text-[32px] leading-[24px] pt-[6px] md:pt-[20px]'>
            Article or post title
          </div >

          <div className='font-normal text-[12px] md:text-[18px] lg:text-[24px] leading-[36px] pt-[8px] md:pt-[39px]'>
            Subheading that sets up context, shares more info about the author, or generally gets people psyched to keep reading
            <br /><br />
            <Image src={Announcement1} alt='Announcement1'  />
          </div>
          <div className='font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-[30px] pt-[24px] md:pt-[60px]'>
            Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look: <br /><br />
            Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur. <br /><br />
            Exquisite sophisticated iconic cutting-edge laborum deserunt Addis Ababa esse bureaux cupidatat id minim. Sharp classic the best commodo nostrud delightful. Conversation aute Rochester id. Qui sunt remarkable deserunt intricate airport handsome K-pop excepteur classic esse Asia-Pacific laboris. <br /><br />
          </div>
          <div className='flex flex-col md:flex-row pt-[21px] md:pt-[68px]'>
            <div className='md:pr-[40px] '>
              <Image src={Announcement2} alt='Announcement2' width={500} height={300} />
            </div>
            <div className='mt-[21px] md:mt-0 '>
              <Image src={Announcement3} alt='Announcement3' width={500} height={300} />
            </div>
          </div>

          <div className='font-normal text-[12px] md:text-[18px] lg:text-[20px] leading-[30px] pt-[21px] md:pt-[68px]'>
            Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:<br /><br />
            Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur. <br /><br />
            Exquisite sophisticated iconic cutting-edge laborum deserunt Addis Ababa esse bureaux cupidatat id minim. Sharp classic the best commodo nostrud delightful. Conversation aute Rochester id. Qui sunt remarkable deserunt intricate airport handsome K-pop excepteur classic esse Asia-Pacific laboris.
          </div>
          <div className='font-bold text-[16px] md:text-[32px] leading-[35.2px] pt-[6px] md:pt-[33px]  pb-[6px] md:pb-[20px]      '>
            Related article or posts
          </div>
        </div>


         <Carousel className="hidden md:block w-full">
        <CarouselContent className="-ml-1">
          {articles.map((article, index) => (
            <CarouselItem key={index} className="md:basis-1/2 xl:basis-1/3">
              <div className='h-[374px] md:h-[480px] w-[228px] md:w-[360px] border-[1px] rounded-lg border-[#71717133]'>
                <Image src={article.image} alt='Media' width={360} height={276} className='w-full h-[174px] md:h-[276px] rounded-tl-lg rounded-tr-lg'></Image>
                <div className='flex flex-col items-start gap-[24px] p-[16px]'>
                  <div className='flex flex-col items-start'>
                    <span className='font-DM-Sans font-normal text-[16px] leading-[24px] text-[#333333]'>{article.title}</span>
                    <span className='font-DM-Sans font-normal text-[14px] leading-[20px] text-[#717171]'>{article.date}</span>
                  </div>
                  <span className='font-DM-Sans font-normal text-[14px] leading-[20px] text-[#333333]'>{article.description}</span>
                  <div className='w-full flex items-center justify-end'>
                    <a href='https://medbankorders22.blogspot.com/' className='border-[1px] rounded-full border-[#79747E] w-[131px] h-[40px] py-[10px] px-[24px] flex items-center justify-center'><span className='font-DM-Sans font-normal text-[16px] leading-[24px] gradient-primary bg-clip-text text-transparent'>Read More</span></a>
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
                <Image src={article.image} width alt='Media' className='w-full h-[174px] rounded-tl-lg rounded-tr-lg'></Image>
                <div className='flex flex-col items-start gap-[12px] p-[16px]'>
                  <div className='flex flex-col items-start'>
                    <span className='font-DM-Sans font-normal text-[14px] leading-[24px] text-[#333333]'>{article.title}</span>
                    <span className='font-DM-Sans font-normal text-[10px] leading-[20px] text-[#717171]'>{article.date}</span>
                  </div>
                  <span className='font-DM-Sans font-normal text-[12px] leading-[20px] text-[#333333] tracking-tracking-0.25'>{article.description}</span>
                  <div className='w-full flex items-center justify-end'>
                    <a href='https://medbankorders22.blogspot.com/' className='border-[1px] rounded-full border-[#79747E] w-[104px] h-[40px] py-[8px] px-[20px] flex items-center justify-center'><span className='font-DM-Sans font-normal text-[12px] leading-[24px] gradient-primary bg-clip-text text-transparent'>Read More</span></a>
                  </div>
                </div>
              </div>
        ))}
    </div>
      </section>

       
    </>
  );
}

export default Page;


