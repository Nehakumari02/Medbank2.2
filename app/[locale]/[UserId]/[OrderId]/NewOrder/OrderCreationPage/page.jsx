'use client'
import React, { useState } from 'react';
import creation1 from '../../../../../../public/dashboard/creation1.png';
import creation2 from '../../../../../../public/dashboard/creation2.png';
import creation3 from '../../../../../../public/dashboard/creation3.png';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import folder1 from "../../../../../../public/dashboard/folder.png"
import deleteIcon from "../../../../../../public/dashboard/deleteIcon.png"
import file1 from "../../../../../../public/dashboard/file.png"
import { useOrder } from '@/contexts/OrderContext';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl'
import useFcmToken from '@/hooks/useFCMToken'


const OrderCreationPage = () => {
  const {
    orderTitle, setOrderTitle,
    uploadedFile, setUploadedFile,
    setRequestSheetLink, setCostEstimateStatus,
    setRequestSheetStatus
  } = useOrder();
  const [currentStep, setCurrentStep] = useState(1);
  const [disabled,setDisabled] = useState(false);
  const router = useRouter();
  const orderIdDB = usePathname().split("/")[3];
  const t = useTranslations("UserDashboard");
  let userIdDB = usePathname().split('/')[2];
  const { token, notificationPermissionStatus } = useFcmToken()
  const adminIdDB="66ea96cbb87b8baa2f3a1117";

  const handleDelete = () => {
    setUploadedFile(null); // Remove the file from state
    console.log("file deleted")
  };

  console.log("order title",orderTitle)
  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file); // Update the state to show the file
  
    
  };
  

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    toast;
    setDisabled(true);
  
    // Validate title
    if (orderTitle === "") {
      toast({
        variant: "error",
        title: "Error",
        description: "Title cannot be empty...",
      });
      setDisabled(false);
      return;
    }
  
    // Validate file upload
    if (!uploadedFile) {
      toast({
        variant: "error",
        title: "Error",
        description: "Please upload a file...",
      });
      setDisabled(false);
      return;
    }
  
    try {
      const { name: fileName, type: fileType } = uploadedFile;
  
      // Get signed URL for file upload
      const response = await fetch('/api/fileUpload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName, fileType }),
      });
  
      if (!response.ok) {
        toast({
          variant: "error",
          title: "Upload Error",
          description: "Failed to generate upload URL, please try again...",
        });
        setDisabled(false);
        return;
      }
  
      const { url } = await response.json();
      console.log("Upload URL:", url);
  
      // Upload file to S3 using the signed URL
      const uploadResponse = await fetch(url, {
        method: 'PUT',
        body: uploadedFile,
        headers: {
          'Content-Type': fileType,
        },
      });
  
      if (uploadResponse.status !== 200) {
        toast({
          variant: "error",
          title: "Upload Error",
          description: "Failed to upload the file, please try again...",
        });
        setDisabled(false);
        return;
      }
  
      const uploadedFileUrl = url.split("?")[0];
      setRequestSheetLink(uploadedFileUrl);
      setRequestSheetStatus("isUserCompleted");
  
      // Prepare order data for updating
      const orderData = {
        orderTitle,
        requestSheetStatus: "isUserCompleted",
        requestSheetLink: uploadedFileUrl,
      };
  
      // Update order in the database
      const saveApiResponse = await fetch('/api/updateOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order: orderData, orderIdDB }),
      });
  
      if (saveApiResponse.status !== 200) {
        toast({
          variant: "error",
          title: "Update Error",
          description: "Failed to submit the order, please try again...",
        });
        setDisabled(false);
        return;
      }
      const response2 = await fetch('/api/send-notification2', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminIdDB:adminIdDB,
          title: "MedBank",
          message: t("notification.requestSheet"),
          link: "/Dashboard",
        }),
      });

  
      // Send chat update
      const chatResponse = await fetch("/api/sendUpdateInChatFromUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userIdDB,
          message: t("chatMessage.requestSheet"),
        }),
      });
  
      if (chatResponse.status !== 200) {
        toast({
          variant: "error",
          title: "Chat Notification Error",
          description: "Failed to send notification, please try again...",
        });
      }
  
      // Success toast
      toast({
        variant: "success",
        title: "Upload Successful",
        description: "Your file has been uploaded successfully.",
      });
    } catch (err) {
      toast({
        variant: "error",
        title: "Upload Failed",
        description: "There was an error uploading your file.",
      });
      console.error("Error uploading file:", err);
    } finally {
      setDisabled(false);
    }
  
    router.back();
  };
  
  

  return (
    <div className='font-DM-Sans'>
      <div className="text-xl font-bold font-DM-Sans pl-[36px] pt-[30px]">{t("requestSheet.title")}</div>
      <div className="flex flex-col items-center justify-center pt-[22px]">
        <div className="flex justify-center items-center w-[305px] h-[24px] md:w-[478px] md:h-[60px] mb-[40px] md:mb-[57px]">
          <div className="relative text-center text-[#333333]">
            <div className={`flex items-center justify-center  w-[24px] h-[24px] md:w-[60px] md:h-[60px] rounded-full border-[1px] ${currentStep >= 1 ? 'border-[#3E8DA7] bg-[#60B7CF]' : 'border-[#717171] bg-[#717171]'}`}>
              <Image src={creation1} alt="Order Details" className="w-[16px] h-[16px] md:w-[22px] md:h-[28px] rounded-full" />
            </div>
            <div className='absolute top-[40px] md:top-[83px] left-[50%] translate-x-[-50%] font-DM-Sans font-normal text-[10px] md:text-base text-nowrap'>{t("requestSheet.step1.title")}</div>
          </div>
          <div className='flex flex-col gap-[3px]'>
            <div className="w-[76px] md:w-[140px] h-[1px] bg-gray-300"></div>
            <div className="w-[76px] md:w-[140px] h-[1px] bg-gray-300"></div>
          </div>
          <div className="relative text-center text-[#333333]">
            <div className={`flex items-center justify-center w-[24px] h-[24px] md:w-[60px] md:h-[60px] rounded-full border-[1px] ${currentStep >= 2 ? 'border-[#FDB25B] bg-[#FFC107]' : 'border-[#717171] bg-[#717171]'}`}>
              <Image src={creation2} alt="Upload Request Sheet" className="w-[16px] h-[16px] md:w-[18px] md:h-[26px] rounded-full" />
            </div>
            <div className='absolute top-[40px] md:top-[83px] left-[50%] translate-x-[-50%] font-DM-Sans font-normal text-[10px] md:text-base text-nowrap'>{t("requestSheet.step2.title")}</div>
          </div>
          <div className='flex flex-col gap-[3px]'>
            <div className="w-[76px] md:w-[140px] h-[1px] bg-gray-300"></div>
            <div className="w-[76px] md:w-[140px] h-[1px] bg-gray-300"></div>
          </div>
          <div className="relative text-center text-[#333333]">
            <div className={`flex items-center justify-center w-[24px] h-[24px]  md:w-[60px] md:h-[60px] rounded-full border-[1px] ${currentStep >= 3 ? ' border-[#03CF18] bg-[#51DE5F]' : 'border-[#717171] bg-[#717171]'}`}>
              <Image src={creation3} alt="Review & Submit" className="w-[13px] h-[8px] md:w-[26px] md:h-[16px] rounded-full" />
            </div>
            <div className='absolute top-[40px] md:top-[83px] left-[50%] translate-x-[-50%] font-DM-Sans font-normal text-[10px] md:text-base text-nowrap'>{t("requestSheet.step3.title")}</div>
          </div>
        </div>
        <div className="bg-[#FFFFFF] w-[90%] md:w-auto mx-[10px] md:mx-0  p-4 md:p-8 rounded-lg shadow pt-[24px] border-[#E2E8F0] border-[1px] mb-12 mt-[12px] md:mt-5">
          {currentStep === 1 && (
            <div className='w-auto md:w-[660px]'>
              <div className="text-2xl font-semibold mb-4 flex items-center justify-center">{t("requestSheet.step1.title1")}</div>
              <div className="flex flex-col items-start gap-[10px] md:flex-row md:items-center justify-center md:gap-[24px]  pt-[12px] md:pt-[41px]">
                <label htmlFor="name" className="font-DM-Sans font-normal text-[10px] md:text-lg whitespace-nowrap">
                {t("requestSheet.step1.label")}
                </label>
                <div className='group w-full h-[36px] md:h-[50px] flex items-center justify-center flex-col'>
                  <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`}>
                    <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                      placeholder="Order Title"
                      value={orderTitle}
                      onChange={(e) => setOrderTitle(e.target.value)}
                      style={{ backgroundColor: "white", backgroundClip: "padding-box" }}
                      type="text"
                      name="name"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-[10px] md:gap-[12px] pt-[20px] md:pt-[41px]">
                {/* <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={handleBack} disabled={currentStep === 1}>Back</button> */}
                <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={handleNext}>{t("requestSheet.step1.button")}</button>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className='rounded-lg w-auto md:w-[660px]'>
              <div className="text-[16px] md:text-[22px] font-medium text-center">{t("requestSheet.step2.title1")}</div>
              <div className="text-center text-[12px] md:text-sm font-normal pt-[16px] md:pt-[41px]">
                <p className="">
                {t("requestSheet.step2.note")}
                  <a href='https://docs.google.com/spreadsheets/d/1NfqRFhh0pfXbc_PYe3qFPMk6rbMxu_Frhz2QosIuZys/edit?usp=sharing'  className="text-transparent bg-clip-text bg-gradient-to-b from-[#60b7cf] via-[#3e8da7] to-[rgba(0,62,92,0.6)] underline">
                  {t("requestSheet.step2.link")}
                  </a>
                </p>
              </div>

              <div className="container mx-auto md:px-4 w-auto md:max-w-[490px] md:h-[203px]">
                <div className="border-dashed border-[0.4px]  border-[#60b7cf] rounded-lg p-4 md:p-10 mt-[12px] md:mt-8 text-center">
                  <div {...getRootProps()} className="cursor-pointer">
                    <input {...getInputProps()} />
                    <Image src={folder1} alt="Upload Icon" className="mx-auto mb-4 w-[51px] h-[51px]" />
                    <p className="text-[10px] md:text-sm font-normal">
                    {t("requestSheet.step2.drag")}<span  className="text-transparent bg-clip-text bg-gradient-to-b from-[#60b7cf] via-[#3e8da7] to-[rgba(0,62,92,0.6)] underline"> {t("requestSheet.step2.drag1")}</span> {t("requestSheet.step2.drag2")}
                    </p>
                    {uploadedFile && (
                      <div className="mt-2">
                        <p className="text-sm md:text-base text- [#606060] font-normal"> {t("requestSheet.step2.file")}</p>
                        {/* <p className="text-lg text-blue-600">{uploadedFile.name}</p> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-[10px] md:gap-[12px] pt-[24px]">
                <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={handleBack}> {t("requestSheet.step2.back")}</button>
                <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={handleNext} disabled={!uploadedFile}> {t("requestSheet.step2.next")}</button>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div className="rounded-lg w-[100%] md:w-[660px]">
              <h2 className="w-full text-[16px] md:text-[22px] font-medium md:[16px] md:mb-6 text-center">
              {t("requestSheet.step3.title1")}
              </h2>

              <div className="mb-[16px] md:mb-6 w-full">
                <p className="font-medium text-xs md:text-lg">{t("requestSheet.step3.summary")}</p>
                <div className="flex items-center justify-center gap-[24px] pt-[12px]">
                  <label htmlFor="name" className="font-DM-Sans font-normal text-[10px] md:text-lg whitespace-nowrap">
                  {t("requestSheet.step3.orderTitle")}
                  </label>
                  <div className='group w-full h-[36px] md:h-[50px] flex items-center justify-center flex-col'>
                    <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`}>
                      <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                        placeholder="Genomic Sequence"
                        value={orderTitle}
                        onChange={(e) => setOrderTitle(e.target.value)}
                        style={{ backgroundColor: "white", backgroundClip: "padding-box" }}
                        type="text"
                        name="name"
                      />
                    </div>
                  </div>
                </div>

                <p className="font-medium text-[10px] md:text-lg pb-3 pt-6">{t("requestSheet.step3.requestSheet")}</p>
                {uploadedFile ? (
                  <div className="flex items-center p-4 bg-white border-[0.5px] solid border-[#33333326] rounded-lg mt-2 max-w-[331px] md:max-w-[300px] max-h-[52px] justify-between ">
                    <div className='flex gap-[8px]'>
                      <div className="flex items-center justify-center">
                        <Image src={file1} className='w-[18px] h-[24px]'></Image>
                      </div>
                      <div>
                        <a href={URL.createObjectURL(uploadedFile)}>
                        <span className="text-sm md:text-lg">
                          {uploadedFile.name.length > 20 ? `${uploadedFile.name.substring(0, 19)}...` : uploadedFile.name}
                        </span>
                          <p className="text-sm text-[#717171]">{(uploadedFile.size / 1024 / 1024).toFixed(2)} Mb</p>
                        </a>
                      </div>
                    </div>
                    <div className="text-red-500 cursor-pointer" onClick={handleDelete}>
                      <Image src={deleteIcon} className='h-[13px] w-[13px]'></Image>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#717171] mt-2">{t("requestSheet.step3.noFile")}</p>
                )}
              </div>

              <div className='flex items-center justify-end gap-[10px] md:gap-[12px]'>
                <button className='h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] ' onClick={handleBack}>{t("requestSheet.step3.edit")}</button>
                <button disabled={disabled} className={`h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] ${disabled?"opacity-75":""}`} onClick={handleSubmit}>{t("requestSheet.step3.submit")}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default OrderCreationPage;

