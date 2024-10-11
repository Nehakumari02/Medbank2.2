'use client'
import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { useOrder } from '@/contexts/OrderContext';
import { useTranslations } from 'next-intl'

const QuotationTable = ({ orderIdDB, orderId, userId, onTableLoad }) => {
  const path = usePathname();
  const [samples, setSamples] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${day}-${month}-${year}`;
  const { grandTotal, setGrandTotal } = useOrder();
  const { currency, setCurrency } = useOrder();
  const t = useTranslations("quotation");
 

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const response = await fetch('/api/fetchQuotation', {
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

        setSamples(data.data);
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
      onTableLoad();
    }
  }, [loading, onTableLoad]);

  if (error) return <p>Error: {error}</p>;

  const getPayeeByCurrency = () => {
    if (currency === 'JPY') {
      return t("payee1"); // Use translation for JPY payee
    } else {
      return t("payee2"); // Use translation for USD payee
    }

  };
  const getCompanyNameByCurrency = () => {
    if (currency === 'JPY') {
      return t("companyName1"); // Use translation for JPY payee
    } else {
      return t("companyName2"); // Use translation for USD payee
    }

  };
  const getCompanyAddressByCurrency = () => {
    if (currency === 'JPY') {
      return t("companyAddress1"); // Use translation for JPY payee
    } else {
      return t("companyAddress2"); // Use translation for USD payee
    }

  };

  return (
    <div className="max-w-full mx-auto p-3 bg-white shadow-md rounded-md">
      
      <h2 className="flex flex-col pb-5 font-bold text-xl text-center justify-center">{t("title")}</h2>

      {userDetails ? (
        <div className="mb-8 text-base font-medium">
          <div className="">
            <p> <strong>{t("name")}:</strong> {userDetails.name}</p>
            <div> <strong>{t("city")}:</strong> {userDetails.city}</div>
            <span><strong>{t("postalCode")}:</strong>  {userDetails.postalCode}</span>
            <div className='pt-[8px]'><strong>{t("quotationNumber")}:</strong> {orderId}</div>
            <div ><strong>{t("date")}:</strong> {formattedDate}</div>
          </div>
        </div>
      ) : (
        <p>No user details available.</p>
      )}

      <div className="mb-8">
        <h2 className="text-lg font-bold"><p>{getCompanyNameByCurrency()}</p></h2>
        <p>{getCompanyAddressByCurrency()}</p>
      </div>


      <table className="w-full table-fixed  border-collapse  break-words" >
        <thead className='text-sm'>
          <tr className="bg-gray-100 nobreak" style={{ pageBreakInside: 'avoid' }} >
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
          {samples.map((sample, index) => (
            <tr key={index} className="hover:bg-gray-50" style={{ pageBreakInside: 'avoid' }}>
              <td className="border px-2 py-2">{sample.id}</td>
              <td className="border px-2 py-2">{sample.name}</td>
              <td className="border px-2 py-2">{sample.qualityFees || 'N/A'}</td>
              <td className="border px-2 py-2">{sample.libraryFees || 'N/A'}</td>
              <td className="border px-2 py-2">{sample.analysisFees || 'N/A'}</td>
              <td className="border px-2 py-2">{sample.tax || 'N/A'}</td>
              <td className="border px-2 py-2">{sample.others || 'N/A'}</td>
              <td className="border px-2 py-2">{sample.total || 'N/A'}</td>
            </tr>
          ))}
          <tr className="bg-gray-100 font-bold" style={{ pageBreakInside: 'avoid' }}>
            <td colSpan="6" className="border px-2 py-2 text-left">{t("overAllTotal")}</td>
            <td className="border px-2 py-2">{currency}</td>
            <td className="border px-2 py-2">{grandTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QuotationTable;
