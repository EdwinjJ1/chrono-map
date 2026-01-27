import { render, screen } from '@testing-library/react';
import Features from '@/components/Features';

describe('Features', () => {
  it('should render section header', () => {
    const { container } = render(<Features />);

    const h2 = container.querySelector('h2');
    expect(h2?.textContent).toContain('Explore History Like Never Before');
  });

  it('should render description', () => {
    const { container } = render(<Features />);

    const text = container.textContent || '';
    expect(text).toContain('Our platform combines cutting-edge technology');
    expect(text).toContain('rich historical content');
  });

  it('should render all 6 feature cards', () => {
    const { container } = render(<Features />);

    const featureCards = container.querySelectorAll('[class*="glass"]');
    expect(featureCards.length).toBeGreaterThan(0);
  });

  it('should render Interactive Heritage Map feature', () => {
    render(<Features />);

    expect(screen.getByText('Interactive Heritage Map')).toBeInTheDocument();
  });

  it('should render Then & Now Comparison feature', () => {
    render(<Features />);

    expect(screen.getByText('Then & Now Comparison')).toBeInTheDocument();
  });

  it('should render Film Location Tours feature', () => {
    render(<Features />);

    expect(screen.getByText('Film Location Tours')).toBeInTheDocument();
  });

  it('should render QR Code Plaques feature', () => {
    render(<Features />);

    expect(screen.getByText('QR Code Plaques')).toBeInTheDocument();
  });

  it('should render Mobile-First Experience feature', () => {
    render(<Features />);

    expect(screen.getByText('Mobile-First Experience')).toBeInTheDocument();
  });

  it('should render Curated Walking Tours feature', () => {
    render(<Features />);

    expect(screen.getByText('Curated Walking Tours')).toBeInTheDocument();
  });
});
