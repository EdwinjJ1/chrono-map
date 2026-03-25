import { render, screen } from '@testing-library/react';
import FeaturedLocations from '@/components/FeaturedLocations';

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: function Link({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
    return <a href={href} className={className}>{children}</a>;
  },
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image({ src, alt, className }: { src: string; alt: string; className?: string }) {
    return <img src={src} alt={alt} className={className} />;
  },
}));

describe('FeaturedLocations', () => {
  it('should render section header', () => {
    render(<FeaturedLocations />);

    expect(screen.getByText('Featured Locations')).toBeInTheDocument();
    expect(screen.getByText('Start Your Journey Here')).toBeInTheDocument();
  });

  it('should render all 4 location cards', () => {
    const { container } = render(<FeaturedLocations />);

    const locationCards = container.querySelectorAll('.grid a[href^="/en/places/"]');
    expect(locationCards).toHaveLength(8);
  });

  it('should render The Rocks location', () => {
    render(<FeaturedLocations />);

    expect(screen.getAllByText('The Rocks').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Where the bubonic plague sparked a battle to save a community.').length).toBeGreaterThan(0);
    expect(screen.getByText('1788')).toBeInTheDocument();
    expect(screen.getAllByText('Historical').length).toBeGreaterThan(0);
  });

  it('should render Martin Place location', () => {
    render(<FeaturedLocations />);

    expect(screen.getAllByText('Martin Place').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Where ANZAC dawn began in darkness at 4:30 AM.').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Film Location').length).toBeGreaterThan(0);
  });

  it('should render QVB location', () => {
    render(<FeaturedLocations />);

    expect(screen.getAllByText('Queen Victoria Building').length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sydneyers refused to let a parking lot kill this masterpiece.").length).toBeGreaterThan(0);
    expect(screen.getAllByText('Heritage').length).toBeGreaterThan(0);
  });

  it('should render Sydney Opera House location', () => {
    render(<FeaturedLocations />);

    expect(screen.getAllByText('Sydney Opera House').length).toBeGreaterThan(0);
    expect(screen.getAllByText('The architect who never saw his own masterpiece.').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Cultural').length).toBeGreaterThan(0);
  });

  it('should have view all locations link', () => {
    const { container } = render(<FeaturedLocations />);

    const viewAllLink = container.querySelector('a[href="/en/map"]');
    expect(viewAllLink).toBeInTheDocument();
    expect(screen.getByText('View all locations')).toBeInTheDocument();
  });
});
