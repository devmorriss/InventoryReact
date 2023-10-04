import React from 'react';
import { Button, Container, Icon, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function Navbar() {
  const { itemStore } = useStore();

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <Icon
            circular
            inverted
            color='purple'
            name='box'
            style={{ marginRight: '10px' }}
          />
          Inventory System
        </Menu.Item>
        <Menu.Item name='Items' />
        <Menu.Item>
          <Button
            onClick={() => itemStore.openForm()}
            positive
            content='Add Item'
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
