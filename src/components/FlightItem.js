import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FLIGHT_EDIT_ROUTE } from '../utils/consts';
import { Form, Button } from 'react-bootstrap';
import { deleteFlight } from '../http/flightAPI';

const FlightItem = ({ flight, onRemove }) => {
    const navigate = useNavigate();

    const removeFlight = async () => {
        await deleteFlight(flight.id);
        onRemove();
    }

    return (
        <tr>
            <td>{flight.direction}</td>
            <td style={{width: 200}}>
                <Form.Control 
                    type="datetime-local" 
                    value={flight.date}
                    style={{height: 30}}
                    readOnly
                />
            </td>
            <td>{flight.terminal}</td>
            <td  className='d-flex justify-content-between'>
                {flight.capacity}
                <Form.Group className='d-flex justify-content-end'>
                    <Button 
                        style={{'marginRight': '1rem'}}
                        variant={"primary"}
                        onClick={() => navigate(FLIGHT_EDIT_ROUTE + '/' + flight.id)}
                    >
                        Edit
                    </Button>
                    <Button 
                        variant={'danger'}
                        onClick={removeFlight}
                    >
                        Delete
                    </Button>
                </Form.Group>
            </td>
        </tr>
    );
};

export default FlightItem;