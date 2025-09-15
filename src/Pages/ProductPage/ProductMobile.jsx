import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../store/cart/CartSlice";
import "./ProductMobile.css";
import { IconButton } from "@mui/material";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

export default function ProductMobile() {
  const dispatch=useDispatch();
    const rootState = useSelector((state) => state);
    const location=useLocation();
    const navigate=useNavigate();
  const {product,isMain} = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);

  // If no ingredients, show a message
  const ingredientsExist = product.ingredientsIds.length > 0;
  const totalIngredients = product.ingredientsIds.length;

  // Navigation Handlers
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < totalIngredients - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : totalIngredients - 1
    );
  };

  
    const handleAddToCart=()=>{
        dispatch(addProduct( rootState.product.mainProduct._id));
        if(!isMain){
          navigate("/store")
          }
          else{
            navigate("/")
          }
    }

  return (
    <div className="product-container1">
              <IconButton
                onClick={() =>{
                  if(!isMain){
                  navigate("/store")
                  }
                  else{
                    navigate("/")
                  }
                } }
                sx={{ position: 'absolute', top: 25, left: 30 }}
                aria-label="close drawer"
              >
                 <img src={require("../../assets/images/greenClose.png")} alt={"close button"} style={{width:40}} />
              </IconButton>
    {/* Image + Title + Description Section */}
    <div className="product-header1">
      {/* Product Image */}
      <div className="product-image1">
        <img src={product.image} alt={product.title} />
      </div>

      {/* Product Info */}
      <div className="product-info11">
        <h1 className="product-title1">{product.title}</h1>
        <p className="product-main-description1">{product.mainDescription}</p>

        {product.extraDescription && (
          <p className="product-extra-description1">{product.extraDescription}</p>
        )}
      </div>
    </div>

    {/* How to Use Section */}
    <div className="product-info11">
    <h1 className="product-title1">{"كيفية الاستعمال"}</h1>
        <p className="product-main-description1">{product.howToUseInfo}</p>
    </div>
    {/* Ingredients Carousel */}
    <div className="ingredients-carousel1">
    <h1 className="product-title1">المكونات</h1>
      {ingredientsExist ? (
        <div className="carousel-container1">
           <button className="carousel-btn1 right" onClick={handleNext}>▶</button>
          <div className="ingredient-item">{product.ingredientsIds[currentIndex].ingredientName}</div>
          <div className="ingredient-item1">{product.ingredientsIds[currentIndex].ingredientDescription}</div>
          <button className="carousel-btn1 left" onClick={handlePrev}>◀</button>
        </div>
      ) : (
        <p className="no-ingredients1">No ingredients listed.</p>
      )}
    </div>

    {/* Price & Add to Cart */}
    <button className="add-to-cart1" onClick={handleAddToCart}>الشراء {product.price}₪</button>
  </div>
  );
}
