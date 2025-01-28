import React, { useState } from "react";
import "./FinancialCalculator.css";

const FinancialCalculator = () => {
  const [mode, setMode] = useState("Loan");
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(7);
  const [loanTenure, setLoanTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const [investment, setInvestment] = useState(1000000);
  const [investmentRate, setInvestmentRate] = useState(8);
  const [investmentTime, setInvestmentTime] = useState(10);
  const [futureValue, setFutureValue] = useState(0);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    setEmi(emi.toFixed(2));
  };

  const calculateFutureValue = () => {
    const monthlyRate = investmentRate / 12 / 100;
    const months = investmentTime * 12;

    if (mode === "Monthly") {
      const futureValue =
        investment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      setFutureValue(futureValue.toFixed(2));
    } else if (mode === "One-time") {
      const rate = investmentRate / 100;
      const futureValue = investment * Math.pow(1 + rate, investmentTime);
      setFutureValue(futureValue.toFixed(2));
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <h2>Financial Calculator</h2>

        <div className="toggle-container">
          <div
            className={`toggle-button ${mode === "Loan" ? "active" : ""}`}
            onClick={() => setMode("Loan")}
          >
            Loan
          </div>
          <div
            className={`toggle-button ${mode === "Monthly" ? "active" : ""}`}
            onClick={() => setMode("Monthly")}
          >
            Monthly Investment
          </div>
          <div
            className={`toggle-button ${mode === "One-time" ? "active" : ""}`}
            onClick={() => setMode("One-time")}
          >
            One-time Investment
          </div>
        </div>

        {mode === "Loan" && (
          <>
            <div className="input-group">
              <label> Amount </label>
              <input
                type="range"
                min="50000"
                max="5000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
              <input
                type="number"
                className="small-input"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                min="50000"
                max="5000000"
                step="10000"
              />
            </div>
            <div className="input-group">
              <label>Interest </label>
              <input
                type="range"
                min="1"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
              <input
                type="number"
                className="small-input"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min="1"
                max="15"
                step="0.1"
              />
            </div>
            <div className="input-group">
              <label> Years</label>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={loanTenure}
                onChange={(e) => setLoanTenure(Number(e.target.value))}
              />
              <input
                type="number"
                className="small-input"
                value={loanTenure}
                onChange={(e) => setLoanTenure(Number(e.target.value))}
                min="1"
                max="30"
                step="1"
              />
            </div>
            <button className="calculate-button" onClick={calculateEMI}>
              Calculate EMI
            </button>
            <h3>EMI: ₹{emi > 0 ? emi : "0"}</h3>
          </>
        )}

        {mode !== "Loan" && (
          <>
            <div className="input-group">
              <label>
                {mode === "Monthly"
                  ? ` Invest`
                  : `Invest`}
              </label>
              <input
                type="range"
                min="1000"
                max="10000000"
                step="1000"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
              />
              <input
                type="number"
                className="small-input"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                min="1000"
                max="10000000"
                step="1000"
              />
            </div>
            <div className="input-group">
              <label> Interest</label>
              <input
                type="range"
                min="1"
                max="15"
                step="0.1"
                value={investmentRate}
                onChange={(e) => setInvestmentRate(Number(e.target.value))}
              />
              <input
                type="number"
                className="small-input"
                value={investmentRate}
                onChange={(e) => setInvestmentRate(Number(e.target.value))}
                min="1"
                max="15"
                step="0.1"
              />
            </div>
            <div className="input-group">
              <label> Years</label>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={investmentTime}
                onChange={(e) => setInvestmentTime(Number(e.target.value))}
              />
              <input
                type="number"
                className="small-input"
                value={investmentTime}
                onChange={(e) => setInvestmentTime(Number(e.target.value))}
                min="1"
                max="30"
                step="1"
              />
            </div>
            <button className="calculate-button" onClick={calculateFutureValue}>
              Calculate Returns
            </button>
            <h3>Future Value: ₹{futureValue > 0 ? futureValue : "0"}</h3>
          </>
        )}
      </div>
    </div>
  );
};

export default FinancialCalculator;
