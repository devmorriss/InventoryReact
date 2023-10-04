import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ItemDashboard from '../../features/items/dashboard/ItemDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ItemForm from '../../features/items/form/ItemForm';
import ItemDetails from '../../features/items/details/ItemDetails';

function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <Routes>
          <Route path='/' Component={HomePage} key={location.key} />
          <Route path='/items' Component={ItemDashboard} key={location.key} />
          <Route path='/items/:id' Component={ItemDetails} key={location.key} />
          {['/createItem', '/manage/:id'].map((path) => (
            <Route
              path={path}
              element={<ItemForm key={location.key} />}
              key={location.key}
            />
          ))}
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
