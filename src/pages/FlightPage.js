import React, { useEffect, useState } from 'react';
import { Container, Card, Form, FloatingLabel, Button, CloseButton } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneFlight, deleteFlight } from '../http/flightAPI';
import { useNavigate } from 'react-router-dom';
import { FLIGHT_EDIT_ROUTE, FLIGHT_LIST_ROUTE } from '../utils/consts';

const FlightPage = () => {
    const navigate = useNavigate();
    const [flight, setFlight] = useState({});
    const [date, setDate] = useState('');
    const { id } = useParams();

    useEffect(() => {
        fetchOneFlight(id).then(data => {
            const serverDate = new Date(data.date);
            const serverDateTime = serverDate.getHours();
            serverDate.setHours(serverDateTime+3);
            const formattedDate = serverDate.toISOString().slice(0, 16);
            setDate(formattedDate);
            data.date = formattedDate;
            setFlight(data);
        })
    }, [])

    const removeFlight = async () => {
        await deleteFlight(id);
        navigate(FLIGHT_LIST_ROUTE);
    }

    return (
        <Container 
            className='d-flex justify-content-center  mt-4'
        >
            <Card style={{width: 600}} className='p-3'>
                <h2 className='m-auto'>Flight №{flight.id}</h2> 
                <CloseButton 
                    style={{"position": 'absolute', 'right': '15px'}}
                    onClick={() => navigate(FLIGHT_LIST_ROUTE)}
                />
                <Form>
                    <FloatingLabel 
                        className='mt-2'
                        controlId="direction"
                        label="Direction"
                    >
                        <Form.Control 
                            type="text" 
                            value={flight.direction}
                            readOnly
                        />
                    </FloatingLabel>
                    <FloatingLabel 
                        className='mt-2'
                        controlId="date"
                        label="Date"
                    >
                        <Form.Control 
                            value={date}
                            type="datetime-local"
                            readOnly
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        className='mt-2' 
                        controlId="terminal"
                        label="Terminal"
                    >
                        <Form.Control 
                            type="text" 
                            value={flight.terminal}
                            readOnly
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        className='mt-2' 
                        controlId="capacity"
                        label='Capacity'
                    >
                        <Form.Control 
                            type="text" 
                            value={flight.capacity}
                            readOnly
                        />
                    </FloatingLabel>
                    <hr/>
                    <Form.Group className='d-flex justify-content-center align-items-center'>
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
                </Form>
            </Card>
        </Container>
    );
};

export default FlightPage;