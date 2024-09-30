import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import cross from '../public/dashboard/cross.png'
import { useTranslations } from 'next-intl'
const ProgressCircles = ({ step, totalSteps }) => {
  return (
    <div className="flex gap-2 mb-4 mt-6">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full border-0.25 solid ${index < step ? 'bg-[#A8A6A6BF] border-[#33333340]' : 'bg-[#A8A6A640] border-[#33333340]'}`}
        />
      ))}
    </div>
  );
};


const MultiStepTutorial = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [popupStyle, setPopupStyle] = useState({});
  const popupRef = useRef(null);
  const totalSteps = 5;
  const t = useTranslations("tutorial");

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  useEffect(() => {
    const highlightedDiv = document.getElementById(`highlight-step-${step}`);
    if (highlightedDiv) {
      highlightedDiv.classList.add('highlight');

      // Position the pop-up
      const rect = highlightedDiv.getBoundingClientRect();
      const width = step === 1 ? '314px' : (step === 2 && window.innerWidth < 768 ? '100px' : '314px');
      const height = '284px';

      // Calculate center position for step 1
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const popupWidth = parseInt(width); // Convert width to number
      const popupHeight = step === 1 ? 100 : rect.height;

      // Set the style conditionally based on the step
      setPopupStyle({
        ...(step === 1
          ? {
            top: `calc(50% - ${popupHeight / 2}px)`, // Center vertically in the viewport
            left: `calc(50% - ${popupWidth / 2}px)`, // Center horizontally in the viewport
            width, // Set width for step 1
            //height
          }
          : step === 2
            ? {
              top: `${rect.bottom + 10}px`,
              right: `${window.innerWidth - rect.right}px`,
              width, // Adjust right and width for step 2
              //height
            }
            : {
              top: `${rect.bottom + 10}px`,
              left: `${rect.left}px`,
              width, // Set left for other steps
              //height
            }
        ),
      }, [step]);
    }
    return () => {
      const highlightedDiv = document.getElementById(`highlight-step-${step}`);
      if (highlightedDiv) {
        highlightedDiv.classList.remove('highlight');
      }
    };
  }, [step]);

  return (
    <div className="flex justify-center items-center">
      {/* Highlight Overlay */}
      <div className={`${step === 1 ? 'highlight' : ''}`} />

      {/* Tutorial Pop-Up */}
      <div
        ref={popupRef}
        className="tutorial-popup"
        style={popupStyle}
      >
        <button
          className="absolute top-13 right-6 text-gray-500 hover:text-gray-400"
          onClick={onClose}
        >
          <Image src={cross} alt="Close" />
        </button>
        <div className=" text-center mt-10">
          {step === 1 && (
            <div className=''>
              <div className='text-[32px] font-bold pb-[24px] leading-[34px]' >{t("message1-2")}</div>
              <div className="text-xl font-DM-Sans font-normal">{t("message1")}</div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-DM-Sans font-normal ">{t("message2")}</h2>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-normal font-DM-Sans mb-4">{t("message3")}</h2>
            </div>
          )}
          {step === 4 && (
            <div className=''>
              <h2 className="text-xl font-normal font-DM-Sans mb-4">{t("message4")}</h2>

            </div>
          )}
          {step === 5 && (
            <div className=''>
              <h2 className="text-xl font-DM-Sans  font-normal mb-4">{t("message5")}</h2>

            </div>
          )}
        </div>
        <div className="flex items-center justify-center mb-4">
          <ProgressCircles step={step} totalSteps={totalSteps} />
        </div>
        <div className='flex items-center justify-center gap-[10px] md:gap-[12px] pb-[24px]'>
          {step > 0 && (
            <button disabled={step == 1} className='h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] '
              onClick={prevStep}
            >
             {t("back")}
            </button>
          )}
          {step < 5 ? (
            <button className='h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] '
              onClick={nextStep}
            >
             {t("next")}
            </button>
          ) : (
            <button className='h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] '
              onClick={onClose}
            >
              {t("finish")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepTutorial;
