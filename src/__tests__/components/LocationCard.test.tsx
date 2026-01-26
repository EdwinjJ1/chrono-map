import { render, screen, waitFor } from '@testing-library/react';
import LocationCard from '@/components/LocationCard';
import { locationTypes } from '@/data/locations';
import type { Location } from '@/data/locations';

const mockLocation: Location = {
  id: 1,
  name: 'Test Location',
  nameZh: '测试地点',
  type: 'historical',
  year: '1900',
  coordinates: { lat: -33.8599, lng: 151.2090 },
  description: 'A test location',
  fullDescription: 'This is a test location for unit testing.',
  modernImage: '/images/locations/test.jpg',
  historicalImage: '/images/locations/historical/test.jpg',
  facts: ['Test fact 1', 'Test fact 2'],
  address: 'Test Address, Sydney NSW 2000',
  visitInfo: {
    hours: '9am - 5pm daily',
    admission: 'Free',
    website: 'https://example.com',
  },
};

describe('LocationCard', () => {
  it('should render nothing when location is null', () => {
    const { container } = render(<LocationCard location={null} onClose={() => {}} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('should not render when isOpen is false', () => {
    const { container } = render(
      <LocationCard location={mockLocation} onClose={() => {}} isOpen={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render when location is provided and isOpen is true', async () => {
    render(<LocationCard location={mockLocation} onClose={() => {}} isOpen={true} />);

    await waitFor(() => {
      expect(screen.getByText('Test Location')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('测试地点')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('This is a test location for unit testing.')).toBeInTheDocument();
    });
  });

  it('should display location type badge', async () => {
    render(<LocationCard location={mockLocation} onClose={() => {}} isOpen={true} />);

    await waitFor(() => {
      expect(screen.getByText('Historical')).toBeInTheDocument();
    });
  });

  it('should display year', async () => {
    render(<LocationCard location={mockLocation} onClose={() => {}} isOpen={true} />);

    await waitFor(() => {
      expect(screen.getByText('Est. 1900')).toBeInTheDocument();
    });
  });

  it('should display address', async () => {
    render(<LocationCard location={mockLocation} onClose={() => {}} isOpen={true} />);

    await waitFor(() => {
      expect(screen.getByText('Test Address, Sydney NSW 2000')).toBeInTheDocument();
    });
  });

  it('should display visitInfo when available', async () => {
    render(<LocationCard location={mockLocation} onClose={() => {}} isOpen={true} />);

    await waitFor(() => {
      expect(screen.getByText('9am - 5pm daily')).toBeInTheDocument();
    });
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('Official Website')).toBeInTheDocument();
  });

  it('should display facts list', async () => {
    render(<LocationCard location={mockLocation} onClose={() => {}} isOpen={true} />);

    await waitFor(() => {
      expect(screen.getByText('Test fact 1')).toBeInTheDocument();
    });
    expect(screen.getByText('Test fact 2')).toBeInTheDocument();
  });

  it('should display gradient background when no images', async () => {
    const locationWithoutImage = { ...mockLocation, modernImage: undefined, historicalImage: undefined };
    render(
      <LocationCard location={locationWithoutImage} onClose={() => {}} isOpen={true} />
    );

    await waitFor(() => {
      expect(screen.getByText('Test Location')).toBeInTheDocument();
    });
    // Verify component renders without images - no image element should be present
    const images = screen.queryAllByRole('img');
    expect(images.length).toBe(0);
  });

  it('should display historical/modern toggle when both images exist', async () => {
    render(<LocationCard location={mockLocation} onClose={() => {}} isOpen={true} />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /View Historical/i })).toBeInTheDocument();
    });
  });

  it('should not display toggle when only one image exists', async () => {
    const locationWithOneImage = { ...mockLocation, historicalImage: undefined };
    render(<LocationCard location={locationWithOneImage} onClose={() => {}} isOpen={true} />);

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /View Historical/i })).not.toBeInTheDocument();
    });
  });

  it('should display film-related content when type is film', async () => {
    const filmLocation: Location = {
      ...mockLocation,
      type: 'film',
      name: 'Test Film Location',
      relatedFilms: ['Test Movie (2000)', 'Another Film (2010)'],
    };

    render(<LocationCard location={filmLocation} onClose={() => {}} isOpen={true} />);

    await waitFor(() => {
      expect(screen.getByText('Test Movie (2000)')).toBeInTheDocument();
    });
    expect(screen.getByText('Another Film (2010)')).toBeInTheDocument();
  });

  it('should close when close button is clicked', async () => {
    const handleClose = jest.fn();
    render(<LocationCard location={mockLocation} onClose={handleClose} isOpen={true} />);

    await waitFor(() => {
      const closeButton = screen.getByRole('button', { name: /Close/i });
      closeButton.click();
    });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
