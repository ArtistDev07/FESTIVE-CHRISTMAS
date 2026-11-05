import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'fade-right' | 'fade-left' | 'scale-up';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  as?: React.ElementType;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.15,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Use IntersectionObserver for performant viewport detection
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion, threshold]);

  if (prefersReducedMotion) {
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }

  // Animation initial and active states
  const getTransformStyles = () => {
    if (isVisible) {
      return 'opacity-100 translate-x-0 translate-y-0 scale-100';
    }

    switch (animation) {
      case 'fade-up':
        return 'opacity-0 translate-y-8';
      case 'fade-left':
        return 'opacity-0 -translate-x-8';
      case 'fade-right':
        return 'opacity-0 translate-x-8';
      case 'scale-up':
        return 'opacity-0 scale-95 translate-y-4';
      case 'fade-in':
      default:
        return 'opacity-0';
    }
  };

  return (
    <Component
      ref={elementRef}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out ${getTransformStyles()} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
