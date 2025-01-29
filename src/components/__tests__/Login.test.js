import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../LoginForm';

describe('Login Component', () => {
  it('calls handleLogin with name and email when submitted', () => {
    const mockHandleLogin = jest.fn();

    render(<LoginForm handleLogin={mockHandleLogin} />);

    // Fill in the name
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'testuser' },
    });

    // Fill in the email
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: 'test@email.com' },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/login/i));

    // Ensure handleLogin is called with the correct data
    expect(mockHandleLogin).toHaveBeenCalledWith({
      name: 'testuser',
      email: 'test@email.com',
    });
    expect(mockHandleLogin).toHaveBeenCalledTimes(1);
  });
});
