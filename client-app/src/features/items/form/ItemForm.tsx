import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function ItemForm() {
  const { itemStore } = useStore();
  const { selectedItem, closeForm, createItem, updateItem, loading } =
    itemStore;
  const initialState = selectedItem ?? {
    id: '',
    name: '',
    description: '',
    price: 0,
    dateCreated: '',
  };

  const [item, setItem] = useState(initialState);

  function handleSubmit() {
    item.id ? updateItem(item) : createItem(item);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  }

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
          onClick={closeForm}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
});
