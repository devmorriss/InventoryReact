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
        <Menu.Item as={NavLink} to='/activities' name='Activities' />
        <Menu.Item>
          <Button
            as={NavLink}
            to='/createActivity'
            positive
            content='Add Activity'
          />
        </Menu.Item>
        <Menu.Item>
          <Button as={NavLink} to='/errors' positive content='Errors' />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
