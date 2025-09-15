import axiosInstance from "../api"

export const getAreasService=async ()=>{
    const response=  await axiosInstance.get('/dhm/dhm-area')
    return response;
  }

  export const getCreditUrl=async (req)=>{
    const response=await axiosInstance.post('/credit/credit',req)
    return response.data;
  }


  export const createOrderService=async ({
    items,
    totalPrice,
    coupon = null,
    paymentType,
    creditInfo = null,
    customer,
    address = null,
    subscriberId = null
  }) => {
    try {
      // Construct the request payload
      const orderData = {
        items,
        totalPrice,
        coupon,
        paymentType,
        customer
      };
  
      // Add optional fields only if provided
      if (address) orderData.address = address;
      if (subscriberId) orderData.subscriberId = subscriberId;
      if (creditInfo && paymentType === "credit") orderData.creditInfo = creditInfo;
  
      // Send request using Axios
      const response = await axiosInstance.post("/order/orders", orderData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      console.log("✅ Order created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error creating order:", error.response?.data?.message || "فشل إنشاء الطلب");
      throw new Error(error.response?.data?.message || "فشل إنشاء الطلب");
    }
  };

  
export const addEmailUserRequest = async ({ email, phone = "" }) => {
  try {
   

    // Construct request payload
    const requestData = { email, phone };

    // Send POST request using Axios
    const response = await axiosInstance.post("/subscriber/email-users", requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ User added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error adding email user:", error.response?.data?.message || "حدث خطأ أثناء التسجيل");
  }
};


export const validateCoupon = async ({ couponCode }) => {
  try {
   

    // Construct request payload
    const requestData = { couponCode };

    // Send POST request using Axios
    const response = await axiosInstance.post("/coupon/coupon", requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ User added successfully:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "حدث خطأ أثناء التسجيل");
  }
};