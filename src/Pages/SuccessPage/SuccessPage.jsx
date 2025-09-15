import React, { useEffect, useRef } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import "./SuccessPage.css"; // Reusing the same CSS
import { useDispatch } from "react-redux";
import { setResetCart } from "../../store/cart/CartSlice";
import OrderSummary from "../../Componenets/OrderSummary/OrderSummary";
import queryString from "query-string";
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const successRef = useRef(null);
  const location = useLocation();
    const {data } = location.state || {};
    const params = queryString.parse(location.search);
    const order = params.data2 ? JSON.parse(decodeURIComponent(params.data2)) : {};
    console.log(order);
  // Function to take screenshot
  const captureScreenshot = () => {
    if (successRef.current) {
      html2canvas(successRef.current, { scale: 2 }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "payment_success.png";
        link.click();
      });
    }
  };

  useEffect(()=>{
    dispatch(setResetCart());
  },[])

  return (
    <div ref={successRef} className="payment-failed-container">
      {/* Payment Success Image */}
      <img
        src={require("../../assets/images/3e50f342-61b9-4e47-a263-c46859cf6d9e.png")}
        alt="تمت العملية بنجاح"
        className="payment-failed-image"
      />

      {/* Success Message */}
      <h1 className="payment-failed-title">تمت عملية الدفع بنجاح!</h1>

      {/* Confirmation Message */}
      <p className="payment-failed-message">شكراً لك! تم استلام دفعتك بنجاح.</p>
       <OrderSummary order={data?.order? data.order:order}/>
      {/* Buttons */}
      <div className="btns-suc">
        <button onClick={() => {navigate("/"); }} className="payment-failed-button">
          العودة إلى الصفحة الرئيسية
        </button>
        <button onClick={captureScreenshot} className="payment-failed-button" style={{ marginLeft: "10px" }}>
          تحميل الفاتورة
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
