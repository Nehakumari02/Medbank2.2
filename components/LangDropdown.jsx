import React from 'react';

const LangDropdown = ({ value, onChange }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className="border rounded-md w-full p-2 outline-none"
        >
            <option value="JPY">JPY</option>
            {/* <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CHF">CHF - Swiss Franc</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="KRW">KRW - South Korean Won</option> */}
            <option value="SGD">SGD</option>
            {/* <option value="NZD">NZD - New Zealand Dollar</option>
            <option value="SEK">SEK - Swedish Krona</option>
            <option value="NOK">NOK - Norwegian Krone</option>
            <option value="RUB">RUB - Russian Ruble</option>
            <option value="MXN">MXN - Mexican Peso</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
            <option value="TRY">TRY - Turkish Lira</option>
            <option value="SAR">SAR - Saudi Riyal</option>
            <option value="AED">AED - UAE Dirham</option>
            <option value="MYR">MYR - Malaysian Ringgit</option>
            <option value="THB">THB - Thai Baht</option>
            <option value="IDR">IDR - Indonesian Rupiah</option>
            <option value="PHP">PHP - Philippine Peso</option>
            <option value="VND">VND - Vietnamese Dong</option> */}
            {/* Add more currencies as needed */}
        </select>
    );
};

export default LangDropdown;
