import { useEffect, useRef, useCallback } from 'react';

interface GameLoopOptions {
  onTick: () => void;
  speed: number;
  isPlaying: boolean;
}

export function useGameLoop({ onTick, speed, isPlaying }: GameLoopOptions) {
  const frameRef = useRef<number>();
  const lastTickRef = useRef<number>(0);

  const tick = useCallback((timestamp: number) => {
    if (!lastTickRef.current) lastTickRef.current = timestamp;

    const elapsed = timestamp - lastTickRef.current;

    if (elapsed > speed) {
      onTick();
      lastTickRef.current = timestamp;
    }

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
