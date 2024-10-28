import { useState } from "react";
export default function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event) => {
    if (event && event.target) {
      setValue(event.target.value);
    }
  };

  return [value, handleChange];
}
