import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../store/cart/CartSlice";
import "./Product.css";

export default function ProductPage() {
  const dispatch=useDispatch();
    const rootState = useSelector((state) => state);
  const product= rootState.product.mainProduct;
  const [showIngredients, setShowIngredients] = useState(false);

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
        console.log("dajkshfjk")
        dispatch(addProduct( rootState.product.mainProduct._id));
      
    }

  return (
    <div className="product-container">
    

      {/* Product Information */}
      <div className="product-info">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-main-description">{product.mainDescription}</p>

        {/* Extra Description */}
        {product.extraDescription && (
          <p className="product-extra-description">{product.extraDescription}</p>
        )}

        {/* How to Use */}
     
        <h1 className="product-title">{"كيفية الاستعمال"}</h1>
        <p className="product-main-description">{product.howToUseInfo}</p>
 
       

        {/* Ingredients Section with Accordion Effect */}
        {/* Ingredients Carousel */}
        <div className="ingredients-carousel">
        <h1 className="product-title">المكونات</h1>
          {ingredientsExist ? (
            <div className="carousel-container">
        

              <div className="ingredient-item">{product.ingredientsIds[currentIndex].ingredientName}</div>
              <div className="ingredient-item">{product.ingredientsIds[currentIndex].ingredientDescription}</div>

              <button className="carousel-btn right" onClick={handleNext}>
                ▶
              </button>
           
              <button className="carousel-btn left" onClick={handlePrev}>
                ◀
              </button>
            </div>
          ) : (
            <p className="no-ingredients">قريبا سنعرضها</p>
          )}
        </div>


        {/* Add to Cart Button */}
        <button className="add-to-cart2" onClick={()=>handleAddToCart()}>الشراء {product.price}₪</button>
      </div>
    </div>
  );
}
