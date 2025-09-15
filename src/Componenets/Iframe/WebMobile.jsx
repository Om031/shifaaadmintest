import React from "react";
import IconButton from '@mui/material/IconButton';

const IframeComponentMobile = ({ src, width = "100%", height = "700px", title = "Credit Card",setStep,isMobile=true}) => {
  return (
    <div className={isMobile? "form-container-mobile":"form-container-mobile2"} style={{display:'flex'}}>  
      
      <IconButton
        onClick={() => setStep(3)}
        sx={{ position: 'absolute', top: 25, left: 30, zIndex:2000}}
        aria-label="close drawer"
      >
         <img src={require("../../assets/images/greenClose.png")} alt={"close button"} style={{width:40}} />
      </IconButton>  
      <iframe
      src={src}
      width={width}
      height={height}
      title={title}
      style={{ border: "none",transform:"scale(1)",marginTop:"100px" }} // Remove border
    />
    </div>

  );
};

export default IframeComponentMobile;
