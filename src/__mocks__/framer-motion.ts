import React, { type ReactNode, type HTMLAttributes, type ImgHTMLAttributes } from 'react';

type MotionTag =
  | 'div'
  | 'span'
  | 'button'
  | 'section'
  | 'article'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'p'
  | 'ul'
  | 'li'
  | 'a';

type MotionProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
};

type MotionImageProps = ImgHTMLAttributes<HTMLImageElement>;

function createMotionElement(tag: MotionTag) {
  return function MotionElement({ children, ...props }: MotionProps) {
    return React.createElement(tag, props, children);
  };
}

function MotionImage(props: MotionImageProps) {
  return React.createElement('img', props);
}

// Mock Framer Motion to skip animations in tests.
export const motion = {
  div: createMotionElement('div'),
  span: createMotionElement('span'),
  button: createMotionElement('button'),
  section: createMotionElement('section'),
  article: createMotionElement('article'),
  h1: createMotionElement('h1'),
  h2: createMotionElement('h2'),
  h3: createMotionElement('h3'),
  p: createMotionElement('p'),
  img: MotionImage,
  ul: createMotionElement('ul'),
  li: createMotionElement('li'),
  a: createMotionElement('a'),
};

export function AnimatePresence({ children }: { children?: ReactNode }) {
  return React.createElement(React.Fragment, null, children);
}

export function useInView() {
  return true;
}

type MotionListener = (value: number) => void;

export function useMotionValue(initialValue: number) {
  let currentValue = initialValue;
  const listeners = new Set<MotionListener>();

  return {
    get: () => currentValue,
    set: (value: number) => {
      currentValue = value;
      listeners.forEach((listener) => listener(value));
    },
    on: (eventName: string, listener: MotionListener) => {
      if (eventName === 'change') {
        listeners.add(listener);
      }

      return () => listeners.delete(listener);
    },
  };
}

export function useTransform(
  motionValue: { get: () => number; on: (eventName: string, listener: MotionListener) => () => void },
  transformer: (value: number) => number
) {
  return {
    on: (eventName: string, listener: MotionListener) => {
      if (eventName === 'change') {
        listener(transformer(motionValue.get()));
      }

      return motionValue.on(eventName, (value) => listener(transformer(value)));
    },
  };
}

export function animate(
  motionValue: { set: (value: number) => void },
  target: number
) {
  motionValue.set(target);

  return {
    stop: () => undefined,
  };
}
