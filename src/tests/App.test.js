import { render } from '@testing-library/react';
import App from '../App';
import { UserInfoProvider } from '../context/UserInfoProvider';

test('renders learn react link', () => {
  const { container } = render(
    <UserInfoProvider>
      <App />
    </UserInfoProvider>
  );
  // eslint-disable-next-line testing-library/no-node-access
  const appComponent = container.firstChild;
  expect(appComponent).toHaveClass('App');
});
