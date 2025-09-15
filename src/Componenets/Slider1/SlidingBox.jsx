import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const SlidingBox = ({ products, index, selectMainProduct }) => {
  const rootState = useSelector((state) => state);
  const product = rootState.product.mainProduct;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [activeIndex, setActiveIndex] = useState(index || 0);

  const handleClick = (newIndex) => {
    if (newIndex !== activeIndex && newIndex>=0) {
      setActiveIndex(newIndex);
      selectMainProduct(products[newIndex], newIndex);
    }
  };

  useEffect(() => {
    const indexTemp=products?.findIndex(a=>a.name!==product?.name);
    setActiveIndex(indexTemp);
    // handleClick(products?.findIndex(a=>a.name!==product?.name));
    console.log("dsjakhjkdsa",products?.findIndex(a=>a.name!==product?.name))
  }, [index,product]);


  if (!product) return null;

  const boxWidth = isMobile ? '50%' : '50%';

  return (
    <div style={isMobile ? styles.containermobile : styles.container}>
      {/* Sliding highlight */}
      <motion.div
        animate={{ x: `${activeIndex * 100}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          ...styles.slider,
          width: boxWidth,
          height: isMobile ? '30px' : '40px',
        }}
      />

      {/* Text labels */}
      {products.slice(0, 2).map((item, i) => (
        <div
          key={item.name}
          onClick={() => handleClick(i)}
          style={isMobile ? styles.textContainerMobile : styles.textContainer}
        >
          <span
            style={i === activeIndex ? styles.activeText : styles.inactiveText}
          >
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SlidingBox;
const styles = {
  container: {
    width: '84%',
    height: '50px',
    padding: '4px',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  containermobile: {
    width: '90%',
    height: '40px',
    padding: '4px',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
    marginTop: 20,
  },
  slider: {
    position: 'absolute',
    top: '4px',
    left: '0%',
    background: 'linear-gradient(90deg, #62cc90, #4cbc8f)',
    borderRadius: '30px',
    zIndex: 1,
  },
  textContainer: {
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 2,
  },
  textContainerMobile: {
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 2,
    color:"white"
  },
  activeText: {
    fontFamily: 'Tajawal',
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    zIndex: 2,
  },
  inactiveText: {
    fontFamily: 'Tajawal',
    fontSize: 20,
    fontWeight: '500',
    color: '#1c1c1c',
    zIndex: 2,
  },
};
