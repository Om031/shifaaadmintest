import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = ({ order }) => {

    const rootState = useSelector((state) => state);

  const handleProductName=(id)=>{
    const product=rootState.product?.products?.find(a=>a._id===id);
    return product.name
  }

  const handleProductPrice=(id)=>{
    const product=rootState.product?.products?.find(a=>a._id===id);
    return product.price.toFixed(2)
  }

  const handleProductImage=(id)=>{
    const product=rootState.product?.products?.find(a=>a._id===id);
    return product.image2;
  }
  if (!order) return <p style={styles.noOrder}>🚫 لا يوجد طلب</p>;
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>ملخص الطلب</h2>
      
      {/* Customer Information */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>معلومات العميل</h3>
        <p style={styles.text}>👤 {order.customer.name}</p>
        <p style={styles.text}>📞 {order.customer.mobile}</p>
        <p style={styles.text}>📧 {order.customer.email}</p>
        <p style={styles.text}>📍 {order.customer.area}</p>
      </div>

      {/* Order Details */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>تفاصيل الطلب</h3>
        <p style={styles.text}>ID:{order._id}</p>
        {order.items.map((item, index) => (
              <div key={item.id} className="cart-item-mobile">
              <img src={handleProductImage(item.productId)} alt={handleProductName(item.productId)} className="product-image1-mobile" />
              
              <div className="item-details-mobile">
                
                     <div className="item-name-mobile">{handleProductName(item.productId)}</div>
                     <div className="item-price-mobile">₪{handleProductPrice(item.productId)}</div>  
               
             </div> 
           </div>
        ))}
        <p style={styles.text}>💰 السعر الإجمالي: {order.totalPrice} ₪</p>
        <p style={styles.text}>💳 نوع الدفع: {order.paymentType === "cash" ? "نقدي" : "بطاقة"}</p>
        {order.coupon && <p style={styles.text}>🎟️ كود الخصم: {order.coupon}</p>}
        {order.discount > 0 && <p style={styles.text}>🔻 الخصم: {order.discount} ₪</p>}
      </div>

      {/* Order Status */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>حالة الطلب</h3>
        <p style={{ ...styles.status, ...(order.isPaid ? styles.paid : styles.notPaid) }}>
          {order.isPaid ? "✔️ مدفوع" : "❌ غير مدفوع"}
        </p>
        <p style={styles.text}>🕒 تاريخ الإنشاء: {new Date(order.createdAt).toLocaleString("ar-EG")}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#181818",
    color: "#fff",
    padding: "20px",
    borderRadius: "15px",
    width: "80%",
    margin: "20px auto",
    textAlign: "right",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: "24px",
    color: "#A9D15A",
    textAlign: "center",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "15px",
    padding: "15px",
    backgroundColor: "#222",
    borderRadius: "10px",
  },
  sectionTitle: {
    fontSize: "18px",
    color: "#A9D15A",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    color: "#ddd",
    marginBottom: "5px",
  },
  status: {
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px",
    borderRadius: "5px",
    textAlign: "center",
  },
  paid: {
    color: "#4CBC8F",
  },
  notPaid: {
    color: "#E74C3C",
  },
  noOrder: {
    textAlign: "center",
    fontSize: "18px",
    color: "#E74C3C",
    marginTop: "20px",
  },
};

export default OrderSummary;
