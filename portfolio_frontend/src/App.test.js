import { render, screen } from '@testing-library/react';
import App from './App';

test('renders contact nav link', async () => {
  render(<App />);
  const linkElement = await screen.findByText(/contact/i);
  expect(linkElement).toBeInTheDocument();
});
