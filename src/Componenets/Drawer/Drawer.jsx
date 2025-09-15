import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ModernCart from '../../components/ModernCart/ModernCart';
import FormComponent from '../OrderForm/OrderForm';
import IframeComponent from '../Iframe/Web';
import { useSelector } from 'react-redux';

export default function AnchorTemporaryDrawer({openDrawer,setOpenDrawer}) {
  const rootState = useSelector((state) => state);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [step,setStep]=React.useState(1);

  const toggleDrawer = (anchor, open) => {
    setState({ ...state, [anchor]: open });
    if(!open){
      setOpenDrawer(false);
    }
  };

  React.useEffect(()=>{
    toggleDrawer("right",openDrawer);
  },[openDrawer])

  function getTotalQuantity() {
    let sum=0;
     rootState?.cart?.cart?.forEach(element => {
      sum+=element.quantity
    });
    return sum;
   }

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : { xs: '100vw', sm: '90vw', md: '60vw', lg: '50vw' },
        maxWidth: { xs: '100vw', sm: '500px', md: '600px', lg: '700px' },
        height: '100vh',
        position: 'relative',
        backgroundColor:"#1c1c1c",
        overflow:"auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        p: { xs: 1, sm: 2 },
      }}
      role="presentation"
    >
      {/* Close Button in the top left */}
      <IconButton
        onClick={() => toggleDrawer(anchor, false)}
        sx={{ position: 'absolute', top: 10, left: 10 }}
        aria-label="close drawer"
      >
        <CloseIcon />
      </IconButton>
      {/* Add a top margin to avoid overlapping the close button */}
      <Box sx={{ mt: 6 }}>
        {step===2 && (
        <FormComponent setStep={setStep} step={step}/>
        )}

        {step===1 && (
          <ModernCart 
            onClose={() => toggleDrawer(anchor, false)}
            onContinue={() => setStep(2)}
          />
        )}
        {step===3&&(
          <IframeComponent src={rootState.cart.creditUrl}/>
        )}
      </Box>
    </Box>
  );

  return (
    <div>
      {(['right']).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={() => toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
