import { useState, useCallback } from 'react';

export default function useCurrencyFormatter(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const isValid = useCallback((input: string): boolean => {
    const isNumber = /^-?\d*\.?\d*$/.test(input);
    const inputSplit = input.split('.');
    const alreadyHasPoint = inputSplit.length - 1;
    const decimals = alreadyHasPoint ? inputSplit[1].length : 0;

    return isNumber && alreadyHasPoint <= 1 && decimals <= 2;
  }, []);

  const setCurrency = useCallback((input: string) => {
    if (!isValid(input)) return;
    
    setValue(input);
  }, [isValid]);

  return [
    value,
    setCurrency
  ] as const;
}