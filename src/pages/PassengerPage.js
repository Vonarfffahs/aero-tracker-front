import React, { useState, useEffect } from 'react';
import { Container, Card, Form, FloatingLabel, Button, InputGroup, ListGroup } from 'react-bootstrap';
import { fetchFlights } from '../http/flightAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePassenger, fetchOnePassenger } from '../http/passengerAPI';
import { fetchRegistrations } from '../http/registerAPI';
import FlightRegistrationInfo from '../components/FlightRegistrationInfo';
import { PASSENGER_EDIT_ROUTE, PASSENGER_LIST_ROUTE } from '../utils/consts';

const PassengerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [flights, setFlights] = useState([]);
    const [passenger, setPassenger] = useState({});
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        fetchOnePassenger(id).then(data => setPassenger(data));
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
    }, [])

    const flightsInfo = registrations
        .filter(item => item.passengerPassportId === passenger.passport_id)
        .map(item => {
            const flight = flights.find(f => f.id === item.flightId);
            return flight ? <FlightRegistrationInfo key={item.id} flightInfo={flight} registrationInfo={item} /> : null;
        }
    );

    const removePassenger = async () => {
        await deletePassenger(id);
        navigate(PASSENGER_LIST_ROUTE);
    }

    return (
        <Container 
            className='d-flex justify-content-center mt-4'
        >
            <Card style={{width: 600}} className='p-3'>
                <h2 className='m-auto'>Passenger with passport №{passenger.passport_id}</h2>
                <Form>
                    <InputGroup className="mt-2">
                        <FloatingLabel 
                            className='mt-2'
                            controlId="firstName"
                            label="First name"
                        >
                            <Form.Control 
                                type="text" 
                                value={passenger.first_name}
                                readOnly
                            />
                        </FloatingLabel>
                        <FloatingLabel 
                            className='mt-2'
                            controlId="patronymic"
                            label="Patronymic name"
                        >
                            <Form.Control 
                                type="text" 
                                value={passenger.patronymic}
                                readOnly
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            className='mt-2' 
                            controlId="lastName"
                            label="Last name"
                        >
                            <Form.Control 
                                type="text" 
                                value={passenger.last_name}
                                readOnly
                            />
                        </FloatingLabel>
                        <FloatingLabel 
                            controlId="wanted"
                            label='is Wanted'
                        >
                        <Form.Select aria-label="Wanted" className='mt-2' disabled>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
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
                </Form>
            </Card>
        </Container>
    );
};

export default PassengerPage;