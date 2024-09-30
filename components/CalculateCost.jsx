'use client'
import React, { useState } from 'react';
import LangDropdown from "../components/LangDropdown"

const CalculateCost = () => {
    const [currency, setCurrency] = useState("JPY");
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleGenerateClick = () => {
        setIsPopupVisible(true);
    };

    const handleConfirmFormalRequest = () => {
        setIsPopupVisible(false);
    };

    return (
        <div className="bg-white rounded-md shadow-lg md:py-[26px] md:px-[12px] md:w-[1199px] mx-5 px-4 md:mx-auto my-10 font-DM-Sans md:min-h-[576px]">
            <h2 className="text-[18px] md:text-[22px] font-medium text-center mb-4 md:mb-6">Calculate Cost</h2>
            <div className='border border-dashed'></div>
            <div className='border border-dashed pt-[20px]'></div>

            <div className="overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                <table className="w-full mb-6 min-w-[768px]">
                    <thead>
                        <tr className="text-left font-medium text-sm">
                            <th className="py-2">Sample ID</th>
                            <th className="py-2">Sample Name</th>
                            <th className="py-2">Quality check fees</th>
                            <th className="py-2">Library adjustment fees</th>
                            <th className="py-2">Next gen. sequencer analysis fees</th>
                            <th className="py-2">Tax</th>
                            <th className="py-2">Others</th>
                            <th className="py-2">Amount</th>
                        </tr>
                    </thead>

                    <tbody className='border-t'>
                        {[1, 2, 3].map((_, index) => (
                            <tr key={index} className="text-[12px] font-normal">
                                <td className="py-[12px] md:w-[98px] pr-[20px]">
                                    <input
                                        type="text"
                                        className="border rounded-md w-full p-2"
                                        placeholder={`10${index + 1}`}
                                    />
                                </td>
                                <td className="md:w-[108px] py-[12px] pr-[20px]">
                                    <input
                                        type="text"
                                        className="border rounded-md w-full p-2"
                                        placeholder={`${index === 0 ? 'Red' : index === 1 ? 'White' : 'Yellow'} mouse`}
                                    />
                                </td>
                                <td className="md:w-[156px] py-[12px]">
                                    <div className='flex gap-[2px]'>
                                        <div className="w-[108px] flex-shrink-0 group">
                                            <input
                                                type="text"
                                                className="border rounded-md w-full p-2"
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
                                <td className="md:w-[156px] py-[12px]">
                                    <div className='flex gap-[2px]'>
                                        <div className="w-[108px] flex-shrink-0 group">
                                            <input
                                                type="text"
                                                className="border rounded-md w-full p-2"
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
                                <td className="md:w-[156px] py-[12px]">
                                    <div className='flex gap-[2px]'>
                                        <div className="md:w-[108px] flex-shrink-0 group">
                                            <input
                                                type="text"
                                                className="border rounded-md w-full p-2"
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
                                <td className="md:w-[108px] py-[12px] pr-[20px]">
                                    <input
                                        type="text"
                                        className="border rounded-md w-full p-2 bg-[#33333314]"
                                        placeholder="JPY"
                                    />
                                </td>
                                <td className="md:w-[108px] py-[12px] pr-[20px]">
                                    <input
                                        type="text"
                                        className="border rounded-md w-full p-2 bg-[#33333314]"
                                        placeholder=""
                                    />
                                </td>
                                <td className="md:w-[108px]">
                                    <input
                                        type="text"
                                        className="border rounded-md w-full p-2"
                                        placeholder="JPY"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="border-t font-medium text-[14px]">
                            <td colSpan="7" className="text-right py-2 pr-6">Total</td>
                            <td className="md:w-[108px]">
                                <input
                                    type="text"
                                    className="border rounded-md w-full p-2"
                                    placeholder="JPY"
                                />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="flex items-center text-[14px] font-normal">
                <input type="checkbox" id="tax" className="mr-2" />
                <label htmlFor="tax">Click to enter tax percent.</label>
            </div>
            <div className="flex items-center mb-[6px] text-[14px] font-normal">
                <input type="checkbox" id="amount" className="mr-2" />
                <label htmlFor="amount">Click to enter other amount.</label>
            </div>
            <p className="text-[14px] font-normal mb-6">
                Note: The tax amount is subjected to the country and region. Other charges may include shipping or handling fees.
            </p>
            <div className='w-full flex items-end justify-end gap-[12px] pb-4'>
                <button className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]">Back</button>
                <button   onClick={handleGenerateClick} className="h-[40px] md:h-[48px] w-[96px] md:w-[126px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]">Generate</button>
            </div>
            {isPopupVisible && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                    <div className='md:h-[334px] md:w-[564px] md:py-[65px] md:px-[48px] flex flex-col items-center justify-between bg-white border-[1px] border-[#D9D9D9] rounded-[10px] shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)]'>
                        <span className='w-full font-DM-Sans font-bold md:text-[32px] md:leading-[40px] text-[#333333]'>Confirmation Message</span>
                        <span className='w-full font-DM-Sans font-normal md:text-[20px] md:leading-[34px] text-[#333333]'>Your formal request has been accepted and Medbank is requesting the sample shipment.</span>
                        <button
                            className="w-full h-[50px] md:h-[48px] rounded-[6px] flex items-center justify-center gap-[10px] border-[2px] border-[#E2E8F0] [background:linear-gradient(180deg,_#60b7cf_10%,_#3e8da7_74.5%,_rgba(0,_62,_92,_0.6))] text-white font-DM-Sans font-medium text-[12px] md:text-[16px] text-center leading-[24px]"
                            onClick={handleConfirmFormalRequest}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalculateCost;

