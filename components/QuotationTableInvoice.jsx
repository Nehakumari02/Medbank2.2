'use client'
import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { useOrder } from '@/contexts/OrderContext';
import { useTranslations } from 'next-intl'

const QuotationTableInvoice = ({ orderIdDB, orderId, userId, onTableLoad1 }) => {
  const path = usePathname();
  const [samples1, setSamples1] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${day}-${month}-${year}`;
  const { grandTotal1, setGrandTotal1 } = useOrder();
  const { currency1, setCurrency1 } = useOrder();
  const t = useTranslations("quotationInvoice");
  const {cunit,setCunit}=useState("")

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const response = await fetch('/api/fetchQuotation-invoice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: orderIdDB }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        setSamples1(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchUserDetails1 = async () => {
      try {
        const response = await fetch('/api/fetchUserDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok1');
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setUserDetails(data.user);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSamples();
    fetchUserDetails1();
  }, [orderId, userId]);
  useEffect(() => {
    if (!loading) {
      onTableLoad1();
    }
  }, [loading, onTableLoad1]);

  if (error) return <p>Error: {error}</p>;

  const getPayeeByCurrency = () => {
    if (currency1 === 'JPY') {
      return t("payee1"); // Use translation for JPY payee
    } else {
      return t("payee2"); // Use translation for USD payee
    }

  };
  const getCompanyNameByCurrency = () => {
    if (currency1 === 'JPY') {
      return t("companyName1"); // Use translation for JPY payee
    } else {
      return t("companyName2"); // Use translation for USD payee
    }

  };
  const getCompanyAddressByCurrency = () => {
    if (currency1 === 'JPY') {
      return t("companyAddress1"); // Use translation for JPY payee
    } else {
      return t("companyAddress2"); // Use translation for USD payee
    }

  };

  return (
    <div className="max-w-full mx-auto p-3 bg-white shadow-md rounded-md">
       <div className="mb-8">
        <h2 className="text-xl font-bold"><p>{getCompanyNameByCurrency()}</p></h2>
        <p>{getCompanyAddressByCurrency()}</p>
        <p>{getPayeeByCurrency()}</p>
      </div>
      {userDetails ? (
        <div className="mb-8 text-base font-medium">
          <div className="text-lg font-bold">User Details</div>
          <div className="">
            <p> <strong>{t("name")}:</strong> {userDetails.name}</p>
            <div> <strong>{t("city")}:</strong> {userDetails.city}</div>
            <span><strong>{t("postalCode")}:</strong>  {userDetails.postalCode}</span>
            <div className=''><strong>{t("invoiceNumber")}:</strong> {orderId}</div>
            <div><strong>{t("date")}:</strong> {formattedDate}</div>
          </div>
        </div>
      ) : (
        <p>No user details available.</p>
      )}
      
      <h2 className="pb-5 font-medium text-xl text-center">{t("title")}</h2>
      
      <table className="w-full table-fixed  border-collapse  break-words">
        <thead className='text-sm'>
          <tr className="bg-gray-100">
            <th className="border px-2 py-2 text-left">{t("sampleNumber")}</th>
            <th className="border px-2 py-2 text-left">{t("sampleName")}</th>
            <th className="border px-2 py-2 text-left">{t("sampleCheckPrice")}</th>
            <th className="border px-2 py-2 text-left">{t("libraryPrepPrice")}</th>
            <th className="border px-2 py-2 text-left">{t("analysisFees")}</th>
            <th className="border px-2 py-2 text-left">{t("tax")}</th>
            <th className="border px-2 py-2 text-left">{t("others")}</th>
            <th className="border px-2 py-2 text-left">{t("total")}</th>
          </tr>
        </thead>
        <tbody className='text-xs break-words'>
          {samples1.map((sample1, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-2 py-2">{sample1.id}</td>
              <td className="border px-2 py-2">{sample1.name}</td>
              <td className="border px-2 py-2">{sample1.qualityFees || 'N/A'}</td>
              <td className="border px-2 py-2">{sample1.libraryFees || 'N/A'}</td>
              <td className="border px-2 py-2">{sample1.analysisFees || 'N/A'}</td>
              <td className="border px-2 py-2">{sample1.tax || 'N/A'}</td>
              <td className="border px-2 py-2">{sample1.others || 'N/A'}</td>
              <td className="border px-2 py-2">{sample1.total || 'N/A'}</td>
            </tr>
          ))}
          <tr className="bg-gray-100 font-bold">
            <td colSpan="6" className="border px-2 py-2 text-left">{t("overAllTotal")}</td>
            <td className="border px-2 py-2">{currency1}</td>
            <td className="border px-2 py-2">{grandTotal1}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QuotationTableInvoice;
