import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: function Link({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
    return <a href={href} className={className}>{children}</a>;
  },
}));

describe('Footer', () => {
  it('should render logo', () => {
    render(<Footer />);

    expect(screen.getByText('Chrono-Map')).toBeInTheDocument();
    expect(screen.getByText('Sydney Layers')).toBeInTheDocument();
  });

  it('should render description', () => {
    render(<Footer />);

    expect(screen.getByText(/Discover Sydney's hidden stories/)).toBeInTheDocument();
  });

  it('should render Explore section links', () => {
    render(<Footer />);

    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Interactive Map')).toBeInTheDocument();
    expect(screen.getByText('Featured Locations')).toBeInTheDocument();
    expect(screen.getByText('Film Locations')).toBeInTheDocument();
    expect(screen.getByText('Walking Tours')).toBeInTheDocument();
  });

  it('should render About section links', () => {
    render(<Footer />);

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Our Story')).toBeInTheDocument();
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText('For Businesses')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('should render Legal section links', () => {
    render(<Footer />);

    expect(screen.getByText('Legal')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Cookie Policy')).toBeInTheDocument();
  });

  it('should render social links', () => {
    const { container } = render(<Footer />);

    const socialLinks = container.querySelectorAll('a[href^="https://"], a[href^="mailto:"]');
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it('should render copyright', () => {
    render(<Footer />);

    expect(screen.getAllByText(/Chrono-Map/).length).toBeGreaterThan(0);
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });

  it('should render location text', () => {
    render(<Footer />);

    expect(screen.getByText('Made with passion in Sydney, Australia')).toBeInTheDocument();
  });

  it('should have correct link hrefs', () => {
    const { container } = render(<Footer />);

    expect(container.querySelector('a[href="/map"]')).toBeInTheDocument();
    expect(container.querySelector('a[href="/"]')).toBeInTheDocument();
    expect(container.querySelector('a[href="/about"]')).toBeInTheDocument();
    expect(container.querySelector('a[href="/privacy"]')).toBeInTheDocument();
  });
});
