import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ItemDashboard from '../../features/items/dashboard/ItemDashboard';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { itemStore } = useStore();

  useEffect(() => {
    itemStore.loadItems();
  }, [itemStore]);

  if (itemStore.loadingInitial)
    return <LoadingComponents content='Loading app' />;

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <ItemDashboard />
      </Container>
    </>
  );
}

export default observer(App);
