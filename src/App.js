import { Container } from '@material-ui/core';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import UpdateViewModal from './components/UpdateViewModal';
import UserInfo from './components/UserInfo';
import { UserList } from './components/UserList';
import { useUserInfo } from './context/UserInfoProvider';
import './styles/App.css';
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
      <Stack direction={'column'} spacing={4}>
        <UserInfo />
        <UserList users={visibleUsers} />
        <UpdateViewModal updateVisibleUsers={(users) => setVisibleUsers(users)} />
      </Stack>
    </Container>
  );
}

export default App;
