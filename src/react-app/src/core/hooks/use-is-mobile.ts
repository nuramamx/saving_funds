import { useEffect, useState } from "react";

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Mobi|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };

    checkMobile();

    // Optionally, listen for changes (if using matchMedia)
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export default useIsMobile;