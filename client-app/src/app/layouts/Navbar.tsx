import React from 'react';
import { Button, Container, Icon, Menu } from 'semantic-ui-react';

interface Props {
  openForm: () => void;
}

export default function Navbar({ openForm }: Props) {
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
          <Button onClick={openForm} positive content='Add Item' />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
