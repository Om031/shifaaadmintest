import React, { useEffect, useState } from 'react';
import './OrderFormMobile.css';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch,useSelector } from 'react-redux';
import { setCreditUrl, setCustomer, setResetCart } from '../../store/cart/CartSlice';
import { addEmailUserRequest, createOrderService, getCreditUrl } from '../../store/cart/CartService';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import Autocomplete from 'react-autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import Autosuggest from 'react-autosuggest';


const FormComponentMobile = ({setStep,step,isMobile=true}) => {
  const dispatch=useDispatch();
   const { t, i18n } = useTranslation();
  const rootState = useSelector((state) => state);
  const navigate=useNavigate();
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); 
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(()=>{
    setFilteredSuggestions(rootState?.cart?.areas);
  },[])

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    if (inputValue === "") {
 
        return rootState?.cart?.areas
      }

    return rootState?.cart?.areas.filter((item) =>
      item.name.toLowerCase().includes(inputValue)
    );
  

  };
  
  // Render suggestion item
  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

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

  const handleAddressChangeArea = (value) => {
    setFormData(prevData => ({
      ...prevData,
      address: {
        ...prevData.address,
        customer_area: value,
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
    const customerTemp={
      name: formData.address.customer_name,
      mobile: formData.address.customer_mobile,
      email: formData.address.email,
      area: formData.address.customer_area,
      notes: formData.address.product_note,
      isSave:formData.marketing
    };
    const temp={
      items:rootState?.cart?.cart,
      totalPrice:totalPrice()<250 ? totalPrice()+40 : totalPrice(),
      coupon:rootState?.cart?.couponCode,
      paymentType:rootState?.cart?.paymnetType,
      customer:customerTemp
    }
    const response=await createOrderService(temp);

      const req={
        price:totalPrice(rootState?.cart.couponDiscount>0 && rootState?.cart.couponCode)<250 ? totalPrice(rootState?.cart.couponDiscount>0 && rootState?.cart.couponCode)+40 : totalPrice(rootState?.cart.couponDiscount>0 && rootState?.cart.couponCode),
        clientName:formData.address.customer_name,
        clientLName:formData.address.customer_name,
        phone:formData.address.customer_mobile,
        email:formData.address.email,
        orderId:response?.order?._id,
        demo:false
      }
      return await getCreditUrl(JSON.stringify(req))
  }


  const handleProductPrice=(id)=>{
    const product=rootState.product?.products?.find(a=>a._id===id);
    return product.price.toFixed(2)
  }

  const totalPrice = (isCoupon=false)=>{
    let sum=0;
    rootState?.cart?.cart.forEach((a)=>{
      const extraDis=calcaulatePriceDiscount(a.productId);
      sum+=(handleProductPrice(a.productId)==295? (handleProductPrice(a.productId)*0.75)*a.quantity:handleProductPrice(a.productId)*a.quantity-extraDis)
    })
    return isCoupon? sum*(1-rootState?.cart.couponDiscount/100):sum;
  };

  const calcaulatePriceDiscount=(id)=>{
    const product=rootState.product?.products?.find(a=>a._id===id);
    const temp=rootState?.cart?.cart.find(a=>a.productId===id);
    if(rootState?.cart.couponDiscount>0 && rootState?.cart.couponCode)
    {
      return 0;
    }
    // if(temp.quantity>=2 ){
    //   return temp.quantity%2===0? (temp.quantity*((product.discountForTwo/100)*product.price)).toFixed(1)
    //   :(temp.quantity-1)*((product.discountForTwo/100)*product.price).toFixed(1);
    // }
    //   if(product.price===295){
    //   return (temp.quantity*((25/100)*product.price)).toFixed(1);
    // }
    return 0;
  }

  const handleCashOrder= async ()=>{
    const customerTemp={
      name: formData.address.customer_name,
      mobile: formData.address.customer_mobile,
      email: formData.address.email,
      area: formData.address.customer_area,
      notes: formData.address.product_note,
      isSave:formData.marketing
    };
    const temp={
      items:rootState?.cart?.cart,
      totalPrice:totalPrice()<250 ? totalPrice()+40 : totalPrice(),
      coupon:rootState?.cart?.couponCode,
      paymentType:rootState?.cart?.paymnetType,
      customer:customerTemp
    }
    const response=await createOrderService(temp);

    if(response){
      navigate("/payment-success", {
        state: {
          data:response
        },
      });
       dispatch(setResetCart());
    }else{
      navigate("/payment-failed");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setCustomer(formData));
    if(formData.address.customer_area==""  ){
      alert("يرجى تعبئة جميع الحقول المطلوبة: المنطقة، البريد الإلكتروني والموافقة على الشروط للمتابعة.");
      return;
    }
    // cahs order
    if(rootState?.cart?.paymnetType === "cash"){
      await handleCashOrder();
    }
    // credit 
    else{
    const response=await handleCreditUrl();
    dispatch(setCreditUrl(response));
    }
    // email save
    if(formData.marketing){
      await addEmailUserRequest({email:formData.address.email})
    }
  
    setStep(4)

    // Implement your submit logic here
  };


 
  return (
    <div className={isMobile? "form-container-mobile":"form-container-mobile2"}>
      <h2>{i18n.options.resources[i18n.language].cart.customerInfo}</h2>
  
      <IconButton
        onClick={() => setStep(2)}
        sx={{ position: 'absolute', top: 25, left: 30 }}
        aria-label="close drawer"
      >
         <img src={require("../../assets/images/greenClose.png")} alt={"close button"} style={{width:40}} />
      </IconButton>

      <form onSubmit={handleSubmit} className="form">
        {/* Address & Order Info Section */}
        <div className="form-section">
          {/* <h3>Address & Order Info</h3> */}
          {/* <div className="form-field">
            <label htmlFor="customer_address">{i18n.options.resources[i18n.language].cart.address}</label>
            <input
              type="text"
              id="customer_address"
              name="customer_address"
              value={formData.address.customer_address}
              onChange={handleAddressChange}
              required
            />
          </div> */}
                 <div className="form-field">
            <label htmlFor="customer_name">{i18n.options.resources[i18n.language].cart.customerName}</label>
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
            <label htmlFor="customer_mobile">{i18n.options.resources[i18n.language].cart.mobile}</label>
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
            <label htmlFor="email">{i18n.options.resources[i18n.language].cart.email}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.address.email}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="form-field">
            {/* <label htmlFor="customer_area">{i18n.options.resources[i18n.language].cart.area}</label> */}
            <Autocomplete
              id="customer_area"
              freeSolo
              required
              disableClearable
              options={filteredSuggestions.map(option => option.name)}
              value={formData.address.customer_area}
              onChange={(event, newValue) => handleAddressChangeArea(newValue)}
              onInputChange={(event, newInputValue) => setInput(newInputValue)}
              renderInput={(params) => (
                <div ref={params.InputProps.ref} className="form-field">
                  <label htmlFor="customer_area">
                    {i18n.options.resources[i18n.language].cart.area}
                  </label>
                  <input
                    {...params.inputProps}
                    type="text"
                    placeholder="Search..."
                    style={{ width: isMobile ? "93%" : "98%" }}
                  />
                </div>
              )}
            />
          </div>
          <div className="form-field">
            <label htmlFor="product_note">{i18n.options.resources[i18n.language].cart.addressNote}</label>
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
        <div className="form-field checkbox-field-mobile">
          <label htmlFor="marketing">
            <input
              type="checkbox"
              id="marketing"
              name="marketing"
              checked={formData.marketing}
              onChange={handleCheckboxChange}
            />
           {i18n.options.resources[i18n.language].cart.marketing}
          </label>
        </div>

        <div className="form-field checkbox-field-mobile">
          <label htmlFor="policy">
            <input
              type="checkbox"
              id="policy"
              name="policy"
              checked={formData.policy}
              onChange={handleCheckboxChange}
            />
             {i18n.options.resources[i18n.language].cart.policy} 
             <span onClick={()=>navigate("/policy-privacy")} className='underline'>{i18n.options.resources[i18n.language].cart.policy3} </span>
             <span onClick={()=>navigate("/policy")} className='underline'> {i18n.options.resources[i18n.language].cart.policy4} </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="form-buttons">
          <button type="submit" className= {!formData.policy?"submit-btn-disable-mobile":"submit-btn-mobile"}  disabled={!formData.policy}>
          {i18n.options.resources[i18n.language].cart.formButton} 
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponentMobile;
