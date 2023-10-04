import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function ItemList() {
  const { itemStore } = useStore();
  const { deleteItem, itemsByDate, loading } = itemStore;
  const [target, setTarget] = useState('');

  function handleItemDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteItem(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {itemsByDate.map((item) => (
          <Item key={item.id}>
            <Item.Content>
              <Item.Header as='a'>{item.name}</Item.Header>
              <Item.Meta>{item.dateCreated}</Item.Meta>
              <Item.Description>
                <div>{item.description}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => itemStore.selectItem(item.id)}
                  floated='right'
                  content='View'
                  color='purple'
                />
                <Button
                  name={item.id}
                  loading={loading && target === item.id}
                  onClick={(e) => handleItemDelete(e, item.id)}
                  floated='right'
                  content='Delete'
                  color='orange'
                />
                <Label basic content={item.price} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
