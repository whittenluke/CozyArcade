import { useEffect, useCallback } from 'react';
import { CONTROLS } from '../core/constants';
import type { Direction } from '../core/constants';

type ControlAction = keyof typeof CONTROLS;
type ValidKeyCodes = (typeof CONTROLS)[ControlAction][number];

interface InputHandlers {
  onDirectionChange: (direction: Direction) => void;
  onPause: () => void;
}

export function useInput({ onDirectionChange, onPause }: InputHandlers, isEnabled: boolean = true) {
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
      if ((CONTROLS.PAUSE as readonly string[]).includes(code)) {
        event.preventDefault();
        onPause();
        return;
      }

      // Other commands only work when enabled
      if (!isEnabled) return;

      // Prevent default behavior for game controls
      event.preventDefault();

      // Map key codes to directions using type-safe checks
      const directionMap: Record<ValidKeyCodes, Direction | undefined> = {
        'ArrowUp': 'UP',
        'KeyW': 'UP',
        'ArrowDown': 'DOWN',
        'KeyS': 'DOWN',
        'ArrowLeft': 'LEFT',
        'KeyA': 'LEFT',
        'ArrowRight': 'RIGHT',
        'KeyD': 'RIGHT',
        'KeyP': undefined,
        'Escape': undefined
      };

      const direction = directionMap[code];
      if (direction) {
        onDirectionChange(direction);
      }
    },
    [onDirectionChange, onPause, isEnabled]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
