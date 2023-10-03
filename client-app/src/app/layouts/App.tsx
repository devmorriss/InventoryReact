import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { ItemModel } from '../models/itemModel';
import Navbar from './Navbar';
import ItemDashboard from '../../features/items/dashboard/ItemDashboard';
import {v4 as uuid} from 'uuid';

function App() {

  const [items, setItems] = useState<ItemModel[]>([])
  const [selectedItem, setSelectedItem] = useState<ItemModel | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<ItemModel[]>('http://localhost:5070/api/items').then(res => {
      setItems(res.data);
    })
  }, [])

  function handleSelectItem(id: string) {
    setSelectedItem(items.find(x => x.id === id));
  }

  function handleCancelSelectItem() {
    setSelectedItem(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectItem(id) : handleCancelSelectItem();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditItem(item: ItemModel) {
    item.id ? setItems([...items.filter(x => x.id !== item.id), item]) : setItems([...items, {...item, id: uuid()}]);
    setEditMode(false);
    setSelectedItem(item);
  }

  function handleDeleteItem(id: string) {
    setItems([...items.filter(x => x.id !== id)])
  }

  return (
    <>
      <Navbar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <ItemDashboard 
          items={items}
          selectedItem={selectedItem}
          selectItem={handleSelectItem}
          cancelSelectItem={handleCancelSelectItem}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditItem}
          deleteItem={handleDeleteItem}
         />
      </Container>
    </>
  );
}

export default App;
