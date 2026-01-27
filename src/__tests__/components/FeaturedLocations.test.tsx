import { render, screen } from '@testing-library/react';
import FeaturedLocations from '@/components/FeaturedLocations';
import Link from 'next/link';

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

    const locationCards = container.querySelectorAll('a[href^="/location/"]');
    expect(locationCards).toHaveLength(4);
  });

  it('should render The Rocks location', () => {
    render(<FeaturedLocations />);

    expect(screen.getByText('The Rocks')).toBeInTheDocument();
    expect(screen.getByText("Sydney's oldest neighborhood, where the first European settlers landed.")).toBeInTheDocument();
    expect(screen.getByText('1788')).toBeInTheDocument();
    expect(screen.getByText('Historical')).toBeInTheDocument();
  });

  it('should render Martin Place location', () => {
    render(<FeaturedLocations />);

    expect(screen.getByText('Martin Place')).toBeInTheDocument();
    expect(screen.getByText("The iconic 'Woman in Red' scene from The Matrix was filmed here.")).toBeInTheDocument();
    expect(screen.getByText('Film Location')).toBeInTheDocument();
  });

  it('should render QVB location', () => {
    render(<FeaturedLocations />);

    expect(screen.getByText('Queen Victoria Building')).toBeInTheDocument();
    expect(screen.getByText('A Romanesque Revival masterpiece, once nearly demolished.')).toBeInTheDocument();
    expect(screen.getByText('Heritage')).toBeInTheDocument();
  });

  it('should render Sydney Opera House location', () => {
    render(<FeaturedLocations />);

    expect(screen.getByText('Sydney Opera House')).toBeInTheDocument();
    expect(screen.getByText("Jørn Utzon's controversial masterpiece that became a world icon.")).toBeInTheDocument();
    expect(screen.getByText('Cultural')).toBeInTheDocument();
  });

  it('should have view all locations link', () => {
    const { container } = render(<FeaturedLocations />);

    const viewAllLink = container.querySelector('a[href="/map"]');
    expect(viewAllLink).toBeInTheDocument();
    expect(screen.getByText('View all locations')).toBeInTheDocument();
  });
});
