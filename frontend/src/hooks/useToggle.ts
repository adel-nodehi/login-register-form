import { useState } from "react";

type useToggleType = boolean;

/**
 * @param initialState boolean
 * @returns [value, toggleValue]
 */
const useToggle = (
  initialState: useToggleType = false,
): [useToggleType, () => void] => {
  const [value, setValue] = useState<useToggleType>(initialState);

  const toggleValue = () => {
    setValue((prev) => !prev);
  };

  return [value, toggleValue];
};

export default useToggle;
