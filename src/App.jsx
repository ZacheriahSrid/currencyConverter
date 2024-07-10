import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(url);
        setExchangeRate(response.data.rates[toCurrency]);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate !== null && amount !== '') {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? '' : value);
  };

  const handleFromChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <>
      <div className="Currency-Cunverter">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
          <div className="input-container">
            <label htmlFor="amt">Amount:</label>
            <input type="number" id='amt' value={amount} onChange={handleAmountChange} />
          </div>
          <div className="input-container">
            <label htmlFor="fromCurrency">From Currency:</label>
            <select id="fromCurrency" value={fromCurrency} onChange={handleFromChange}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="toCurrency">To Currency:</label>
            <select id="toCurrency" value={toCurrency} onChange={handleToChange}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>
        <div className="result">
        {convertedAmount !== null && (
          <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
        )}
      </div>
      <p className='copyright'>
          Designed By <span>Sridhar Vijayan`</span>
        </p>
      </div>
      
    </>
  );
}

export default App;
