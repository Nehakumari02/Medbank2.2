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

const OrderCreationPage = () => {
  const {
    orderTitle, setOrderTitle,
    uploadedFile, setUploadedFile,
    orderId,setOrderId,
    requestSheet, setRequestSheet,
    costEstimate, setCostEstimate,
    formalRequest, setFormalRequest,
    sampleShipping, setSampleShipping,
    qualityCheck, setQualityCheck,
    libraryPrep, setLibraryPrep,
    analysisProgress, setAnalysisProgress,
    analysisDone, setAnalysisDone,
    analysisRawData, setAnalysisRawData,
    analysisSpecification, setAnalysisSpecification,
    invoice, setInvoice,
    payment, setPayment
  } = useOrder();
  console.log("orderid",orderId)
  console.log("analysis specification",analysisSpecification)
  const [currentStep, setCurrentStep] = useState(1);
  const [disabled,setDisabled] = useState(false);
  const router = useRouter();
  const orderIdDB = usePathname().split("/")[3];

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

  const handleSubmit = async() =>{
    setDisabled(true);
    if(orderTitle==""){
      toast({
        variant:"error",
        title:"Error",
        description:"Title cannot be empty..."
      })
      return;
    }
    if(!uploadedFile){
      toast({
        variant:"error",
        title:"Error",
        description:"Please upload a file..."
      })
      return;
    }
    try {
      const { name: fileName, type: fileType } = uploadedFile;
  
      // Call the API to get the signed URL
      const response = await fetch('/api/fileUpload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName, fileType }),
      });
  
      const { url } = await response.json();
      console.log(url)
      console.log(url.url)
      setRequestSheet((prev) => ({
        ...prev,
        requestSheetLink: url,
      }));
  
      // Upload the file directly to S3 using the signed URL
      const res=await fetch(url, {
        method: 'PUT',
        body: uploadedFile,
        headers: {
          'Content-Type': fileType,
        },
      });
      console.log(res.status)
      console.log(res.url)

      if(res.status!==200){
        toast({
          variant: "error",
          title: "Upload Error",
          description: "Try uploading file again...",
        });
        return;
      }

      setRequestSheet(prev => ({
        ...prev,
        status: "isCompleted",
        requestSheetLink: res.url,
      }));
  
      setCostEstimate(prev => ({
        ...prev,
        status: "inProgress",
      }));

      const orderData = {
        orderTitle,
        requestSheet: {
          status: "isCompleted",
          requestSheetLink: url,
        },
        costEstimate: {
          status: "inProgress",
        },
      };

      console.log(orderIdDB)
      const saveApiResponse = await fetch('/api/updateOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order:orderData,orderIdDB:orderIdDB }),
      });

      console.log(saveApiResponse)

      if(saveApiResponse.status!==200){
        toast({
          variant: "error",
          title: "Updation Error",
          description: "Failed to submit order, please try again...",
        });
        return;
      }
  
      toast({
        variant: "success",
        title: "Upload Successful",
        description: "Your file has been uploaded to S3.",
      });
    } catch (err) {
      toast({
        variant: "error",
        title: "Upload Failed",
        description: "There was an error uploading your file.",
      });
      console.error("Error uploading file:", err);
    } finally{
      setDisabled(false);
    }

    router.back();
  }
  

  return (
    <div className='font-DM-Sans'>
      <div className="text-xl font-bold font-DM-Sans pl-[36px] pt-[30px]">Order Creation</div>
      <div className="flex flex-col items-center justify-center pt-[22px]">
        <div className="flex justify-center items-center w-[305px] h-[24px] md:w-[478px] md:h-[60px] mb-[40px] md:mb-[57px]">
          <div className="relative text-center text-[#333333]">
            <div className={`flex items-center justify-center  w-[24px] h-[24px] md:w-[60px] md:h-[60px] rounded-full border-[1px] ${currentStep >= 1 ? 'border-[#3E8DA7] bg-[#60B7CF]' : 'border-[#717171] bg-[#717171]'}`}>
              <Image src={creation1} alt="Order Details" className="w-[16px] h-[16px] md:w-[22px] md:h-[28px] rounded-full" />
            </div>
            <div className='absolute top-[40px] md:top-[83px] left-[50%] translate-x-[-50%] font-DM-Sans font-normal text-[10px] md:text-base text-nowrap'>Order Details</div>
          </div>
          <div className='flex flex-col gap-[3px]'>
            <div className="w-[76px] md:w-[140px] h-[1px] bg-gray-300"></div>
            <div className="w-[76px] md:w-[140px] h-[1px] bg-gray-300"></div>
          </div>
          <div className="relative text-center text-[#333333]">
            <div className={`flex items-center justify-center w-[24px] h-[24px] md:w-[60px] md:h-[60px] rounded-full border-[1px] ${currentStep >= 2 ? 'border-[#FDB25B] bg-[#FFC107]' : 'border-[#717171] bg-[#717171]'}`}>
              <Image src={creation2} alt="Upload Request Sheet" className="w-[16px] h-[16px] md:w-[18px] md:h-[26px] rounded-full" />
            </div>
            <div className='absolute top-[40px] md:top-[83px] left-[50%] translate-x-[-50%] font-DM-Sans font-normal text-[10px] md:text-base text-nowrap'>Upload Request Sheet</div>
          </div>
          <div className='flex flex-col gap-[3px]'>
            <div className="w-[76px] md:w-[140px] h-[1px] bg-gray-300"></div>
            <div className="w-[76px] md:w-[140px] h-[1px] bg-gray-300"></div>
          </div>
          <div className="relative text-center text-[#333333]">
            <div className={`flex items-center justify-center w-[24px] h-[24px]  md:w-[60px] md:h-[60px] rounded-full border-[1px] ${currentStep >= 3 ? ' border-[#03CF18] bg-[#51DE5F]' : 'border-[#717171] bg-[#717171]'}`}>
              <Image src={creation3} alt="Review & Submit" className="w-[13px] h-[8px] md:w-[26px] md:h-[16px] rounded-full" />
            </div>
            <div className='absolute top-[40px] md:top-[83px] left-[50%] translate-x-[-50%] font-DM-Sans font-normal text-[10px] md:text-base text-nowrap'>Review & Submit</div>
          </div>
        </div>
        <div className="bg-[#FFFFFF] w-[90%] md:w-auto mx-[10px] md:mx-0  p-4 md:p-8 rounded-lg shadow pt-[24px] border-[#E2E8F0] border-[1px] mb-12 mt-[12px] md:mt-5">
          {currentStep === 1 && (
            <div className='w-auto md:w-[660px]'>
              <div className="text-2xl font-semibold mb-4 flex items-center justify-center">Step 1: Order Details</div>
              <div className="flex flex-col items-start gap-[10px] md:flex-row md:items-center justify-center md:gap-[24px]  pt-[12px] md:pt-[41px]">
                <label htmlFor="name" className="font-DM-Sans font-normal text-[10px] md:text-lg whitespace-nowrap">
                  Order Title :
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
                <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={handleNext}>Next</button>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className='rounded-lg w-auto md:w-[660px]'>
              <div className="text-[16px] md:text-[22px] font-medium text-center">Step 2: Upload Request Sheet</div>
              <div className="text-center text-[12px] md:text-sm font-normal pt-[16px] md:pt-[41px]">
                <p className="">
                  Note: Please use the request sheet designated by Medbank.{" "}
                  <a href="/path/to/download"  className="text-transparent bg-clip-text bg-gradient-to-b from-[#60b7cf] via-[#3e8da7] to-[rgba(0,62,92,0.6)] underline">
                    Download here
                  </a>
                </p>
              </div>

              <div className="container mx-auto md:px-4 w-auto md:max-w-[490px] md:h-[203px]">
                <div className="border-dashed border-[0.4px]  border-[#0033DD] rounded-lg p-4 md:p-10 mt-[12px] md:mt-8 text-center">
                  <div {...getRootProps()} className="cursor-pointer">
                    <input {...getInputProps()} />
                    <Image src={folder1} alt="Upload Icon" className="mx-auto mb-4 w-[51px] h-[51px]" />
                    <p className="text-[10px] md:text-sm font-normal">
                      Drag and drop or <span  className="text-transparent bg-clip-text bg-gradient-to-b from-[#60b7cf] via-[#3e8da7] to-[rgba(0,62,92,0.6)] underline">Choose file</span> to upload
                    </p>
                    {uploadedFile && (
                      <div className="mt-2">
                        <p className="text-sm md:text-base font-medium">File Uploaded</p>
                        {/* <p className="text-lg text-blue-600">{uploadedFile.name}</p> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-[10px] md:gap-[12px] pt-[24px]">
                <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={handleBack}>Back</button>
                <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={handleNext} disabled={!uploadedFile}>Next</button>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div className="rounded-lg w-[100%] md:w-[660px]">
              <h2 className="w-full text-[16px] md:text-[22px] font-medium md:[16px] md:mb-6 text-center">
                Step 3: Review & Submit
              </h2>

              <div className="mb-[16px] md:mb-6 w-full">
                <p className="font-medium text-xs md:text-lg">Order Summary</p>
                <div className="flex items-center justify-center gap-[24px] pt-[12px]">
                  <label htmlFor="name" className="font-DM-Sans font-normal text-[10px] md:text-lg whitespace-nowrap">
                    Order Title :
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

                <p className="font-medium text-[10px] md:text-lg pb-3 pt-6">Request Sheet</p>
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
                  <p className="text-[#717171] mt-2">No file uploaded</p>
                )}
              </div>

              <div className='flex items-center justify-end gap-[10px] md:gap-[12px]'>
                <button className='h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] ' onClick={handleBack}>Edit</button>
                <button disabled={disabled} className={`h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] ${disabled?"opacity-75":""}`} onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default OrderCreationPage;

