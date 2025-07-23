import { render, screen } from '@testing-library/react';

import Home from '../src/app/page'; // Adjust the import path as necessary

describe('Home Page', () => {
  it('renders a Get Started button', () => {
    render(<Home />);
    const getStartedButton = screen.getByRole('button', { name: /Get Started/i });
    expect(getStartedButton).toBeInTheDocument();
  });
});