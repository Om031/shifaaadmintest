import React,{useState,useEffect} from "react";
import "./GreenZoneMobile.css";
import { motion,AnimatePresence  } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { BENEFITS_1,BENEFITS_2 } from "../../constants/callouts";
import ProductPage from "../../Pages/ProductPage/Product";
import { useTranslation } from "react-i18next";
import Imgix from "react-imgix";
import { useNavigate } from "react-router-dom";
import { FiInfo, FiX } from "react-icons/fi";


export default function GreenZoneMobile() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
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
    
   
     

        <motion.div className="left-side-mobile"
          animate={{ width: expanded ? "100vw" : "30vw" }}
          transition={{ duration: 0.5, ease: "easeInOut",  background: { duration: 2, ease: "easeInOut" }, }}
        >

      
  


    
        <motion.div
          key={imageSrc}
          className="free-pill-bottle-mockup1-mobile2"
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
        <div className="rec-all">
        {!expanded && (
          <motion.div
            className="rectangle-share-mobile1"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="share-mobile1">
              {isRashaqa ? BENEFITS_1[0][i18n.language] : BENEFITS_2[0][i18n.language]}
            </span>
          </motion.div>
        )}

        {!expanded && (
          <motion.div
            className={`rectangle-mid-mobile1`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span
              className="share-mobile1"
              dangerouslySetInnerHTML={{
                __html: isRashaqa ? BENEFITS_1[1][i18n.language] : BENEFITS_2[1][i18n.language],
              }}
            />
          </motion.div>
        )}

        {!expanded && (
          <motion.div
            className="rectangle-hit-mobile1"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span
              className="share-mobile1"
              dangerouslySetInnerHTML={{
                __html: isRashaqa ? BENEFITS_1[2][i18n.language] : BENEFITS_2[2][i18n.language],
              }}
            />
          </motion.div>
        )}
          <div className="seeMore"     onClick={()=>      navigate("/product", {state: {
          product:rootState.product.mainProduct,
          isMain:true
        },})}
        >
           <FiInfo size={20} />
          </div>
        </div>
              <img src={imageSrc} alt="product" className="free-pill-bottle-mockup1-mobile" />
            </motion.div>
            {expanded && (
              <ProductPage/>
            )}

        </motion.div>

    

  

   

      
     
    
  );
}
