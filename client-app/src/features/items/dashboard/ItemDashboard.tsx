import React from 'react';
import { Grid } from 'semantic-ui-react';
import { ItemModel } from '../../../app/models/itemModel';
import ItemList from './ItemList';
import ItemDetails from '../details/ItemDetails';
import ItemForm from '../form/ItemForm';

interface Props {
  items: ItemModel[];
  selectedItem: ItemModel | undefined;
  selectItem: (id: string) => void;
  cancelSelectItem: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (item: ItemModel) => void;
  deleteItem: (id: string) => void;
  submitting: boolean;
}

export default function ItemDashboard({
  items,
  selectedItem,
  selectItem,
  cancelSelectItem,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteItem,
  submitting,
}: Props) {
  return (
    <Grid>
      <Grid.Column width='10'>
        <ItemList
          items={items}
          selectItem={selectItem}
          deleteItem={deleteItem}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedItem && !editMode && (
          <ItemDetails
            item={selectedItem}
            cancelSelectItem={cancelSelectItem}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ItemForm
            closeForm={closeForm}
            item={selectedItem}
            createOrEdit={createOrEdit}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
