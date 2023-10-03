import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { ItemModel } from '../../../app/models/itemModel';

interface Props {
    item: ItemModel;
    cancelSelectItem: () => void;
    openForm: (id: string) => void;
}

export default function ItemDetails({item, cancelSelectItem, openForm}: Props) {
    return (
        <Card fluid>
            <Image src={`/assets/placeholder.png`} />
            <Card.Content>
            <Card.Header>{item.name}</Card.Header>
            <Card.Meta>
                <span>{item.dateCreated}</span>
            </Card.Meta>
            <Card.Description>
                {item.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={ () => openForm(item.id) } basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectItem} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}