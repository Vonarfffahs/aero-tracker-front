import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PASSENGER_EDIT_ROUTE } from '../utils/consts';
import { Button, Form } from 'react-bootstrap';
import { deletePassenger } from '../http/passengerAPI';

const PassengerItem = ({ passenger, onRemove }) => {
    const navigate = useNavigate();

    const removePassenger = async () => {
        await deletePassenger(passenger.passport_id);
        onRemove();
    }

    return (
        <tr>
            <td>{passenger.first_name}</td>
            <td>{passenger.patronymic}</td>
            <td>{passenger.last_name}</td>
            <td>{passenger.passport_id}</td>
            <td className='d-flex justify-content-between'>
                {passenger.wanted}
                <Form.Group className='d-flex justify-content-end'>
                    <Button 
                        style={{'marginRight': '1rem'}}
                        variant={"primary"}
                        onClick={() => navigate(PASSENGER_EDIT_ROUTE + '/' + passenger.passport_id)}
                    >
                        Edit
                    </Button>
                    <Button 
                        variant={'danger'}
                        onClick={removePassenger}
                    >
                        Delete
                    </Button>
                </Form.Group>
            </td>
        </tr>
    );
};

export default PassengerItem;