import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ItemList from './ItemList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponents from '../../../app/layouts/LoadingComponents';

export default observer(function ItemDashboard() {
  const { itemStore } = useStore();
  const { loadItems, itemRegistry } = itemStore;

  useEffect(() => {
    if (itemRegistry.size <= 1) loadItems();
  }, [itemStore]);

  if (itemStore.loadingInitial)
    return <LoadingComponents content='Loading app' />;

  return (
    <Grid>
      <Grid.Column width='10'>
        <ItemList />
      </Grid.Column>
      <Grid.Column width='6'>
        <h2>Item Filters</h2>
      </Grid.Column>
    </Grid>
  );
});
