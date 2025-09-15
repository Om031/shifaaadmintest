import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import "./CenteredButtons.css"; // Import the new CSS file
import { setPaymentType } from "../../store/cart/CartSlice";

const PaymentMethod = ({setStep,step,isMobile=true}) => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const rootState = useSelector((state) => state);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleSelectMethod=(value)=>{
      dispatch(setPaymentType(value))
  }

  const goToNextStep=()=>{
    setStep(3)
  }

  return (
    <div className={isMobile? "payment-method-container":"payment-method-container2"}>
      <IconButton
        onClick={() => setStep(1)}
        sx={{ position: 'absolute', top: 25, left: 30 }}
        aria-label="close drawer"
      >
         <img src={require("../../assets/images/greenClose.png")} alt={"close button"} style={{width:40}} />
      </IconButton>
      {/* Title */}
      <h1 className="payment-method-title">اختر طريقة الدفع</h1>

      <div className="buttons-container22">
        {/* Cash Button */}
        <div
          className={`payment-option ${rootState?.cart?.paymnetType === "cash" ? "selected" : ""}`}
          onClick={() =>  handleSelectMethod("cash")}
        >
          <FaMoneyBillWave className="payment-icon" />
          <span className="payment-text">الدفع نقداً</span>
        </div>

        {/* Credit Button */}
        <div
          className={`payment-option ${rootState?.cart?.paymnetType === "credit" ? "selected" : ""}`}
          onClick={() =>  handleSelectMethod("credit")}
        >
          <FaCreditCard className="payment-icon" />
          <span className="payment-text">الدفع ببطاقة الائتمان</span>
        </div>

        <button className="back-button111" onClick={() => goToNextStep()}>
        اكمل الدفع
        </button>
      </div>

      {/* Bottom Back Button */}
 
    </div>
  );
};

export default PaymentMethod;
