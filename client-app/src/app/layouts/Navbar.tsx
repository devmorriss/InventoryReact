import React from 'react';
import { Button, Container, Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' header>
          <Icon
            circular
            inverted
            color='purple'
            name='box'
            style={{ marginRight: '10px' }}
          />
          Inventory System
        </Menu.Item>
        <Menu.Item as={NavLink} to='/items' name='Items' />
        <Menu.Item>
          <Button as={NavLink} to='/createItem' positive content='Add Item' />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
