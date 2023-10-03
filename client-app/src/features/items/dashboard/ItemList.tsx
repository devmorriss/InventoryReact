import React from 'react'
import { ItemModel } from '../../../app/models/itemModel'
import { Button, Item, Label, Segment } from 'semantic-ui-react';

interface Props {
    items: ItemModel[];
    selectItem: (id: string) => void;
    deleteItem: (id: string) => void;
}

export default function ItemList({items, selectItem, deleteItem}: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {items.map(item => (
                    <Item key={item.id}>
                        <Item.Content>
                            <Item.Header as='a'>{item.name}</Item.Header>
                            <Item.Meta>{item.dateCreated}</Item.Meta>
                            <Item.Description>
                                <div>{item.description}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectItem(item.id)} floated='right' content='View' color='purple' />
                                <Button onClick={() => deleteItem(item.id)} floated='right' content='Delete' color='orange' />
                                <Label basic content={item.price}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}