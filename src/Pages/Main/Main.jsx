import React, { useState } from 'react';
import EidPopup from '../../components/EidPopup/EidPopup';

// ... other imports ...

export default function Main() {
  const [showEidPopup, setShowEidPopup] = useState(true);

  const handleCloseEidPopup = () => {
    setShowEidPopup(false);
  };

  return (
    <div>
      <EidPopup open={showEidPopup} onClose={handleCloseEidPopup} />
      {/* ... rest of the Main page content ... */}
    </div>
  );
} 