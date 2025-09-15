import React, { useRef, useState, useEffect } from "react";
import "./ProductList.css"; // Import the CSS file
import { useDispatch } from "react-redux";
import { setMainProduct } from "../../store/Products/ProductsSlice";

const ProductList = ({ products }) => {
  const dispatch=useDispatch();

  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(products.length > 5);

  useEffect(() => {
    updateArrows();
  }, [products]);

  const updateArrows = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust scroll distance as needed
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(updateArrows, 300); // Update arrows after scrolling
    }
  };

  const selectMainProduct=(value)=>{
    dispatch(setMainProduct(value))
  }

  return (
    <div className="product-list-container">
      {/* {showLeftArrow && (
        <div className="arrow left-arrow" onClick={() => scroll("left")} />
      )} */}

      <div className="products-wrapper" ref={scrollContainerRef} onScroll={updateArrows}>
        {products.map((product, index) => (
          <div className="product-item" key={index}      
          onMouseEnter={() => selectMainProduct(product)}
         >
            <img src={product.image2} alt={product.name} className="product-image"  onClick={()=>selectMainProduct(product)}/>
          </div>
        ))}
      </div>

      {/* {showRightArrow && (
        <div className="arrow right-arrow" onClick={() => scroll("right")} />
      )} */}
    </div>
  );
};

export default ProductList;
