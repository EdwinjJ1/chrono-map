import { render, screen, fireEvent } from '@testing-library/react';
import TimelineCompare from '@/components/TimelineCompare';

describe('TimelineCompare', () => {
  const defaultProps = {
    historicalYear: '1900',
    modernYear: 'Today',
    locationName: 'Test Location',
  };

  it('should render component with default props', () => {
    render(<TimelineCompare {...defaultProps} />);

    expect(screen.getByText('Then & Now')).toBeInTheDocument();
    expect(screen.getByText('Drag to compare')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
    expect(screen.getAllByText('1900').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Today').length).toBeGreaterThan(0);
  });

  it('should render placeholder when no images provided', () => {
    const { container } = render(<TimelineCompare {...defaultProps} />);

    expect(screen.getByText('Historical View')).toBeInTheDocument();
    expect(screen.getByText('Modern View')).toBeInTheDocument();
  });

  it('should render year labels', () => {
    render(<TimelineCompare {...defaultProps} />);

    expect(screen.getAllByText('1900').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Today').length).toBeGreaterThan(0);
    expect(screen.getByText('Past')).toBeInTheDocument();
    expect(screen.getByText('Present')).toBeInTheDocument();
  });

  it('should render slider input', () => {
    const { container } = render(<TimelineCompare {...defaultProps} />);

    const slider = container.querySelector('input[type="range"]');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
    expect(slider).toHaveAttribute('value', '50');
  });

  it('should update slider position when input changes', () => {
    const { container } = render(<TimelineCompare {...defaultProps} />);

    const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
    expect(slider).toBeInTheDocument();

    fireEvent.change(slider, { target: { value: '75' } });
    expect(slider.value).toBe('75');
  });

  it('should handle mouse events for slider drag', () => {
    const { container } = render(<TimelineCompare {...defaultProps} />);

    const comparisonDiv = container.querySelector('.cursor-ew-resize');
    expect(comparisonDiv).toBeInTheDocument();
  });

  it('should handle touch events', () => {
    const { container } = render(<TimelineCompare {...defaultProps} />);

    const sliderHandle = container.querySelector('.cursor-ew-resize');
    expect(sliderHandle).toBeInTheDocument();

    // Simulate touch start
    if (sliderHandle) {
      fireEvent.touchStart(sliderHandle);
    }
  });

  it('should display location name', () => {
    render(<TimelineCompare {...defaultProps} locationName="Sydney Opera House" />);

    expect(screen.getByText('Sydney Opera House')).toBeInTheDocument();
  });

  it('should use custom modern year when provided', () => {
    const { container } = render(<TimelineCompare {...defaultProps} modernYear="2020" />);

    const text = container.textContent || '';
    expect(text).toContain('2020');
    // "Today" may still appear in other places
  });
});
