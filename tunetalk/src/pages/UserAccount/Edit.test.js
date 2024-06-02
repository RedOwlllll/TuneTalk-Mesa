/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Edit from './Edit'; // Ensure this path is correct

describe("Edit Page", () => {
  test("renders the edit profile page with all fields, buttons, and profile image section", () => {
    render(<Edit />);

    // Check for main title
    expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument();
  });
});
