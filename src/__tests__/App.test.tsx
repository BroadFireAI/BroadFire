import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the lazy-loaded components
vi.mock('../components/WaterWaveBackground', () => ({
  default: () => <div data-testid="water-wave-mock">WaterWave Mock</div>,
}));

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });

  it('renders navigation with logo', () => {
    render(<App />);
    // Use getAllByText since BroadFire appears in both nav and footer
    const broadfireElements = screen.getAllByText(/BroadFire/i);
    expect(broadfireElements.length).toBeGreaterThan(0);
  });

  it('renders footer with copyright', () => {
    render(<App />);
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });
});
