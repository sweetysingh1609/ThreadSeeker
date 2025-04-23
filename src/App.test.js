// App.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders search and returns results', () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Search for threads...');
  const button = screen.getByText('Search');

  fireEvent.change(input, { target: { value: 'AI' } });
  fireEvent.click(button);

  expect(screen.getByText("You’ve got new curated threads!")).toBeInTheDocument();
  expect(screen.getByText(/Why this?/i)).toBeInTheDocument(); // summary shown
});

test('shows no results for unmatched query', () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Search for threads...');
  const button = screen.getByText('Search');

  fireEvent.change(input, { target: { value: 'asdfghjkl' } });
  fireEvent.click(button);

  expect(screen.getByText("No threads found for your query 😕")).toBeInTheDocument();
});
