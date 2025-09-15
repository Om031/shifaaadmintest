import React, { useState } from 'react';
import EidPopup from './components/EidPopup/EidPopup';

function App() {
  const [showEidPopup, setShowEidPopup] = useState(true);

  const handleCloseEidPopup = () => {
    setShowEidPopup(false);
  };

  return (
    <>
      <EidPopup open={showEidPopup} onClose={handleCloseEidPopup} />
      {/* ... rest of your app components ... */}
    </>
  );
}

export default App; 