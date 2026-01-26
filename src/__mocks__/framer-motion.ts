// Mock Framer Motion to skip animations in tests
export const motion = {
  div: ({ children, ...props }: any) => {
    const React = require('react');
    return React.createElement('div', props, children);
  },
  span: ({ children, ...props }: any) => {
    const React = require('react');
    return React.createElement('span', props, children);
  },
  button: ({ children, ...props }: any) => {
    const React = require('react');
    return React.createElement('button', props, children);
  },
  section: ({ children, ...props }: any) => {
    const React = require('react');
    return React.createElement('section', props, children);
  },
  article: ({ children, ...props }: any) => {
    const React = require('react');
    return React.createElement('article', props, children);
  },
  h1: ({ children, ...props }: any) => {
    const React = require('react');
    return React.createElement('h1', props, children);
  },
  h2: ({ children, ...props }: any) => {
    const React = require('react');
    return React.createElement('h2', props, children);
  },
  h3: ({ children, ...props }: any) => {
    const React = require('react');
    return React.createElement('h3', props, children);
  },
  p: ({ children, ...props }: any) => {
    const React = require('react');
    return React.createElement('p', props, children);
  },
  img: (props: any) => {
    const React = require('react');
    return React.createElement('img', props);
  },
  ul: ({ children, ...props }: any) => {
    const React = require('react');
    return React.createElement('ul', props, children);
  },
  li: ({ children, ...props }: any) => {
    const React = require('react');
    return React.createElement('li', props, children);
  },
  a: ({ children, ...props }: any) => {
    const React = require('react');
    return React.createElement('a', props, children);
  },
};

export const AnimatePresence = ({ children }: any) => {
  const React = require('react');
  return React.createElement(React.Fragment, null, children);
};
