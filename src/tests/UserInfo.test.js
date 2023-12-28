import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { UserInfoProvider } from '../context/UserInfoProvider';
import App from '../App';

describe('UserInfo', () => {
  it('UserInfo with default info renders correctly', () => {
    render(
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    );

    const title = screen.getByText("User's Information");
    const positionLabel = screen.getByText('Position:');
    const screenSizeLabel = screen.getByText('Screen Size:');
    const initialPosition = screen.getByText('(800, 400)');
    const initialScreenSize = screen.getByText(`${window.innerWidth} x ${window.innerHeight}`);

    expect(title).toBeInTheDocument();
    expect(positionLabel).toBeInTheDocument();
    expect(screenSizeLabel).toBeInTheDocument();
    expect(initialPosition).toBeInTheDocument();
    expect(initialScreenSize).toBeInTheDocument();
  });

  it('Closing UpdateViewModal without updating does not update UserInfo', async () => {
    render(
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    );

    const title = screen.getByText("User's Information");
    const positionLabel = screen.getByText('Position:');
    const screenSizeLabel = screen.getByText('Screen Size:');
    const initialPosition = screen.getByText('(800, 400)');
    const initialScreenSize = screen.getByText(`${window.innerWidth} x ${window.innerHeight}`);

    expect(title).toBeInTheDocument();
    expect(positionLabel).toBeInTheDocument();
    expect(screenSizeLabel).toBeInTheDocument();
    expect(initialPosition).toBeInTheDocument();
    expect(initialScreenSize).toBeInTheDocument();

    const openModal = screen.getByText('Update User View');
    fireEvent.click(openModal);

    await screen.findByText('Update View');

    const xPosition = screen.getByRole('spinbutton', { name: /X Position/i });
    const yPosition = screen.getByRole('spinbutton', { name: /Y Position/i });
    const screenWidthInput = screen.getByRole('spinbutton', { name: /Screen Width/i });
    const screenHeightInput = screen.getByRole('spinbutton', { name: /Screen Height/i });
    const cancelBtn = screen.getByRole('button', { name: /Cancel/i });

    fireEvent.change(xPosition, { target: { value: '100' } });
    fireEvent.change(yPosition, { target: { value: '100' } });
    fireEvent.change(screenWidthInput, { target: { value: '100' } });
    fireEvent.change(screenHeightInput, { target: { value: '100' } });
    fireEvent.click(cancelBtn);

    expect(title).toBeInTheDocument();
    expect(positionLabel).toBeInTheDocument();
    expect(screenSizeLabel).toBeInTheDocument();
    expect(initialPosition).toBeInTheDocument();
    expect(initialScreenSize).toBeInTheDocument();
  });

  it("Updating the user's position and screen dimensions via the UpdateViewModal updates UserInfo", async () => {
    render(
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    );

    const title = screen.getByText("User's Information");
    const positionLabel = screen.getByText('Position:');
    const screenSizeLabel = screen.getByText('Screen Size:');
    const initialPosition = screen.getByText('(800, 400)');
    const initialScreenSize = screen.getByText(`${window.innerWidth} x ${window.innerHeight}`);

    expect(title).toBeInTheDocument();
    expect(positionLabel).toBeInTheDocument();
    expect(screenSizeLabel).toBeInTheDocument();
    expect(initialPosition).toBeInTheDocument();
    expect(initialScreenSize).toBeInTheDocument();

    const openModal = screen.getByText('Update User View');
    fireEvent.click(openModal);

    await screen.findByText('Update View');

    const xPosition = screen.getByRole('spinbutton', { name: /X Position/i });
    const yPosition = screen.getByRole('spinbutton', { name: /Y Position/i });
    const screenWidthInput = screen.getByRole('spinbutton', { name: /Screen Width/i });
    const screenHeightInput = screen.getByRole('spinbutton', { name: /Screen Height/i });
    const updateBtn = screen.getByRole('button', { name: /Update/i });

    fireEvent.change(xPosition, { target: { value: '100' } });
    fireEvent.change(yPosition, { target: { value: '100' } });
    fireEvent.change(screenWidthInput, { target: { value: '100' } });
    fireEvent.change(screenHeightInput, { target: { value: '100' } });
    fireEvent.click(updateBtn);

    await screen.findByText('(100, 100)');

    const updatedPosition = screen.getByText('(100, 100)');
    const updatedScreenSize = screen.getByText('100 x 100');

    expect(updatedPosition).toBeInTheDocument();
    expect(updatedScreenSize).toBeInTheDocument();
  });
});
