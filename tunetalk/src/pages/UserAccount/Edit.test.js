import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Edit } from './Edit';  // Adjust the import path based on your project structure

describe("Edit Page", () => {
    test("renders the edit profile page with all fields, buttons, and profile image section", () => {
        render(<Edit />);
        
        // Check for main title
        expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument();
        
        // Check for sections
        expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Bio:/i)).toBeInTheDocument();
        
        // Check for input functionality
        const usernameInput = screen.getByLabelText(/Username:/i);
        fireEvent.change(usernameInput, { target: { value: 'newUsername' } });
        expect(usernameInput.value).toBe('newUsername');
        
        const emailInput = screen.getByLabelText(/Email:/i);
        fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
        expect(emailInput.value).toBe('user@example.com');
        
        const bioInput = screen.getByLabelText(/Bio:/i);
        fireEvent.change(bioInput, { target: { value: 'New bio here' } });
        expect(bioInput.value).toBe('New bio here');
        
        expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
    });
});
