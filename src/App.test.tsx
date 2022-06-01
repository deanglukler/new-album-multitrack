import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders play button', () => {
  render(<App />);
  const playButton = screen.getByRole(/button/, { name: /play/i });
  expect(playButton).toBeInTheDocument();

  fireEvent(playButton, new MouseEvent('click'));
  expect(playButton).not.toBeInTheDocument();
});
