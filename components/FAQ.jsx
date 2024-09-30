import HomePageSectionHeader from "./HomePageSectionHeader";
import FAQItem from './FAQItem'
import { useTranslations } from "next-intl";

const FAQ = () => {
  const t= useTranslations("HomePage.FAQ");
  return(
  <section className="md:px-[42px] lg:px-[62px] py-[20px] md:py-[100px] w-full text-[#333333]">
  <HomePageSectionHeader title={"FAQ"} subTitle={"Frequently Asked Question"}/>
  <div className='px-[31px] md:pl-[50px] lg:pl-[90px] pt-[6px] md:pt-[20px] w-full flex flex-col items-start gap-[6px] md:gap-[32px]'>
  <span className="flex items-center font-DM-Sans text-[18px] md:text-[36px] font-medium leading-[24px] md:leading-[42px] gradient-primary bg-clip-text text-transparent">FAQ</span>
  <p className="font-DM-Sans font-normal text-[12px] md:text-[20px] leading-[20px] md:leading-[34px]">
  {t("description")}
  </p>
  <div className="w-full flex items-center justify-center">
  <div className="w-full md:w-[660px] flex flex-col gap-[16px]">
    {[
      { question: t("faq1"), answer: t("faq1a") },
      { question: t("faq2"), answer: t("faq2a") },
      { question: t("faq3"), answer: t("faq3a")},
      { question: t("faq4"), answer: t("faq4a") },
    ].map((item, index) => (
      <FAQItem key={index} question={item.question} answer={item.answer} />
    ))}
  </div>
</div>

</div>
</section>
  )};

  export default FAQ;
