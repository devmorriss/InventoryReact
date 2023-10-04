import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingComponents from '../../../app/layouts/LoadingComponents';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';

export default observer(function ItemForm() {
  const navigate = useNavigate();
  const { itemStore } = useStore();
  const { createItem, updateItem, loading, loadItem, loadingInitial } =
    itemStore;
  const { id } = useParams();

  const [item, setItem] = useState({
    id: '',
    name: '',
    description: '',
    price: 0,
    dateCreated: '',
  });

  useEffect(() => {
    if (id) loadItem(id).then((item) => setItem(item!));
  }, [id, loadItem]);

  function handleSubmit() {
    if (item.id.length === 0) {
      let newItem = {
        ...item,
        id: uuid(),
      };
      createItem(newItem).then(() => navigate(`/items/${newItem.id}`));
    } else {
      updateItem(item).then(() => navigate(`/items/${item.id}`));
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  }

  if (loading) return <LoadingComponents content='Loading item...' />;
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input
          placeholder='Name'
          value={item.name}
          name='name'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Price'
          value={item.price}
          name='price'
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder='Description'
          value={item.description}
          name='description'
          onChange={handleInputChange}
        />
        <Form.Input
          type='date'
          placeholder='Date Created'
          value={item.dateCreated}
          name='dateCreated'
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          as={Link}
          to={'/items'}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
});
