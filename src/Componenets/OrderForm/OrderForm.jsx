import React, { useState } from 'react';
import './OrderForm.css';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch,useSelector } from 'react-redux';
import { setCreditUrl, setCustomer } from '../../store/cart/CartSlice';
import { getCreditUrl } from '../../store/cart/CartService';
import { useNavigate } from 'react-router-dom';


const FormComponent = ({setStep,step}) => {
  const dispatch=useDispatch();
  const rootState = useSelector((state) => state);
  const navigate=useNavigate();
  const [formData, setFormData] = useState({

    address: {
      customer_address: '',
      customer_mobile: '',
      customer_name: '',
      customer_area: '',
      product_note: '',
      email:''
    },
    marketing: false,
    policy:false,
  });



  // Handler for address fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      }
    }));
  };

  // Handler for checkbox
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleCreditUrl=async()=>{
      const req={
        price:100,
        clientName:formData.address.customer_name,
        clientLName:formData.address.customer_name,
        phone:formData.address.customer_mobile,
        email:formData.address.email,
        demo:true
      }
      return await getCreditUrl(JSON.stringify(req))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    dispatch(setCustomer(formData));
    const response=await handleCreditUrl();
    dispatch(setCreditUrl(response));
    setStep(3)

    // Implement your submit logic here
  };

  return (
    <div className="form-container">
      <h2>Customer Information</h2>
      <IconButton
        onClick={() => setStep(1)}
        sx={{ position: 'absolute', top: 70, left: 10 }}
        aria-label="close drawer"
      >
        <ArrowBackIcon style={{ color: "white" }} />
      </IconButton>
      <form onSubmit={handleSubmit} className="form">
        {/* Address & Order Info Section */}
        <div className="form-section">
          <h3>Address & Order Info</h3>
          <div className="form-field">
            <label htmlFor="customer_address">Address</label>
            <input
              type="text"
              id="customer_address"
              name="customer_address"
              value={formData.address.customer_address}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="customer_mobile">Mobile</label>
            <input
              type="text"
              id="customer_mobile"
              name="customer_mobile"
              value={formData.address.customer_mobile}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="customer_name">Customer Name</label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              value={formData.address.customer_name}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email (optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.address.email}
              onChange={handleAddressChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="customer_area">Area</label>
            <select
              id="customer_area"
              name="customer_area"
              value={formData.address.customer_area}
              onChange={handleAddressChange}
              required
            >
              {rootState?.cart?.areas.map(a=><option value={a.name}>{a.name}</option>)}
  
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="product_note">Product Note</label>
            <textarea
              id="product_note"
              name="product_note"
              value={formData.address.product_note}
              onChange={handleAddressChange}
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Marketing Checkbox */}
        <div className="form-field checkbox-field">
          <label htmlFor="marketing">
            <input
              type="checkbox"
              id="marketing"
              name="marketing"
              checked={formData.marketing}
              onChange={handleCheckboxChange}
            />
            Use my email for marketing purposes
          </label>
        </div>

        <div className="form-field checkbox-field">
          <label htmlFor="policy">
            <input
              type="checkbox"
              id="policy"
              name="policy"
              checked={formData.policy}
              onChange={handleCheckboxChange}
            />
            I Agree To the terms and policy of the website as they appears in  
            <span onClick={()=>navigate("/policy-privacy")} className='underline'>terms of use</span> and 
             <span onClick={()=>navigate("/policy")} className='underline'> policy</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="form-buttons">
          <button type="submit" className= {!formData.policy?"submit-btn-disable":"submit-btn"}  disabled={!formData.policy||!formData.address.customer_area}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
