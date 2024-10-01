"use client"
import { useOrder } from '@/contexts/OrderContext'
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from 'react'
import { useSession } from "next-auth/react";
import FolderIcon from "../../../public/dashboard/folder.png"
import Image from 'next/image';
import Logo from '@/public/Images/Home/logo.png'
import file1 from '../../../public/dashboard/pdf.png'
import vector3 from '../../../public/dashboard/creation1.png'
import downloadIcon from '../../../public/dashboard/downloadIcon.png'
import CalculateCost from '../../../components/CalculateCost'
import deleteIcon from "@/public/dashboard/deleteIcon.png"
import LangDropdown from "../../../components/LangDropdown"
import { useDropzone } from 'react-dropzone';
import folder1 from "../../../public/dashboard/folder.png"
import { toast } from '@/hooks/use-toast';
import { Progress } from "@/components/ui/progress"
import { useTranslations } from 'next-intl'
import useFcmToken from "@/hooks/useFCMToken";

const NewOrderBox = () => {
  // const { getRootProps, getInputProps } = useDropzone();
  const router = useRouter();
  const path = usePathname();
  const orderIdDB = usePathname().split("/")[3]
  const pathToRedirect = usePathname().split("/").slice(2).join("/");
  const language = usePathname().split("/")[1];
  const { data: session } = useSession();
  const orderPopUpBoxRef = useRef(null);
  const [orderPopVisible, setOrderPopVisible] = useState(false);
  const [activePopup, setActivePopup] = useState('');
  const [check, setCheck] = useState(false);
  const { uploadedFile, setUploadedFile } = useOrder();
  const [currency, setCurrency] = useState("JPY");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopUp1, setIsPopUp1] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const [userIdDB, setUserIdDB] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(false);
  const t = useTranslations("AdminDashboard");
  const [fileType, setFileType] = useState("");
  const [downloadPercentage, setDownloadPercentage] = useState(0);
  const [disabledDownload, setDisabledDownload] = useState(false);
  const [activeDownload, setActiveDownload] = useState(false);
  const [xhr, setXhr] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState(false);
  const [abortController, setAbortController] = useState(null);

  const { token, notificationPermissionStatus } = useFcmToken("66ea96cbb87b8baa2f3a1117");

  const updateDataInDB = async (orderData) => {
    const saveApiResponse = await fetch('/api/updateOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order: orderData, orderIdDB: orderIdDB }),
    });

    console.log(saveApiResponse)
  }

  const updateSampleInDB = async (sampleData) => {
    const saveApiResponse = await fetch('/api/updateSample', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sample: sampleData, orderId: orderIdDB }),
    });

    console.log(saveApiResponse)
  }

  const updateDataInDB1 = async (samples) => {
    const saveApiResponse = await fetch('/api/get-quotation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ samples: samples, orderIdDB: orderIdDB }),
    });
    console.log(saveApiResponse)
  }

  const {
    orderId, setOrderId,
    orderTitle, setOrderTitle,
    requestSheetStatus, setRequestSheetStatus,
    requestSheetLink, setRequestSheetLink,
    costEstimateStatus, setCostEstimateStatus,
    costEstimationLink, setCostEstimationLink,
    formalRequestStatus, setFormalRequestStatus,
    sampleShippingStatus, setSampleShippingStatus,
    sampleShipping, setSampleShipping,
    qualityCheckStatus, setQualityCheckStatus,
    qualityCheckReportLink, setQualityCheckReportLink,
    libraryPrepStatus, setLibraryPrepStatus,
    libraryCheckReportLink, setLibraryCheckReportLink,
    analysisProgressStatus, setAnalysisProgressStatus,
    analysisDoneStatus, setAnalysisDoneStatus,
    analysisRawDataStatus, setAnalysisRawDataStatus,
    rawDataLink, setRawDataLink,
    analysisSpecificationStatus, setAnalysisSpecificationStatus,
    analysisSpecificationReportLink, setAnalysisSpecificationReportLink,
    invoiceStatus, setInvoiceStatus,
    invoiceLink, setInvoiceLink,
    paymentStatus, setPaymentStatus,
    paymentRecieptLink, setPaymentRecieptLink,

  } = useOrder();
  const [disabled, setDisabled] = useState(false);
  const [isTaxChecked, setIsTaxChecked] = useState(false);
  const [isAmountChecked, setIsAmountChecked] = useState(false);
  const [isInvoiceChecked1, setIsInvoiceChecked1] = useState(false);
  const [isInvoiceChecked2, setIsInvoiceChecked2] = useState(false);

  const [samples, setSamples] = useState([
    { id: '', name: '', qualityFees: '', libraryFees: '', analysisFees: '', tax: '', others: '', total: '' },
    { id: '', name: '', qualityFees: '', libraryFees: '', analysisFees: '', tax: '', others: '', total: '' },
    { id: '', name: '', qualityFees: '', libraryFees: '', analysisFees: '', tax: '', others: '', total: '' }
  ]);
  const [samples1, setSamples1] = useState([
    { id: '', name: '', qualityFees: '', libraryFees: '', analysisFees: '', tax: '', others: '', total: '' },
    { id: '', name: '', qualityFees: '', libraryFees: '', analysisFees: '', tax: '', others: '', total: '' },
    { id: '', name: '', qualityFees: '', libraryFees: '', analysisFees: '', tax: '', others: '', total: '' }
  ]);

  const [grandTotal, setGrandTotal] = useState(0);
  const [grandTotal1, setGrandTotal1] = useState(0);
  const [currency1, setCurrency1] = useState("JPY");


  const calculateTotal = (sample) => {
    const qualityFees = parseFloat(sample.qualityFees || 0);
    const libraryFees = parseFloat(sample.libraryFees || 0);
    const analysisFees = parseFloat(sample.analysisFees || 0);
    const others = parseFloat(sample.others || 0);
    const tax = parseFloat(sample.tax || 0);
    const subtotal = qualityFees + libraryFees + analysisFees + others;
    const total = subtotal + (subtotal * (tax / 100));
    return total.toFixed(2);
  };

  const calculateTotal1 = (sample) => {
    const qualityFees = parseFloat(sample.qualityFees || 0);
    const libraryFees = parseFloat(sample.libraryFees || 0);
    const analysisFees = parseFloat(sample.analysisFees || 0);
    const others = parseFloat(sample.others || 0);
    const tax = parseFloat(sample.tax || 0);
    const subtotal = qualityFees + libraryFees + analysisFees + others;
    const total = subtotal + (subtotal * (tax / 100));
    return total.toFixed(2);
  };

  const calculateGrandTotal = (updatedSamples) => {
    return updatedSamples.reduce((acc, sample) => acc + parseFloat(sample.total || 0), 0).toFixed(2);
  };

  const handleDownload = (url, filename) => {
    setDownloadStatus(true);
    toast({
      variant: "success",
      title: "In Progress",
      description: "Download started"
    });

    setDisabledDownload(true);
    setActiveDownload(true);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer'; // Use arraybuffer for binary data

    // Handle progress
    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = Math.round((event.loaded / event.total) * 100);
        setDownloadPercentage(percentage);
        console.log("PERCENTAGE", percentage);
      }
    };

    // Handle completion
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response], { type: xhr.getResponseHeader('Content-Type') });
        const fileType = blob.type;
        console.log(`File type: ${fileType}`); // For debugging

        // Create a link element to trigger the download
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();

        // Clean up
        window.URL.revokeObjectURL(blobUrl);

        setActiveDownload(false);
        setDisabledDownload(false);
        setTimeout(() => {
          setDownloadStatus(false);
        }, 1000)
        setDownloadStatus(false);
      } else {
        console.error('Failed to download file');
        setActiveDownload(false);
        setDisabledDownload(false);
        setTimeout(() => {
          setDownloadStatus(false);
        }, 1000);
      }
    };

    // Handle errors
    xhr.onerror = () => {
      console.error('Download error');
      setActiveDownload(false);
      setDisabledDownload(false);
      setDownloadStatus(false);
    };

    // Handle abort
    xhr.onabort = () => {
      console.log('Download aborted');
      setActiveDownload(false);
      setDisabledDownload(false);
      setDownloadStatus(false);
    };
    // Send the request
    xhr.send();

    // Save the xhr object for later use (pause, resume, cancel)
    setXhr(xhr);
  };

  const handlePauseDownload = () => {
    if (xhr) {
      xhr.abort(); // Abort the current request
      setActiveDownload(false);
      setDisabledDownload(false);
    }
  };

  const handleResumeDownload = (url, filename) => {
    if (!activeDownload && !downloadStatus) {
      handleDownload(url, filename);
    }
  };

  const handleDeleteDownload = () => {
    if (xhr) {
      xhr.abort(); // Abort the current request
      setActiveDownload(false);
      setDisabledDownload(false);
      setDownloadPercentage(0); // Reset the progress percentage
      setDownloadStatus(false);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedSamples = [...samples];
    if (field === 'tax') {
      updatedSamples.forEach(sample => sample.tax = value);
    }
    else {
      updatedSamples[index][field] = value;
    }
    updatedSamples[index].total = calculateTotal(updatedSamples[index]);
    updatedSamples[index][field] = value;
    setSamples(updatedSamples);
    const grandTotal = calculateGrandTotal(updatedSamples);
    setGrandTotal(grandTotal);
  };

  const handleInputChangeInvoice = (index, field, value) => {
    const updatedSamples = [...samples1];
    if (field === 'tax') {
      updatedSamples.forEach(sample => sample.tax = value);
    }
    else {
      updatedSamples[index][field] = value;
    }
    updatedSamples[index].total = calculateTotal1(updatedSamples[index]);
    updatedSamples[index][field] = value;
    setSamples1(updatedSamples);
    const grandTotal1 = calculateGrandTotal(updatedSamples);
    setGrandTotal1(grandTotal1);
  };

  console.log("order title", orderTitle)
  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleGenerateClick = async () => {
    if (!isAmountChecked) {
      toast({
        variant: "error",
        title: "Error",
        description: "please check the box"
      })
    }
    else if (!isTaxChecked) {
      toast({
        variant: "error",
        title: "Error",
        description: "please check the box"
      })
    }
    else {
      const requestData = {
        samples, orderIdDB, grandTotal, currency
      };
      try {
        setDisabled(true);
        const response = await fetch('/api/get-quotation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });

        if (response.ok) {
          const data = await response.json();
          console.log('API response:', data);
          setActivePopup('costEstimateConfirmation');
        } else {
          console.error('API error:', response.statusText);
        }
      } catch (error) {
        console.error('Request failed', error);
      }
      finally {
        setDisabled(false);
      }
    }
  };
  const handleGenerateClick1 = () => {
    setActivePopup("invoice2")
    console.log("hello", isPopUp1)
  };

  const sampleDelelte = () => {
    setActivePopup('deletePopUp');
  }
  const sampleConfirm = () => {
    setActivePopup('confirmPopUp');
  }

  const handleDeleteOk = async () => {
    setDisabled(true)
    try {
      const res = await fetch('/api/sendUpdateInChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userIdDB, message: t("chatMessage.sampleDefect")
        }),
      });
      setOrderPopVisible(false);
      setSampleShippingStatus("isAdminCompleted")
      updateDataInDB({
        sampleShippingStatus: "isAdminCompleted",
        sampleShipping: "notOk"
      })
    }
    catch {
    }
    finally{
      setDisabled(false);
    }

  };
  const handleConfirmOk = async () => {
    setDisabled(true)
    try {
      const res = await fetch('/api/sendUpdateInChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userIdDB, message: t("chatMessage.sampleGood")
        }),
      });
      setOrderPopVisible(false);
      setOrderPopVisible(false);
      setSampleShippingStatus("isAdminCompleted")
      setQualityCheckStatus("inAdminProgress")
      updateDataInDB({
        sampleShippingStatus: "isAdminCompleted",
        qualityCheckStatus:"inAdminProgress",
        sampleShipping: "ok"
      })
      updateSampleInDB({
        qualityCheckStatus:"inAdminProgress"
      })
    }
    catch { }
    finally{
      setDisabled(false);
    }
  };

  const handleClick1 = async () => {
    if (!isInvoiceChecked1) {
      // Show toast if checkbox is not checked
      toast({
        variant: "error",
        title: "Error",
        description: "please check the box"
      })
    }
    if (!isInvoiceChecked2) {
      // Show toast if checkbox is not checked
      toast({
        variant: "error",
        title: "Error",
        description: "please check the box"
      })
    }
    else {
      const requestData = {
        samples1, orderIdDB, grandTotal1, currency1
      };

      try {
        setDisabled(true);
        const response = await fetch('/api/get-quotation-invoice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });

        if (response.ok) {
          const data = await response.json();
          console.log('API response:', data);
          setActivePopup('invoice1');
        } else {
          console.error('API error:', response.statusText);
        }
      } catch (error) {
        console.error('Request failed', error);
      }
      finally {
        setDisabled(false);
      }
      // setActivePopup('costEstimateConfirmation');

    }
  };

  const handleTaxCheckboxChange = (e) => {
    setIsTaxChecked(e.target.checked);
  };
  const handleAmountCheckboxChange = (e) => {
    setIsAmountChecked(e.target.checked);
  };

  const handleRawDataLink = (e) => {
    setRawDataLink(e.target.value);
  };

  const handleInvoiceChecked1 = (e) => {
    setIsInvoiceChecked1(e.target.checked);
  };
  const handleInvoiceChecked2 = (e) => {
    setIsInvoiceChecked2(e.target.checked);
  };

  const handleOrderCreation = () => {
    setOrderPopVisible(true);
    setActivePopup('requestSheet');
  }

  // Function to fetch CSV data and extract sample names
  // async function fetchSampleNames(url) {
  //   try {
  //       const response = await fetch(url);
  //       if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //       }
        
  //       const data = await response.text();
  //       // console.log(data)
        
  //       // Split the data into rows
  //       const rows = data.split('\n');

  //       // Extract sample names
  //       const sampleNames = [];
        
  //       // Loop through the rows, starting from the second row
  //       for (let i = 7; i < rows.length; i++) {
  //           const cells = rows[i].split(',');
  //           console.log(cells)
  //           if (cells.length > 0) {
  //               sampleNames.push(cells[1]); // Extracting sample name from the first column
  //           }
  //       }

  //       // console.log(sampleNames); // Output the sample names
  //       return sampleNames;

  //   } catch (error) {
  //       console.error('Error fetching the CSV file:', error);
  //   }
  // }

  async function fetchSampleNames(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.text();
        
        // Split the data into rows
        const rows = data.split('\n');

        // Extract sample names
        const sampleNames = [];
        
        // Loop through the rows, starting from the eighth row
        for (let i = 8; i < rows.length; i++) {
            const cells = rows[i].split(',');
            
            // Check if the row is not empty and has more than one cell
            if (cells.length > 1 && cells[1].trim() !== "") {
                sampleNames.push(cells[1].trim()); // Extracting sample name from the second column
            }
        }

        return sampleNames;

    } catch (error) {
        console.error('Error fetching the CSV file:', error);
    }
}


  const handleCostEstimateClick = async() => {
    setOrderPopVisible(true);
    setActivePopup('costEstimate');
    const namesArray = await fetchSampleNames(requestSheetLink);
    // console.log("samples",data)
    const updatedSamples = namesArray.map((_, index) => {
        return { 
          name: namesArray[index] || "" , id: orderId, qualityFees: '', libraryFees: '', analysisFees: '', tax: '', others: '', total: '' };
    });
    setSamples(updatedSamples);
  };

  const handleFormalRequestClick = () => {
    setOrderPopVisible(true);
    setActivePopup('formalRequest');

  };

  const handleSampleShippingClick = () => {
    setOrderPopVisible(true);
    setActivePopup('sampleShipping');
  };

  const handleQualityCheckClick = () => {
    setOrderPopVisible(true);
    setActivePopup('qualityCheck');

  };

  const handleLibraryPrepClick = () => {
    setOrderPopVisible(true);
    setActivePopup('libraryPrep');
  };

  const handleAnalysisProgressClick = () => {
    setOrderPopVisible(true);
    setActivePopup('analysisProgress');
  };

  const handleAnalysisDoneClick = () => {
    setOrderPopVisible(true);
    setActivePopup('analysisDone');
  };

  const handleAnalysisRawDataClick = () => {
    setOrderPopVisible(true);
    setActivePopup('analysisRawData');
  };

  const handleAnalysisSpecificationClick = () => {
    setOrderPopVisible(true);
    setActivePopup('analysisSpecification');

  };

  const handleInvoiceClick = async() => {
    setOrderPopVisible(true);
    setActivePopup('invoice');
    // const namesArray = await fetchSampleNames(requestSheetLink);
    // console.log("samples",namesArray)

        const response = await fetch('/api/fetchQuotation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: orderIdDB }),
        });

        const costEstimationSamples = await response.json();
        console.log(costEstimationSamples)

    const updatedSamples = costEstimationSamples.data.map((costEstimationSample, index) => {
      // console.log(costEstimationSample)
      return { 
        name: costEstimationSample.name , id: costEstimationSample.id, qualityFees: costEstimationSample.qualityFees, libraryFees: costEstimationSample.libraryFees, analysisFees: costEstimationSample.analysisFees, tax: costEstimationSample.tax, others: costEstimationSample.others, total: costEstimationSample.total };
    });

    setSamples1(updatedSamples);
    const grandTotal1 = calculateGrandTotal(updatedSamples);
    setGrandTotal1(grandTotal1);
  };

  const handlePaymentClick = () => {
    setOrderPopVisible(true);
    setActivePopup('payment');
  };

  const handleConfirmRequestSheet = async () => {
    try {
      setDisabled(true)
      const res = await fetch('/api/sendUpdateInChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userIdDB, message: t("chatMessage.requestSheet")
        }),
      });
      setOrderPopVisible(false);
      setRequestSheetStatus("isCompleted");
      setCostEstimateStatus("inAdminProgress");
      updateDataInDB({
        requestSheetStatus: "isCompleted",
        costEstimateStatus: "inAdminProgress"
      })
    }
    catch {

    }
    finally{
      setDisabled(false);
    }
  }

  const handleConfirmCostEstimate = async () => {
    setDisabled(true)
    try {
      const res = await fetch('/api/sendUpdateInChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userIdDB, message: t("chatMessage.costEstimate")
        }),
      });
      // Second API call (send-notification)

      const response = await fetch('/api/send-notification', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userIdDB: userIdDB,
          title: "MedBank",
          message: t("notification.costEstimation"),
          link: "/Dashboard",
        }),
      });

      setOrderPopVisible(false);
      setIsPopupVisible(false);
      setCostEstimateStatus("isAdminCompleted");
      updateDataInDB({
        costEstimateStatus: "isAdminCompleted"
      })
    }
    catch {

    }
    finally{
      setDisabled(false);
    }
  }

  const handleConfirmFormalRequest = async () => {
    setDisabled(true);
    try {
      const res = await fetch('/api/sendUpdateInChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userIdDB, message: t("chatMessage.formalRequest")
        }),
      });
      const response = await fetch('/api/send-notification', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userIdDB: userIdDB,
          title: "MedBank",
          message: t("notification.formalRequest"),
          link: "/Dashboard",
        }),
      });
      setFormalRequestStatus("isCompleted")
      setSampleShippingStatus("inUserProgress")
      setOrderPopVisible(false);
      setActivePopup('sampleShipping');
      updateDataInDB({
        formalRequestStatus: "isCompleted",
        sampleShippingStatus: "inUserProgress"
      })
    }
    catch {

    }
    finally{
      setDisabled(false);
    }
  }

  const handleConfirmSampleShipping = () => {
    console.log(sampleShippingStatus)
    console.log("click on ok from sample shipping")
    setIsPopupVisible(false);
    setOrderPopVisible(false);
    setActivePopup('');
    setSampleShipping((prevState) => ({
      ...prevState,
      status: "inProgress",
    }));
  }

  // const handleConfirQualityCheck = async () => {
  //   setIsPopupVisible(false);
  //   setOrderPopVisible(false);
  //   //setActivePopup('');

  //   // setLibraryPrepStatus("inAdminProgress")
  //   // updateDataInDB({
  //   //   qualityCheckStatus: "isAdminCompleted"
  //   // })


  //   setDisabled(true);
  //   if (!uploadedFile) {
  //     toast({
  //       variant: "error",
  //       title: "Error",
  //       description: "Please upload a file..."
  //     })
  //     return;
  //   }
  //   try {
  //     const { name: fileName, type: fileType } = uploadedFile;

  //     // Call the API to get the signed URL
  //     const response = await fetch('/api/fileUpload', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ fileName, fileType }),
  //     });

  //     const { url } = await response.json();
  //     console.log(url)
  //     console.log("upload url", url.url)
  //     setQualityCheckReportLink(url.split("?")[0]);

  //     // Upload the file directly to S3 using the signed URL
  //     const res = await fetch(url, {
  //       method: 'PUT',
  //       body: uploadedFile,
  //       headers: {
  //         'Content-Type': fileType,
  //       },
  //     });
  //     console.log("file upload status", res.status)
  //     console.log("file upload url ", res.url)
  //     console.log(res)

  //     if (res.status !== 200) {
  //       toast({
  //         variant: "error",
  //         title: "Upload Error",
  //         description: "Try uploading file again...",
  //       });
  //       return;
  //     }

  //     setQualityCheckReportLink(res.url.split("?")[0]);

  //     setQualityCheckStatus("isAdminCompleted")
  //     const fileUrl = res.url.split("?")[0];
  //     console.log(fileUrl)

  //     const orderData = {
  //       orderTitle,
  //       qualityCheckStatus: "isAdminCompleted",
  //       qualityCheckReportLink: fileUrl,
  //     };

  //     console.log(orderIdDB)
  //     const saveApiResponse = await fetch('/api/updateOrder', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ order: orderData, orderIdDB: orderIdDB }),
  //     });

  //     console.log(saveApiResponse)

  //     if (saveApiResponse.status !== 200) {
  //       toast({
  //         variant: "error",
  //         title: "Updation Error",
  //         description: "Failed to submit order, please try again...",
  //       });
  //       return;
  //     }

  //     toast({
  //       variant: "success",
  //       title: "Upload Successful",
  //       description: "Your file has been uploaded to S3.",
  //     });
  //   } catch (err) {
  //     toast({
  //       variant: "error",
  //       title: "Upload Failed",
  //       description: "There was an error uploading your file.",
  //     });
  //     console.error("Error uploading file:", err);
  //   } finally {
  //     setDisabled(false);
  //   }
  // }

  const handleConfirQualityCheck = async () => {
    setIsPopupVisible(false);
    setDisabled(true);
    setUploadStatus(true);
  
    if (!uploadedFile) {
      toast({
        variant: "error",
        title: "Error",
        description: "Please upload a file...",
      });
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
      console.log("upload url", url);
  
      setQualityCheckReportLink(url.split("?")[0]);
  
      // Upload the file directly to S3 using XMLHttpRequest
      const uploadRequest = new XMLHttpRequest();
      uploadRequest.open('PUT', url, true);
      uploadRequest.setRequestHeader('Content-Type', fileType);
  
      // Update progress
      uploadRequest.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadPercentage(percentComplete);
        }
      };
  
      // Handle upload complete
      uploadRequest.onload = async () => {
        if (uploadRequest.status === 200) {
          const fileUrl = url.split("?")[0];
          setQualityCheckReportLink(fileUrl);
          setQualityCheckStatus("isAdminCompleted");
  
          const orderData = {
            orderTitle,
            qualityCheckStatus: "isAdminCompleted",
            qualityCheckReportLink: fileUrl,
          };
  
          try {
            // Save order data
            const saveApiResponse = await fetch('/api/updateOrder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ order: orderData, orderIdDB }),
            });
  
            updateSampleInDB({
              qualityCheckStatus: "isAdminCompleted",
            });
  
            if (saveApiResponse.status === 200) {
              // Send notification and chat update in parallel
              await Promise.all([
                fetch('/api/send-notification', {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userIdDB: userIdDB,
                    title: "MedBank",
                    message: t("notification.qualityCheck"),
                    link: "/Dashboard",
                  }),
                }),
                fetch('/api/sendUpdateInChat', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userId: userIdDB,
                    message: t("chatMessage.qualityCheck"),
                  }),
                }),
              ]);
  
              console.log("Notification and chat message sent successfully");
            } else {
              toast({
                variant: "error",
                title: "Updation Error",
                description: "Failed to submit order, please try again...",
              });
            }
          } catch (err) {
            toast({
              variant: "error",
              title: "Updation Error",
              description: "Failed to submit order, please try again...",
            });
            console.error("Error updating order:", err);
          } finally {
            setOrderPopVisible(false);
            setUploadStatus(false);
          }
        } else {
          toast({
            variant: "error",
            title: "Upload Error",
            description: "Try uploading file again...",
          });
        }
      };
  
      // Handle upload error
      uploadRequest.onerror = () => {
        toast({
          variant: "error",
          title: "Upload Failed",
          description: "There was an error uploading your file.",
        });
        console.error("Error uploading file:", uploadRequest.statusText);
      };
  
      uploadRequest.send(uploadedFile);
    } catch (err) {
      toast({
        variant: "error",
        title: "Upload Failed",
        description: "There was an error uploading your file.",
      });
      console.error("Error uploading file:", err);
    } finally {
      setDisabled(false);
      setUploadPercentage(0); // Optionally reset upload percentage
    }
  };
  


  const handleLibraryPrepConfirmation = async () => {
    setIsPopupVisible(false);
    // setOrderPopVisible(false);
    setDisabled(true);
    setUploadStatus(true);

    if (!uploadedFile) {
      toast({
        variant: "error",
        title: "Error",
        description: "Please upload a file...",
      });
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
      console.log("upload url", url);

      setLibraryCheckReportLink(url.split("?")[0]);

      // Upload the file directly to S3 using XMLHttpRequest
      const uploadRequest = new XMLHttpRequest();
      uploadRequest.open('PUT', url, true);
      uploadRequest.setRequestHeader('Content-Type', fileType);

      // Update progress
      uploadRequest.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadPercentage(percentComplete);
        }
      };

      // Handle upload complete
      uploadRequest.onload = async () => {
        if (uploadRequest.status === 200) {
          setLibraryCheckReportLink(url.split("?")[0]);

          setLibraryPrepStatus("isAdminCompleted");
          const fileUrl = url.split("?")[0];

          const orderData = {
            orderTitle,
            libraryPrepStatus: "isAdminCompleted",
            libraryCheckReportLink: fileUrl,
          };

          try {
            // Save order data
            const saveApiResponse = await fetch('/api/updateOrder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ order: orderData, orderIdDB }),
            });

            updateSampleInDB({
              libraryPrepStatus:"isAdminCompleted"
            })

            if (saveApiResponse.status === 200) {
              // toast({
              //   variant: "success",
              //   title: "Upload Successful",
              //   description: "Your file has been uploaded to S3.",
              // });

              // Send update in chat
              const response2 = await fetch('/api/send-notification', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userIdDB: userIdDB,
                  title: "MedBank",
                  message: t("notification.libraryPrep"),
                  link: "/Dashboard",
                }),
              });
              const res = await fetch('/api/sendUpdateInChat', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId: userIdDB, message: t("chatMessage.libraryPrep")
                }),
              });

              if (res.ok) {
                console.log("Chat message sent successfully");
              } else {
                console.error("Failed to send chat message");
              }
            } else {
              toast({
                variant: "error",
                title: "Updation Error",
                description: "Failed to submit order, please try again...",
              });
            }
          } catch (err) {
            toast({
              variant: "error",
              title: "Updation Error",
              description: "Failed to submit order, please try again...",
            });
            console.error("Error updating order:", err);
          } finally {
            setOrderPopVisible(false);
            setUploadStatus(false);
          }
        } else {
          toast({
            variant: "error",
            title: "Upload Error",
            description: "Try uploading file again...",
          });
        }
      };

      // Handle upload error
      uploadRequest.onerror = () => {
        toast({
          variant: "error",
          title: "Upload Failed",
          description: "There was an error uploading your file.",
        });
        console.error("Error uploading file:", uploadRequest.statusText);
      };

      uploadRequest.send(uploadedFile);

    } catch (err) {
      toast({
        variant: "error",
        title: "Upload Failed",
        description: "There was an error uploading your file.",
      });
      console.error("Error uploading file:", err);
    } finally {
      setDisabled(false);
      setUploadPercentage(0); // Optionally reset upload percentage
    }
  };

  const handleAnalysisDoneConfirmation = async () => {
    console.log(sampleShippingStatus)
    console.log("click on ok from sample shipping")
    
    try {
      setDisabled(true);
      const res = await fetch('/api/sendUpdateInChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userIdDB, message: `Dear user\n Analysis has been started for your order ${orderId}` }),
      });
      const response2 = await fetch('/api/send-notification', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userIdDB: userIdDB,
          title: "MedBank",
          message: t("notification.analysisStart"),
          link: "/Dashboard",
        }),
      });
      console.log(res)
      setAnalysisProgressStatus('isCompleted');
      setAnalysisDoneStatus('inAdminProgress');
      handleSendMessage();
      updateDataInDB({
        analysisProgressStatus: "isCompleted",
        analysisDoneStatus: "inAdminProgress"
      })
    } catch {

    }
    finally{
      setDisabled(false);
      setOrderPopVisible(false);
    }

  }

  const handleAnalysisDone = async () => {
    console.log(sampleShippingStatus)
    console.log("click on ok from sample shipping")
   
    try {
      setDisabled(true);
      const res = await fetch('/api/sendUpdateInChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userIdDB, message: `Dear user\n Analysis has been completed for your order ${orderId}` }),
      });
      console.log(res)
      const response2 = await fetch('/api/send-notification', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userIdDB: userIdDB,
          title: "MedBank",
          message: t("notification.analysisDone"),
          link: "/Dashboard",
        }),
      });
      setAnalysisDoneStatus('isCompleted');
      setAnalysisRawDataStatus('inAdminProgress')
      setAnalysisSpecificationStatus('inAdminProgress')
      setInvoiceStatus('inAdminProgress')
      handleSendMessage();
      updateDataInDB({
        analysisDoneStatus: "isCompleted",
        analysisRawDataStatus: "inAdminProgress",
        analysisSpecificationStatus: "inAdminProgress",
        invoiceStatus: "inAdminProgress"
      })
    } catch {

    }
    finally{
      setDisabled(false);
      setOrderPopVisible(false);
    }

  }

  const handleAnalysisRawDataConfirm = async () => {
    if (!rawDataLink) {
      toast({
        variant: "error",
        title: "Error",
        description: "Please paste the data link..."
      })
      return;
    }
    else {
      try {
        setDisabled(true);
        const res = await fetch('/api/sendUpdateInChat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userIdDB, message: t("chatMessage.rawData")
          }),
        });
        const response2 = await fetch('/api/send-notification', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userIdDB: userIdDB,
            title: "MedBank",
            message: t("notification.rawData"),
            link: "/Dashboard",
          }),
        });
        setOrderPopVisible(false);
        setActivePopup('');
        setAnalysisRawDataStatus("isAdminCompleted")
        setRawDataLink(rawDataLink)
        updateDataInDB({
          analysisRawDataStatus: "isAdminCompleted",
          rawDataLink: rawDataLink
        })
        updateSampleInDB({
          analysisSpecificationStatus:"inAdminProgress"
        })
      }
      catch {

      }
      finally{
        setDisabled(false);
      }
    }
  }

  const handleAnalysisSpecification = async () => {
    setIsPopupVisible(false);
    // setOrderPopVisible(false);
    setDisabled(true);
    setUploadStatus(true);

    if (!uploadedFile) {
      toast({
        variant: "error",
        title: "Error",
        description: "Please upload a file...",
      });
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
      console.log("upload url", url);

      setAnalysisSpecificationReportLink(url.split("?")[0]);

      // Upload the file directly to S3 using XMLHttpRequest
      const uploadRequest = new XMLHttpRequest();
      uploadRequest.open('PUT', url, true);
      uploadRequest.setRequestHeader('Content-Type', fileType);

      // Update progress
      uploadRequest.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadPercentage(percentComplete);
        }
      };

      // Handle upload complete
      uploadRequest.onload = async () => {
        if (uploadRequest.status === 200) {
          setAnalysisSpecificationReportLink(url.split("?")[0]);

          setAnalysisSpecificationStatus("isAdminCompleted");
          const fileUrl = url.split("?")[0];

          const orderData = {
            orderTitle,
            analysisSpecificationStatus: "isAdminCompleted",
            analysisSpecificationReportLink: fileUrl,
          };

          try {
            // Save order data
            const saveApiResponse = await fetch('/api/updateOrder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ order: orderData, orderIdDB }),
            });

            updateSampleInDB({
              analysisSpecificationStatus:"isAdminCompleted"
            })

            if (saveApiResponse.status === 200) {
              // toast({
              //   variant: "success",
              //   title: "Upload Successful",
              //   description: "Your file has been uploaded to S3.",
              // });

              // Send update in chat
              const response2 = await fetch('/api/send-notification', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userIdDB: userIdDB,
                  title: "MedBank",
                  message: t("notification.analysisSpecification"),
                  link: "/Dashboard",
                }),
              });
              const res = await fetch('/api/sendUpdateInChat', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId: userIdDB, message: t("chatMessage.analysisSpecification")
                }),
              });

              if (res.ok) {
                console.log("Chat message sent successfully");
              } else {
                console.error("Failed to send chat message");
              }
            } else {
              toast({
                variant: "error",
                title: "Updation Error",
                description: "Failed to submit order, please try again...",
              });
            }
          } catch (err) {
            toast({
              variant: "error",
              title: "Updation Error",
              description: "Failed to submit order, please try again...",
            });
            console.error("Error updating order:", err);
          } finally {
            setOrderPopVisible(false);
            setUploadStatus(false);
          }
        } else {
          toast({
            variant: "error",
            title: "Upload Error",
            description: "Try uploading file again...",
          });
        }
      };

      // Handle upload error
      uploadRequest.onerror = () => {
        toast({
          variant: "error",
          title: "Upload Failed",
          description: "There was an error uploading your file.",
        });
        console.error("Error uploading file:", uploadRequest.statusText);
      };

      uploadRequest.send(uploadedFile);

    } catch (err) {
      toast({
        variant: "error",
        title: "Upload Failed",
        description: "There was an error uploading your file.",
      });
      console.error("Error uploading file:", err);
    } finally {
      setDisabled(false);
      setUploadPercentage(0); // Optionally reset upload percentage
    }
  };


  const handleAbortUpload = () => {
    if (abortController) {
      abortController.abort(); // Abort the current upload request
      setAbortController(null); // Clear the abort controller
      setUploadStatus(false); // Reset upload status
      setUploadPercentage(0); // Reset upload percentage
      setDisabled(false); // Re-enable the button
    }
  };

  const handleInvoice = async () => {
    try {
      setDisabled(true);
      const res = await fetch('/api/sendUpdateInChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userIdDB, message: t("chatMessage.invoice")
        }),
      });
      const response2 = await fetch('/api/send-notification', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userIdDB: userIdDB,
          title: "MedBank",
          message: t("notification.invoice"),
          link: "/Dashboard",
        }),
      });
      setOrderPopVisible(false);
      //setActivePopup('');
      setInvoiceStatus("isAdminCompleted")
      updateDataInDB({
        invoiceStatus: "isAdminCompleted"
      })
    }
    catch {

    }
    finally{
      setDisabled(false)
    }
  }

  const handleConfirmPayment = async () => {
    try{
        setPaymentStatus("isAdminCompleted");

        const orderData = {
          paymentStatus: "isAdminCompleted",
        };

        // Save order data
        const saveApiResponse = await fetch("/api/updateOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order: orderData, orderIdDB }),
        });

        if (saveApiResponse.status === 200) {
          toast({
            variant: "success",
            title: "Payment reciept sent",
            description: "Payment reciept has been sent to the user.",
          });
          const response2 = await fetch('/api/send-notification', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userIdDB: userIdDB,
              title: "MedBank",
              message: t("notification.payment"),
              link: "/Dashboard",
            }),
          });

          const res = await fetch("/api/sendUpdateInChat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userIdDB,
              message: t("chatMessage.payment"),
            }),
          });

        } else {
          throw new Error("Failed to submit order");
        }
    } catch (err) {
      toast({
        variant: "error",
        title: "Payment Reciept Error",
        description: err.message,
      });
      console.error("Error:", err);
    } finally {
    }
  };


  const handleClickOutside = (event) => {
    if (orderPopUpBoxRef.current && !orderPopUpBoxRef.current.contains(event.target)) {
      setOrderPopVisible(false);
    }
  };

  useEffect(() => {
    if (sampleShippingStatus == "isPending" && formalRequestStatus == "isCompleted") {
      setActivePopup("sampleShipping");
      setOrderPopVisible(true);
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (uploadedFile instanceof File) {
        URL.revokeObjectURL(uploadedFile);
      }
    };
  }, [uploadedFile]);

  useEffect(() => {
    const fetchOrderByID = async (orderId) => {
      try {
        const response = await fetch('/api/fetchOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: orderId }),
        });
        const order = await response.json();
        const orderData = order.data
        console.log(orderData.userId)
        setUserIdDB(orderData.userId);
        setOrderId(orderData.orderId);
        setOrderTitle(orderData.orderTitle);
        setRequestSheetStatus(orderData.requestSheetStatus);
        setRequestSheetLink(orderData.requestSheetLink);
        setCostEstimateStatus(orderData.costEstimateStatus);
        setCostEstimationLink(orderData.costEstimateLink);
        setFormalRequestStatus(orderData.formalRequestStatus);
        setSampleShippingStatus(orderData.sampleShippingStatus);
        setSampleShipping(orderData.sampleShipping);
        setQualityCheckStatus(orderData.qualityCheckStatus);
        setQualityCheckReportLink(orderData.qualityCheckReportLink);
        setLibraryPrepStatus(orderData.libraryPrepStatus);
        setLibraryCheckReportLink(orderData.libraryPrepReportLink);
        setAnalysisProgressStatus(orderData.analysisProgressStatus);
        setAnalysisDoneStatus(orderData.analysisDoneStatus);
        setAnalysisRawDataStatus(orderData.analysisRawDataStatus);
        setRawDataLink(orderData.analysisRawDataRawDataLink);
        setAnalysisSpecificationStatus(orderData.analysisSpecificationStatus);
        setAnalysisSpecificationReportLink(orderData.analysisSpecificationReportLink);
        setInvoiceStatus(orderData.invoiceStatus);
        setInvoiceLink(orderData.invoiceLink);
        setPaymentStatus(orderData.paymentStatus);
        setPaymentRecieptLink(orderData.paymentRecieptLink);
        console.log(orderData)
      } catch (error) {
        console.log("fetch order error ", error)
      }
    }
    fetchOrderByID(orderIdDB);
  }, [])

  console.log("orderid", orderId)
  const handleSendMessage = () => {
    router.push(`${path}/${userIdDB}`)
  }

  return (
    <>
      <div className='text-[#333333] mb-[14px] flex flex-col justify-between h-full'>
        {orderPopVisible && (
          <div className='fixed top-0 left-0 backdrop-blur-[1px] flex items-center justify-center w-[100vw] h-[100vh] bg-[#00000066]'>
            <div ref={orderPopUpBoxRef}>
              {activePopup === 'requestSheet' && (
                <div className='p-[10px] w-[298px] h-[197px] md:h-[334px] md:w-[760px] md:p-[120px] flex flex-col gap-[24px] items-center justify-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className='flex flex-col gap-[12px] md:gap-[24px]'>
                    <span className='text-[16px] font-DM-Sans text-center font-bold md:text-[32px] md:leading-[40px] text-[#333333]'>{t("requestSheet.title")}</span>
                    <span className='text-[12px] font-DM-Sans text-start font-normal md:text-[20px] md:leading-[34px] text-[#333333]'>{t("requestSheet.message")}</span>
                  </div>
                  
                  <div className='flex items-center justify-center gap-[12px]'>
                    <button onClick={() => handleDownload(requestSheetLink.split("?")[0], `RequestSheet.csv`)} disabled={disabled} className={`${disabled ? "opacity-75" : ""}`}>
                      <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]">{t("requestSheet.download")}</button>
                    </button>
                    <button disabled={disabled} className={`${disabled ? "opacity-75" : ""} h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]`} onClick={handleConfirmRequestSheet}>{t("requestSheet.confirm")}</button>
                  </div>
                </div>
              )}
              {activePopup === 'costEstimate' && (
                <div className="bg-white rounded-md shadow-lg md:py-[26px] md:px-[12px] w-[90vw] lg:w-[1199px] mx-5 px-4 md:mx-auto my-10 font-DM-Sans md:min-h-[576px]">
                  <h2 className="text-[18px] md:text-[22px] font-medium text-center mb-4 md:mb-6">{t("costEstimation.title")}</h2>
                  <div className='border border-dashed'></div>
                  <div className='border border-dashed pt-[20px]'></div>

                  <div className="overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    <table className="w-full mb-6 min-w-[768px]">
                      <thead>
                        <tr className="text-left font-medium text-sm">
                          <th className="py-2">{t("costEstimation.sampleId")}</th>
                          <th className="py-2">{t("costEstimation.sampleName")}</th>
                          <th className="py-2">{t("costEstimation.qfees")}</th>
                          <th className="py-2">{t("costEstimation.lfees")}</th>
                          <th className="py-2">{t("costEstimation.afees")}</th>
                          <th className="py-2">{t("costEstimation.tax")}<span className='w-[40px] text-white'>.......</span></th>
                          <th className="py-2">{t("costEstimation.others")}</th>
                          <th className="py-2">{t("costEstimation.total")}</th>
                        </tr>
                      </thead>
                      <tbody className='border-t'>
                        {samples.map((_, index) => (
                          <tr key={index} className="text-[12px] font-normal">
                            <td className="py-[12px] md:w-[98px] pr-[20px]">
                              <input
                                type="text"
                                className="border rounded-md lg:w-full p-2"
                                onChange={(e) => handleInputChange(index, 'id', e.target.value)}
                                value={samples[index].id}
                                placeholder={`10${index + 1}`}
                              />
                            </td>
                            <td className="md:w-[108px] py-[12px] pr-[20px]">
                              <input
                                type="text"
                                className="border rounded-md lg:w-full p-2"
                                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                value={samples[index].name}
                                placeholder={`${index === 0 ? 'Red' : index === 1 ? 'White' : 'Yellow'} mouse`}
                              />
                            </td>
                            <td className="md:w-[156px] py-[12px] pr-[10px]">
                              <div className='flex gap-[2px]'>
                                <div className="w-[108px] flex-shrink-0 group">
                                  <input
                                    type="text"
                                    className="border rounded-md w-full p-2"
                                    onChange={(e) => handleInputChange(index, 'qualityFees', e.target.value)}
                                    placeholder=""
                                  />
                                </div>
                                <div className="w-[66px] flex-shrink-0">
                                  <div className='group'>
                                    <div className={`rounded-md bg-gray-200 group-focus-within:gradient-primary`} >
                                      <LangDropdown
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="md:w-[156px] py-[12px] pr-[10px]">
                              <div className='flex gap-[2px]'>
                                <div className="w-[108px] flex-shrink-0 group">
                                  <input
                                    type="text"
                                    className="border rounded-md w-full p-2"
                                    onChange={(e) => handleInputChange(index, 'libraryFees', e.target.value)}
                                    placeholder=""
                                  />
                                </div>
                                <div className="w-[66px] flex-shrink-0">
                                  <div className='group'>
                                    <div className={`rounded-md bg-gray-200 group-focus-within:gradient-primary`} >
                                      <LangDropdown
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="md:w-[156px] py-[12px] pr-[10px]">
                              <div className='flex gap-[2px]'>
                                <div className="w-[108px] flex-shrink-0 group">
                                  <input
                                    type="text"
                                    className="border rounded-md w-full p-2"
                                    onChange={(e) => handleInputChange(index, 'analysisFees', e.target.value)}
                                    placeholder=""
                                  />
                                </div>
                                <div className="w-[66px] flex-shrink-0">
                                  <div className='group'>
                                    <div className={`rounded-md bg-gray-200 group-focus-within:gradient-primary`} >
                                      <LangDropdown
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="md:w-[108px] py-[12px] md:pr-[20px] pr-[10px]">
                              <input
                                type="text"
                                className="border rounded-md w-full p-2 bg-[#33333314]"
                                onChange={(e) => handleInputChange(index, 'tax', e.target.value)}
                                value={samples[index].tax}
                                placeholder=""
                              />
                            </td>
                            <td className="md:w-[108px] py-[12px] md:pr-[20px] pr-[10px]">
                              <input
                                type="text"
                                className="border rounded-md lg:w-full p-2 bg-[#33333314]"
                                onChange={(e) => handleInputChange(index, 'others', e.target.value)}
                                placeholder=""
                              />
                            </td>
                            <td className="md:w-[108px]">
                              <input
                                type="text"
                                className="border rounded-md lg:w-full p-2"
                                onChange={(e) => handleInputChange(index, 'total1', e.target.value)}
                                placeholder=""
                                value={samples[index].total}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t font-medium text-[14px]">
                          <td colSpan="7" className="text-right py-2 pr-6">{t("costEstimation.grandTotal")}</td>
                          <td className="md:w-[108px]">
                            <input
                              type="text"
                              className="border rounded-md w-full p-2"
                              placeholder=""
                              value={grandTotal}
                            />
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="flex items-center text-[14px] font-normal">
                    <input
                      type="checkbox"
                      id="tax"
                      className="form-checkbox accent-[#3e8ca7] mr-2"
                      checked={isTaxChecked}
                      onChange={handleTaxCheckboxChange}
                    />
                    <label htmlFor="tax">{t("costEstimation.checkbox1")}</label>
                  </div>
                  <div className="flex items-center mb-[6px] text-[14px] font-normal">
                    <input
                      type="checkbox"
                      id="amount"
                      className="form-checkbox accent-[#3e8ca7] mr-2"
                      checked={isAmountChecked}
                      onChange={handleAmountCheckboxChange}
                    />
                    <label htmlFor="amount">{t("costEstimation.checkbox2")}</label>
                  </div>
                  <p className="text-[14px] font-normal mb-6">
                    {t("costEstimation.note")}
                  </p>
                  <div className='w-full flex items-end justify-end gap-[12px] pb-4'>
                    <button onClick={() => { setOrderPopVisible(false) }} className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]">{t("costEstimation.back")}</button>
                    <button disabled={disabled} onClick={handleGenerateClick} className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]">{t("costEstimation.generate")}</button>
                  </div>
                </div>
              )}
              {activePopup === 'costEstimateConfirmation' && (
                <div id="cost-estimate-table" className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                  <div className='px-[20px] py-[20px] mx-[10px] md:mx-0 gap-[24px] md:gap-0 md:h-[334px] md:w-[564px] md:py-[65px] md:px-[48px] flex flex-col items-center justify-between bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                    <span className='w-full font-DM-Sans font-bold md:text-[32px] md:leading-[40px] text-[#333333]'>{t("costEstimationConfirm.title")}</span>
                    <span className='w-full font-DM-Sans font-normal md:text-[20px] md:leading-[34px] text-[#333333]'>{t("costEstimationConfirm.message")}</span>
                    <button disabled={disabled} className={`${disabled ? "opacity-75" : ""}
                      w-full h-[50px] md:h-[48px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] `}
                      onClick={handleConfirmCostEstimate}
                    >
                      {t("costEstimationConfirm.button")}
                    </button>
                  </div>
                </div>
              )}
              {activePopup === 'formalRequest' && (
                <div className='p-[24px] md:p-0 w-[298px] h-[259px] md:h-[334px] md:w-[564px] md:py-[65px] md:px-[48px] flex flex-col items-center md:justify-between bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)] gap-[16px] md:gap-0'>
                  <span className=' w-full font-DM-Sans font-bold md:text-[32px] md:leading-[40px] text-[#333333]'>{t("formalRequest.confirmation")}</span>
                  <span className='w-full font-DM-Sans font-normal md:text-[20px] md:leading-[34px] text-[#333333]'>{t("formalRequest.message")}</span>
                  <button disabled={disabled} className={`${disabled ? "opacity-75" : ""} w-full h-[50px] md:h-[48px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]`} onClick={handleConfirmFormalRequest}>{t("formalRequest.ok")}</button>
                </div>
              )}
              {activePopup === 'sampleShipping' && (
                <div className='p-[24px] w-[361px] h-[215px] md:h-[287px] md:w-[658px] md:p-[10px] flex flex-col gap-[24px] items-center justify-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className='flex flex-col gap-[24px]'>
                    <span className='font-DM-Sans text-center font-bold md:text-[32px] md:leading-[40px] text-[#333333]'>{t("sampleShipping.title")}</span>
                    <span className='font-DM-Sans text-start items-center font-normal md:text-[20px] md:leading-[34px] text-[#333333]'> {t("sampleShipping.message")}</span>
                  </div>
                  <div className='flex items-center justify-center gap-[6px] md:gap-[12px]'>
                    <button className="hidden h-[40px] md:h-[48px] w-[136px] md:w-[268px] rounded-[6px] md:flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center md:leading-[24px]" onClick={sampleDelelte}>{t("sampleShipping.defectDesk")}</button>
                    <button className="hidden h-[40px] md:h-[48px] w-[136px] md:w-[268px] rounded-[6px] md:flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center md:leading-[24px]" onClick={sampleConfirm}>{t("sampleShipping.confirmDesk")}</button>
                    <button className="md:hidden h-[40px] md:h-[48px] w-[162px] md:w-[268px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center md:leading-[24px]" onClick={sampleDelelte}>{t("sampleShipping.defectMob")}</button>
                    <button className="md:hidden h-[40px] md:h-[48px] w-[162px] md:w-[268px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center md:leading-[24px]" onClick={sampleConfirm}>{t("sampleShipping.confirmMob")}</button>
                  </div>
                </div>
              )}
              {activePopup === 'deletePopUp' && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                  <div className='p-[24px] w-[298px] h-[330px] md:h-[436px] md:w-[564px] md:p-[48px] flex flex-col items-center justify-between bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                    <span className='text-[22px] w-full font-DM-Sans font-bold md:text-[32px] md:leading-[40px] text-[#333333]'>{t("deletePopup.title")}</span>
                    <span className='w-full font-DM-Sans font-normal md:text-[20px] md:leading-[34px] text-[#333333] text-[14px]'>{t("deletePopup.message")}<br></br>
                      {t("deletePopup.message1")}<br></br>
                      {t("deletePopup.message2")} <br></br>
                      {t("deletePopup.message3")}</span>
                    <button disabled={disabled} className={`${disabled ? "opacity-75" : ""}
                      w-full h-[40px] md:h-[48px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]`}
                      onClick={handleConfirmOk}
                    >
                      {t("deletePopup.button")}
                    </button>
                  </div>
                </div>
              )}
              {activePopup === 'confirmPopUp' && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                  <div className='p-[24px] w-[298px] h-[330px] md:h-[436px] md:w-[564px] md:p-[48px] flex flex-col items-center justify-between bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                    <span className='text-[22px] w-full font-DM-Sans font-bold md:text-[32px] md:leading-[40px] text-[#333333]'>{t("confirmPopup.title")}</span>
                    <span className='w-full font-DM-Sans font-normal md:text-[20px] md:leading-[34px] text-[#333333] text-[14px]'>{t("confirmPopup.message")}<br></br>
                      {t("confirmPopup.message1")}<br></br>
                      {t("confirmPopup.message2")} <br></br>
                      {t("confirmPopup.message3")}</span>
                    <button disabled={disabled} className={`${disabled ? "opacity-75" : ""}
                      w-full h-[40px] md:h-[48px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]`}
                      onClick={handleConfirmOk}
                    >
                      {t("confirmPopup.button")}
                    </button>
                  </div>
                </div>
              )}
              {activePopup === 'qualityCheck' && (
                <div className='p-[16px] w-[356px] h-[290px] md:h-[435px] md:w-[760px] md:py-[26px] flex flex-col md:gap-[24px] items-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className="text-[16px] md:text-[22px] font-medium text-center md:pb-0 pb-[16px]">{t("qualityCheck.title")}</div>
                  <div className='border border-dashed bg-gray-100 w-full'></div>
                  <div className="mx-auto">
                    <div className="w-[313px] h-[154px]  md:px-4 md:w-[490px] md:h-[203px] md:pt-0 pt-[12px] border-dashed border-[0.4px]  border-[#60b7cf] rounded-lg text-center flex flex-col items-center justify-center">
                      <div {...getRootProps()} className="cursor-pointer">
                        <input {...getInputProps()} />
                        <Image src={folder1} alt="Upload Icon" className="mx-auto mb-2 md:mb-4 w-[51px] h-[51px]" />
                        <p className="text-[10px] md:text-sm font-normal">
                          {t("qualityCheck.drag")} <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#60b7cf] via-[#3e8da7] to-[rgba(0,62,92,0.6)] underline">{t("qualityCheck.drag1")}</span> {t("qualityCheck.drag2")}
                        </p>
                        {uploadedFile && (
                          <div className="mt-2">
                            <p className="text-[10px] md:text-sm font-medium">{t("qualityCheck.file")}</p>
                            {/* <p className="text-lg text-blue-600">{uploadedFile.name}</p> */}
                          </div>
                        )}
                        {uploadStatus && (
                          <div className='w-full flex flex-col items-start'>
                            <span className='text-[10px] w-full flex justify-between'><span>{t("qualityCheck.uploading")}</span> <span>{uploadPercentage} %</span> </span>
                            <div className='w-full flex'>
                              <Progress value={uploadPercentage} />
                              {/* <div className="text-red-500 cursor-pointer" onClick={handleDeleteUpload}>
                                <Image src={deleteIcon} className='h-[13px] w-[13px]'></Image>
                              </div> */}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-[490px] flex items-center justify-end gap-[12px] pt-[12px] md:pt-4'>
                    <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={() => { setOrderPopVisible(false) }}>{t("qualityCheck.back")}</button>
                    <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={handleConfirQualityCheck} disabled={!uploadedFile || uploadStatus}>{t("qualityCheck.upload")}</button>
                  </div>
                </div>
              )}
              {activePopup === 'libraryPrep' && (
                <div className='p-[16px] w-[356px] h-[290px] md:h-[435px] md:w-[760px] md:py-[26px] flex flex-col md:gap-[24px] items-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className="text-[16px] md:text-[22px] font-medium text-center md:pb-0 pb-[16px]">{t("libraryPrep.title")}</div>
                  <div className='border border-dashed bg-gray-100 w-full'></div>
                  <div className="mx-auto">
                    <div className="w-[313px] h-[154px]  md:px-4 md:w-[490px] md:h-[203px] md:pt-0 pt-[12px] border-dashed border-[0.4px]  border-[#60b7cf] rounded-lg text-center flex flex-col items-center justify-center">
                      <div {...getRootProps()} className="cursor-pointer">
                        <input {...getInputProps()} />
                        <Image src={folder1} alt="Upload Icon" className="mx-auto mb-2 md:mb-4 w-[51px] h-[51px]" />
                        <p className="text-[10px] md:text-sm font-normal">
                          {t("libraryPrep.drag")} <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#60b7cf] via-[#3e8da7] to-[rgba(0,62,92,0.6)] underline">{t("libraryPrep.drag1")}</span> {t("libraryPrep.drag2")}
                        </p>
                        {uploadedFile && (
                          <div className="mt-2">
                            <p className="text-[10px] md:text-sm font-medium">{t("libraryPrep.file")}</p>
                            {/* <p className="text-lg text-blue-600">{uploadedFile.name}</p> */}
                          </div>
                        )}
                        {uploadStatus && (
                          <div className='w-full flex flex-col items-start'>
                            <span className='text-[10px] w-full flex justify-between'><span>{t("libraryPrep.uploading")}</span> <span>{uploadPercentage} %</span> </span>
                            <div className='flex w-full'>
                              <Progress value={uploadPercentage} />
                              {/* <div className="text-red-500 cursor-pointer" onClick={handleDeleteUpload}>
                                <Image src={deleteIcon} className='h-[13px] w-[13px]'></Image>
                              </div> */}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-[490px] flex items-center justify-end gap-[12px] pt-[12px] md:pt-4'>
                    <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={() => { setOrderPopVisible(false) }}>{t("libraryPrep.back")}</button>
                    <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={handleLibraryPrepConfirmation} disabled={!uploadedFile || uploadStatus}>{t("libraryPrep.upload")}</button>
                  </div>
                </div>
              )}
              {activePopup === 'analysisProgress' && (
                <div className='w-[298px] h-[221px] md:h-[278px] md:w-[445px] p-[24px] md:p-[10px] flex flex-col gap-[24px] items-center justify-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className='flex flex-col gap-[24px]'>
                    <span className='font-DM-Sans text-center font-bold md:text-[32px] md:leading-[40px] text-[#333333]'>{t("analysisProgress.title")}</span>
                    <span className='font-DM-Sans text-center font-normal md:text-[20px] md:leading-[34px] text-[#333333]'>{t("analysisProgress.message")}</span>
                  </div>
                  <div className='flex items-center justify-center gap-[12px]'>
                    <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={() => { setOrderPopVisible(false) }}>{t("analysisProgress.cancel")}</button>
                    <button disabled={disabled} className={`${disabled?"opacity-75":""} h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]`} onClick={handleAnalysisDoneConfirmation}>{t("analysisProgress.start")}</button>
                  </div>
                </div>
              )}
              {activePopup === 'analysisDone' && (
                <div className='w-[298px] h-[221px] md:h-[278px] md:w-[445px] p-[24px] md:p-[10px] flex flex-col gap-[24px] items-center justify-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className='flex flex-col gap-[24px]'>
                    <span className='font-DM-Sans text-center font-bold md:text-[32px] md:leading-[40px] text-[#333333]'>{t("analysisDone.title")}</span>
                    <span className='font-DM-Sans text-center font-normal md:text-[20px] md:leading-[34px] text-[#333333]'>{t("analysisDone.message")}</span>
                  </div>
                  <div className='flex items-center justify-center gap-[12px]'>
                    <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={() => { setOrderPopVisible(false) }}>{t("analysisDone.cancel")}</button>
                    <button disabled={disabled} className={`${disabled?"opacity-75":""} h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]`} onClick={handleAnalysisDone}>{t("analysisDone.submit")}</button>
                  </div>
                </div>
              )}
              {activePopup === 'analysisRawData' && (
                <div className='font-DM-Sans flex flex-col w-[352px] h-[197px] md:h-[282px] md:w-[760px] p-[28px] md:p-12  items-center justify-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className='text-[22px] md:text-[22px] font-bold font-DM-Sans pb-[6px] md:pb-4 leading-[24px]'>{t("analysisRawData.title")}</div>
                  <div className='w-full border-t-2 border-dashed border-gray-100 md:pb-4'></div>
                  <div className="md:flex md:flex-row flex flex-col  gap-[6px] md:gap-4">
                    <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm flex items-center md:pt-6">
                      {t("analysisRawData.link")}
                    </label>
                    <div className='group w-[332px] md:w-[527px] h-[35px] md:h-[46px] flex items-center justify-center md:pt-8'>
                      <div className={`w-[332px] md:w-[527px] rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                        <input className="w-[332px] md:w-[527px] p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                          placeholder="link"
                          value={rawDataLink}
                          onChange={handleRawDataLink}
                          style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                          type="text"
                          name="name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className='w-full flex items-center justify-end gap-[10px] md:gap-[12px] pt-[20px] md:pt-12'>
                    <button onClick={() => { setOrderPopVisible(false) }} className='h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] '>{t("analysisRawData.back")}</button>
                    <button onClick={handleAnalysisRawDataConfirm} disabled={disabled} className={`${disabled?"opacity-75":""} h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] `}>{t("analysisRawData.send")}</button>
                  </div>
                </div>
              )}
              {activePopup === 'analysisSpecification' && (
                <div className='p-[16px] w-[356px] h-[290px] md:h-[435px] md:w-[760px] md:py-[26px] flex flex-col md:gap-[24px] items-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className="text-[16px] md:text-[22px] font-medium text-center md:pb-0 pb-[16px]">{t("analysisSpecification.title")}</div>
                  <div className='border border-dashed bg-gray-100 w-full'></div>
                  <div className="mx-auto">
                    <div className="w-[313px] h-[154px]  md:px-4 md:w-[490px] md:h-[203px] md:pt-0 pt-[12px] border-dashed border-[0.4px]  border-[#60b7cf] rounded-lg text-center flex flex-col items-center justify-center">
                      <div {...getRootProps()} className="cursor-pointer">
                        <input {...getInputProps()} />
                        <Image src={folder1} alt="Upload Icon" className="mx-auto mb-2 md:mb-4 w-[51px] h-[51px]" />
                        <p className="text-[10px] md:text-sm font-normal">
                          {t("analysisSpecification.drag")} <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#60b7cf] via-[#3e8da7] to-[rgba(0,62,92,0.6)] underline">{t("analysisSpecification.drag1")}</span> {t("analysisSpecification.drag2")}
                        </p>
                        {uploadedFile && (
                          <div className="mt-2">
                            <p className="text-[10px] md:text-sm font-medium">{t("analysisSpecification.file")}</p>
                            {/* <p className="text-lg text-blue-600">{uploadedFile.name}</p> */}
                          </div>
                        )}
                        {uploadStatus && (
                          <div className='w-full flex flex-col items-start'>
                            <span className='text-[10px] w-full flex justify-between'><span>{t("analysisSpecification.uploading")}</span> <span>{uploadPercentage} %</span> </span>
                            <div className='w-full flex'>
                              <Progress value={uploadPercentage} />
                              <div className="text-red-500 cursor-pointer" onClick={handleAbortUpload}>
                                <Image src={deleteIcon} className='h-[13px] w-[13px]'></Image>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-[490px] flex items-center justify-end gap-[12px] pt-[12px] md:pt-4'>
                    <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={() => { setOrderPopVisible(false) }}>{t("analysisSpecification.back")}</button>
                    <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={handleAnalysisSpecification} disabled={!uploadedFile || uploadStatus}>{t("analysisSpecification.upload")}</button>
                  </div>
                </div>
              )}
              {activePopup === 'invoice' && (
                <div className="bg-white rounded-md shadow-lg md:py-[26px] md:px-[12px] w-[90vw] lg:w-[1199px] mx-5 px-4 md:mx-auto my-10 font-DM-Sans md:min-h-[576px]">
                  <h2 className="text-[18px] md:text-[22px] font-medium text-center mb-4 md:mb-6">{t("invoice.title")}</h2>
                  <div className='border border-dashed'></div>
                  <div className='border border-dashed pt-[20px]'></div>
                  <div className="w-full overflow-x-scroll">
                    <table className="w-full mb-6 min-w-[768px]">
                      <thead>
                        <tr className="text-left font-medium text-sm">
                          <th className="py-2">{t("invoice.sampleId")}</th>
                          <th className="py-2">{t("invoice.sampleName")}</th>
                          <th className="py-2">{t("invoice.qfees")}</th>
                          <th className="py-2">{t("invoice.lfees")}</th>
                          <th className="py-2">{t("invoice.afees")}</th>
                          <th className="py-2 text-nowrap">{t("invoice.tax")} <span className='w-[40px] text-white'>.......</span></th>
                          <th className="py-2">{t("invoice.others")}</th>
                          <th className="py-2">{t("invoice.total")}</th>
                        </tr>
                      </thead>
                      <tbody className='border-t'>
                        {samples1.map((_, index) => (
                          <tr key={index} className="text-[12px] font-normal">
                            <td className="py-[12px] md:w-[98px] pr-[20px]">
                              <input
                                type="text"
                                className="border rounded-md w-full p-2"
                                onChange={(e) => handleInputChangeInvoice(index, 'id', e.target.value)}
                                placeholder={`10${index + 1}`}
                                value={samples1[index].id}
                              />
                            </td>
                            <td className="md:w-[108px] py-[12px] pr-[20px]">
                              <input
                                type="text"
                                className="border rounded-md w-full p-2"
                                onChange={(e) => handleInputChangeInvoice(index, 'name', e.target.value)}
                                value={samples1[index].name}
                                placeholder={`${index === 0 ? 'Red' : index === 1 ? 'White' : 'Yellow'} mouse`}
                              />
                            </td>
                            <td className="md:w-[156px] py-[12px]">
                              <div className='flex gap-[2px]'>
                                <div className="w-[108px] flex-shrink-0 group">
                                  <input
                                    type="text"
                                    className="border rounded-md w-full p-2"
                                    value={samples1[index].qualityFees}
                                    onChange={(e) => handleInputChangeInvoice(index, 'qualityFees', e.target.value)}
                                    placeholder=""
                                  />
                                </div>
                                <div className="w-[66px] flex-shrink-0">
                                  <div className='group'>
                                    <div className={`rounded-md bg-gray-200 group-focus-within:gradient-primary`} >
                                      <LangDropdown
                                        value={currency1}
                                        onChange={(e) => setCurrency1(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="md:w-[156px] py-[12px]">
                              <div className='flex gap-[2px]'>
                                <div className="w-[108px] flex-shrink-0 group">
                                  <input
                                    type="text"
                                    className="border rounded-md w-full p-2"
                                    onChange={(e) => handleInputChangeInvoice(index, 'libraryFees', e.target.value)}
                                    placeholder=""
                                    value={samples1[index].libraryFees}
                                  />
                                </div>
                                <div className="w-[66px] flex-shrink-0">
                                  <div className='group'>
                                    <div className={`rounded-md bg-gray-200 group-focus-within:gradient-primary`} >
                                      <LangDropdown
                                        value={currency1}
                                        onChange={(e) => setCurrency1(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="md:w-[156px] py-[12px]">
                              <div className='flex gap-[2px]'>
                                <div className="w-[108px] flex-shrink-0 group">
                                  <input
                                    type="text"
                                    className="border rounded-md w-full p-2"
                                    onChange={(e) => handleInputChangeInvoice(index, 'analysisFees', e.target.value)}
                                    placeholder=""
                                    value={samples1[index].analysisFees}
                                  />
                                </div>
                                <div className="w-[66px] flex-shrink-0">
                                  <div className='group'>
                                    <div className={`rounded-md bg-gray-200 group-focus-within:gradient-primary`} >
                                      <LangDropdown
                                        value={currency1}
                                        onChange={(e) => setCurrency1(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="md:w-[108px] py-[12px] md:pr-[20px]">
                              <input
                                type="text"
                                className="border rounded-md w-full p-2 bg-[#33333314]"
                                onChange={(e) => handleInputChangeInvoice(index, 'tax', e.target.value)}
                                value={samples1[index].tax}
                                placeholder="%"
                              />
                            </td>
                            <td className="md:w-[108px] py-[12px] md:pr-[20px]">
                              <input
                                type="text"
                                className="border rounded-md w-full p-2 bg-[#33333314]"
                                onChange={(e) => handleInputChangeInvoice(index, 'other', e.target.value)}
                                placeholder=""
                                value={samples1[index].others}
                              />
                            </td>
                            <td className="md:w-[108px]">
                              <input
                                type="text"
                                className="border rounded-md w-full p-2"
                                placeholder="JPY"
                                onChange={(e) => handleInputChangeInvoice(index, 'total', e.target.value)}
                                value={samples1[index].total}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t font-medium text-[14px]">
                          <td colSpan="7" className="text-right py-2 pr-6">{t("invoice.grandTotal")}</td>
                          <td className="md:w-[108px]">
                            <input
                              type="text"
                              className="border rounded-md w-full p-2"
                              placeholder=""
                              value={grandTotal1}
                            />
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="flex items-center text-[14px] font-normal">
                    <input type="checkbox"
                      id="invoice1"
                      className="form-checkbox accent-[#3e8ca7] mr-2"
                      checked={isInvoiceChecked1}
                      onChange={handleInvoiceChecked1} />
                    <label htmlFor="tax">{t("invoice.checkbox1")}</label>
                  </div>
                  <div className="flex items-center mb-[6px] text-[14px] font-normal">
                    <input type="checkbox"
                      id="invoice2"
                      className="form-checkbox accent-[#3e8ca7] mr-2"
                      checked={isInvoiceChecked2}
                      onChange={handleInvoiceChecked2} />
                    <label htmlFor="amount">{t("invoice.checkbox2")}</label>
                  </div>
                  <p className="text-[14px] font-normal mb-6">
                    {t("invoice.note")}
                  </p>
                  <div className='w-full flex items-end justify-end gap-[12px] pb-4'>
                    <button onClick={() => { setOrderPopVisible(false) }} className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]">{t("invoice.back")}</button>
                    <button onClick={handleClick1} disabled={disabled} className={`${disabled?"opacity-75":""} h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]`}>{t("invoice.generate")}</button>
                  </div>
                </div>
              )}
              {activePopup === "invoice1" && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 '>
                  <div className='w-[298px] h-[216px] md:h-[334px] md:w-[564px] md:py-[65px] md:px-[48px] flex flex-col items-center justify-between bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)] p-[24px] md:p-0 gap-[8px] md:gap-0'>
                    <span className='w-full font-DM-Sans font-bold md:text-[32px] md:leading-[40px] text-[#333333]'>{t("invoice1.title")}</span>
                    <span className='w-full font-DM-Sans font-normal md:text-[20px] md:leading-[34px] text-[#333333]'>{t("invoice1.message")}</span>
                    <button disabled={disabled} className={`${disabled?"opacity-75":""}
                      w-full h-[50px] md:h-[48px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]`}
                      onClick={handleInvoice}
                    >
                      {t("invoice1.ok")}
                    </button>
                  </div>
                </div>
              )}
              {/* {activePopup === "invoice2" && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                  <div className='md:h-[334px] md:w-[564px] md:py-[65px] md:px-[48px] flex flex-col items-center justify-between bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                    <span className='w-full font-DM-Sans font-bold md:text-[32px] md:leading-[40px] text-[#333333]'>Confirmation Message</span>
                    <span className='w-full font-DM-Sans font-normal md:text-[20px] md:leading-[34px] text-[#333333]'>Your formal request has been accepted and Medbank is requesting the sample shipment.</span>
                    <button
                      className="w-full h-[50px] md:h-[48px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]"
                      onClick={handleInvoice}
                    >
                      OK
                    </button>
                  </div>
                </div>
              )} */}
              {activePopup === 'payment' && (
                <div className='p-[16px] w-[356px] h-[290px] md:h-[435px] md:w-[760px] md:py-[26px] flex flex-col md:gap-[24px] items-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className="text-[16px] md:text-[22px] font-medium text-center md:pb-0 pb-[16px]">{t("payment.title")}</div>
                  <div className='border border-dashed bg-gray-100 w-full'></div>
                  <div className="mx-auto">
                    <div className="w-[313px] h-[154px]  md:px-4 md:w-[490px] md:h-[203px] md:pt-0 pt-[12px] border-dashed border-[0.4px]  border-[#60b7cf] rounded-lg text-center flex flex-col items-center justify-center">
                      <div {...getRootProps()} className="cursor-pointer">
                        <input {...getInputProps()} />
                        <Image src={folder1} alt="Upload Icon" className="mx-auto mb-2 md:mb-4 w-[51px] h-[51px]" />
                        <p className="text-[10px] md:text-sm font-normal">
                          {t("payment.drag")} <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#60b7cf] via-[#3e8da7] to-[rgba(0,62,92,0.6)] underline">{t("payment.drag1")}</span> {t("payment.drag2")}
                        </p>
                        {uploadedFile && (
                          <div className="mt-2">
                            <p className="text-[10px] md:text-sm font-medium">{t("payment.file")}</p>
                            {/* <p className="text-lg text-blue-600">{uploadedFile.name}</p> */}
                          </div>
                        )}
                        {uploadStatus && (
                          <div className='w-full flex flex-col items-start'>
                            <span className='text-[10px] w-full flex justify-between'><span>{t("payment.uploading")}</span> <span>{uploadPercentage} %</span> </span>
                            <Progress value={uploadPercentage} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-[490px] flex items-center justify-end gap-[12px] pt-[12px] md:pt-4'>
                    <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={() => { setOrderPopVisible(false) }}>{t("payment.back")}</button>
                    <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={handleConfirmPayment} disabled={!uploadedFile || uploadStatus}>{t("payment.upload")}</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <div>
          <div className='h-[40px] '>
            <span className='font-DM-Sans font-bold text-[14px] md:text-[20px] leading-[28px]'>{orderId}</span>
          </div>
          <div className='flex items-center justify-center md:justify-start gap-x-[6px] gap-y-[6px]  md:gap-x-[32px] md:gap-y-[8px] flex-wrap'>
            <button onClick={handleOrderCreation} disabled={!(requestSheetStatus == "inAdminProgress" || requestSheetStatus == "isUserCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${requestSheetStatus == "isPending" || requestSheetStatus == "inUserProgress" ? "text-[#333333]" : "text-white"} ${requestSheetStatus == "isPending" || requestSheetStatus == "inUserProgress" ? "bg-[#E2E8F0]" : requestSheetStatus == "inAdminProgress" || requestSheetStatus == "isUserCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.requestSheet")}</button>
            <button onClick={handleCostEstimateClick} disabled={!(costEstimateStatus == "inAdminProgress" || costEstimateStatus == "isUserCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${costEstimateStatus == "isPending" || costEstimateStatus == "inUserProgress" ? "text-[#333333]" : "text-white"} ${costEstimateStatus == "isPending" || costEstimateStatus == "inUserProgress" ? "bg-[#E2E8F0]" : costEstimateStatus == "inAdminProgress" || costEstimateStatus == "isUserCompleted" ? "bg-[#FF914D]" : costEstimateStatus == "isAdminCompleted" ? "bg-[#79747E]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.costEstimation")}</button>
            <button onClick={handleFormalRequestClick} disabled={!(formalRequestStatus == "inAdminProgress" || formalRequestStatus == "isUserCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${formalRequestStatus == "isPending" || formalRequestStatus == "inUserProgress" ? "text-[#333333]" : "text-white"} ${formalRequestStatus == "isPending" || formalRequestStatus == "inUserProgress" ? "bg-[#E2E8F0]" : formalRequestStatus == "inAdminProgress" || formalRequestStatus == "isUserCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.formalRequest")}</button>
            <button onClick={handleSampleShippingClick} disabled={!(sampleShippingStatus == "inTransit" || sampleShippingStatus == "isUserCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${sampleShippingStatus == "isPending" || sampleShippingStatus == "inUserProgress" ? "text-[#333333]" : "text-white"} ${sampleShippingStatus == "isPending" || sampleShippingStatus == "inUserProgress" ? "bg-[#E2E8F0]" : sampleShippingStatus == "inAdminProgress" || sampleShippingStatus == "isUserCompleted" ? "bg-[#FF914D]" : sampleShippingStatus == "inTransit" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.sampleRecieved")}</button>
            <button onClick={handleQualityCheckClick} disabled={!(qualityCheckStatus == "inAdminProgress" || qualityCheckStatus == "isUserCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${qualityCheckStatus == "isPending" || qualityCheckStatus == "inUserProgress" ? "text-[#333333]" : "text-white"} ${qualityCheckStatus == "isPending" || qualityCheckStatus == "inUserProgress" ? "bg-[#E2E8F0]" : qualityCheckStatus == "inAdminProgress" || qualityCheckStatus == "isUserCompleted" ? "bg-[#FF914D]" : qualityCheckStatus == "isAdminCompleted" ? "bg-[#79747E]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.qualityCheck")}</button>
            <button onClick={handleLibraryPrepClick} disabled={!(libraryPrepStatus == "inAdminProgress" || libraryPrepStatus == "isUserCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${libraryPrepStatus == "isPending" || libraryPrepStatus == "inUserProgress" ? "text-[#333333]" : "text-white"} ${libraryPrepStatus == "isPending" || libraryPrepStatus == "inUserProgress" ? "bg-[#E2E8F0]" : libraryPrepStatus == "inAdminProgress" || libraryPrepStatus == "isUserCompleted" ? "bg-[#FF914D]" : libraryPrepStatus == "isAdminCompleted" ? "bg-[#79747E]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.libraryPrep")}</button>
            <button onClick={handleAnalysisProgressClick} disabled={!(analysisProgressStatus == "inAdminProgress" || analysisProgressStatus == "isUserCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${analysisProgressStatus == "isPending" || analysisProgressStatus == "inUserProgress" ? "text-[#333333]" : "text-white"} ${analysisProgressStatus == "isPending" || analysisProgressStatus == "inUserProgress" ? "bg-[#E2E8F0]" : analysisProgressStatus == "inAdminProgress" || analysisProgressStatus == "isUserCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.analysisStart")}</button>
            <button onClick={handleAnalysisDoneClick} disabled={!(analysisDoneStatus == "inAdminProgress" || analysisDoneStatus == "isUserCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${analysisDoneStatus == "isPending" || analysisDoneStatus == "inUserProgress" ? "text-[#333333]" : "text-white"} ${analysisDoneStatus == "isPending" || analysisDoneStatus == "inUserProgress" ? "bg-[#E2E8F0]" : analysisDoneStatus == "inAdminProgress" || analysisDoneStatus == "isUserCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.analysisDone")}</button>
            <button onClick={handleAnalysisRawDataClick} disabled={!(analysisRawDataStatus == "inAdminProgress" || analysisRawDataStatus == "isUserCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${analysisRawDataStatus == "isPending" || analysisRawDataStatus == "inUserProgress" ? "text-[#333333]" : "text-white"} ${analysisRawDataStatus == "isPending" || analysisRawDataStatus == "inUserProgress" ? "bg-[#E2E8F0]" : analysisRawDataStatus == "inAdminProgress" || analysisRawDataStatus == "isUserCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.rawData")}</button>
            <button onClick={handleAnalysisSpecificationClick} disabled={!(analysisSpecificationStatus == "inAdminProgress" || analysisSpecificationStatus == "isUserCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${analysisSpecificationStatus == "isPending" || analysisSpecificationStatus == "inUserProgress" ? "text-[#333333]" : "text-white"} ${analysisSpecificationStatus == "isPending" || analysisSpecificationStatus == "inUserProgress" ? "bg-[#E2E8F0]" : analysisSpecificationStatus == "inAdminProgress" || analysisSpecificationStatus == "isUserCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.analysisSpecification")}</button>
            <button onClick={handleInvoiceClick} disabled={!(invoiceStatus == "inAdminProgress" || invoiceStatus == "isUserCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${invoiceStatus == "isPending" || invoiceStatus == "inUserProgress" ? "text-[#333333]" : "text-white"} ${invoiceStatus == "isPending" || invoiceStatus == "inUserProgress" ? "bg-[#E2E8F0]" : invoiceStatus == "inAdminProgress" || invoiceStatus == "isUserCompleted" ? "bg-[#FF914D]" : invoiceStatus == "isAdminCompleted" ? "bg-[#79747E]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.invoice")}</button>
            <button onClick={handleConfirmPayment} disabled={!(paymentStatus == "inAdminProgress" || paymentStatus == "isUserCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${paymentStatus == "isPending" || paymentStatus == "inUserProgress" ? "text-[#333333]" : "text-white"} ${paymentStatus == "isPending" || paymentStatus == "inUserProgress" ? "bg-[#E2E8F0]" : paymentStatus == "inAdminProgress" || paymentStatus == "isUserCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.receipt")}</button>
          </div>
        </div>
        <div className="w-full h-[92px] md:px-[40px] flex flex-col justify-center border-[1px] border-[#E2E8F0] rounded-md shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]">
          <div className='w-full flex items-center justify-between h-[46px] gap-[12px] font-DM-Sans font-normal text-[18px] leading-[24px] tracking-tracking-0.5'>
            <div className="flex items-start gap-[10px]">
              <Image src={Logo} alt="logo" className="h-[46px] w-[46px]"></Image>
              <div className="flex flex-col items-start justify-between">
                <span className="font-DM-Sans font-medium text-[16px] leading-[24px]">MedBank Team</span>
                <span className="font-DM-Sans font-medium text-[14px] leading-[22px] text-[#333333CC]">Online</span>
              </div>
            </div>
            <button onClick={handleSendMessage} className="h-[48px] w-[48px] p-[12.5px] rounded-md bg-[#3E8DA7]">{sendIcon}</button>
          </div>
        </div>
      </div >
    </>
  )
}

export default NewOrderBox

const sendIcon = <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M22.9023 2.29297L11.9023 13.293" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  <path d="M22.9023 2.29297L15.9023 22.293L11.9023 13.293L2.90234 9.29297L22.9023 2.29297Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg>


const pauseIcon = <svg
  viewBox="0 0 25 25"
  fill="black"
  height="1em"
  width="1em"
>
  <path stroke='black' d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm-88-532h-48c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8zm224 0h-48c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8z" />
</svg>

const resumeIcon = <svg
  viewBox="0 0 25 25"
  fill="black"
  height="1em"
  width="1em"
>
  <path stroke='black' d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
  <path stroke='black' d="M719.4 499.1l-296.1-215A15.9 15.9 0 00398 297v430c0 13.1 14.8 20.5 25.3 12.9l296.1-215a15.9 15.9 0 000-25.8zm-257.6 134V390.9L628.5 512 461.8 633.1z" />
</svg>
