import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ShopClone logo', () => {
  render(<App />);
  const logoElement = screen.getByText(/ShopClone/i);
  expect(logoElement).toBeInTheDocument();
});
