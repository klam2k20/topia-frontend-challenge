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
    const xPositionLabel = screen.getByText('X Position');
    const yPositionLabel = screen.getByText('Y Position');
    const screenWidthLabel = screen.getByText('Screen Width (px)');
    const screenHeightLabel = screen.getByText('Screen Height (px)');
    const initialXPosition = screen.getByText('800');
    const initialYPosition = screen.getByText('400');
    const initialScreenWidth = screen.getByText(`${window.innerWidth}`);
    const initialScreenHeight = screen.getByText(`${window.innerHeight}`);

    expect(title).toBeInTheDocument();
    expect(xPositionLabel).toBeInTheDocument();
    expect(yPositionLabel).toBeInTheDocument();
    expect(screenWidthLabel).toBeInTheDocument();
    expect(screenHeightLabel).toBeInTheDocument();
    expect(initialXPosition).toBeInTheDocument();
    expect(initialYPosition).toBeInTheDocument();
    expect(initialScreenWidth).toBeInTheDocument();
    expect(initialScreenHeight).toBeInTheDocument();
  });

  it('Closing UpdateViewModal without updating does not update UserInfo', async () => {
    render(
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    );

    const title = screen.getByText("User's Information");
    const xPositionLabel = screen.getByText('X Position');
    const yPositionLabel = screen.getByText('Y Position');
    const screenWidthLabel = screen.getByText('Screen Width (px)');
    const screenHeightLabel = screen.getByText('Screen Height (px)');
    const initialXPosition = screen.getByText('800');
    const initialYPosition = screen.getByText('400');
    const initialScreenWidth = screen.getByText(`${window.innerWidth}`);
    const initialScreenHeight = screen.getByText(`${window.innerHeight}`);

    expect(title).toBeInTheDocument();
    expect(xPositionLabel).toBeInTheDocument();
    expect(yPositionLabel).toBeInTheDocument();
    expect(screenWidthLabel).toBeInTheDocument();
    expect(screenHeightLabel).toBeInTheDocument();
    expect(initialXPosition).toBeInTheDocument();
    expect(initialYPosition).toBeInTheDocument();
    expect(initialScreenWidth).toBeInTheDocument();
    expect(initialScreenHeight).toBeInTheDocument();

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
    expect(xPositionLabel).toBeInTheDocument();
    expect(yPositionLabel).toBeInTheDocument();
    expect(screenWidthLabel).toBeInTheDocument();
    expect(screenHeightLabel).toBeInTheDocument();
    expect(initialXPosition).toBeInTheDocument();
    expect(initialYPosition).toBeInTheDocument();
    expect(initialScreenWidth).toBeInTheDocument();
    expect(initialScreenHeight).toBeInTheDocument();
  });

  it("Updating the user's position and screen dimensions via the UpdateViewModal updates UserInfo", async () => {
    render(
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    );

    const title = screen.getByText("User's Information");
    const xPositionLabel = screen.getByText('X Position');
    const yPositionLabel = screen.getByText('Y Position');
    const screenWidthLabel = screen.getByText('Screen Width (px)');
    const screenHeightLabel = screen.getByText('Screen Height (px)');
    const initialXPosition = screen.getByText('800');
    const initialYPosition = screen.getByText('400');
    const initialScreenWidth = screen.getByText(`${window.innerWidth}`);
    const initialScreenHeight = screen.getByText(`${window.innerHeight}`);

    expect(title).toBeInTheDocument();
    expect(xPositionLabel).toBeInTheDocument();
    expect(yPositionLabel).toBeInTheDocument();
    expect(screenWidthLabel).toBeInTheDocument();
    expect(screenHeightLabel).toBeInTheDocument();
    expect(initialXPosition).toBeInTheDocument();
    expect(initialYPosition).toBeInTheDocument();
    expect(initialScreenWidth).toBeInTheDocument();
    expect(initialScreenHeight).toBeInTheDocument();

    const openModal = screen.getByText('Update User View');
    fireEvent.click(openModal);

    await screen.findByText('Update View');

    const xPosition = screen.getByRole('spinbutton', { name: /X Position/i });
    const yPosition = screen.getByRole('spinbutton', { name: /Y Position/i });
    const screenWidthInput = screen.getByRole('spinbutton', { name: /Screen Width/i });
    const screenHeightInput = screen.getByRole('spinbutton', { name: /Screen Height/i });
    const updateBtn = screen.getByRole('button', { name: /Update/i });

    fireEvent.change(xPosition, { target: { value: '100' } });
    fireEvent.change(yPosition, { target: { value: '200' } });
    fireEvent.change(screenWidthInput, { target: { value: '300' } });
    fireEvent.change(screenHeightInput, { target: { value: '400' } });
    fireEvent.click(updateBtn);

    await screen.findByText('100');

    const updatedXPosition = screen.getByText('100');
    const updatedYPosition = screen.getByText('200');
    const updatedScreenWidth = screen.getByText('300');
    const updatedScreenHeight = screen.getByText('400');

    expect(updatedXPosition).toBeInTheDocument();
    expect(updatedYPosition).toBeInTheDocument();
    expect(updatedScreenWidth).toBeInTheDocument();
    expect(updatedScreenHeight).toBeInTheDocument();
  });
});
