import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders play button', () => {
  render(<App />);
  const playButton = screen.getByLabelText(/play/);
  expect(playButton).toBeInTheDocument();

  fireEvent.click(playButton);
  const pauseButton = screen.getByLabelText(/pause/);
  expect(pauseButton).toBeInTheDocument();
  expect(screen.queryByLabelText(/play/)).not.toBeInTheDocument();
});
