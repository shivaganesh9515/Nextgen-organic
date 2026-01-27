import { ComponentProps } from 'react';
import { MotiPressable } from 'moti/interactions';
import { useMemo } from 'react';

// Wrap MotiPressable to create a reusable component
// We use useMemo to optimize animation config
export function AnimatedPressable({ 
  style, 
  children, 
  onPress,
  scale = 0.95,
  className,
  ...props 
}: ComponentProps<typeof MotiPressable> & { scale?: number, className?: string }) {
  
  const interactionState = useMemo(() => ({
    from: {
      scale: 1,
    },
    animate: ({ pressed }: { pressed: boolean }) => {
      'worklet';
      return {
        scale: pressed ? scale : 1,
      };
    },
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 250,
    } as const,
  }), [scale]);

  return (
    <MotiPressable
      {...props}
      onPress={onPress}
      animate={interactionState.animate}
      from={interactionState.from}
      transition={interactionState.transition}
      style={style}
    >
      {children}
    </MotiPressable>
  );
}
