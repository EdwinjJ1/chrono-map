import { render, screen, within } from '@testing-library/react';
import Hero from '@/components/Hero';

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: function Link({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
    return <a href={href} className={className}>{children}</a>;
  },
}));

describe('Hero', () => {
  it('should render main headline', () => {
    const { container } = render(<Hero />);

    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();
    expect(h1?.textContent).toContain('Travel Through');
    expect(h1?.textContent).toContain('Time');
    expect(h1?.textContent).toContain('One Location at a Time');
  });

  it('should render subheadline', () => {
    const { container } = render(<Hero />);

    const p = container.querySelector('p');
    expect(p?.textContent).toContain('Explore historical landmarks');
    expect(p?.textContent).toContain('film locations');
  });

  it('should render badge', () => {
    const { container } = render(<Hero />);

    expect(screen.getByText("Discover Sydney's Hidden Stories")).toBeInTheDocument();
  });

  it('should render CTA buttons', () => {
    render(<Hero />);

    expect(screen.getByText('Start Exploring')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('should have link to map page', () => {
    const { container } = render(<Hero />);

    const mapLink = container.querySelector('a[href="/map"]');
    expect(mapLink).toBeInTheDocument();
  });

  it('should render stats', () => {
    render(<Hero />);

    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('Historic Sites')).toBeInTheDocument();
    expect(screen.getByText('100+')).toBeInTheDocument();
    expect(screen.getByText('Years of History')).toBeInTheDocument();
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('Film Locations')).toBeInTheDocument();
  });

  it('should render feature list', () => {
    render(<Hero />);

    expect(screen.getByText('Historical Landmarks')).toBeInTheDocument();
    expect(screen.getByText('Film & TV Locations')).toBeInTheDocument();
    expect(screen.getByText('Then & Now Comparison')).toBeInTheDocument();
  });

  it('should have link to features section', () => {
    const { container } = render(<Hero />);

    const featuresLink = container.querySelector('a[href="#features"]');
    expect(featuresLink).toBeInTheDocument();
  });
});
