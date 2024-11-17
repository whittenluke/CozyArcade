import { useEffect, useCallback } from 'react';
import { CONTROLS } from '../core/constants';

type InputCallback = (input: keyof typeof CONTROLS) => void;
type KeyCode = (typeof CONTROLS)[keyof typeof CONTROLS][number];

export function useInput(callback: InputCallback, isEnabled: boolean = true) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isEnabled) return;

      const code = event.code as KeyCode;

      // Prevent default behavior for game controls
      if (Object.values(CONTROLS).flat().includes(code)) {
        event.preventDefault();
      }

      // Check which control was pressed
      for (const [action, keys] of Object.entries(CONTROLS)) {
        if ([...keys].includes(code)) {
          callback(action as keyof typeof CONTROLS);
          break;
        }
      }
    },
    [callback, isEnabled]
  );

  useEffect(() => {
    if (isEnabled) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, isEnabled]);
}
