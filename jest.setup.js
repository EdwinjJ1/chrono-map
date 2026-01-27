import '@testing-library/jest-dom'

// Suppress React warnings about unknown props (Framer Motion props in test environment)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('whileInView')) {
      return;
    }
    if (typeof args[0] === 'string' && args[0].includes('unknown prop')) {
      return;
    }
    if (typeof args[0] === 'string' && args[0].includes('while')) {
      return;
    }
    if (typeof args[0] === 'string' && args[0].includes('initial')) {
      return;
    }
    if (typeof args[0] === 'string' && args[0].includes('animate')) {
      return;
    }
    if (typeof args[0] === 'string' && args[0].includes('transition')) {
      return;
    }
    if (typeof args[0] === 'string' && args[0].includes('viewport')) {
      return;
    }
    if (typeof args[0] === 'string' && args[0].includes('exit')) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
