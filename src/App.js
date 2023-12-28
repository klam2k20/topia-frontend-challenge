import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './styles/App.css';
import UpdateViewModal from './components/UpdateViewModal';
import UserInfo from './components/UserInfo';
import { UserList } from './components/UserList';
import { useUserInfo } from './context/UserInfoProvider';
import listUsersInView from './utils/listUsersInView';

function App() {
  const [visibleUsers, setVisibleUsers] = useState([]);
  const { position, screenSize } = useUserInfo();

  useEffect(() => {
    const users = listUsersInView(position.x, position.y, screenSize.width, screenSize.height);
    setVisibleUsers(users);
  }, []);

  return (
    <Container maxWidth='md' className='App'>
      <UserInfo />
      <UserList users={visibleUsers} />
      <UpdateViewModal updateVisibleUsers={(users) => setVisibleUsers(users)} />
    </Container>
  );
}

export default App;
