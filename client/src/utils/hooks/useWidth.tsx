import React from "react";

function useWidth(): number {
  const [width, setWidth] = React.useState<number>(window.innerWidth);

  const changeWidth = () => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", changeWidth);
    return () => window.removeEventListener("resize", changeWidth);
  }, []);

  return width;
}

export default useWidth;
