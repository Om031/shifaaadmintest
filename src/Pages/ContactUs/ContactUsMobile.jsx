import React, { useRef,useState } from "react";
import emailjs from "emailjs-com";
import "./ContactUs.css";
import { useTranslation } from "react-i18next";

const ContactUsMobile = ({id}) => {
// Create a ref for the form
const form = useRef();
const { t, i18n } = useTranslation();
const [message,setMessage]=useState("");
const [error,setError]=useState("");
 const getContactInfoString = (formRef) => {
   const formData = new FormData(formRef.current);
   const phone = formData.get("phone");
   const email = formData.get("email");
   const name = formData.get("name");
   const message=formData.get("message");

 const emailParams = {
   from_name: name,  // Sender's email
   mobile:phone,
   email:email,
   message: message
 };
   return emailParams;
 };

 // Handler to send email using EmailJS
 const sendEmail = (e) => {
   e.preventDefault();
   const contactInfo = getContactInfoString(form);
    
   
   emailjs
   .send(
    "service_oudwv95", // Replace with your EmailJS service ID
    "template_gg9ru2g", // Replace with your EmailJS template ID
    contactInfo, 
    "huuTmLf5Z2_bn1-4T" // Replace with your EmailJS user/public key
  )
     .then(
       (result) => {
         setMessage(i18n.options.resources[i18n.language].contactUs.successMessage);
         setTimeout(()=>setMessage(""),5000)
         // Optionally clear the form or display a success message
       },
       (error) => {
         setError(i18n.options.resources[i18n.language].contactUs.errorMessage)
         setTimeout(()=>setError(""),5000)
       }
     );
 };

  return (
    <div className="contactus-container" id={id}>


      <form ref={form} onSubmit={sendEmail} className="message-form-mobile">
    
        <div className="heading-511-mobile">
          <span className="contact-us-521-mobile">
            {i18n.options.resources[i18n.language].contactUs.heading}
            </span>
            <br />
            <span className="contact-us-521-mobile">
            {i18n.options.resources[i18n.language].contactUs.subHeading}
            </span>
        
          <span className="question-mobile"> {i18n.options.resources[i18n.language].contactUs.question}</span>
        </div>
     

        <div className="flex-row-d-54111-mobile">
          <input
            type="text"
            name="phone"
            className="phone-number2"
            placeholder= {i18n.options.resources[i18n.language].contactUs.phonePlaceholder}
            required
          />
          <input
            type="email"
            name="email"
            className="email2"
            placeholder= {i18n.options.resources[i18n.language].contactUs.emailPlaceholder}
            required
          />
          <input
            type="text"
            name="name"
            className="name2"
            placeholder= {i18n.options.resources[i18n.language].contactUs.namePlaceholder}
            required
          />
          <textarea
            name="message"
            className="message233-mobile"
            placeholder= {i18n.options.resources[i18n.language].contactUs.messagePlaceholder}
            required
          ></textarea>
        </div>
        {/* <div className="message-container112-mobile"> */}
 
        {/* </div> */}
        {/* <div className="green-button-59111"> */}
          <input type="submit" value= {i18n.options.resources[i18n.language].contactUs.submitButton}  className="green-button-59111-mobile" />
          <div style={{fontSize:"16px",color:"#62cc90"}}>{message}</div>
          <div style={{fontSize:"16px",color:"red"}}>{error}</div>
        {/* </div> */}
      </form>
    </div>
  );
};

export default ContactUsMobile;
