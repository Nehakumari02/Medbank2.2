"use client";
import { useOrder } from '@/contexts/OrderContext';
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from 'react';
import FolderIcon from "../../../public/dashboard/folder.png";
import Image from 'next/image';
import Logo from '@/public/Images/Home/logo.png';
import file1 from '../../../public/dashboard/pdf.png';
import vector3 from '../../../public/dashboard/creation1.png';
import downloadIcon from '../../../public/dashboard/downloadIcon.png';
import CalculateCost from '../../../components/CalculateCost';
import LangDropdown from "../../../components/LangDropdown";
import { toast } from '@/hooks/use-toast';
import html2pdf from 'html2pdf.js';
import { useTranslations } from 'next-intl'
import QuotationTable from '../../../components/QuotationTable';
import QuotationTableInvoice from '../../../components/QuotationTableInvoice';
import QuotationTablePayment from '../../../components/QuotationTablePayment';
import useFcmToken from '@/hooks/useFCMToken'



const NewOrderBox = () => {
  const t = useTranslations("UserDashboard");
  const router = useRouter();
  const path = usePathname();
  const orderIdDB = usePathname().split("/")[3];
  const pathToRedirect = usePathname().split("/").slice(2).join("/");
  const language = usePathname().split("/")[1];
  const orderPopUpBoxRef = useRef(null);
  const [orderPopVisible, setOrderPopVisible] = useState(false);
  const [activePopup, setActivePopup] = useState('');
  const [check, setCheck] = useState(false);
  const { uploadedFile, setUploadedFile } = useOrder();
  const [file, setFile] = useState(uploadedFile);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopUp1, setIsPopUp1] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const [fileType, setFileType] = useState("");
  let userIdDB = usePathname().split('/')[2];
  const [isTableLoaded, setIsTableLoaded] = useState(false);
  const [isTableLoaded1, setIsTableLoaded1] = useState(false);
  const [isTableLoaded2, setIsTableLoaded2] = useState(false);

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

  const {
    orderId, setOrderId,
    orderTitle, setOrderTitle,
    requestSheetStatus, setRequestSheetStatus, requestSheetLink, setRequestSheetLink,
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
    grandTotal, setGrandTotal,
    grandTotal1, setGrandTotal1,
    currency, setCurrency,
    currency1, setCurrency1
  } = useOrder();
  const [isSampleSendChecked1, setIsSampleSendChecked1] = useState(false);
  const [isSampleSendChecked2, setIsSampleSendChecked2] = useState(false);
  const [isSampleSendChecked3, setIsSampleSendChecked3] = useState(false);
  const [isQualityChecked, setIsQulaityChecked] = useState(false);
  const [isLibraryPrepChecked, setIsLibraryChecked] = useState(false);
  const [isAnalysisSpecificationChecked, setIsAnalysisSpecificationChecked] = useState(false);
  const [isAnalysisRawChecked1, setIsAnalysisRawChecked1] = useState(false);
  const [isAnalysisRawChecked2, setIsAnalysisRawChecked2] = useState(false);
  const [isInvoiceChecked, setIsInvoiceChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const printRef = useRef();
  const printRef1 = useRef();
  const printRef2 = useRef();
  const { token, notificationPermissionStatus } = useFcmToken()
  const adminIdDB = "67012cdf074407659a1ac9d4";

  const handleSampleSendChecked1 = (e) => {
    setIsSampleSendChecked1(e.target.checked);
  };
  const handleSampleSendChecked2 = (e) => {
    setIsSampleSendChecked2(e.target.checked);
  };
  const handleSampleSendChecked3 = (e) => {
    setIsSampleSendChecked3(e.target.checked);
  };
  const handleQualityChecked = (e) => {
    setIsQulaityChecked(e.target.checked);
  };
  const handleLibraryPrepChecked = (e) => {
    setIsLibraryChecked(e.target.checked);
  };
  const handleAnalysisSpecificationChecked = (e) => {
    setIsAnalysisSpecificationChecked(e.target.checked);
  };
  const handleRawAnalysisChecked1 = (e) => {
    setIsAnalysisRawChecked1(e.target.checked);
  };
  const handleRawAnalysisChecked2 = (e) => {
    setIsAnalysisRawChecked2(e.target.checked);
  };
  const handleInvoiceChecked = (e) => {
    setIsInvoiceChecked(e.target.checked);
  };
  const handleGenerateClick = () => {
    setActivePopup('costEstimateConfirmation');
  };

  const handleGenerateClick1 = () => {
    setIsPopupVisible(true);
    setActivePopup('payment');
    setIsPopUp1(false);
  };

  const sampleDelete = () => {
    setActivePopup(setDeletePopUp);
  };

  const sampleConfirm = () => {
    setActivePopup(setConfirmPopUp);
    setOrderPopVisible(false);
    setSampleShippingStatus("isCompleted");
    setQualityCheckStatus("inUserProgress");
  };

  const handleDeleteOk = () => {
    setOrderPopVisible(false);
    setOrderPopVisible(false);
    setSampleShippingStatus("inUserProgress")
    updateDataInDB({
      sampleShippingStatus: "inUserProgress"
    })
  };

  const handleConfirmOk = () => {
    setOrderPopVisible(false);
    setOrderPopVisible(false);
    setSampleShippingStatus("isCompleted");
    updateDataInDB({
      sampleShippingStatus: "isCompleted"
    })
  };

  const handleClick1 = () => {
    setIsPopUp1(true);
  };

  const handleOrderCreation = () => {
    router.push(`/${language}/${userIdDB}/${orderIdDB}/NewOrder/OrderCreationPage`)
  }

  const handleCostEstimateClick = () => {
    setOrderPopVisible(true);
    setActivePopup('costEstimate');
  };

  const handleFormalRequestClick = () => {
    setOrderPopVisible(true);
    setActivePopup('formalRequest');
  };

  const handleSampleShippingClick = () => {
    setOrderPopVisible(true);
    if (sampleShippingStatus == "inUserProgress")
      setActivePopup('sampleShippingSend');
    else {
      if (sampleShipping == "ok") {
        setActivePopup('sampleShippingOk');
      }
      else {
        setActivePopup('sampleShippingDefect')
      }
    }
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

  const handleInvoiceClick = () => {
    setOrderPopVisible(true);
    setActivePopup('invoice');
  };

  const handlePaymentClick = () => {
    setOrderPopVisible(true);
    setActivePopup('payment');
  };

  const handleDownload = async (url, filename) => {
    try {
      // Notify that download is in progress
      toast({
        variant: "success",
        title: "In Progress",
        description: "Download started"
      });

      setDisabled(true);

      // Fetch the file from the URL as a blob
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();

      // Determine the file type for proper handling
      const fileType = blob.type;
      setFileType(fileType);
      console.log(`File type: ${fileType}`); // For debugging

      // Create a link element, set its href to the blob URL and trigger the download
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', filename); // Use the passed filename
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Optionally, revoke the blob URL after download
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading the file:', error);
    } finally {
      setDisabled(false);
    }
  };


  const handleConfirmRequestSheet = () => {
    setOrderPopVisible(false);
    setRequestSheetStatus("isCompleted");
    setCostEstimateStatus("inAdminProgress");
    updateDataInDB({
      cost
    })
  };

  const handleConfirmCostEstimate = async () => {
    const element = printRef.current;
    if (!element || !isTableLoaded) {
      console.error("QuotationTable is not loaded yet.");
      return;
    }
    try {
      setDisabled(true);
      const options = {
        margin: 0.5,
        filename: 'quotation.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      await html2pdf().from(element).set(options).save();
      setOrderPopVisible(false);
      setIsPopupVisible(false);
      setCostEstimateStatus("isCompleted");
      setFormalRequestStatus("inUserProgress");

      updateDataInDB({
        costEstimateStatus: "isCompleted",
        formalRequestStatus: "inUserProgress"
      });
      const chatResponse = await fetch("/api/sendUpdateInChatFromUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userIdDB,
          message: t("chatMessage.costEstimate"),
        }),
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    finally {
      setDisabled(false);
    }

  };
  const onTableLoad = () => {
    setIsTableLoaded(true);
  };
  const handleGenerateInvoice = async () => {
    const element = printRef1.current;
    if (!element || !isTableLoaded1) {
      console.error("Invoice is not loaded yet.");
      return;
    }
    try {
      setDisabled(true);
      const options = {
        margin: 0.5,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().from(element).set(options).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    finally {
      setDisabled(false);
    }
  };
  const onTableLoad1 = () => {
    setIsTableLoaded1(true);
  };

  const handleGeneratePayment = async () => {
    console.log("generating payment")
    const element = printRef2.current;
    if (!element || !isTableLoaded2) {
      console.error("Invoice is not loaded yet.");
      return;
    }
    try {
      setDisabled(true);
      const options = {
        margin: 0.5,
        filename: 'PaymentReceipt.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
     
      await html2pdf().from(element).set(options).save();
      setOrderPopVisible(false);
      if(paymentStatus !== "isCompleted"){
        setPaymentStatus("isCompleted");

        updateDataInDB({
          paymentStatus: "isCompleted",
        });

        const chatResponse = await fetch("/api/sendUpdateInChatFromUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userIdDB,
            message: t("chatMessage.payment"),
          }),
        });
      }

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    finally {
      setDisabled(false);
    }
  };
  const onTableLoad2 = () => {
    setIsTableLoaded2(true);
  };

  const handleConfirmFormalRequest = async () => {
    setFormalRequestStatus("isUserCompleted");
    setOrderPopVisible(false);
    updateDataInDB({
      formalRequestStatus: "isUserCompleted"
    })
    const response2 = await fetch('/api/send-notification2', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminIdDB: adminIdDB,
        title: "MedBank",
        message: t("notification.formalRequest"),
        link: "/Dashboard",
      }),
    });
    const chatResponse = await fetch("/api/sendUpdateInChatFromUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userIdDB,
        message: t("chatMessage.formalRequest"),
      }),
    });
  };

  const handleConfirmSampleShippingok = async () => {
    try {
      setDisabled(true)
      const response2 = await fetch('/api/send-notification2', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminIdDB: adminIdDB,
          title: "MedBank",
          message: t("notification.sampleShipping"),
          link: "/Dashboard",
        }),
      });
      const chatResponse = await fetch("/api/sendUpdateInChatFromUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userIdDB,
          message: t("chatMessage.sampleShipping"),
        }),
      });
      setSampleShippingStatus("inTransit")
      updateDataInDB({
        sampleShippingStatus: "inTransit"
      })
    }
    catch {

    }
    finally {
      setOrderPopVisible(false);
      setDisabled(false);
    }
  };

  const handleConfirmSampleShipping = async () => {
    if (!isSampleSendChecked1) {
      toast({
        variant: "error",
        title: "Error",
        description: "please check the box"
      })
    }
    else if (!isSampleSendChecked2) {
      toast({
        variant: "error",
        title: "Error",
        description: "please check the box"
      })
    }
    else if (!isSampleSendChecked3) {
      toast({
        variant: "error",
        title: "Error",
        description: "please check the box"
      })
    }
    else {
      try {
        setDisabled(true)
        setSampleShippingStatus("inTransit")
        updateDataInDB({
          sampleShippingStatus: "inTransit"
        })
        const response2 = await fetch('/api/send-notification2', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminIdDB: adminIdDB,
            title: "MedBank",
            message: t("notification.sampleShipping"),
            link: "/Dashboard",
          }),
        });
        const chatResponse = await fetch("/api/sendUpdateInChatFromUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userIdDB,
            message: t("chatMessage.sampleShipping"),
          }),
        });
      }
      catch {

      }
      finally {
        setOrderPopVisible(false);
        setDisabled(false);
      }

    }
  };


  const handleDownloadQualityCheck = async () => {
    // Ensure there is a report to download
    if (!qualityCheckReportLink) {
      toast({
        variant: "error",
        title: "Download Error",
        description: "No quality check report available for download.",
      });
      return;
    }

    try {
      // Call the API to get the signed URL for downloading the file
      const response = await fetch('/api/getSignedDownloadUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileUrl: qualityCheckReportLink }),
      });

      const { url } = await response.json();
      console.log("download url", url);

      // Download the file using XMLHttpRequest
      const downloadRequest = new XMLHttpRequest();
      downloadRequest.open('GET', url, true);
      downloadRequest.responseType = 'blob'; // So we get the file as a blob

      // Track download progress
      downloadRequest.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setDownloadPercentage(percentComplete); // Optionally track download progress
        }
      };

      // Handle download complete
      downloadRequest.onload = () => {
        if (downloadRequest.status === 200) {
          const blob = new Blob([downloadRequest.response], { type: downloadRequest.getResponseHeader('Content-Type') });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = qualityCheckReportLink.split('/').pop(); // Extract file name from the link
          link.click();

          toast({
            variant: "success",
            title: "Download Successful",
            description: "The quality check report has been downloaded.",
          });
        } else {
          toast({
            variant: "error",
            title: "Download Error",
            description: "Failed to download the report, please try again.",
          });
        }
      };

      // Handle download error
      downloadRequest.onerror = () => {
        toast({
          variant: "error",
          title: "Download Failed",
          description: "There was an error downloading your file.",
        });
        console.error("Error downloading file:", downloadRequest.statusText);
      };

      // Send the request to start downloading the file
      downloadRequest.send();

    } catch (err) {
      toast({
        variant: "error",
        title: "Download Failed",
        description: "There was an error downloading your file.",
      });
      console.error("Error downloading file:", err);
    } finally {
      setDownloadPercentage(0); // Optionally reset download percentage
    }
  };

  const handleConfirmQualityCheck = async () => {
    if (!isQualityChecked) {
      toast({
        variant: "error",
        title: "Error",
        description: "please check the box"
      })
    }
    else {
      try {
        setDisabled(true);
        const response2 = await fetch('/api/send-notification2', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminIdDB: adminIdDB,
            title: "MedBank",
            message: t("notification.qualityCheck"),
            link: "/Dashboard",
          }),
        });
        setOrderPopVisible(false);
        setActivePopup('');
        setQualityCheckStatus("isCompleted");
        setLibraryPrepStatus('inAdminProgress');
        updateDataInDB({
          qualityCheckStatus: "isCompleted",
          libraryPrepStatus: 'inAdminProgress'
        })
        updateSampleInDB({
          qualityCheckStatus: "isCompleted",
          libraryPrepStatus: "inAdminProgress"
        })
      }
      catch {

      }
      finally {
        setDisabled(false);
      }

    }
  };


  const handleLibraryPrepConfirmation = async () => {
    if (!isLibraryPrepChecked) {
      toast({
        variant: "error",
        title: "Error",
        description: "please check the box"
      })
    }
    else {
      try {
        setDisabled(true)
        const response2 = await fetch('/api/send-notification2', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminIdDB: adminIdDB,
            title: "MedBank",
            message: t("notification.libraryPrep"),
            link: "/Dashboard",
          }),
        });
        setOrderPopVisible(false);
        setActivePopup('');
        setLibraryPrepStatus("isCompleted");
        setAnalysisProgressStatus('inAdminProgress');
        updateDataInDB({
          libraryPrepStatus: "isCompleted",
          analysisProgressStatus: 'inAdminProgress'
        })
        updateSampleInDB({
          libraryPrepStatus: "isCompleted"
        })
      }
      catch {

      }
      finally {
        setDisabled(false);
      }
    }
  };

  const handleAnalysisDoneConfirmation = () => {
    setOrderPopVisible(false);
    setActivePopup('');
    setAnalysisDoneStatus("isCompleted");
    setAnalysisRawDataStatus("inUserProgress");
  };

  const handleAnalysisDone = () => {
    setOrderPopVisible(false);
    setActivePopup('');
    setAnalysisProgressStatus("isCompleted");
    setAnalysisDoneStatus("inUserProgress");
  };

  const handleAnalysisRawDataConfirmMobile = () => {
    if (!isAnalysisRawChecked1) {
      toast({
        variant: "error",
        title: "Error",
        description: "please check the box"
      })
    }
    else {
      setOrderPopVisible(false);
      setAnalysisRawDataStatus("inCompleted")
      updateDataInDB({
        analysisRawDataStatus: "isCompleted"
      })
    }
  }

  const handleAnalysisRawDataConfirm = () => {
    if (!isAnalysisRawChecked1) {
      toast({
        variant: "error",
        title: "Error",
        description: "please check the box"
      })
    }

    else if (!isAnalysisRawChecked2) {
      toast({
        variant: "error",
        title: "Error",
        description: "please check the box"
      })
    }

    else {
      setOrderPopVisible(false);
      setAnalysisRawDataStatus("inCompleted")
      updateDataInDB({
        analysisRawDataStatus: "isCompleted"
      })
    }
  }

  const handleAnalysisSpecification = () => {
    if (!isAnalysisSpecificationChecked) {
      toast({
        variant: "error",
        title: "Error",
        description: "please check the box"
      })
    }
    else {
      setOrderPopVisible(false);
      setAnalysisSpecificationStatus("isCompleted")
      updateDataInDB({
        analysisSpecificationStatus: "isCompleted"
      })
      updateSampleInDB({
        analysisSpecificationStatus: "isCompleted"
      })
    }
  }

  const handleInvoice = () => {
    if (!isInvoiceChecked) {
      toast({
        variant: "error",
        title: "Error",
        description: "please check the box"
      })
    }
    else {
      setOrderPopVisible(false);
      setInvoiceStatus("isCompleted")
      setPaymentStatus("inAdminProgress")
      updateDataInDB({
        invoiceStatus: "isCompleted",
        paymentStatus: "inAdminProgress"
      })
    }
  }

  const handleConfirmPayment = () => {
    setOrderPopVisible(false);
    setPaymentStatus("isCompleted")
    updateDataInDB({
      paymentStatus: "isCompleted"
    })
  }

  const handleClickOutside = (event) => {
    if (orderPopUpBoxRef.current && !orderPopUpBoxRef.current.contains(event.target)) {
      setOrderPopVisible(false);
    }
  };

  useEffect(() => {
    if (sampleShippingStatus === "isPending" && formalRequestStatus === "isCompleted") {
      setActivePopup("sampleShippingConfirmation");
      setOrderPopVisible(true);
    }
  }, []);

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
          body: JSON.stringify({ orderId }),
        });
        const order = await response.json();
        const orderData = order.data;
        console.log("order data in new order box", orderData);
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
        setLibraryCheckReportLink(orderData.libraryCheckReportLink);
        setAnalysisProgressStatus(orderData.analysisProgressStatus);
        setAnalysisDoneStatus(orderData.analysisDoneStatus);
        setAnalysisRawDataStatus(orderData.analysisRawDataStatus);
        setRawDataLink(orderData.rawDataLink);
        setAnalysisSpecificationStatus(orderData.analysisSpecificationStatus);
        setAnalysisSpecificationReportLink(orderData.analysisSpecificationReportLink);
        setInvoiceStatus(orderData.invoiceStatus);
        setInvoiceLink(orderData.invoiceLink);
        setPaymentStatus(orderData.paymentStatus);
        setPaymentRecieptLink(orderData.paymentRecieptLink);
        setGrandTotal(orderData.grandTotal);
        setGrandTotal1(orderData.grandTotal1);
        setCurrency(orderData.currency);
        setCurrency1(orderData.currency1);
      } catch (error) {
        console.error('Error fetching order by ID:', error);
      }
    };

    fetchOrderByID(orderIdDB);
  }, [orderIdDB]);

  const handleSendMessage = () => {
    router.push(`/${language}/${userIdDB}/Chats`)
  }


  return (
    <>
      <div className='text-[#333333] mb-[14px] flex flex-col justify-between h-full'>
        {orderPopVisible && (
          <div className='fixed top-0 left-0 backdrop-blur-[1px] flex items-center justify-center w-[100vw] h-[100vh] bg-[#00000066]'>
            <div ref={orderPopUpBoxRef}>
              {activePopup === 'requestSheet' && (
                <div className='md:h-[287px] md:w-[658px] flex items-center justify-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  Request Sheet Popup Placeholder
                </div>
              )}
              {activePopup === 'costEstimate' && (
                <div className='p-[16px] w-[356px] h-[290px] md:h-[435px] md:w-[760px] md:py-[26px] flex flex-col gap-[24px] items-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className='h-[40px] md:h-[50px] flex items-start justify-center w-full text-center border-b-[1px] border-dotted border-[#33333340]'>
                    <span className='font-DM-Sans text-center font-medium text-[16px] md:text-[22px] md:leading-[24px] text-[#333333]'>{t("costEstimation.title")}</span>
                  </div>
                  <div className='w-[313px] h-[154px] md:w-[490px] md:h-[203px] flex items-center justify-center border-[0.4px] border-[#60b7cf] border-dashed rounded-[6px]'>
                    <div className='flex flex-col items-center justify-center gap-[14px]'>
                      <Image className='w-[32px] h-[24px] md:w-[51px] md:h-[51px]' src={FolderIcon} alt="File"></Image>
                      <div className='font-DM-Sans font-normal text-[10px] md:text-[14px] md:leading-[18px] text-[#606060] text-center'>
                        <span>{t("costEstimation.pdfTitle")}</span><br />
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-[490px] flex items-center justify-end gap-[12px]'>
                    <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={() => { setOrderPopVisible(false) }}>{t("costEstimation.back")}</button>
                    <button className={`h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]  ${disabled ? "opacity-75" : ""}`} onClick={handleConfirmCostEstimate} disabled={disabled}>{t("costEstimation.download")}</button>
                  </div>
                  <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                    <div ref={printRef}>
                      <QuotationTable orderIdDB={orderIdDB} orderId={orderId} userId={userIdDB} onTableLoad={onTableLoad} />
                    </div>
                  </div>
                </div>
              )}
              {activePopup === 'formalRequest' && (
                <div className='w-[298px] h-[197px] md:h-[287px] md:w-[658px] md:p-[10px] flex flex-col gap-[24px] items-center justify-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className='flex flex-col gap-[24px]'>
                    <span className='font-DM-Sans text-center font-bold md:text-[32px] md:leading-[40px] text-[#333333]'>{t("formalRequest.confirmation")}</span>
                    <span className='font-DM-Sans text-center font-normal md:text-[20px] md:leading-[34px] text-[#333333]'>{t("formalRequest.message")}</span>
                  </div>
                  <div className='flex items-center justify-center gap-[12px]'>
                    <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={() => { setOrderPopVisible(false) }}>{t("formalRequest.cancel")}</button>
                    <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={handleConfirmFormalRequest}>{t("formalRequest.confirm")}</button>
                  </div>
                </div>
              )}
              {activePopup === 'sampleShippingSend' && (
                <div className='font-DM-Sans flex flex-col w-[298px] h-[221px] md:h-[398px] md:w-[658px] p-[28px] md:p-12  items-center justify-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className='text-[22px] md:text-[22px] font-bold font-DM-Sans pb-[6px] md:pb-8 leading-[24px]'>{t("sampleShippingSend.title")}</div>
                  <div className='flex flex-col gap-[6px] md:gap-[12px]'>
                    <div className="hidden md:block md:text-[20px] leading-6 ">
                      {t("sampleShippingSend.message.desktopMsg")}
                    </div>
                    <p className="block md:hidden text-[18px] leading-6 pt-[8px]">
                      {t("sampleShippingSend.message.mobileMsg")}
                    </p>
                    <p className="hidden md:block">
                      {t("sampleShippingSend.message1")}
                      <a href={`/${language}/SampleShipping`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#60b7cf] via-[#3e8da7] to-[rgba(0,62,92,0.6)] underline">
                        {t("sampleShippingSend.website")}
                      </a>
                    </p>

                    <label className="hidden md:inline-flex items-center pt-[8px] md:pt-4">
                      <input
                        className="form-checkbox accent-[#3e8ca7]"
                        type="checkbox"
                        id="samplsend1"
                        checked={isSampleSendChecked1}
                        onChange={handleSampleSendChecked1}
                      />
                      <span className="ml-2 font-DM-Sans font-normal text-[10px] md:text-[16px] leading-[24px]">
                        <span className='hidden md:block'>
                          {t("sampleShippingSend.checkbox1")}
                        </span>
                      </span>
                    </label>
                    <label className="hidden md:inline-flex items-center ">
                      <input
                        className="form-checkbox accent-[#3e8ca7]"
                        type="checkbox"
                        id="samplesend2"
                        checked={isSampleSendChecked2}
                        onChange={handleSampleSendChecked2}
                      />
                      <span className="ml-2 font-DM-Sans font-normal text-[10px] md:text-[16px] leading-[24px]">
                        <span className='hidden md:block'>
                          {t("sampleShippingSend.checkbox2")}
                        </span>
                      </span>
                    </label>
                    <label className="hidden md:inline-flex items-center ">
                      <input
                        className="form-checkbox accent-[#3e8ca7]"
                        type="checkbox"
                        id="samplesend3"
                        checked={isSampleSendChecked3}
                        onChange={handleSampleSendChecked3}
                      />
                      <span className="ml-2 font-DM-Sans font-normal text-[10px] md:text-[16px] leading-[24px]">
                        <span className='hidden md:block'>
                          {t("sampleShippingSend.checkbox3")}
                        </span>
                      </span>
                    </label>
                    <div className='flex items-center justify-center gap-[10px] md:gap-[12px] md:pt-3 pt-[24px]'>
                      <button disabled={disabled} className={`${disabled ? "opacity-75" : ""} md:hidden h-[40px] md:h-[40px] w-[250px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]`} onClick={handleConfirmSampleShippingok}> {t("sampleShippingSend.mobileOk")}</button>
                      <button className='hidden h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] md:flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] ' onClick={() => { setOrderPopVisible(false) }} > {t("sampleShippingSend.cancel")}</button>
                      <button disabled={disabled} className={`${disabled ? "opacity-75" : ""} hidden h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] md:flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]`} onClick={handleConfirmSampleShipping}> {t("sampleShippingSend.confirm")}</button>
                    </div>

                  </div>
                </div>
              )}
              {activePopup === 'sampleShippingDefect' && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                  <div className='p-[24px] w-[298px] h-[330px] md:h-[436px] md:w-[564px] md:p-[48px] flex flex-col items-center justify-between bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                    <span className='text-[22px] w-full font-DM-Sans font-bold md:text-[32px] md:leading-[40px] text-[#333333]'> {t("sampleShippingDefect.title")}</span>
                    <span className='w-full font-DM-Sans font-normal md:text-[20px] md:leading-[34px] text-[#333333] text-[14px]'>{t("sampleShippingDefect.message")}<br></br>
                      {t("sampleShippingDefect.message1")}<br></br>
                      {t("sampleShippingDefect.message2")} <br></br>
                      {t("sampleShippingDefect.message3")}</span>
                    <button
                      className="w-full h-[40px] md:h-[48px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]"
                      onClick={handleConfirmOk}
                    >
                      {t("sampleShippingDefect.button")}
                    </button>
                  </div>
                </div>
              )}
              {activePopup === 'sampleShippingOk' && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                  <div className='p-[24px] w-[298px] h-[330px] md:h-[436px] md:w-[564px] md:p-[48px] flex flex-col items-center justify-between bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                    <span className='text-[22px] w-full font-DM-Sans font-bold md:text-[32px] md:leading-[40px] text-[#333333]'>{t("sampleShippingOk.title")}</span>
                    <span className='w-full font-DM-Sans font-normal md:text-[20px] md:leading-[34px] text-[#333333] text-[14px]'>{t("sampleShippingOk.message")}<br></br>
                      {t("sampleShippingOk.message1")}<br></br>
                      {t("sampleShippingOk.message2")} <br></br>
                      {t("sampleShippingOk.message3")}</span>
                    <button
                      className="w-full h-[40px] md:h-[48px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]"
                      onClick={handleConfirmOk}
                    >
                      {t("sampleShippingOk.button")}
                    </button>
                  </div>
                </div>
              )}
              {activePopup === 'qualityCheck' && (
                <div className='font-DM-Sans flex flex-col w-[306px] h-[300px] md:h-[507px] md:w-[564px] p-[12px] md:p-12  items-center justify-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className='text-[22px] md:text-[32px] font-bold font-DM-Sans pb-[6px] md:pb-8 leading-[40px]'>{t("qualityCheck.title")}</div>
                  <div className='flex flex-col gap-[6px] md:gap-[8px]'>
                    <div className='text-[14px] md:text-xl font-normal leading-[24px] md:leading-[34px]'>
                      {t("qualityCheck.message")}
                    </div>
                    <div className='text-[8px] md:text-xs font-normal leading-[34px]'>
                      {t("qualityCheck.message1")}
                    </div>
                    <div className="flex items-center p-4 bg-white border-[0.5px] solid border-[#33333326] rounded-lg md:mt-2 max-w-[331px] md:max-w-[300px] max-h-[38px] md:max-h-[52px] justify-between ">
                      <div className='flex gap-[8px]'>
                        <div className="flex items-center justify-center">
                          <Image src={file1} className='w-[18px] h-[24px]'></Image>
                        </div>
                        <div>
                          {uploadedFile instanceof File && uploadedFile.type === 'application/pdf' ? (
                            <a href={URL.createObjectURL(uploadedFile)} target="_blank" rel="noopener noreferrer">
                              <span className="text-sm md:text-lg">
                                {uploadedFile.name.length > 20 ? `${uploadedFile.name.substring(0, 19)}...` : uploadedFile.name}
                              </span>
                            </a>
                          ) : (
                            <p>{t("qualityCheck.pdfName")}</p>
                          )}
                        </div>

                      </div>
                      <button onClick={() => handleDownload(qualityCheckReportLink.split("?")[0], `QualityCheckReport.pdf`)} disabled={disabled} className={`text-sm md:text-base ${disabled ? "opacity-75" : ""}`}>
                        <div className="text-red-500 cursor-pointer">
                          <Image src={downloadIcon} className='h-[13px] w-[13px]'></Image>
                        </div>
                      </button>
                    </div>
                    <label className="inline-flex items-center pt-[8px] md:pt-4">
                      <input
                        className="form-checkbox accent-[#3e8ca7]"
                        type="checkbox"
                        id="qualitycheck"
                        checked={isQualityChecked}
                        onChange={handleQualityChecked}
                      />
                      <span className="ml-2 font-DM-Sans font-normal text-[10px] md:text-[16px] leading-[24px]">
                        {/* Show this text only on mobile */}
                        <span className='block md:hidden'>
                          {t("qualityCheck.checkbox1Mob")}
                        </span>
                        {/* Show the original text only on desktop */}
                        <span className='hidden md:block'>
                          {t("qualityCheck.checkbox1Desk")}
                        </span>
                      </span>
                    </label>
                    <div className='hidden md:block text-base font-normal leading-[24px]'>
                      {t("qualityCheck.note")}
                    </div>
                    <div className='flex items-center justify-center gap-[10px] md:gap-[12px]'>
                      {qualityCheckStatus !== "isCompleted" && <button disabled={disabled} className={`${disabled ? "opacity-75" : ""} md:hidden h-[40px] md:h-[48px] w-[250px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]`} onClick={handleConfirmQualityCheck}>{t("qualityCheck.mobButton")}</button>}
                      <button className='hidden h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] md:flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] ' onClick={() => { setOrderPopVisible(false) }} >{t("qualityCheck.cancel")}</button>
                      {qualityCheckStatus !== "isCompleted" && <button disabled={disabled} className={`${disabled ? "opacity-75" : ""} hidden h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] md:flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] `} onClick={handleConfirmQualityCheck}>{t("qualityCheck.proceed")}</button>}
                    </div>

                  </div>
                </div>
              )}
              {activePopup === 'libraryPrep' && (
                <div className='font-DM-Sans flex flex-col w-[358px] h-[300px] md:h-[507px] md:w-[564px] p-[28px] md:p-12  items-center justify-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className='text-[22px] md:text-[32px] font-bold font-DM-Sans pb-[6px] md:pb-8 leading-[40px]'>{t("libraryPrep.title")}</div>
                  <div className='flex flex-col gap-[6px] md:gap-[8px]'>
                    <div className='text-[14px] md:text-xl font-normal leading-[24px] md:leading-[34px]'>
                      {t("libraryPrep.message")}
                    </div>
                    <div className='text-[8px] md:text-xs font-normal leading-[34px]'>
                      {t("libraryPrep.message1")}
                    </div>
                    <div className="flex items-center p-4 bg-white border-[0.5px] solid border-[#33333326] rounded-lg md:mt-2 max-w-[331px] md:max-w-[300px] max-h-[38px] md:max-h-[52px] justify-between ">
                      <div className='flex gap-[8px]'>
                        <div className="flex items-center justify-center">
                          <Image src={file1} className='w-[18px] h-[24px]'></Image>
                        </div>
                        <div>
                          {uploadedFile instanceof File && uploadedFile.type === 'application/pdf' ? (
                            <a href={URL.createObjectURL(uploadedFile)} target="_blank" rel="noopener noreferrer">
                              <span className="text-sm md:text-lg">
                                {uploadedFile.name.length > 20 ? `${uploadedFile.name.substring(0, 19)}...` : uploadedFile.name}
                              </span>
                            </a>
                          ) : (
                            <p>{t("libraryPrep.pdfName")}</p>
                          )}
                        </div>
                      </div>
                      <button onClick={() => handleDownload(libraryCheckReportLink.split("?")[0], `LibraryPrepReport.pdf`)} disabled={disabled} className={`${disabled ? "opacity-75" : ""}`}>
                        <div className="text-red-500 cursor-pointer">
                          <Image src={downloadIcon} className='h-[13px] w-[13px]'></Image>
                        </div>
                      </button>
                    </div>
                    <label className="inline-flex items-center pt-[8px] md:pt-4">
                      <input
                        className="form-checkbox accent-[#3e8ca7]"
                        type="checkbox"
                        id="libraryprep"
                        checked={isLibraryPrepChecked}
                        onChange={handleLibraryPrepChecked}
                      />
                      <span className="ml-2 font-DM-Sans font-normal text-[10px] md:text-[16px] leading-[24px]">
                        {/* Show this text only on mobile */}
                        <span className='block md:hidden'>
                          {t("libraryPrep.checkbox1Mob")}
                        </span>
                        {/* Show the original text only on desktop */}
                        <span className='hidden md:block'>
                          {t("libraryPrep.checkbox1Desk")}
                        </span>
                      </span>
                    </label>
                    <div className='hidden md:block text-base font-normal leading-[24px]'>
                      {t("libraryPrep.note")}
                    </div>
                    <div className='flex items-center justify-center gap-[10px] md:gap-[12px]'>
                      {libraryPrepStatus !== "isCompleted" && <button disabled={disabled} className={`${disabled ? "opacity-75" : ""} md:hidden h-[40px] md:h-[48px] w-[250px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]`} onClick={handleLibraryPrepConfirmation}>{t("libraryPrep.mobButton")}</button>}
                      <button className='hidden h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] md:flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] ' onClick={() => { setOrderPopVisible(false) }}>{t("libraryPrep.cancel")}</button>
                      {libraryPrepStatus !== "isCompleted" && <button disabled={disabled} className={`${disabled ? "opacity-75" : ""} hidden h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] md:flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]`} onClick={handleLibraryPrepConfirmation}>{t("libraryPrep.proceed")}</button>}
                    </div>

                  </div>
                </div>
              )}
              {activePopup === 'analysisProgress' && (
                <div className='font-DM-Sans flex flex-col w-[352px] h-[197px] md:h-[386px] md:w-[760px] p-[28px] md:p-12  items-center justify-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  analysis progress
                </div>
              )}
              {activePopup === 'analysisDone' && (
                <div className='font-DM-Sans flex flex-col w-[321px] h-[322px] md:h-[507px] md:w-[564px] p-[28px] md:p-12  items-center justify-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  analysis done
                </div>
              )}
              {activePopup === 'analysisRawData' && (
                <div className='font-DM-Sans flex flex-col w-[352px] h-[197px] md:h-[386px] md:w-[760px] p-[28px] md:p-12  items-center justify-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className='text-[22px] md:text-[22px] font-bold font-DM-Sans pb-[6px] md:pb-8 leading-[24px]'>{t("analysisRawData.title")}</div>
                  <div className='flex flex-col gap-[6px] md:gap-[12px]'>
                    <div className="text-xs md:text-base font-normal flex items-center p-4 underline text-center bg-white border-[0.5px] solid border-[#33333326] rounded-lg md:mt-2 max-w-[331px] md:max-w-[527px] max-h-[32px] md:max-h-[50px] justify-center">
                      <a href={rawDataLink.startsWith('http') ? rawDataLink : `https://${rawDataLink}`} target="_blank" rel="noopener noreferrer">
                        {t("analysisRawData.link")}
                      </a>
                    </div>
                    <label className="inline-flex items-center pt-[8px] md:pt-4">
                      <input

                        className="form-checkbox accent-[#3e8ca7]"
                        type="checkbox"
                        id="analysisraw1"
                        checked={isAnalysisRawChecked1}
                        onChange={handleRawAnalysisChecked1}
                      />
                      <span className="ml-2 font-DM-Sans font-normal text-[10px] md:text-[16px] leading-[24px]">
                        {/* Show this text only on mobile */}
                        <span className='block md:hidden'>
                          {t("analysisRawData.checkbox1Mob")}
                        </span>
                        {/* Show the original text only on desktop */}
                        <span className='hidden md:block'>
                          {t("analysisRawData.checkbox1Desk")}
                        </span>
                      </span>
                    </label>
                    <label className="hidden md:inline-flex items-center ">
                      <input
                        className="form-checkbox accent-[#3e8ca7]"
                        type="checkbox"
                        id="analysisraw2"
                        checked={isAnalysisRawChecked2}
                        onChange={handleRawAnalysisChecked2}
                      />
                      <span className="ml-2 font-DM-Sans font-normal text-[10px] md:text-[16px] leading-[24px]">
                        {/* Show this text only on mobile */}
                        <span className='block md:hidden'>
                          {t("analysisRawData.checkbox2Mob")}
                        </span>
                        {/* Show the original text only on desktop */}
                        <span className='hidden md:block'>
                          {t("analysisRawData.checkbox2Desk")}
                        </span>
                      </span>
                    </label>
                    <div className='flex items-center justify-center gap-[10px] md:gap-[12px] md:pt-3'>
                      { analysisRawDataStatus !== "isCompleted" && <button className='md:hidden h-[40px] md:h-[48px] w-[250px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]' onClick={handleAnalysisRawDataConfirmMobile}>{t("analysisRawData.proceedMob")}</button>}
                      <button className='hidden h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] md:flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] ' onClick={() => { setOrderPopVisible(false) }} >{t("analysisRawData.cancel")}</button>
                      { analysisRawDataStatus !== "isCompleted" && <button className='hidden h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] md:flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]' onClick={handleAnalysisRawDataConfirm}>{t("analysisRawData.proceed")}</button>}
                    </div>

                  </div>
                </div>
              )}
              {activePopup === 'analysisSpecification' && (
                <div className='font-DM-Sans flex flex-col w-[321px] h-[322px] md:h-[507px] md:w-[564px] p-[28px] md:p-12  items-center justify-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className='text-[22px] md:text-[32px] font-bold font-DM-Sans pb-[6px] md:pb-8 leading-[40px]'>{t("analysisSpecification.title")}</div>
                  <div className='flex flex-col gap-[6px] md:gap-[8px]'>
                    <div className='text-[14px] md:text-xl font-normal leading-[24px] md:leading-[34px]'>
                      {t("analysisSpecification.message")}
                    </div>
                    <div className='text-[8px] md:text-xs font-normal leading-[24px] md:leading-[34px]'>
                      {t("analysisSpecification.message1")}
                    </div>
                    <div className="flex items-center p-4 bg-white border-[0.5px] solid border-[#33333326] rounded-lg md:mt-2 max-w-[331px] md:max-w-[300px] max-h-[38px] md:max-h-[52px] justify-between ">
                      <div className='flex gap-[8px]'>
                        <div className="flex items-center justify-center">
                          <Image src={file1} className='w-[18px] h-[24px]'></Image>
                        </div>
                        <div>
                          {uploadedFile instanceof File && uploadedFile.type === 'application/pdf' ? (
                            <a href={URL.createObjectURL(uploadedFile)} target="_blank" rel="noopener noreferrer">
                              <span className="text-sm md:text-lg">
                                {uploadedFile.name.length > 20 ? `${uploadedFile.name.substring(0, 19)}...` : uploadedFile.name}
                              </span>
                            </a>
                          ) : (
                            <p>{t("analysisSpecification.pdfName")}</p>
                          )}
                        </div>
                      </div>
                      <button onClick={() => handleDownload(analysisSpecificationReportLink.split("?")[0], `AnalysiSpecification.pdf`)} disabled={disabled} className={` text-[12px] md:text-base ${disabled ? "opacity-75" : ""}`}>
                        <div className="text-red-500 cursor-pointer">
                          <Image src={downloadIcon} className='h-[13px] w-[13px]'></Image>
                        </div>
                      </button>
                    </div>
                    <label className="inline-flex items-center pt-[8px] md:pt-4">
                      <input
                        className="form-checkbox accent-[#3e8ca7]"
                        type="checkbox"
                        id="analysisraw1"
                        checked={isAnalysisSpecificationChecked}
                        onChange={handleAnalysisSpecificationChecked}
                      />
                      <span className="ml-2 font-DM-Sans font-normal text-[10px] md:text-[16px] leading-[24px]">
                        {/* Show this text only on mobile */}
                        <span className='block md:hidden'>
                          {t("analysisSpecification.checkbox1Mob")}
                        </span>
                        {/* Show the original text only on desktop */}
                        <span className='hidden md:block'>
                          {t("analysisSpecification.checkbox1Desk")}
                        </span>
                      </span>
                    </label>
                    <div className='flex items-center justify-center gap-[10px] md:gap-[12px] md:pt-3'>
                      { analysisSpecificationStatus !== "isCompleted" && <button className='md:hidden h-[40px] md:h-[48px] w-[250px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]' onClick={handleAnalysisSpecification}>{t("analysisSpecification.mobButton")}</button>}
                      <button className='hidden h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] md:flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] ' onClick={() => { setOrderPopVisible(false) }} >{t("analysisSpecification.cancel")}</button>
                      { analysisSpecificationStatus !== "isCompleted" && <button className='hidden h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] md:flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]' onClick={handleAnalysisSpecification}>{t("analysisSpecification.proceed")}</button>}
                    </div>

                  </div>
                </div>
              )}
              {activePopup === 'invoice' && (
                <div className='font-DM-Sans flex flex-col w-[317px] h-[247px] md:h-[351px] md:w-[564px] p-[28px] md:p-12  items-start justify-center bg-white border-[1px] border-[#D9D9D9] rounded-lg md:rounded-[22px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>

                  <div className='text-[22px] md:text-[32px] font-bold font-DM-Sans pb-[6px] md:pb-6 leading-[40px]'>{t("invoice.title")}</div>
                  <div className='w-full flex flex-col gap-[6px] md:gap-[8px]'>
                    <div className='text-[14px] md:text-xl font-normal leading-[24px] md:leading-[34px]'>
                      {t("invoice.message")}
                    </div>
                    <div className="flex items-center p-4 bg-white border-[0.5px] solid border-[#33333326] rounded-lg md:mt-2 max-w-[331px] md:max-w-[300px] max-h-[38px] md:max-h-[52px] justify-between ">
                      <div className='flex gap-[8px]'>
                        <div className="flex items-center justify-center">
                          <Image src={file1} className='w-[18px] h-[24px]'></Image>
                          <p className='pl-2 text-xs md:text-base'>{t("invoice.pdfTitle")}</p>
                        </div>
                        {/* <div>
                          {
                            uploadedFile && uploadedFile instanceof File && (
                              <a href={URL.createObjectURL(uploadedFile)}>
                                <div className="text-sm md:text-lg">{uploadedFile.name}</div>
                                <p className="text-sm text-[#717171]">
                                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} Mb
                                </p>
                              </a>
                            )
                          }
                        </div> */}
                      </div>

                      <button disabled={disabled} onClick={handleGenerateInvoice} className={`text-red-500 cursor-pointer ${disabled ? "opacity-75" : ""}`}>
                        <Image src={downloadIcon} className='h-[13px] w-[13px]'></Image>
                      </button>
                    </div>
                    <label className="inline-flex items-center pt-[8px] md:pt-4">
                      <input
                        className="form-checkbox accent-[#3e8ca7]"
                        type="checkbox"
                        id="invoice"
                        checked={isInvoiceChecked}
                        onChange={handleInvoiceChecked}
                      />
                      <span className="ml-2 font-DM-Sans font-normal text-[10px] md:text-[16px] leading-[24px]">
                        {/* Show this text only on mobile */}
                        <span className='block md:hidden'>
                          {t("invoice.checkboxMob")}
                        </span>
                        {/* Show the original text only on desktop */}
                        <span className='hidden md:block'>
                          {t("invoice.checkboxDesk")}
                        </span>
                      </span>
                    </label>
                    <div className='w-full flex items-center justify-center gap-[10px] md:gap-[12px] md:pt-3'>
                      { invoiceStatus !== "isCompleted" && <button className='md:hidden h-[40px] md:h-[48px] w-[250px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]' onClick={handleInvoice}>{t("invoice.mobButton")}</button>}
                      <button className='hidden h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] md:flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px] ' onClick={() => { setOrderPopVisible(false) }} >{t("invoice.cancel")}</button>
                      { invoiceStatus !== "isCompleted" && <button className='hidden h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] md:flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]' onClick={handleInvoice}>{t("invoice.proceed")}</button>}
                    </div>

                  </div>
                  <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                    <div ref={printRef1}>
                      <QuotationTableInvoice orderIdDB={orderIdDB} orderId={orderId} userId={userIdDB} onTableLoad1={onTableLoad1} />
                    </div>
                  </div>
                </div>
              )}
              {activePopup === 'payment' && (
                <div className='p-[16px] w-[356px] h-[290px] md:h-[435px] md:w-[760px] md:py-[26px] flex flex-col gap-[24px] items-center bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                  <div className='h-[40px] md:h-[50px] flex items-start justify-center w-full text-center border-b-[1px] border-dotted border-[#33333340]'>
                    <span className='font-DM-Sans text-center font-medium text-[16px] md:text-[22px] md:leading-[24px] text-[#333333]'>{t("payment.title")}</span>
                  </div>
                  <div className='w-[313px] h-[154px] md:w-[490px] md:h-[203px] flex items-center justify-center border-[0.4px] border-[#60b7cf] border-dashed rounded-[6px]'>
                    <div className='flex flex-col items-center justify-center gap-[14px]'>
                      <Image className='w-[32px] h-[24px] md:w-[51px] md:h-[51px]' src={FolderIcon} alt="File"></Image>
                      <div className='font-DM-Sans font-normal text-[10px] md:text-[14px] md:leading-[18px] text-[#606060] text-center pt-[4px]'>
                        <span>{t("payment.pdfTitle")}</span><br />
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-[490px] flex items-center justify-end gap-[12px]'>
                    <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]" onClick={() => { setOrderPopVisible(false) }}>{t("payment.back")}</button>
                    <button className={`h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]  ${disabled ? "opacity-75" : ""}`} onClick={handleGeneratePayment} disabled={disabled}>{t("payment.download")}</button>
                  </div>
                  <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                    <div ref={printRef2}>
                      <QuotationTablePayment orderIdDB={orderIdDB} orderId={orderId} userId={userIdDB} onTableLoad2={onTableLoad2} />
                    </div>
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
            <button onClick={handleOrderCreation} disabled={!(requestSheetStatus == "inUserProgress" || requestSheetStatus == "isAdminCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${requestSheetStatus == "isPending" || requestSheetStatus == "inAdminProgress" ? "text-[#333333]" : "text-white"} ${requestSheetStatus == "isPending" || requestSheetStatus == "inAdminProgress" ? "bg-[#E2E8F0]" : requestSheetStatus == "inUserProgress" || requestSheetStatus == "isAdminCompleted" ? "bg-[#FF914D]" : requestSheetStatus == "isUserCompleted" ? "bg-[#79747E]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.requestSheet")}</button>
            <button onClick={handleCostEstimateClick} disabled={!(costEstimateStatus == "inUserProgress" || costEstimateStatus == "isAdminCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${costEstimateStatus == "isPending" || costEstimateStatus == "inAdminProgress" ? "text-[#333333]" : "text-white"} ${costEstimateStatus == "isPending" || costEstimateStatus == "inAdminProgress" ? "bg-[#E2E8F0]" : costEstimateStatus == "inUserProgress" || costEstimateStatus == "isAdminCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.costEstimation")}</button>
            <button onClick={handleFormalRequestClick} disabled={!(formalRequestStatus == "inUserProgress" || formalRequestStatus == "isAdminCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${formalRequestStatus == "isPending" || formalRequestStatus == "inAdminProgress" ? "text-[#333333]" : "text-white"} ${formalRequestStatus == "isPending" || formalRequestStatus == "inAdminProgress" ? "bg-[#E2E8F0]" : formalRequestStatus == "inUserProgress" || formalRequestStatus == "isAdminCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.formalRequest")}</button>
            <button onClick={handleSampleShippingClick} disabled={!(sampleShippingStatus == "inUserProgress" || sampleShippingStatus == "isAdminCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${sampleShippingStatus == "isPending" || sampleShippingStatus == "inAdminProgress" ? "text-[#333333]" : "text-white"} ${sampleShippingStatus == "isPending" || sampleShippingStatus == "inAdminProgress" ? "bg-[#E2E8F0]" : sampleShippingStatus == "inUserProgress" ? "bg-[#FF914D]" : sampleShippingStatus == "inTransit" || sampleShippingStatus == "isAdminCompleted" || sampleShippingStatus == "isUserCompleted" ? "bg-[#79747E]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.sampleShipment")}</button>
            <button onClick={handleQualityCheckClick} disabled={!(qualityCheckStatus == "inUserProgress" || qualityCheckStatus == "isAdminCompleted" || qualityCheckStatus == "isCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${qualityCheckStatus == "isPending" || qualityCheckStatus == "inAdminProgress" ? "text-[#333333]" : "text-white"} ${qualityCheckStatus == "isPending" || qualityCheckStatus == "inAdminProgress" ? "bg-[#E2E8F0]" : qualityCheckStatus == "inUserProgress" || qualityCheckStatus == "isAdminCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.qualityCheck")}</button>
            <button onClick={handleLibraryPrepClick} disabled={!(libraryPrepStatus == "inUserProgress" || libraryPrepStatus == "isAdminCompleted" || libraryPrepStatus == "isCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${libraryPrepStatus == "isPending" || libraryPrepStatus == "inAdminProgress" ? "text-[#333333]" : "text-white"} ${libraryPrepStatus == "isPending" || libraryPrepStatus == "inAdminProgress" ? "bg-[#E2E8F0]" : libraryPrepStatus == "inUserProgress" || libraryPrepStatus == "isAdminCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.libraryPrep")}</button>
            <button onClick={handleAnalysisProgressClick} disabled={!(analysisProgressStatus == "inUserProgress" || analysisProgressStatus == "isAdminCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${analysisProgressStatus == "isPending" || analysisProgressStatus == "inAdminProgress" ? "text-[#333333]" : "text-white"} ${analysisProgressStatus == "isPending" || analysisProgressStatus == "inAdminProgress" ? "bg-[#E2E8F0]" : analysisProgressStatus == "inUserProgress" || analysisProgressStatus == "isAdminCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.analysisStart")}</button>
            <button onClick={handleAnalysisDoneClick} disabled={!(analysisDoneStatus == "inUserProgress" || analysisDoneStatus == "isAdminCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${analysisDoneStatus == "isPending" || analysisDoneStatus == "inAdminProgress" ? "text-[#333333]" : "text-white"} ${analysisDoneStatus == "isPending" || analysisDoneStatus == "inAdminProgress" ? "bg-[#E2E8F0]" : analysisDoneStatus == "inUserProgress" || analysisDoneStatus == "isAdminCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.analysisDone")}</button>
            <button onClick={handleAnalysisRawDataClick} disabled={!(analysisRawDataStatus == "inUserProgress" || analysisRawDataStatus == "isAdminCompleted" || analysisRawDataStatus == "isCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${analysisRawDataStatus == "isPending" || analysisRawDataStatus == "inAdminProgress" ? "text-[#333333]" : "text-white"} ${analysisRawDataStatus == "isPending" || analysisRawDataStatus == "inAdminProgress" ? "bg-[#E2E8F0]" : analysisRawDataStatus == "inUserProgress" || analysisRawDataStatus == "isAdminCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.rawData")}</button>
            <button onClick={handleAnalysisSpecificationClick} disabled={!(analysisSpecificationStatus == "inUserProgress" || analysisSpecificationStatus == "isAdminCompleted" || analysisSpecificationStatus == "isCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${analysisSpecificationStatus == "isPending" || analysisSpecificationStatus == "inAdminProgress" ? "text-[#333333]" : "text-white"} ${analysisSpecificationStatus == "isPending" || analysisSpecificationStatus == "inAdminProgress" ? "bg-[#E2E8F0]" : analysisSpecificationStatus == "inUserProgress" || analysisSpecificationStatus == "isAdminCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.analysisSpecification")}</button>
            <button onClick={handleInvoiceClick} disabled={!(invoiceStatus == "inUserProgress" || invoiceStatus == "isAdminCompleted" || invoiceStatus == "isCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${invoiceStatus == "isPending" || invoiceStatus == "inAdminProgress" ? "text-[#333333]" : "text-white"} ${invoiceStatus == "isPending" || invoiceStatus == "inAdminProgress" ? "bg-[#E2E8F0]" : invoiceStatus == "invoicerogress" || invoiceStatus == "isAdminCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.invoice")}</button>
            <button onClick={handlePaymentClick} disabled={!(paymentStatus == "inUserProgress" || paymentStatus == "isAdminCompleted" || paymentStatus == "isCompleted")} className={`h-[44px] w-[113px] md:h-[64px] md:w-[184px] p-[4px] md:p-[8px] rounded-[4px] md:rounded-[6px] ${paymentStatus == "isPending" || paymentStatus == "inAdminProgress" ? "text-[#333333]" : "text-white"} ${paymentStatus == "isPending" || paymentStatus == "inAdminProgress" ? "bg-[#E2E8F0]" : paymentStatus == "paymentess" || paymentStatus == "isAdminCompleted" ? "bg-[#FF914D]" : "bg-[#5CE1E6]"} font-DM-Sans font-medium text-[8px] md:text-[14px] leading-[24px] text-center`}>{t("buttons.receipt")}</button>
          </div>
        </div>
        <div className="w-full h-[92px] px-4 md:px-[40px] flex flex-col justify-center border-[1px] border-[#E2E8F0] rounded-md shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]">
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
