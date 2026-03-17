import { render, screen } from '@testing-library/react';
import MapView from '@/components/MapView';
import { locations } from '@/data/locations';

const mockFlyTo = jest.fn();

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
    flyTo: mockFlyTo,
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
  beforeEach(() => {
    mockFlyTo.mockClear();
  });

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
    render(<MapView />);

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

  it('should render custom labels without relying on i18n context', () => {
    render(
      <MapView
        labels={{ legend: '图例', loadingMap: '地图加载中...' }}
        typeLabels={{ historical: '历史', film: '电影取景地' }}
      />
    );

    expect(screen.getByText('图例')).toBeInTheDocument();
    expect(screen.getByText('地图加载中...')).toBeInTheDocument();
    expect(screen.getByText('历史')).toBeInTheDocument();
    expect(screen.getByText('电影取景地')).toBeInTheDocument();
  });

  it('should fly to the selected location from the filtered list only', () => {
    const filteredLocations = [locations[0]];

    const { rerender } = render(
      <MapView filteredLocations={filteredLocations} selectedLocationId={locations[1].id} />
    );

    expect(mockFlyTo).not.toHaveBeenCalled();

    rerender(
      <MapView filteredLocations={filteredLocations} selectedLocationId={locations[0].id} />
    );

    expect(mockFlyTo).toHaveBeenCalledWith({
      center: [locations[0].coordinates.lng, locations[0].coordinates.lat],
      zoom: 16,
      pitch: 60,
      duration: 1500,
    });
  });
});
