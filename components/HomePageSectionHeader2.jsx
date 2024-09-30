// const HomePageSectionHeader2 = ({title,subTitle}) => {
//     return(
//     <div className='relative '>
//       <span className='gradient-border-text font-extrabold font-inter text-[100px] leading-[90px] w-42.65 '>{title}</span>
//       <span className=' absolute top-[25px] font-medium text-#333333 text-[28px] w-[187.05px]'>{subTitle}</span>
//     </div>
//       );
//   }
//     export default HomePageSectionHeader2;

const HomePageSectionHeader2 = ({title,subTitle}) => {
    return(
    <div className='mb-[-40px]'>
      <span className='gradient-border-text font-extrabold font-inter text-[70px] md:text-[100px] leading-[78px]'>{title}</span>
      <span className='translate-y-[-54px] translate-x-[20px] block font-medium  text-#333333 pr-[20px]'>{subTitle}</span>
    </div>
      );
  }
    export default HomePageSectionHeader2;
