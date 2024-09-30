const HomePageSectionHeader = ({title,subTitle}) => {
  return(
  <div className='relative pl-[16px] font-DM-Sans'>
    <span className='gradient-border-text font-extrabold font-inter text-[30px] md:text-[70px] lg:text-[100px] leading-[35px] md:leading-[78px]'>{title}</span>
    <span className='absolute top-[15px] left-[30px] md:top-[30px] md:left-[60px] lg:top-[40px] lg:left-[110px] text-[10px] leading-[12px] md:leading-[36px] md:text-[20px] text-[#333333]'>{subTitle} -</span>
  </div>
    );
}
  export default HomePageSectionHeader;