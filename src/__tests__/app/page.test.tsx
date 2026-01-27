import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock all components
jest.mock('@/components/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});

jest.mock('@/components/Hero', () => {
  return function MockHero() {
    return <div data-testid="hero">Hero</div>;
  };
});

jest.mock('@/components/Features', () => {
  return function MockFeatures() {
    return <div data-testid="features">Features</div>;
  };
});

jest.mock('@/components/FeaturedLocations', () => {
  return function MockFeaturedLocations() {
    return <div data-testid="featured-locations">FeaturedLocations</div>;
  };
});

jest.mock('@/components/CallToAction', () => {
  return function MockCallToAction() {
    return <div data-testid="cta">CallToAction</div>;
  };
});

jest.mock('@/components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

describe('Home Page', () => {
  it('should render all sections', () => {
    render(<Home />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
    expect(screen.getByTestId('featured-locations')).toBeInTheDocument();
    expect(screen.getByTestId('cta')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should render within main element', () => {
    const { container } = render(<Home />);

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('min-h-screen');
  });
});
