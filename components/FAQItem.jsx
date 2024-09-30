"use client"
import { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <details className="border-[1px] border-[#71717180] rounded-[12px] flex items-center justify-center p-[10px] md:p-[24px]">
      <summary className="flex items-center justify-between font-semibold cursor-pointer" onClick={toggleAccordion}>
        <span className='font-sans font-medium text-[12px] md:text-[16px] leading-[20px] md:leading-[24px]'>{question}</span>
        {!isOpen ? (
         <span> {plusIcon}</span>
        ) : (
          <span className='text-[#60B7CF]'>-</span>
        )}
      </summary>
      <p className={`mt-2 ${isOpen ? 'block' : 'hidden'}`}>{answer}</p>
    </details>
  );
};

export default FAQItem;

const plusIcon = <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path opacity="0.4" d="M5.44074 13.054V0.985795H8.49188V13.054H5.44074ZM0.932218 8.54545V5.49432H13.0004V8.54545H0.932218Z" fill="url(#paint0_linear_139_1749)"/>
  <defs>
  <linearGradient id="paint0_linear_139_1749" x1="6.00506" y1="-7" x2="6.00506" y2="17" gradientUnits="userSpaceOnUse">
  <stop offset="0.1" stopColor="#60B7CF"/>
  <stop offset="0.745" stopColor="#3E8DA7"/>
  <stop offset="1" stopColor="#003E5C" stopOpacity="0.6"/>
  </linearGradient>
  </defs>
  </svg>
