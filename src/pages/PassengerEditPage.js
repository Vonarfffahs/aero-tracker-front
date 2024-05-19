import React, { useState, useEffect } from 'react';
import { Container, Card, Form, FloatingLabel, Button, InputGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePassenger, fetchOnePassenger, updatePassenger } from '../http/passengerAPI';
import { PASSENGER_LIST_ROUTE, PASSENGER_ROUTE } from '../utils/consts';

const PassengerEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [wanted, setWanted] = useState(false);

    useEffect(() => {
        fetchOnePassenger(id).then(data => {
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setPatronymic(data.patronymic);
            setWanted(data.wanted);
        });
    }, []);

    const savePassenger = async () => {
        const passport_id = id,
              first_name = firstName,
              last_name = lastName;
        const passenger = { passport_id, last_name, first_name, patronymic, wanted };

        await updatePassenger(id, passenger);
        navigate(PASSENGER_ROUTE + '/' + id);
    };

    const removePassenger = async () => {
        await deletePassenger(id);
        navigate(PASSENGER_LIST_ROUTE);
    }

    return (
        <Container 
            className='d-flex justify-content-center mt-4'
        >
            <Card style={{width: 600}} className='p-3'>
                <h2 className='m-auto'>Passenger with passport №{id}</h2>
                <Form>
                    <InputGroup className="mt-2">
                        <FloatingLabel 
                            className='mt-2'
                            controlId="firstName"
                            label="First name"
                        >
                            <Form.Control 
                                type="text" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </FloatingLabel>
                        <FloatingLabel 
                            className='mt-2'
                            controlId="patronymic"
                            label="Patronymic name"
                        >
                            <Form.Control 
                                type="text" 
                                value={patronymic}
                                onChange={(e) => setPatronymic(e.target.value)}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            className='mt-2' 
                            controlId="lastName"
                            label="Last name"
                        >
                            <Form.Control 
                                type="text" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </FloatingLabel>
                        <FloatingLabel 
                            controlId="wanted"
                            label='is Wanted'
                        >
                        <Form.Select 
                            aria-label="Wanted" 
                            className='mt-2' 
                            value={wanted}
                            onChange={(e) => setWanted(e.target.value)}
                        >
                            <option>Choose...</option>
                            <option value='yes'>yes</option>
                            <option value='no'>no</option>
                            <option value='interpol'>interpol</option>
                        </Form.Select>
                    </FloatingLabel>
                    </InputGroup>
                    <hr/>
                    <Form.Group className='d-flex justify-content-center align-items-center'>
                        <Button 
                            style={{'marginRight': '1rem'}}
                            variant={"success"}
                            onClick={savePassenger}
                        >
                            Save
                        </Button>
                        <Button 
                            variant={'danger'}
                            onClick={removePassenger}
                        >
                            Delete
                        </Button>
                        <Button 
                            style={{'marginLeft': '1rem'}}
                            variant={"secondary"}
                            onClick={() => navigate(PASSENGER_ROUTE + '/' + id)}
                        >
                            Cancel
                        </Button>
                    </Form.Group>
                </Form>
            </Card>
        </Container>
    );
};

export default PassengerEditPage;