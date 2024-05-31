import React, { useState, useEffect } from 'react';
import { Container, Card, Form, FloatingLabel, Button, InputGroup, CloseButton, ListGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePassenger, fetchOnePassenger, updatePassenger } from '../http/passengerAPI';
import { PASSENGER_LIST_ROUTE, PASSENGER_ROUTE } from '../utils/consts';
import { fetchRegistrations } from '../http/registerAPI';
import { fetchFlights } from '../http/flightAPI';
import FlightEditRegInfo from '../components/FlightEditRegInfo';

const PassengerEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [wanted, setWanted] = useState(false);

    const [flights, setFlights] = useState([]);
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        fetchOnePassenger(id).then(data => {
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setPatronymic(data.patronymic);
            setWanted(data.wanted);
        });
        fetchFlights().then(data => {
            data.map(item => {
                const serverDate = new Date(item.date);
                const serverDateTime = serverDate.getHours();
                serverDate.setHours(serverDateTime+3);
                const formattedDate = serverDate.toISOString().slice(0, 16);
                item.date = formattedDate;
            });
            setFlights(data);
        });
        fetchRegistrations().then(data => setRegistrations(data));
    }, []);

    const savePassenger = async () => {
        const passport_id = id,
              first_name = firstName,
              last_name = lastName;
        const passenger = { passport_id, last_name, first_name, patronymic, wanted };

        await updatePassenger(id, passenger);
        navigate(PASSENGER_ROUTE + '/' + id);
    };

    const flightsInfo = registrations
        .filter(item => item.passengerPassportId === id)
        .map(item => {
            const flight = flights.find(f => f.id === item.flightId);
            return flight ? <FlightEditRegInfo key={item.id} flightInfo={flight} registrationInfo={item} /> : null;
        }
    );

    const removePassenger = async () => {
        await deletePassenger(id);
        navigate(PASSENGER_LIST_ROUTE);
    }

    return (
        <Container 
            className='d-flex justify-content-center mt-4 mb-4'
        >
            <Card style={{width: 600}} className='p-3'>
                <h2 className='mt-2'>Passenger with passport №{id}</h2>
                <CloseButton 
                    style={{"position": 'absolute', 'right': '8px', 'top': '8px'}}
                    onClick={() => navigate(PASSENGER_LIST_ROUTE)}
                />
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
                        <h4>Flight Registrations:</h4>
                        <ListGroup>
                            {flightsInfo}
                        </ListGroup>
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