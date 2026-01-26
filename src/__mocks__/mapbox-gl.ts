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
