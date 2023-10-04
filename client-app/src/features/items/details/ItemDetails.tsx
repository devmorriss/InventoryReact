import React, { useEffect } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponents from '../../../app/layouts/LoadingComponents';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

export default observer(function ItemDetails() {
  const { itemStore } = useStore();
  const { selectedItem: item, loadItem, loadingInitial } = itemStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadItem(id);
  }, [id, loadItem]);

  if (loadingInitial || !item) return <LoadingComponents />;

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
            as={Link}
            to={`/manage/${item.id}`}
            basic
            color='blue'
            content='Edit'
          />
          <Button as={Link} to='/items' basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
