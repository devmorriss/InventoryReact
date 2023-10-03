import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { ItemModel } from '../../../app/models/itemModel'

interface Props {
    item: ItemModel | undefined;
    closeForm: () => void;
    createOrEdit: (item: ItemModel) => void;
}

export default function ItemForm({item: selectedItem, closeForm, createOrEdit}: Props) {

    const initialState = selectedItem ?? {
        id: '',
        name: '',
        description: '',
        price: 0,
        dateCreated: ''
    }

    const [item, setItem] = useState(initialState);

    function handleSubmit() {
        createOrEdit(item);
        console.log(item);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setItem({...item, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={item.name} name='name' onChange={handleInputChange} />
                <Form.Input placeholder='Price' value={item.price} name='price' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={item.description} name='description' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}