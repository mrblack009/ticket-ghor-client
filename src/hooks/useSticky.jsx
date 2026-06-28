import { useState, useEffect } from "react";

const useSticky = (threshold = 80) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // threshold er value dynamic rakha hoyeche (by default 80px)
      if (window.scrollY > threshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function: component unmount hole listener remove hobe
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isSticky;
};

export default useSticky;
