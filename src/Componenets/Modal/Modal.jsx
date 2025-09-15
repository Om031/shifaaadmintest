import React, { useState } from "react";
import "./Modal.css";
import { IoClose } from "react-icons/io5"; // أيقونة الإغلاق
import { useDispatch } from "react-redux";
import { validateCoupon } from "../../store/cart/CartService";
import { setCouponCode, setCouponDiscount } from "../../store/cart/CartSlice";

const MyModal = ({ isOpen, onClose, onSubmit }) => {
  const [coupon, setCoupon] = useState("");
  const [isError, setError] = useState("");

  const dispatch=useDispatch();

  if (!isOpen) return null;

  const onAddCoupon= async()=>{
    try{
    if(coupon){
        setError("")
        const response=await validateCoupon({couponCode:coupon})
        if(response?.discount>0){
            dispatch(setCouponCode(coupon))
            dispatch(setCouponDiscount(response?.discount))
            onClose();
        }
    }
     }catch(err){
        setError(err?.message)
     }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content" dir="rtl">
        {/* زر الإغلاق (أعلى اليسار) */}
        <button className="modal-close-icon" onClick={()=>onClose()}>
          <IoClose size={24} />
        </button>

        {/* عنوان المودال */}
        <h2 className="modal-title">أدخل رمز القسيمة</h2>

        {/* حقل إدخال الكوبون */}
        <div className="modal-field">
          <label htmlFor="coupon">رمز القسيمة</label>
          <input
            type="text"
            id="coupon"
            name="coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            required
          />
        <div style={{color:"red",fontSize:"15px"}}>
           {isError} 
        </div>
        </div>

        {/* زر الإرسال */}
        <button className="modal-submit-btn" onClick={() => onAddCoupon()}>
          تطبيق القسيمة
        </button>
      </div>
    </div>
  );
};

export default MyModal;
