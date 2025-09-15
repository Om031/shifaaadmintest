import React from 'react';
import Lottie from 'lottie-react';
import './EidLottieAnimations.css';
import eidMubarakAnimation from '../../assets/lottie/eid.json';
import eidMubarakAnimation2 from '../../assets/lottie/eid2.json';
// Import Lottie JSON files


const discountAnimation = {
  "v": "5.7.4",
  "fr": 29.9700012207031,
  "ip": 0,
  "op": 180.00000733155,
  "w": 200,
  "h": 200,
  "nm": "Discount",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Percentage",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [100, 100, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": {
          "a": 1,
          "k": [
            {
              "i": { "x": [0.833, 0.833, 0.833], "y": [0.833, 0.833, 0.833] },
              "o": { "x": [0.167, 0.167, 0.167], "y": [0.167, 0.167, 0.167] },
              "t": 0,
              "s": [80, 80, 100]
            },
            {
              "t": 90.0000036657751,
              "s": [120, 120, 100]
            }
          ]
        }
      },
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ty": "tx",
              "s": { "a": 0, "k": 60 },
              "f": { "a": 0, "k": "Tajawal" },
              "t": "20%",
              "j": 2,
              "tr": 0,
              "lh": 72,
              "ls": 0,
              "fc": [0.662745098039, 0.819607843137, 0.352941176471]
            }
          ],
          "nm": "Percentage Text"
        }
      ]
    }
  ]
};

export default function EidLottieAnimations() {
  return (
    <div className="lottie-container">
      {/* <div className="lottie-eid">
        <Lottie
          animationData={eidMubarakAnimation}
          loop={true}
          autoplay={true}
        />
      </div> */}

      <div className="lottie-discount">
        <Lottie
          animationData={discountAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
      <div className="lottie-eid">
        <Lottie
          animationData={eidMubarakAnimation2}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  );
} 