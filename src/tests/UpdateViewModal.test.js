import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { UserInfoProvider } from '../context/UserInfoProvider';
import App from '../App';

describe('UpdateViewModal', () => {
  it('UpdateViewModal renders correctly', async () => {
    render(
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    );

    const openModal = screen.getByText('Update User View');
    fireEvent.click(openModal);

    await screen.findByText('Update View');

    const xPosition = screen.getByRole('spinbutton', { name: /X Position/i });
    const yPosition = screen.getByRole('spinbutton', { name: /Y Position/i });
    const screenWidthInput = screen.getByRole('spinbutton', { name: /Screen Width/i });
    const screenHeightInput = screen.getByRole('spinbutton', { name: /Screen Height/i });
    const cancelBtn = screen.getByRole('button', { name: /Cancel/i });
    const updateBtn = screen.getByRole('button', { name: /Update/i });

    expect(xPosition).toBeInTheDocument();
    expect(yPosition).toBeInTheDocument();
    expect(screenWidthInput).toBeInTheDocument();
    expect(screenHeightInput).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
    expect(updateBtn).toBeInTheDocument();
  });

  it('UpdateViewModal error messages render correctly', async () => {
    render(
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    );

    const openModal = screen.getByText('Update User View');
    fireEvent.click(openModal);

    await screen.findByText('Update View');

    const xPosition = screen.getByRole('spinbutton', { name: /X Position/i });
    const yPosition = screen.getByRole('spinbutton', { name: /Y Position/i });
    const screenWidthInput = screen.getByRole('spinbutton', { name: /Screen Width/i });
    const screenHeightInput = screen.getByRole('spinbutton', { name: /Screen Height/i });

    fireEvent.change(xPosition, { target: { value: '' } });
    fireEvent.change(yPosition, { target: { value: '' } });
    fireEvent.change(screenWidthInput, { target: { value: '' } });
    fireEvent.change(screenHeightInput, { target: { value: '' } });

    const xPositionError = screen.getByText('Please specify a X coordinate for your avatar');
    const yPositionError = screen.getByText('Please specify a Y coordinate for your avatar');
    const screenWidthError = screen.getByText('Screen width must be a positive number');
    const screenHeightError = screen.getByText('Screen height must be a positive number');

    expect(xPositionError).toBeInTheDocument();
    expect(yPositionError).toBeInTheDocument();
    expect(screenWidthError).toBeInTheDocument();
    expect(screenHeightError).toBeInTheDocument();
  });
});
