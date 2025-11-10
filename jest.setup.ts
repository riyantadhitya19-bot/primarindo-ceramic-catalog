import '@testing-library/jest-dom'

// Mock the URL object since it's not available in Jest's jsdom environment
global.URL = jest.fn((url) => ({
  searchParams: new URLSearchParams(url.split('?')[1]),
  toString: () => url,
})) as any