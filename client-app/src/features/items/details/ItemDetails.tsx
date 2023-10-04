import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponents from '../../../app/layouts/LoadingComponents';

export default function ItemDetails() {
  const { itemStore } = useStore();
  const { selectedItem: item, openForm, cancelSelectedItem } = itemStore;

  if (!item) return <LoadingComponents />;
  return (
    <Card fluid>
      <Image src={`/assets/placeholder.png`} />
      <Card.Content>
        <Card.Header>{item.name}</Card.Header>
        <Card.Meta>
          <span>{item.dateCreated}</span>
        </Card.Meta>
        <Card.Description>{item.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button
            onClick={() => openForm(item.id)}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={cancelSelectedItem}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
