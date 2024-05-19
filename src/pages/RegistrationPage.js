import React, { useEffect, useState } from 'react';
import {Button, Card, Container, Form, InputGroup} from 'react-bootstrap';
import { fetchFlights } from '../http/flightAPI';
import { createPassenger } from '../http/passengerAPI';
import { createRegistration } from '../http/registerAPI';
import { useNavigate } from 'react-router-dom';
import { PASSENGER_LIST_ROUTE } from '../utils/consts';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [flights, setFlights] = useState([]);
    const [passportId, setPassportId] = useState('');
    const [tiket, setTicket] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [baggage, setBaggage] = useState('');
    const [visaPermission, setVisaPermission] = useState(false);
    const [permission, setPermission] = useState(false);
    const [wanted, setWantedLevel] = useState('');
    const [selectedFlight, setSelectedFlight] = useState('');


    useEffect(() => {
        fetchFlights().then(data => setFlights(data))
    }, [])

    const registerPassenger = async () => {
        const passport_id = passportId,
              first_name = firstName,
              last_name = lastName,
              flight_permission = String(permission),
              visa = String(visaPermission),
              passengerPassportId = passportId,
              flightId = selectedFlight;

        const passenger = { passport_id, last_name, first_name, patronymic, wanted };
        const registration = { tiket, visa, baggage, flight_permission, passengerPassportId, flightId };
        await createPassenger(passenger);
        await createRegistration(registration);
        navigate(PASSENGER_LIST_ROUTE);
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}    
        >
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>Registration for the flight</h2>
                <Form className='d-flex flex-column'>
                    <InputGroup className="mt-2">
                        <Form.Control 
                            placeholder="Passport number"
                            value={passportId}
                            onChange={(e) => setPassportId(e.target.value)}
                        />
                        <input 
                            className="form-control"
                            type="text" 
                            maxLength="4" 
                            placeholder='Ticket number' 
                            value={tiket}
                            onChange={(e) => setTicket(e.target.value)}    
                        />
                    </InputGroup>
                    <InputGroup className="mt-2">
                        <Form.Control 
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Form.Control 
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <Form.Control 
                            placeholder="Patronymic"
                            value={patronymic}
                            onChange={(e) => setPatronymic(e.target.value)}
                        />
                    </InputGroup>
                    <Form.Control 
                        className='mt-2'
                        type='text'
                        placeholder="Baggage weight"
                        maxLength='3'
                        value={baggage}
                        onChange={(e) => setBaggage(e.target.value)}
                    />
                    <InputGroup className='d-flex align-items-center'>
                        <Form.Check
                            className='mt-2'
                            style={{'marginRight': '2rem'}}
                            type="switch"
                            label="Visa"
                            checked={visaPermission}
                            onChange={(e) => setVisaPermission(e.target.checked)}
                        />
                        <Form.Check
                            className='mt-2'
                            style={{'marginRight': '2rem'}}
                            type="switch"
                            label="Flight permission"
                            checked={permission}
                            onChange={(e) => setPermission(e.target.checked)}
                        />
                        <Form.Group className='mt-2'>
                            <Form.Label>Wanted level:</Form.Label>
                            <Form.Select 
                                aria-label="wantedLevel"
                                value={wanted}
                                onChange={(e) => setWantedLevel(e.target.value)}
                            >
                                <option>Choose...</option>
                                <option value='yes'>yes</option>
                                <option value='no'>no</option>
                                <option value='interpol'>interpol</option>
                            </Form.Select>
                        </Form.Group>
                    </InputGroup>
                    <Form.Group className='mt-2'>
                        <Form.Label>Choose flight:</Form.Label>
                        <Form.Select 
                            aria-label="flights"
                            value={selectedFlight}
                            onChange={(e) => setSelectedFlight(e.target.value)}
                        >
                            <option>Choose...</option>
                            {flights.sort().map(flight => 
                                <option value={flight.id} key={flight.id}>Flight №{flight.id}. Direction {flight.direction}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Button 
                        className='mt-3 align-self-center'
                        variant={'outline-dark'}
                        onClick={registerPassenger}
                    >
                        Register
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default RegistrationPage;