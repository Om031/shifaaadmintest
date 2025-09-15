import React,{useState,useEffect} from "react";
import SlidingBox from "../Slider1/SlidingBox";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./ProductListMobile.css"; // Your existing CSS file
import { useDispatch } from "react-redux";
import { setMainProduct } from "../../store/Products/ProductsSlice";
import { useSelector } from "react-redux";




const ProductListMobile = ({ products }) => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const rootState = useSelector((state) => state);
  const product = rootState.product.mainProduct;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const selectMainProduct = (product,index) => {
    dispatch(setMainProduct(product));
    setCurrentIndex(index)
  };

  useEffect(()=>{
    if(products[currentIndex]){
    selectMainProduct(products[currentIndex])
    }
  },[currentIndex])

  return (
    <div style={isMobile? styles.containerMobile:styles.container}>

          {/* <button style={styles.leftButton} onClick={prevSlide}>
              ❯
            </button> */}

              <div
                className="product-item2"
                // onMouseEnter={() => selectMainProduct(products[currentIndex])}
              >
                <img
                  src={products[0]?.image2}
                  alt={products[0]?.name}
                  className={`product-image2 ${products[0]?.name===product?.name? "product-image-active":""}`}
                  onClick={() => selectMainProduct(products[0],0)}
                />

                <img
                  src={products[1]?.image2}
                  alt={products[1]?.name}
                  className={`product-image2 ${products[1]?.name===product?.name? "product-image-active":""}`}
                  onClick={() => selectMainProduct(products[1],1)}
                />
              </div>
              <SlidingBox products={products} selectMainProduct={selectMainProduct} index={currentIndex}/>
         
          
          {/* <button style={styles.rightButton} onClick={nextSlide}>
          ❮
          </button> */}


    </div>
  );
};

export default ProductListMobile;


const styles = {
  container: {
    display: "flex",
    alignItems:"center",
    flexDirection:"column",
    justifyContent: "center",
    width: "100%",
    height: "340px",
    // margin: "auto",
    overflow: "hidden",
    // borderRadius: "10px",
    // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)"
   
  },
  containerMobile: {
    display: "flex",
    alignItems:"center",
    flexDirection:"column",
    justifyContent: "center",
    width: "100%",
    height: "280px",
    // margin: "auto",
    overflow: "hidden",
    // borderRadius: "10px",
    // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)"
   
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    transition: "transform 0.5s ease-in-out",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    objectFit: "cover",
  },
  leftButton: {
    position: "absolute",
    left: "10px",
    background: "rgba(0,0,0,0.5)",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "24px",
    borderRadius: "50%",
  },
  rightButton: {
    position: "absolute",
    right: "10px",
    background: "rgba(0,0,0,0.5)",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "24px",
    borderRadius: "50%",
  },
};
