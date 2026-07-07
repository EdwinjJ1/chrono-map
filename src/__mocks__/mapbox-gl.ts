const mockMap = {
  on: jest.fn(),
  off: jest.fn(),
  remove: jest.fn(),
  resize: jest.fn(),
  getContainer: jest.fn(),
  addControl: jest.fn(),
  getSource: jest.fn(),
  addLayer: jest.fn(),
  addSource: jest.fn(),
  getStyle: jest.fn(),
  setStyle: jest.fn(),
  fitBounds: jest.fn(),
  jumpTo: jest.fn(),
  flyTo: jest.fn(),
};

export const Map = jest.fn().mockImplementation(() => mockMap);

export const NavigationControl = jest.fn().mockImplementation(() => ({}));

export const LngLatBounds = jest.fn().mockImplementation(() => {
  const coords: [number, number][] = [];
  return {
    extend(coord: [number, number]) {
      coords.push(coord);
      return this;
    },
    getCenter() {
      if (coords.length === 0) return [0, 0];
      const lng = coords.reduce((sum, c) => sum + c[0], 0) / coords.length;
      const lat = coords.reduce((sum, c) => sum + c[1], 0) / coords.length;
      return [lng, lat];
    },
    getNorthEast() {
      const lng = Math.max(...coords.map((c) => c[0]));
      const lat = Math.max(...coords.map((c) => c[1]));
      return { lng, lat };
    },
    getSouthWest() {
      const lng = Math.min(...coords.map((c) => c[0]));
      const lat = Math.min(...coords.map((c) => c[1]));
      return { lng, lat };
    },
  };
});

export const Marker = jest.fn().mockImplementation(() => ({
  addTo: jest.fn(),
  remove: jest.fn(),
  setLngLat: jest.fn(),
  getLngLat: jest.fn().mockReturnValue([151, -33]),
  togglePopup: jest.fn(),
}));

export const Popup = jest.fn().mockImplementation(() => ({
  setLngLat: jest.fn(),
  addTo: jest.fn(),
  remove: jest.fn(),
  setHTML: jest.fn(),
}));
