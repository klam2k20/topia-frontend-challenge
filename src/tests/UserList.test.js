import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { UserInfoProvider } from '../context/UserInfoProvider';
import App from '../App';

describe('UserList', () => {
  it('renders correctly', () => {
    render(
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    );

    const userlist = screen.getByLabelText("List of all peers within the user's viewport");
    expect(userlist).toMatchSnapshot();
  });

  it('Empty UserList renders correctly', async () => {
    render(
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    );

    const openModal = screen.getByText('Update User View');
    fireEvent.click(openModal);

    await screen.findByText('Update View');

    const screenWidthInput = screen.getByRole('spinbutton', { name: /Screen Width/i });
    const screenHeightInput = screen.getByRole('spinbutton', { name: /Screen Height/i });
    fireEvent.change(screenWidthInput, { target: { value: '100' } });
    fireEvent.change(screenHeightInput, { target: { value: '100' } });

    const update = screen.getByText('Update');
    fireEvent.click(update);

    await screen.findByText('No Peers Around');

    const icon = screen.getByLabelText('No Peers Around Icon');
    const label = screen.getByText('No Peers Around');

    expect(icon).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it("Updating the user's position and screen dimensions via the UpdateViewModal updates UserList", async () => {
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

    fireEvent.change(xPosition, { target: { value: '0' } });
    fireEvent.change(yPosition, { target: { value: '0' } });
    fireEvent.change(screenWidthInput, { target: { value: '100' } });
    fireEvent.change(screenHeightInput, { target: { value: '250' } });
    fireEvent.click(updateBtn);

    await screen.findByText('(0, 0)');

    const idLabel = screen.getByText('ID');
    const usernameLabel = screen.getByText('Username');
    const distanceLabel = screen.getByText('Distance (px)');
    const broadcasterLabel = screen.getByText('Is Broadcaster');
    const username = screen.getByText('user2');

    expect(idLabel).toBeInTheDocument();
    expect(usernameLabel).toBeInTheDocument();
    expect(distanceLabel).toBeInTheDocument();
    expect(broadcasterLabel).toBeInTheDocument();
    expect(username).toBeInTheDocument();
  });

  // it("UserList only renders peer avatars whose avatars are fully within the user's viewport", async () => {
  //   render(
  //     <UserInfoProvider>
  //       <App />
  //     </UserInfoProvider>
  //   );

  //   const openModal = screen.getByText('Update User View');
  //   fireEvent.click(openModal);

  //   await screen.findByText('Update View');

  //   const xPosition = screen.getByRole('spinbutton', { name: /X Position/i });
  //   const yPosition = screen.getByRole('spinbutton', { name: /Y Position/i });
  //   const screenWidthInput = screen.getByRole('spinbutton', { name: /Screen Width/i });
  //   const screenHeightInput = screen.getByRole('spinbutton', { name: /Screen Height/i });
  //   const updateBtn = screen.getByRole('button', { name: /Update/i });

  //   fireEvent.change(xPosition, { target: { value: '0' } });
  //   fireEvent.change(yPosition, { target: { value: '0' } });
  //   fireEvent.change(screenWidthInput, { target: { value: '100' } });
  //   fireEvent.change(screenHeightInput, { target: { value: '100' } });
  //   fireEvent.click(updateBtn);

  //   await screen.findByText('No Peers Around');

  //   const icon = screen.getByLabelText('No Peers Around Icon');
  //   const label = screen.getByText('No Peers Around');

  //   expect(icon).toBeInTheDocument();
  //   expect(label).toBeInTheDocument();
  // });

  it("UserList renders peer avatars in sorted order based on distance from user's position", async () => {
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
    const updateBtn = screen.getByRole('button', { name: /Update/i });

    fireEvent.change(xPosition, { target: { value: '0' } });
    fireEvent.change(yPosition, { target: { value: '0' } });
    fireEvent.change(screenWidthInput, { target: { value: '2000' } });
    fireEvent.change(screenHeightInput, { target: { value: '2000' } });
    fireEvent.click(updateBtn);

    await screen.findByText('(0, 0)');

    const distanceCells = screen.getAllByLabelText('distance');

    const distanceValues = distanceCells.map((cell) => {
      // eslint-disable-next-line testing-library/no-node-access
      const pElement = cell.querySelector('p');
      return pElement.textContent.trim();
    });

    for (let i = 0; i < distanceValues.length - 1; i++) {
      expect(+distanceValues[i]).toBeLessThanOrEqual(+distanceValues[i + 1]);
    }
  });
});
