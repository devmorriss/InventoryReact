import React from 'react';
import { Grid } from 'semantic-ui-react';
import ItemList from './ItemList';
import ItemDetails from '../details/ItemDetails';
import ItemForm from '../form/ItemForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function ItemDashboard() {
  const { itemStore } = useStore();
  const { selectedItem, editMode } = itemStore;

  return (
    <Grid>
      <Grid.Column width='10'>
        <ItemList />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedItem && !editMode && <ItemDetails />}
        {editMode && <ItemForm />}
      </Grid.Column>
    </Grid>
  );
});
