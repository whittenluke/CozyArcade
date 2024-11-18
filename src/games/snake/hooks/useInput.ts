import { useEffect, useCallback, useRef } from 'react';
import { CONTROLS } from '../core/constants';
import type { Direction } from '../core/constants';

type ControlAction = keyof typeof CONTROLS;
type ValidKeyCodes = (typeof CONTROLS)[ControlAction][number];

interface InputHandlers {
  onDirectionChange: (direction: Direction) => void;
  onPause: () => void;
}

interface TouchPosition {
  x: number;
  y: number;
}

export function useInput({ onDirectionChange, onPause }: InputHandlers, isEnabled: boolean = true) {
  const touchStartRef = useRef<TouchPosition | null>(null);
  const minSwipeDistance = 30; // minimum distance for a swipe

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

  // Touch controls
  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (!isEnabled) return;
    
    // Prevent default to stop page scrolling/pulling
    event.preventDefault();
    
    const touch = event.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY
    };
  }, [isEnabled]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    // Prevent default to stop page scrolling/pulling
    event.preventDefault();
  }, []);

  const handleTouchEnd = useCallback((event: TouchEvent) => {
    if (!isEnabled || !touchStartRef.current) return;

    // Prevent default to stop page scrolling/pulling
    event.preventDefault();

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    
    // Only handle if movement is greater than minimum distance
    if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
      return;
    }

    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      onDirectionChange(deltaX > 0 ? 'RIGHT' : 'LEFT');
    } else {
      // Vertical swipe
      onDirectionChange(deltaY > 0 ? 'DOWN' : 'UP');
    }

    touchStartRef.current = null;
  }, [isEnabled, onDirectionChange]);

  // Set up event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleKeyDown, handleTouchStart, handleTouchMove, handleTouchEnd]);
}
