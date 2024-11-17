import { useEffect, useRef, useCallback } from 'react';
import { SPEEDS } from '../core/constants';

interface GameLoopOptions {
  onTick: () => void;
  isPlaying: boolean;
  level: number;
  isSoftDropping?: boolean;
}

export function useGameLoop({ 
  onTick, 
  isPlaying, 
  level, 
  isSoftDropping = false 
}: GameLoopOptions) {
  const frameRef = useRef<number>();
  const lastTickRef = useRef<number>(0);

  const getTickInterval = useCallback(() => {
    if (isSoftDropping) return SPEEDS.SOFT_DROP;
    // Decrease interval as level increases
    return SPEEDS.START * Math.pow(SPEEDS.SPEED_INCREASE_PER_LEVEL, level - 1);
  }, [level, isSoftDropping]);

  const tick = useCallback((timestamp: number) => {
    if (!lastTickRef.current) lastTickRef.current = timestamp;

    const elapsed = timestamp - lastTickRef.current;
    const interval = getTickInterval();

    if (elapsed > interval) {
      onTick();
      lastTickRef.current = timestamp;
    }

    if (isPlaying) {
      frameRef.current = requestAnimationFrame(tick);
    }
  }, [onTick, isPlaying, getTickInterval]);

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
