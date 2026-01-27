import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: function Link({ children, href, className, onClick }: { children: React.ReactNode; href: string; className?: string; onClick?: () => void }) {
    return <a href={href} className={className} onClick={onClick}>{children}</a>;
  },
}));

describe('Header', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    global.scrollTo = jest.fn();
  });

  it('should render logo', () => {
    render(<Header />);

    expect(screen.getByText('Chrono-Map')).toBeInTheDocument();
    expect(screen.getByText('Sydney Layers')).toBeInTheDocument();
  });

  it('should render navigation links on desktop', () => {
    render(<Header />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Explore Map')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('should render Start Exploring button', () => {
    render(<Header />);

    expect(screen.getByText('Start Exploring')).toBeInTheDocument();
  });

  it('should have correct link hrefs', () => {
    const { container } = render(<Header />);

    expect(container.querySelector('a[href="/"]')).toBeInTheDocument();
    expect(container.querySelector('a[href="/map"]')).toBeInTheDocument();
    expect(container.querySelector('a[href="#features"]')).toBeInTheDocument();
    expect(container.querySelector('a[href="#about"]')).toBeInTheDocument();
  });

  it('should render mobile menu button', () => {
    render(<Header />);

    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
  });
});
