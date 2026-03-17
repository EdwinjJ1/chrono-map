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

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/en',
}));

// Suppress React warnings about unknown props (Framer Motion props in test environment)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    const message = args.map((arg) => String(arg)).join(' ');

    if (message.includes('whileInView') || message.includes('whileinview')) {
      return;
    }
    if (message.includes('unknown prop')) {
      return;
    }
    if (message.includes('while')) {
      return;
    }
    if (message.includes('initial')) {
      return;
    }
    if (message.includes('animate')) {
      return;
    }
    if (message.includes('transition')) {
      return;
    }
    if (message.includes('viewport')) {
      return;
    }
    if (message.includes('exit')) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
