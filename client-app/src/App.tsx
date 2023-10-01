import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5070/api/items').then(res => {
      setItems(res.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='box' content='Items'/>
        <List>
        {items.map((item: any) => (
            <List.Item key={item.id}>{item.name}</List.Item>
          ))}
        </List>
          
    </div>
  );
}

export default App;
