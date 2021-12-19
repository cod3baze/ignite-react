import React, { useEffect, useState } from "react";

export function Async() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true);
    }, 1000);
  }, []);

  return (
    <div>
      <h1>hello world</h1>
      {isButtonVisible && <button type="button">Button</button>}
    </div>
  );
}
