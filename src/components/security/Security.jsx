import { useEffect } from 'react';

const Security = () => {
  useEffect(() => {
    if (window.top !== window.self) {
      window.top.location = window.self.location;
    }
  }, []);

  return null; // This component doesn't render anything
};

export default Security;