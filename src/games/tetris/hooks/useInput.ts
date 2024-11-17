import { useEffect, useCallback } from 'react';
import { CONTROLS } from '../core/constants';

type ControlAction = keyof typeof CONTROLS;
type ValidKeyCodes = (typeof CONTROLS)[ControlAction][number];

export function useInput(callback: (input: ControlAction) => void, isEnabled: boolean = true) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const code = event.code;

      // Type guard to check if a code is a valid key code
      const isValidKeyCode = (code: string): code is ValidKeyCodes => {
        return Object.values(CONTROLS).some(keys => 
          (keys as readonly string[]).includes(code)
        );
      };

      if (!isValidKeyCode(code)) return;

      // Always allow pause commands, regardless of enabled state
      const isPauseKey = CONTROLS.PAUSE.includes(code as typeof CONTROLS['PAUSE'][number]);
      if (isPauseKey) {
        event.preventDefault();
        callback('PAUSE');
        return;
      }

      // Other commands only work when enabled
      if (!isEnabled) return;

      // Prevent default behavior for game controls
      event.preventDefault();

      // Check which control was pressed
      (Object.entries(CONTROLS) as [ControlAction, readonly ValidKeyCodes[]][]).forEach(
        ([action, keys]) => {
          if (keys.includes(code as ValidKeyCodes)) {
            callback(action);
          }
        }
      );
    },
    [callback, isEnabled]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
