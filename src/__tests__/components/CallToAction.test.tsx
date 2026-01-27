import { render, screen } from '@testing-library/react';
import CallToAction from '@/components/CallToAction';
import Link from 'next/link';

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: function Link({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
    return <a href={href} className={className}>{children}</a>;
  },
}));

describe('CallToAction', () => {
  it('should render headline', () => {
    render(<CallToAction />);

    expect(screen.getByText(/Every Street Corner Has a Story/)).toBeInTheDocument();
    expect(screen.getByText(/Are You Ready to Discover Them/)).toBeInTheDocument();
  });

  it('should render description', () => {
    render(<CallToAction />);

    expect(screen.getByText(/The Rocks/)).toBeInTheDocument();
    expect(screen.getByText(/The Matrix/)).toBeInTheDocument();
  });

  it('should render badge', () => {
    render(<CallToAction />);

    expect(screen.getByText('Start Your Journey Today')).toBeInTheDocument();
  });

  it('should render CTA buttons', () => {
    render(<CallToAction />);

    expect(screen.getByText('Explore the Map')).toBeInTheDocument();
    expect(screen.getByText('Learn How It Works')).toBeInTheDocument();
  });

  it('should have link to map page', () => {
    const { container } = render(<CallToAction />);

    const mapLink = container.querySelector('a[href="/map"]');
    expect(mapLink).toBeInTheDocument();
  });

  it('should render stats', () => {
    render(<CallToAction />);

    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('Historic Locations')).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
    expect(screen.getByText('Years of History')).toBeInTheDocument();
    expect(screen.getByText('15+')).toBeInTheDocument();
    expect(screen.getByText('Film Locations')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('To Explore')).toBeInTheDocument();
  });
});
