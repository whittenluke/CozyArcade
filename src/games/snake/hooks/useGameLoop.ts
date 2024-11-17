import { useEffect, useRef, useCallback } from 'react';

interface GameLoopOptions {
  onTick: () => void;
  speed: number;
  isPlaying: boolean;
}

export function useGameLoop({ onTick, speed, isPlaying }: GameLoopOptions) {
  const frameRef = useRef<number>();
  const lastTickRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);

  const tick = useCallback((timestamp: number) => {
    if (!lastTickRef.current) {
      lastTickRef.current = timestamp;
      lastFrameTimeRef.current = timestamp;
    }

    const elapsed = timestamp - lastTickRef.current;

    // Update game state at fixed intervals
    if (elapsed >= speed) {
      onTick();
      lastTickRef.current = timestamp - (elapsed % speed); // Maintain timing accuracy
    }

    lastFrameTimeRef.current = timestamp;

    if (isPlaying) {
      frameRef.current = requestAnimationFrame(tick);
    }
  }, [onTick, speed, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      frameRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isPlaying, tick]);
}
