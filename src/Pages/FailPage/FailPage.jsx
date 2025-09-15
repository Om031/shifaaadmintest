import React from "react";
import { useNavigate } from "react-router-dom";
import "./FailPage.css"; // Import the CSS file

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-failed-container">
      {/* Payment Failed Image */}
      <img
        src={require("../../assets/images/3e50f342-61b9-4e47-a263-c46859cf6d9e.png")}
        alt="فشل الدفع"
        className="payment-failed-image"
      />

      {/* Apology Message */}
      <h1 className="payment-failed-title">نأسف، فشلت عملية الدفع</h1>

      {/* Try Again Message */}
      <p className="payment-failed-message">يرجى المحاولة مرة أخرى لاحقًا</p>

      {/* Home Button */}
      <button onClick={() => navigate("/")} className="payment-failed-button">
        العودة إلى الصفحة الرئيسية
      </button>
    </div>
  );
};

export default PaymentFailed;
