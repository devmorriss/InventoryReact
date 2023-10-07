import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/' ? (
        <HomePage />
      ) : (
        <>
          <Navbar />
          <Container style={{ marginTop: '7em' }}>
            <Routes>
              <Route path='/' Component={HomePage} key={location.key} />
              <Route
                path='/activities'
                Component={ActivityDashboard}
                key={location.key}
              />
              <Route
                path='/activities/:id'
                Component={ActivityDetails}
                key={location.key}
              />
              {['/createActivity', '/manage/:id'].map((path) => (
                <Route
                  path={path}
                  element={<ActivityForm key={location.key} />}
                  key={location.key}
                />
              ))}
            </Routes>
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
