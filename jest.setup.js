import '@testing-library/jest-dom'
import messages from './src/i18n/messages/en.json'

const getMessage = (namespace, key) => {
  const namespaceValue = namespace
    ? namespace.split('.').reduce((acc, part) => acc?.[part], messages)
    : messages;

  return key.split('.').reduce((acc, part) => acc?.[part], namespaceValue) ?? key;
};

jest.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }) => children,
  useLocale: () => 'en',
  useTranslations: (namespace) => (key) => getMessage(namespace, key),
}));

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
