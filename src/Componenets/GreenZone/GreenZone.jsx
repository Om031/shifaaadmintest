import React,{useState,useEffect} from "react";
import "./GreenZone.css";
import { motion,AnimatePresence  } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setIsPageExpand } from "../../store/Products/ProductsSlice";
import { FiInfo, FiX } from "react-icons/fi";
import ProductPage from "../../Pages/ProductPage/Product";
import { useTranslation } from "react-i18next";
import { BENEFITS_1,BENEFITS_2 } from "../../constants/callouts";
import Imgix from "react-imgix";

export default function GreenZone() {
  const dispatch=useDispatch();
  const rootState = useSelector((state) => state);
  const [animate, setAnimate] = useState(false);
  const imageSrc = rootState.product.mainProduct?.image;
  const isRashaqa = rootState.product.mainProduct?._id==="67dc679c3c1404ad4cc71b01";
  const expanded=rootState.product.isPageExpand
  
  const { t, i18n } = useTranslation();

  useEffect(() => {
   
    if (!imageSrc) return; // Avoid animation on initial load when image is empty

    // Trigger animation when image changes
    setAnimate(true);

    // Remove animation after it completes
    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 500); // Matches animation duration

    return () => clearTimeout(timeout);
  }, [imageSrc]); 

  return (
    
      <div className="flex-row-d2">
     
      {/* "See More" Button */}
      <motion.div
        className="see-more"
        whileHover={{ scale: 1.1 }}
        animate={{ left: expanded ?"100px":"25vw" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => dispatch(setIsPageExpand(!rootState.product.isPageExpand))}
      >
          {/* <span>{expanded ? "" : i18n.options.resources[i18n.language].greenZone.info }</span> */}
           {expanded ? <FiX size={20} /> : <FiInfo size={20} />}
         
      </motion.div>
  
        <motion.div className="left-side"
          animate={{ width: expanded ? "100vw" : "30vw" ,zIndex:11}}
          transition={{ duration: 0.5, ease: "easeInOut",  background: { duration: 2, ease: "easeInOut" }, }}
        >

                {/* Smooth Background Overlay */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="background-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>


         {!expanded && (
          <div className="rectangle-share">
            
            <span className="share">{isRashaqa? BENEFITS_1[0][i18n.language]:BENEFITS_2[0][i18n.language] } </span>
            
          </div>
          )}
          <div className="vector" />
          {!expanded && (
           <div className={`rectangle-mid ${ animate? "rectangle-mid2":""}`}>
            <span className="share" dangerouslySetInnerHTML={{ __html:  isRashaqa? BENEFITS_1[1][i18n.language]:BENEFITS_2[1][i18n.language]  }}>
           
            
           
            </span>
          </div>
          )}
          {/*<div className="vector-2" />
          <div className="vector-3" /> */}
          <motion.div
          key={imageSrc} // This re-triggers animation on image change
          className="free-pill-bottle-mockup1"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
           {/* <Imgix src={imageSrc} sizes="100vw" className="free-pill-bottle-mockup1-mobile" /> */}
          <img src={imageSrc} alt="product" className="free-pill-bottle-mockup1" />
          {!expanded && (
          <div className="rectangle-hit">
            <div className="share"  dangerouslySetInnerHTML={{ __html:  isRashaqa? BENEFITS_1[2][i18n.language]:BENEFITS_2[2][i18n.language]  }}/>
          </div>
          )}
        </motion.div>
        {expanded && (
          <ProductPage/>
        )}

        </motion.div>

          
  

      </div>

      
     
    
  );
}
