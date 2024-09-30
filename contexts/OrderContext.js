import React, { createContext, useContext, useState } from "react";

// Create the context
const OrderContext = createContext();

// Custom hook for consuming context
export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orderId, setOrderId] = useState("");
  const [orderTitle, setOrderTitle] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  // Separate state variables for each item in the orderSchema
  const [requestSheetStatus, setRequestSheetStatus] = useState("isPending");
  const [requestSheetLink, setRequestSheetLink] = useState("");

  const [costEstimateStatus, setCostEstimateStatus] = useState("isPending");
  const [costEstimationLink, setCostEstimationLink] = useState("");

  const [formalRequestStatus, setFormalRequestStatus] = useState("isPending");

  const [sampleShippingStatus, setSampleShippingStatus] = useState("isPending");
  const [sampleShipping, setSampleShipping] = useState("ok");

  const [qualityCheckStatus, setQualityCheckStatus] = useState("isPending");
  const [qualityCheckReportLink, setQualityCheckReportLink] = useState("");

  const [libraryPrepStatus, setLibraryPrepStatus] = useState("isPending");
  const [libraryCheckReportLink, setLibraryCheckReportLink] = useState("");

  const [analysisProgressStatus, setAnalysisProgressStatus] = useState("isPending");

  const [analysisDoneStatus, setAnalysisDoneStatus] = useState("isPending");

  const [analysisRawDataStatus, setAnalysisRawDataStatus] = useState("isPending");
  const [rawDataLink, setRawDataLink] = useState("");

  const [analysisSpecificationStatus, setAnalysisSpecificationStatus] = useState("isPending");
  const [analysisSpecificationReportLink, setAnalysisSpecificationReportLink] = useState("");

  const [invoiceStatus, setInvoiceStatus] = useState("isPending");
  const [invoiceLink, setInvoiceLink] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("isPending");
  const [paymentRecieptLink, setPaymentRecieptLink] = useState("");
  const [grandTotal, setGrandTotal] = useState("");
  const [grandTotal1, setGrandTotal1] = useState("");
  const [currency, setCurrency] = useState("");
  const [currency1, setCurrency1] = useState("");

  return (
    <OrderContext.Provider
      value={{
        orderId, setOrderId,
        orderTitle, setOrderTitle,
        uploadedFile, setUploadedFile,
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
        grandTotal,setGrandTotal,
        grandTotal1,setGrandTotal1,
        currency,setCurrency,
        currency1,setCurrency1
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
