import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { useOrder } from '@/contexts/OrderContext';
import { useTranslations } from 'next-intl';

const QuotationTablePaymenet = ({ orderIdDB, orderId, userId, onTableLoad2 }) => {
  const path = usePathname();
  const [samples1, setSamples1] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${day}-${month}-${year}`;
  const { grandTotal1, currency1 } = useOrder();
  const t = useTranslations("quotation");
  const dueDate = new Date(currentDate);
  dueDate.setDate(currentDate.getDate() + 15);
  const dueDay = String(dueDate.getDate()).padStart(2, '0');
  const dueMonth = String(dueDate.getMonth() + 1).padStart(2, '0');
  const dueYear = dueDate.getFullYear();
  const formattedDueDate = `${dueDay}-${dueMonth}-${dueYear}`;

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
          throw new Error('Network response was not ok');
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
      onTableLoad2();
    }
  }, [loading, onTableLoad2]);

  if (error) return <p>Error: {error}</p>;

  const getPayeeByCurrency = () => (currency1 === 'JPY' ? t("payee1") : t("payee2"));
  const getCompanyNameByCurrency = () => (currency1 === 'JPY' ? t("companyName1") : t("companyName2"));
  const getCompanyAddressByCurrency = () => (currency1 === 'JPY' ? t("companyAddress1") : t("companyAddress2"));

  return (
    <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{getCompanyNameByCurrency()}</h2>
          <p className="text-base">{getCompanyAddressByCurrency()}</p>
        </div>
        <div className="text-right pb-3">
          <h3 className="font-bold text-xl">Receipt</h3>
         
        </div>
      </div>

      {/* Bill To, Ship To, and Receipt Info Section */}
      <div className="flex justify-between mb-8">
        <div className="w-1/3 text-base font-medium">
          <h4 className="text-lg font-bold">Bill To</h4>
          {userDetails ? (
            <>
              <p><strong>{t("name")}:</strong> {userDetails.service}</p>
              <p><strong>{t("city")}:</strong> {userDetails.city}</p>
              <p><strong>{t("postalCode")}:</strong> {userDetails.postalCode}</p>
            </>
          ) : (
            <p>No user details available.</p>
          )}
        </div>
        
        <div className="w-1/3 text-base font-medium">
          <h4 className="text-lg font-bold">Receipt#  <span className='font-normal text-base'>{orderId}</span> </h4>
          <p><strong>{t("date")}:</strong> {formattedDate}</p>
        </div>
      </div>

      {/* Table Section */}
      <table className="w-full table-fixed border-collapse mt-4 break-words">
        <thead>
          <tr className="bg-gray-200" style={{ pageBreakInside: 'avoid' }}>
            <th className="border px-4 py-3 text-left">{t("sampleNumber")}</th>
            <th className="border px-4 py-3 text-left">{t("sampleName")}</th>
            <th className="border px-4 py-3 text-left">{t("sampleCheckPrice")}</th>
            <th className="border px-4 py-3 text-left">{t("libraryPrepPrice")}</th>
            <th className="border px-4 py-3 text-left">{t("analysisFees")}</th>
            <th className="border px-4 py-3 text-left">{t("tax")}</th>
            <th className="border px-4 py-3 text-left">{t("others")}</th>
            <th className="border px-4 py-3 text-left">{t("total")}</th>
          </tr>
        </thead>
        <tbody className="text-xs break-words">
          {samples1.map((sample1, index) => (
            <tr key={index} className="hover:bg-gray-50" style={{ pageBreakInside: 'avoid' }}>
              <td className="border px-4 py-3">{sample1.id}</td>
              <td className="border px-4 py-3">{sample1.name}</td>
              <td className="border px-4 py-3">{sample1.qualityFees || 'N/A'}</td>
              <td className="border px-4 py-3">{sample1.libraryFees || 'N/A'}</td>
              <td className="border px-4 py-3">{sample1.analysisFees || 'N/A'}</td>
              <td className="border px-4 py-3">{sample1.tax || 'N/A'}</td>
              <td className="border px-4 py-3">{sample1.others || 'N/A'}</td>
              <td className="border px-4 py-3">{sample1.total || 'N/A'}</td>
            </tr>
          ))}
          <tr className="bg-gray-200 font-bold" style={{ pageBreakInside: 'avoid' }}>
            <td colSpan="6" className="border px-4 py-3 text-left">{t("overAllTotal")}</td>
            <td className="border px-4 py-3">{currency1}</td>
            <td className="border px-4 py-3">{grandTotal1}</td>
          </tr>
        </tbody>
      </table>
      
      {/* Footer Section */}
      {/* <div className="mt-8 pt-4 border-t flex flex-col items-start justify-start" style={{ pageBreakInside: 'avoid' }}>
       
      <p className="mt-8 text-center text-lg font-bold">
          Terms and Conditions
        </p> 
        <p className="mt-2 text-center text-sm">
       payment is due within 15 days.
        </p> 
        <p className="mt-2 text-center text-sm">
         Please make check payable to {getCompanyNameByCurrency()}
        </p> 
      </div> */}
    

     
    </div>
  );
};

export default QuotationTablePaymenet;
