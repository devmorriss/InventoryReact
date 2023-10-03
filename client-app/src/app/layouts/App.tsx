import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { ItemModel } from '../models/itemModel';
import Navbar from './Navbar';
import ItemDashboard from '../../features/items/dashboard/ItemDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponents from './LoadingComponents';

function App() {
  const [items, setItems] = useState<ItemModel[]>([]);
  const [selectedItem, setSelectedItem] = useState<ItemModel | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Items.list().then((res) => {
      let items: ItemModel[] = [];
      res.forEach((item) => {
        item.dateCreated = item.dateCreated.split('T')[0];
        items.push(item);
      });
      setItems(items);
      setLoading(false);
    });
  }, []);

  function handleSelectItem(id: string) {
    setSelectedItem(items.find((x) => x.id === id));
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
    setSubmitting(true);
    if (item.id) {
      agent.Items.update(item).then(() => {
        setItems([...items.filter((x) => x.id !== item.id), item]);
        setSelectedItem(item);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      item.id = uuid();
      agent.Items.create(item).then(() => {
        setItems([...items, item]);
        setSelectedItem(item);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteItem(id: string) {
    setSubmitting(true);
    agent.Items.delete(id).then(() => {
      setItems([...items.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (loading) return <LoadingComponents content='Loading app' />;

  return (
    <>
      <Navbar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
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
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
