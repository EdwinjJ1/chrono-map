import { render, screen } from '@testing-library/react';
import MapView from '@/components/MapView';
import { locations } from '@/data/locations';

// Mock mapbox-gl
jest.mock('mapbox-gl', () => ({
  accessToken: '',
  Map: jest.fn().mockImplementation(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    getStyle: jest.fn(() => ({
      layers: [],
    })),
    addLayer: jest.fn(),
    remove: jest.fn(),
    flyTo: jest.fn(),
  })),
  NavigationControl: jest.fn(),
  Marker: jest.fn().mockImplementation(() => ({
    addTo: jest.fn().mockReturnThis(),
    remove: jest.fn(),
    setLngLat: jest.fn().mockReturnThis(),
  })),
}));

// Mock CSS import
jest.mock('mapbox-gl/dist/mapbox-gl.css', () => ({}));

describe('MapView', () => {
  it('should render map container', () => {
    const { container } = render(<MapView />);

    const mapContainer = container.querySelector('.rounded-2xl');
    expect(mapContainer).toBeInTheDocument();
  });

  it('should render loading overlay initially', () => {
    render(<MapView />);

    expect(screen.getByText('Loading map...')).toBeInTheDocument();
  });

  it('should render legend', () => {
    const { container } = render(<MapView />);

    expect(screen.getByText('Legend')).toBeInTheDocument();

    // Check for location type labels
    expect(screen.getByText('Historical')).toBeInTheDocument();
    expect(screen.getByText('Film Location')).toBeInTheDocument();
    expect(screen.getByText('Cultural')).toBeInTheDocument();
    expect(screen.getByText('Heritage')).toBeInTheDocument();
    expect(screen.getByText('Nature')).toBeInTheDocument();
  });

  it('should accept custom className', () => {
    const { container } = render(<MapView className="custom-class" />);

    const wrapper = container.querySelector('.custom-class');
    expect(wrapper).toBeInTheDocument();
  });

  it('should render all location types in legend', () => {
    render(<MapView />);

    const legendItems = screen.getAllByText(/Historical|Film|Cultural|Heritage|Nature/);
    expect(legendItems.length).toBeGreaterThan(0);
  });
});
